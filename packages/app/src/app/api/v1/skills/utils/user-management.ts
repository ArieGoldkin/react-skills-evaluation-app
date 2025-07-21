import { prisma } from "@/lib/db";
import type { User } from "next-auth";

/**
 * Ensures user exists in database, creates if needed
 */
export async function ensureUserExists(user: User): Promise<string> {
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
  });

  if (!dbUser) {
    // Create user if doesn't exist (for new OAuth users)
    const newUser = await prisma.user.create({
      data: {
        email: user.email!,
        name: user.name || null,
        image: user.image || null,
      },
    });
    return newUser.id;
  }

  return dbUser.id;
}
