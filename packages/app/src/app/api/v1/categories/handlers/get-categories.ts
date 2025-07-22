import { apiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import { validateQueryParams } from "@/lib/middleware/validation";
import { NextRequest } from "next/server";
import {
  CategoriesQuerySchema,
  buildWhereClause,
  fetchFlatCategories,
  fetchHierarchicalCategories,
} from "../utils/categories-helpers";

// GET /api/v1/categories - Get all categories with optional hierarchy
export async function handleGetCategories(request: NextRequest) {
  // Apply middleware (categories are publicly readable but rate limited)
  await rateLimitMiddleware(request, "categories-read", "anonymous");

  // Validate query parameters
  const queryParams = validateQueryParams(CategoriesQuerySchema)(request);

  // Build base query
  const where = buildWhereClause(queryParams);

  // Get user for personalized skill counts
  let userId: string | undefined;
  try {
    const user = await authMiddleware(request);
    if (user && queryParams.userId) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });
      userId = dbUser?.id;
    }
  } catch {
    // User not authenticated, continue with public categories
  }

  if (queryParams.includeHierarchy) {
    // Fetch hierarchical structure
    const categories = await fetchHierarchicalCategories(
      where,
      queryParams.includeSkillsCount,
      userId
    );

    return apiResponse.success(
      { categories },
      200,
      "Categories with hierarchy retrieved successfully"
    );
  } else {
    // Fetch flat structure
    const categories = await fetchFlatCategories(
      where,
      queryParams.includeSkillsCount,
      userId
    );

    return apiResponse.success(
      { categories },
      200,
      "Categories retrieved successfully"
    );
  }
}
