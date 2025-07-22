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

// DELETE /api/v1/categories/[id] - Delete a category (admin only)
export async function handleDeleteCategory(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "categories-write", user.id);

  // Validate path parameters
  const { id } = validatePathParams(PathParamsSchema.id, params)();

  // Check if category exists
  const category = await prisma.skillCategory.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          skills: true,
        },
      },
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found", "CATEGORY_NOT_FOUND");
  }

  // Check if category has skills
  if (category._count?.skills > 0) {
    throw new ApiError(
      400,
      `Cannot delete category with ${category._count.skills} associated skills`,
      "CATEGORY_HAS_SKILLS"
    );
  }

  // Note: children relationship not supported in current schema

  // Delete category
  await prisma.skillCategory.delete({
    where: { id },
  });

  return apiResponse.success(
    {
      deletedCategory: {
        id: category.id,
        name: category.name,
        slug: category.slug,
      },
    },
    200,
    "Category deleted successfully"
  );
}
