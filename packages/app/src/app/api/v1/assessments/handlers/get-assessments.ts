import { paginatedResponse } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import { validateQueryParams } from "@/lib/middleware/validation";
import { NextRequest } from "next/server";
import {
  AssessmentsQuerySchema,
  buildWhereClause,
} from "../utils/query-helpers";
import { getUserFromAuth } from "../utils/user-helpers";

// GET /api/v1/assessments - Get assessments for authenticated user
export async function handleGetAssessments(request: NextRequest) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "assessments-read", user.id);

  // Validate query parameters
  const queryParams = validateQueryParams(AssessmentsQuerySchema)(request);

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Build where clause
  const where = buildWhereClause(dbUser.id, queryParams);

  // Get total count and assessments
  const [totalCount, assessments] = await Promise.all([
    prisma.assessment.count({ where }),
    prisma.assessment.findMany({
      where,
      include: {
        skill: {
          select: {
            id: true,
            name: true,
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
        // Note: assessor relation removed - assessorId field doesn't exist in schema
      },
      orderBy: { [queryParams.sortBy]: queryParams.order },
      take: queryParams.limit,
      skip: queryParams.offset,
    }),
  ]);

  // Transform response
  const transformedAssessments = assessments.map((assessment: any) => ({
    id: assessment.id,
    type: assessment.type,
    score: assessment.score,
    proficiency: assessment.proficiency,
    feedback: assessment.feedback,
    metadata: assessment.metadata ? JSON.parse(assessment.metadata) : null,
    createdAt: assessment.createdAt,
    completedAt: assessment.completedAt,
    skill: assessment.skill,
    // Note: assessor removed - field doesn't exist in schema
  }));

  return paginatedResponse(
    transformedAssessments,
    totalCount,
    queryParams.limit,
    queryParams.offset,
    "Assessments retrieved successfully"
  );
}
