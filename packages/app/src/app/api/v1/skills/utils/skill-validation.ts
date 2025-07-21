import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Checks if skill name already exists for user
 */
export async function checkSkillExists(
  userId: string,
  skillName: string
): Promise<NextResponse | null> {
  const existingSkill = await prisma.skill.findUnique({
    where: {
      userId_name: {
        userId,
        name: skillName,
      },
    },
  });

  if (existingSkill) {
    return NextResponse.json(
      {
        error: "You already have a skill with this name",
        code: "DUPLICATE_SKILL",
        details: { skillId: existingSkill.id },
      },
      { status: 409 }
    );
  }

  return null;
}
