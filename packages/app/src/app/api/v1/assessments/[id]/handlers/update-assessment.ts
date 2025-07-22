import { NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import {
  validateRequestBody,
  validatePathParams,
  PathParamsSchema,
} from "@/lib/middleware/validation";
import { apiResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/errors/types";
import { prisma } from "@/lib/db";
import { getUserFromAuth } from "../utils/user-helpers";
import {
  UpdateAssessmentSchema,
  buildUpdateData,
  calculateWeightedProficiency,
} from "../utils/assessment-helpers";

// PUT /api/v1/assessments/[id] - Update an assessment
export async function handleUpdateAssessment(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "assessments-write", user.id);

  // Validate path parameters and request body
  const { id } = validatePathParams(PathParamsSchema.id, params)();
  const validatedData = await validateRequestBody(UpdateAssessmentSchema)(
    request
  );

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Check if assessment exists and belongs to user
  const existingAssessment = await prisma.assessment.findFirst({
    where: {
      id,
      userId: dbUser.id,
    },
    include: {
      skill: {
        select: {
          id: true,
          proficiency: true,
        },
      },
    },
  });

  if (!existingAssessment) {
    throw new ApiError(404, "Assessment not found", "ASSESSMENT_NOT_FOUND");
  }

  // Only allow updates to self-assessments (assessorId field removed from schema)
  if (existingAssessment.type !== "SELF_ASSESSMENT") {
    throw new ApiError(
      403,
      "Cannot update this assessment",
      "ASSESSMENT_UPDATE_FORBIDDEN"
    );
  }

  // Prepare update data
  const updateData = buildUpdateData(validatedData);

  // Update assessment in transaction
  const result = await prisma.$transaction(async tx => {
    const updatedAssessment = await tx.assessment.update({
      where: { id },
      data: updateData,
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

    // If proficiency was updated, potentially update the skill
    if (
      validatedData.proficiency !== undefined &&
      validatedData.proficiency !== existingAssessment.proficiency &&
      existingAssessment.skill
    ) {
      const proficiencyDifference = Math.abs(
        validatedData.proficiency - existingAssessment.skill.proficiency
      );

      if (proficiencyDifference >= 1) {
        // Recalculate skill proficiency
        const newProficiency = calculateWeightedProficiency(
          existingAssessment.skill.proficiency,
          validatedData.proficiency,
          existingAssessment.type
        );

        await tx.skill.update({
          where: { id: existingAssessment.skillId || "" },
          data: {
            proficiency: newProficiency,
            lastAssessed: new Date(),
          },
        });

        // Create skill history entry
        await tx.skillHistory.create({
          data: {
            skillId: existingAssessment.skillId || "",
            userId: dbUser.id,
            proficiency: newProficiency,
            reason: `Assessment updated: ${existingAssessment.type
              .toLowerCase()
              .replace("_", " ")}`,
            source: "ASSESSMENT",
          },
        });
      }
    }

    return updatedAssessment;
  });

  // Transform response
  const responseAssessment = {
    ...result,
    metadata: result.metadata,
  };

  return apiResponse.success(
    { assessment: responseAssessment },
    200,
    "Assessment updated successfully"
  );
}
