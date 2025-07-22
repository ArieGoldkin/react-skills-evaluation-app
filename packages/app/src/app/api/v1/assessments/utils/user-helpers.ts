import { ApiError } from "@/lib/errors/types";
import { prisma } from "@/lib/db";

export async function getUserFromAuth(email: string) {
  const dbUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!dbUser) {
    throw new ApiError(404, "User not found", "USER_NOT_FOUND");
  }

  return dbUser;
}
