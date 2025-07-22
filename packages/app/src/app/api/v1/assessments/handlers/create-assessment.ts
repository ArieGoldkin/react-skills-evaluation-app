import { apiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import { validateRequestBody } from "@/lib/middleware/validation";
import { NextRequest } from "next/server";
import {
  calculateWeightedProficiency,
  CreateAssessmentSchema,
  validateAssessor,
  validateSkillOwnership,
} from "../utils/assessment-helpers";
import { getUserFromAuth } from "../utils/user-helpers";

// POST /api/v1/assessments - Create a new assessment
export async function handleCreateAssessment(request: NextRequest) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "assessments-write", user.id);

  // Validate request body
  const validatedData = await validateRequestBody(CreateAssessmentSchema)(
    request
  );

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Verify skill exists and belongs to user
  const skill = await validateSkillOwnership(validatedData.skillId, dbUser.id);

  // Verify assessor exists if provided
  if (validatedData.assessorId) {
    await validateAssessor(validatedData.assessorId);
  }

  // Create assessment in transaction
  const result = await prisma.$transaction(async tx => {
    // Create the assessment
    const assessment = await tx.assessment.create({
      data: {
        userId: dbUser.id,
        skillId: validatedData.skillId,
        type: validatedData.type as any, // Schema enum values will be updated
        score: validatedData.score ?? undefined,
        proficiency: validatedData.proficiency,
        feedback: validatedData.feedback ?? undefined,
        // assessorId field removed - not in schema
        metadata: (validatedData.metadata as any) ?? undefined,
        completedAt: new Date(),
      } as any,
      include: {
        skill: {
          select: {
            id: true,
            name: true,
            proficiency: true,
            category: {
              select: {
                id: true,
                name: true,
                icon: true,
                color: true,
              },
            },
          },
        },
        // assessor relation removed - not in schema
      },
    });

    // Update skill proficiency if this assessment indicates a change
    const proficiencyDifference = Math.abs(
      validatedData.proficiency - skill.proficiency
    );

    if (proficiencyDifference >= 1) {
      // Calculate new proficiency (weighted average with existing)
      const newProficiency = calculateWeightedProficiency(
        skill.proficiency,
        validatedData.proficiency,
        validatedData.type
      );

      // Update skill proficiency
      await tx.skill.update({
        where: { id: validatedData.skillId },
        data: {
          proficiency: newProficiency,
          lastAssessed: new Date(),
        },
      });

      // Create skill history entry
      await tx.skillHistory.create({
        data: {
          skillId: validatedData.skillId,
          userId: dbUser.id,
          proficiency: newProficiency,
          reason: `Assessment: ${validatedData.type
            .toLowerCase()
            .replace("_", " ")}`,
          source: "ASSESSMENT",
        },
      });
    }

    return assessment;
  });

  // Transform response
  const responseAssessment = {
    ...result,
    metadata: result.metadata,
  };

  return apiResponse.success(
    { assessment: responseAssessment },
    201,
    "Assessment created successfully"
  );
}
