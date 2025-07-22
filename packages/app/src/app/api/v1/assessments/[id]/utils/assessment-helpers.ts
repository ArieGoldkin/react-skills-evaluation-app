import { z } from "zod";

// Assessment update schema
export const UpdateAssessmentSchema = z.object({
  score: z.number().min(0).max(100).optional(),
  proficiency: z.number().int().min(0).max(10).optional(),
  feedback: z.string().max(1000).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Helper function to build update data from validated input
export function buildUpdateData(
  validatedData: z.infer<typeof UpdateAssessmentSchema>
) {
  const updateData: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if (validatedData.score !== undefined) updateData.score = validatedData.score;
  if (validatedData.proficiency !== undefined)
    updateData.proficiency = validatedData.proficiency;
  if (validatedData.feedback !== undefined)
    updateData.feedback = validatedData.feedback;
  if (validatedData.metadata !== undefined) {
    updateData.metadata = JSON.stringify(validatedData.metadata);
  }

  return updateData;
}

// Helper function to calculate weighted proficiency based on assessment type
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
