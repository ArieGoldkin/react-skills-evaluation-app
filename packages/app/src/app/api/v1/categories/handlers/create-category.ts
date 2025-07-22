import { apiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import { validateRequestBody } from "@/lib/middleware/validation";
import { NextRequest } from "next/server";
import {
  CreateCategorySchema,
  validateParentCategory,
  validateSlugUniqueness,
} from "../utils/categories-helpers";

// POST /api/v1/categories - Create a new category (admin only)
export async function handleCreateCategory(request: NextRequest) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "categories-write", user.id);

  // Check if user is admin (for now, we'll allow any authenticated user)
  // In production, you'd want to check user roles here

  // Validate request body
  const validatedData =
    await validateRequestBody(CreateCategorySchema)(request);

  // Check if slug already exists
  await validateSlugUniqueness(validatedData.slug);

  // If parentId is provided, verify parent exists
  if (validatedData.parentId) {
    await validateParentCategory(validatedData.parentId);
  }

  // Create category
  const category = await prisma.skillCategory.create({
    data: {
      name: validatedData.name,
      slug: validatedData.slug,
      icon: validatedData.icon ?? undefined,
      color: validatedData.color ?? undefined,
      description: validatedData.description ?? undefined,
      // parentId field removed - not in schema
      order: validatedData.order,
    } as any,
    include: {
      // parent relation removed - not in schema
      _count: {
        select: {
          skills: true,
        },
      },
    },
  });

  return apiResponse.success(
    { category },
    201,
    "Category created successfully"
  );
}
