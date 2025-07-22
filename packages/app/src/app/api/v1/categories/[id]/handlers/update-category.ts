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
import { z } from "zod";
import { getDescendantIds } from "../utils/category-helpers";

// Category update schema
const UpdateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim()
    .optional(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be less than 100 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    )
    .optional(),
  icon: z.string().max(50, "Icon must be less than 50 characters").optional(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Color must be a valid hex color")
    .optional(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  parentId: z.string().cuid().optional(),
  order: z.number().int().min(0).optional(),
});

// PUT /api/v1/categories/[id] - Update a category (admin only)
export async function handleUpdateCategory(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "categories-write", user.id);

  // Validate path parameters and request body
  const { id } = validatePathParams(PathParamsSchema.id, params)();
  const validatedData =
    await validateRequestBody(UpdateCategorySchema)(request);

  // Check if category exists
  const existingCategory = await prisma.skillCategory.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    throw new ApiError(404, "Category not found", "CATEGORY_NOT_FOUND");
  }

  // Check if slug is being updated and if it conflicts
  if (validatedData.slug && validatedData.slug !== existingCategory.slug) {
    const existingSlug = await prisma.skillCategory.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingSlug) {
      throw new ApiError(
        409,
        "Category with this slug already exists",
        "DUPLICATE_CATEGORY_SLUG"
      );
    }
  }

  // If parentId is being updated, verify parent exists and prevent circular references
  if (validatedData.parentId) {
    if (validatedData.parentId === id) {
      throw new ApiError(
        400,
        "Category cannot be its own parent",
        "CIRCULAR_REFERENCE"
      );
    }

    const parentCategory = await prisma.skillCategory.findUnique({
      where: { id: validatedData.parentId },
    });

    if (!parentCategory) {
      throw new ApiError(
        404,
        "Parent category not found",
        "PARENT_CATEGORY_NOT_FOUND"
      );
    }

    // Check for circular references by ensuring the parent is not a descendant
    const descendants = await getDescendantIds(id);
    if (descendants.includes(validatedData.parentId)) {
      throw new ApiError(
        400,
        "Cannot create circular reference in category hierarchy",
        "CIRCULAR_REFERENCE"
      );
    }
  }

  // Update category
  const updatedCategory = await prisma.skillCategory.update({
    where: { id },
    data: {
      ...(validatedData.name && { name: validatedData.name }),
      ...(validatedData.slug && { slug: validatedData.slug }),
      ...(validatedData.icon !== undefined && { icon: validatedData.icon }),
      ...(validatedData.color !== undefined && {
        color: validatedData.color,
      }),
      ...(validatedData.description !== undefined && {
        description: validatedData.description,
      }),
      ...(validatedData.parentId !== undefined && {
        parentId: validatedData.parentId,
      }),
      ...(validatedData.order !== undefined && {
        order: validatedData.order,
      }),
    },
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
    { category: updatedCategory },
    200,
    "Category updated successfully"
  );
}
