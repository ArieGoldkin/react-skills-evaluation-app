import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { z } from "zod";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

const secret = process.env.NEXTAUTH_SECRET;
if (!secret) {
  throw new Error("NEXTAUTH_SECRET environment variable is required");
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  // Enable automatic account linking by allowing OAuth to link with existing accounts
  events: {
    async linkAccount({ account, user }) {
      console.log("Account linked:", {
        account: account.provider,
        user: user.email,
      });
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials);

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        if (account.access_token) {
          token.accessToken = account.access_token;
        }
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }

      if (profile) {
        token.profile = profile;
      }

      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        if (token.accessToken) {
          session.accessToken = token.accessToken;
        }
        if (token.provider) {
          session.provider = token.provider;
        }
        if (token.providerAccountId) {
          session.providerAccountId = token.providerAccountId;
        }
        session.profile = token.profile;
        if (session.user) {
          session.user.id = (token.id as string) || user?.id;
        }
      }

      return session;
    },
    async signIn({ user, account }) {
      if (!account || !user.email) return true;

      // Handle OAuth sign-in for existing users with same email
      if (account.provider === "google" || account.provider === "github") {
        try {
          // Check if user exists with this email
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (existingUser) {
            // Check if account already linked
            const existingAccount = await prisma.account.findFirst({
              where: {
                userId: existingUser.id,
                provider: account.provider,
              },
            });

            if (!existingAccount) {
              // Link the OAuth account to existing user
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  refresh_token: account.refresh_token
                    ? String(account.refresh_token)
                    : null,
                  access_token: account.access_token
                    ? String(account.access_token)
                    : null,
                  expires_at: account.expires_at || null,
                  token_type: account.token_type || null,
                  scope: account.scope || null,
                  id_token: account.id_token ? String(account.id_token) : null,
                  session_state: account.session_state
                    ? String(account.session_state)
                    : null,
                },
              });

              // Update user with OAuth info if not already set
              const updateData: {
                name?: string | null;
                image?: string | null;
              } = {};
              if (!existingUser.name && user.name) {
                updateData.name = user.name;
              }
              if (!existingUser.image && user.image) {
                updateData.image = user.image;
              }

              if (Object.keys(updateData).length > 0) {
                await prisma.user.update({
                  where: { id: existingUser.id },
                  data: updateData,
                });
              }
            }
          }

          return true;
        } catch (error) {
          console.error("Error linking OAuth account:", error);
          return false;
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Enable automatic account linking for same email addresses
  experimental: {
    enableWebAuthn: false,
  },
  secret,
  debug: process.env.NODE_ENV === "development",
});
