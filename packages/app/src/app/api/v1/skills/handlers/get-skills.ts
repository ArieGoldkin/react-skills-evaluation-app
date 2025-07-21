import { NextRequest, NextResponse } from "next/server";
import { paginatedResponse } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import { handleApiError } from "@/lib/errors/handlers";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import { validateQueryParams } from "@/lib/middleware/validation";
import { SkillsQuerySchema } from "@/lib/validations/skills";
import {
  buildSkillsQuery,
  transformSkillsResponse,
  addRateLimitHeaders,
  addCacheHeaders,
  getAverageProficiency,
  getSkillsCategoryDistribution,
  getSkillsProficiencyDistribution,
} from "../utils/";

/**
 * GET /api/v1/skills - Get all skills for authenticated user
 */
export async function handleGetSkills(request: NextRequest) {
  try {
    // Apply middleware
    const user = await authMiddleware(request);
    const rateLimitInfo = await rateLimitMiddleware(
      request,
      "skills-read",
      user.id
    );

    // Validate query parameters
    const queryParams = validateQueryParams(SkillsQuerySchema)(request);

    // Build database query filters
    const where = buildSkillsQuery(user.id, queryParams);

    // Get total count and skills data
    const [totalCount, skills] = await Promise.all([
      prisma.skill.count({ where }),
      prisma.skill.findMany({
        where,
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
          _count: {
            select: {
              assessments: true,
              history: true,
            },
          },
        },
        orderBy: { [queryParams.sortBy]: queryParams.order },
        take: queryParams.limit,
        skip: queryParams.offset,
      }),
    ]);

    // Transform response data
    const transformedSkills = transformSkillsResponse(skills);

    // Create paginated response
    const response = paginatedResponse(
      transformedSkills,
      totalCount,
      queryParams.limit,
      queryParams.offset,
      "Skills retrieved successfully"
    );

    // Add headers
    addCacheHeaders(response, totalCount);
    addRateLimitHeaders(response, rateLimitInfo);

    // Add metadata to response body
    const responseBody = await response.json();
    responseBody.meta = {
      ...responseBody.meta,
      totalByProficiency: await getSkillsProficiencyDistribution(user.id),
      totalByCategory: await getSkillsCategoryDistribution(user.id),
      averageProficiency: await getAverageProficiency(user.id),
    };

    return NextResponse.json(responseBody, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
