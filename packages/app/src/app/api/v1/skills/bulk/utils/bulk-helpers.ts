import { z } from "zod";
import { ApiError } from "@/lib/errors/types";
import { prisma } from "@/lib/db";

// Bulk operation schemas
export const BulkUpdateSkillsSchema = z.object({
  skills: z
    .array(
      z.object({
        id: z.string().cuid("Invalid skill ID"),
        proficiency: z.number().int().min(0).max(10).optional(),
        verified: z.boolean().optional(),
        categoryId: z.string().cuid().optional(),
        tags: z.array(z.string()).max(20).optional(),
        source: z
          .enum(["MANUAL", "GITHUB", "AI_SUGGESTED", "IMPORTED", "ASSESSMENT"])
          .optional(),
      })
    )
    .min(1, "At least one skill is required")
    .max(50, "Maximum 50 skills allowed for bulk operation"),
});

export const BulkDeleteSkillsSchema = z.object({
  skillIds: z
    .array(z.string().cuid("Invalid skill ID"))
    .min(1, "At least one skill ID is required")
    .max(100, "Maximum 100 skills allowed for bulk deletion"),
});

// Validate skills ownership
export async function validateSkillsOwnership(
  skills: z.infer<typeof BulkUpdateSkillsSchema>["skills"],
  userId: string
) {
  const skillIds = skills.map(skill => skill.id);
  const existingSkills = await prisma.skill.findMany({
    where: {
      id: { in: skillIds },
      userId,
    },
    select: { id: true },
  });

  if (existingSkills.length !== skillIds.length) {
    const foundIds = existingSkills.map(skill => skill.id);
    const missingIds = skillIds.filter(id => !foundIds.includes(id));
    throw new ApiError(
      404,
      `Skills not found or not owned by user: ${missingIds.join(", ")}`,
      "SKILLS_NOT_FOUND",
      { missingSkillIds: missingIds }
    );
  }
}

// Validate skills for deletion
export async function validateSkillsForDeletion(
  skillIds: string[],
  userId: string
) {
  const skills = await prisma.skill.findMany({
    where: {
      id: { in: skillIds },
      userId,
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          assessments: true,
          history: true,
        },
      },
    },
  });

  if (skills.length !== skillIds.length) {
    const foundIds = skills.map(skill => skill.id);
    const missingIds = skillIds.filter(id => !foundIds.includes(id));
    throw new ApiError(
      404,
      `Skills not found or not owned by user: ${missingIds.join(", ")}`,
      "SKILLS_NOT_FOUND",
      { missingSkillIds: missingIds }
    );
  }

  return skills;
}

// Perform bulk update
export async function performBulkUpdate(
  skills: z.infer<typeof BulkUpdateSkillsSchema>["skills"],
  userId: string
) {
  return await prisma.$transaction(async tx => {
    const updatedSkills = [];
    const historyEntries = [];

    for (const skillData of skills) {
      // Get current skill state
      const currentSkill = await tx.skill.findUnique({
        where: { id: skillData.id },
        select: { proficiency: true },
      });

      if (!currentSkill) continue;

      // Build update data
      const updateData: Record<string, unknown> = {
        updatedAt: new Date(),
      };

      if (skillData.verified !== undefined)
        updateData.verified = skillData.verified;
      if (skillData.categoryId !== undefined)
        updateData.categoryId = skillData.categoryId;
      if (skillData.tags !== undefined)
        updateData.tags = JSON.stringify(skillData.tags);
      if (skillData.source !== undefined) updateData.source = skillData.source;

      // Handle proficiency change
      const proficiencyChanged =
        skillData.proficiency !== undefined &&
        skillData.proficiency !== currentSkill.proficiency;

      if (proficiencyChanged) {
        updateData.proficiency = skillData.proficiency;
        updateData.lastAssessed = new Date();
      }

      // Update skill
      const updatedSkill = await tx.skill.update({
        where: { id: skillData.id },
        data: updateData,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              icon: true,
              color: true,
            },
          },
        },
      });

      // Transform tags
      const transformedSkill = {
        ...updatedSkill,
        tags: updatedSkill.tags ? JSON.parse(updatedSkill.tags) : [],
      };

      updatedSkills.push(transformedSkill);

      // Create history entry if proficiency changed
      if (proficiencyChanged) {
        const historyEntry = await tx.skillHistory.create({
          data: {
            skillId: skillData.id,
            userId,
            proficiency: skillData.proficiency!,
            reason: "Bulk update",
            source: skillData.source || "MANUAL",
          },
        });
        historyEntries.push(historyEntry);
      }
    }

    return { updatedSkills, historyEntries };
  });
}

// Perform bulk delete
export async function performBulkDelete(skillIds: string[]): Promise<number> {
  const result = await prisma.skill.deleteMany({
    where: { id: { in: skillIds } },
  });

  return result.count;
}
