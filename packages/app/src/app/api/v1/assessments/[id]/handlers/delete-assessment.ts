import { NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import {
  validatePathParams,
  PathParamsSchema,
} from "@/lib/middleware/validation";
import { apiResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/errors/types";
import { prisma } from "@/lib/db";
import { getUserFromAuth } from "../utils/user-helpers";

// DELETE /api/v1/assessments/[id] - Delete an assessment
export async function handleDeleteAssessment(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "assessments-write", user.id);

  // Validate path parameters
  const { id } = validatePathParams(PathParamsSchema.id, params)();

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Check if assessment exists and belongs to user
  const assessment = await prisma.assessment.findFirst({
    where: {
      id,
      userId: dbUser.id,
    },
    select: {
      id: true,
      type: true,
      proficiency: true,
      skillId: true,
      // assessorId field removed - not in schema
      skill: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!assessment) {
    throw new ApiError(404, "Assessment not found", "ASSESSMENT_NOT_FOUND");
  }

  // Only allow deletion of self-assessments (assessorId removed from schema)
  if (assessment.type !== "SELF_ASSESSMENT") {
    throw new ApiError(
      403,
      "Cannot delete this assessment",
      "ASSESSMENT_DELETE_FORBIDDEN"
    );
  }

  // Delete assessment
  await prisma.assessment.delete({
    where: { id },
  });

  return apiResponse.success(
    {
      deletedAssessment: {
        id: assessment.id,
        type: assessment.type,
        skillName: assessment.skill?.name || null,
      },
    },
    200,
    "Assessment deleted successfully"
  );
}
