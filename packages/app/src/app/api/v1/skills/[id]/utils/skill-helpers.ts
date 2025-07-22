import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/errors/types";
import { UpdateSkillSchema } from "@/lib/validations/skills";
import { z } from "zod";

// Helper function to calculate proficiency trend
export function calculateProficiencyTrend(
  history: Array<{ proficiency: number; createdAt: Date }>
) {
  if (history.length < 2) return "stable";

  const recent = history.slice(0, 3); // Last 3 entries
  const oldest = recent[recent.length - 1];
  const newest = recent[0];

  if (!newest || !oldest) return "stable";

  if (newest.proficiency > oldest.proficiency) return "improving";
  if (newest.proficiency < oldest.proficiency) return "declining";
  return "stable";
}

// Helper function to check skill ownership
export async function checkSkillOwnership(skillId: string, userId: string) {
  const existingSkill = await prisma.skill.findFirst({
    where: {
      id: skillId,
      userId,
    },
  });

  if (!existingSkill) {
    throw new ApiError(404, "Skill not found", "SKILL_NOT_FOUND");
  }

  return existingSkill;
}

// Helper function to check duplicate skill name
export async function checkDuplicateName(name: string, userId: string) {
  const duplicateSkill = await prisma.skill.findUnique({
    where: {
      userId_name: {
        userId,
        name,
      },
    },
  });

  if (duplicateSkill) {
    throw new ApiError(
      409,
      "You already have another skill with this name",
      "DUPLICATE_SKILL_NAME",
      { skillId: duplicateSkill.id }
    );
  }
}

// Helper function to build update data from validated input
export function buildUpdateData(
  validatedData: z.infer<typeof UpdateSkillSchema>
) {
  const updateData: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if (validatedData.name !== undefined) updateData.name = validatedData.name;
  if (validatedData.categoryId !== undefined)
    updateData.categoryId = validatedData.categoryId;
  if (validatedData.description !== undefined)
    updateData.description = validatedData.description;
  if (validatedData.tags !== undefined)
    updateData.tags = JSON.stringify(validatedData.tags);
  if (validatedData.verified !== undefined)
    updateData.verified = validatedData.verified;
  if (validatedData.source !== undefined)
    updateData.source = validatedData.source;

  return updateData;
}
