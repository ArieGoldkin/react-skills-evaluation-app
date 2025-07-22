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

// GET /api/v1/categories/[id] - Get a single category with full details
export async function handleGetCategory(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply middleware (categories are publicly readable)
  await rateLimitMiddleware(request, "categories-read", "anonymous");

  // Validate path parameters
  const { id } = validatePathParams(PathParamsSchema.id, params)();

  // Get user for personalized skill counts
  let userId: string | undefined;
  try {
    const user = await authMiddleware(request);
    if (user) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });
      userId = dbUser?.id;
    }
  } catch {
    // User not authenticated, continue with public categories
  }

  // Find category with comprehensive details
  const category = await prisma.skillCategory.findUnique({
    where: { id },
    include: {
      // parent/children relations not supported in current schema
      skills: userId
        ? {
            where: { userId },
            select: {
              id: true,
              name: true,
              proficiency: true,
              verified: true,
              lastAssessed: true,
            },
            orderBy: [{ proficiency: "desc" }, { name: "asc" }],
            take: 10, // Limit to top 10 skills
          }
        : false,
      _count: {
        select: {
          skills: userId ? { where: { userId } } : true,
        },
      },
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found", "CATEGORY_NOT_FOUND");
  }

  // Add category statistics if user is authenticated
  let statistics = {};
  if (userId) {
    const stats = await prisma.skill.aggregate({
      where: {
        categoryId: id,
        userId,
      },
      _avg: { proficiency: true },
      _max: { proficiency: true },
      _min: { proficiency: true },
      _count: true,
    });

    statistics = {
      totalSkills: stats._count,
      averageProficiency: stats._avg.proficiency || 0,
      maxProficiency: stats._max.proficiency || 0,
      minProficiency: stats._min.proficiency || 0,
    };
  }

  const response = apiResponse.success(
    {
      category: {
        ...category,
        statistics: userId ? statistics : undefined,
      },
    },
    200,
    "Category retrieved successfully"
  );

  // Cache category data for 10 minutes
  response.headers.set("Cache-Control", "public, max-age=600");

  return response;
}
