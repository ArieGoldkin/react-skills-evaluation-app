import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const secret = process.env.NEXTAUTH_SECRET;
if (!secret) {
  throw new Error("NEXTAUTH_SECRET environment variable is required");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
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
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and provider to the token right after signin
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

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
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
      }

      return session;
    },
    async signIn() {
      // Allow sign in
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret,
  debug: process.env.NODE_ENV === "development",
});
