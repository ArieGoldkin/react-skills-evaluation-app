import { z } from "zod";
import { ApiError } from "@/lib/errors/types";
import { prisma } from "@/lib/db";

// Assessment schemas
export const CreateAssessmentSchema = z.object({
  skillId: z.string().cuid("Invalid skill ID"),
  type: z.enum([
    "SELF_ASSESSMENT",
    "PEER_REVIEW",
    "AUTOMATED",
    "CERTIFICATION",
  ]),
  score: z.number().min(0).max(100).optional(),
  proficiency: z.number().int().min(0).max(10),
  feedback: z.string().max(1000).optional(),
  assessorId: z.string().cuid().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Validate skill ownership
export async function validateSkillOwnership(skillId: string, userId: string) {
  const skill = await prisma.skill.findFirst({
    where: {
      id: skillId,
      userId,
    },
  });

  if (!skill) {
    throw new ApiError(404, "Skill not found", "SKILL_NOT_FOUND");
  }

  return skill;
}

// Validate assessor exists
export async function validateAssessor(assessorId: string) {
  const assessor = await prisma.user.findUnique({
    where: { id: assessorId },
  });

  if (!assessor) {
    throw new ApiError(404, "Assessor not found", "ASSESSOR_NOT_FOUND");
  }

  return assessor;
}

// Calculate weighted proficiency based on assessment type
export function calculateWeightedProficiency(
  currentProficiency: number,
  newProficiency: number,
  assessmentType: string
): number {
  const weight =
    assessmentType === "CERTIFICATION"
      ? 0.8
      : assessmentType === "PEER_REVIEW"
        ? 0.6
        : assessmentType === "AUTOMATED"
          ? 0.4
          : 0.3;

  return Math.round(
    currentProficiency * (1 - weight) + newProficiency * weight
  );
}
