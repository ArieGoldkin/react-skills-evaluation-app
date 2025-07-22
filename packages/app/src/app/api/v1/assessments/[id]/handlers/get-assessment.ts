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

// GET /api/v1/assessments/[id] - Get a single assessment
export async function handleGetAssessment(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "assessments-read", user.id);

  // Validate path parameters
  const { id } = validatePathParams(PathParamsSchema.id, params)();

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Find assessment
  const assessment = await prisma.assessment.findFirst({
    where: {
      id,
      userId: dbUser.id,
    },
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

  if (!assessment) {
    throw new ApiError(404, "Assessment not found", "ASSESSMENT_NOT_FOUND");
  }

  // Transform response
  const responseAssessment = {
    ...assessment,
    metadata: assessment.metadata,
  };

  const response = apiResponse.success(
    { assessment: responseAssessment },
    200,
    "Assessment retrieved successfully"
  );

  // Cache for 5 minutes
  response.headers.set("Cache-Control", "private, max-age=300");

  return response;
}
