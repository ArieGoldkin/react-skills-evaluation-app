import { z } from "zod";
import { ApiError } from "@/lib/errors/types";
import { prisma } from "@/lib/db";

// Category schemas
export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be less than 100 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
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
  order: z.number().int().min(0).optional().default(0),
});

export const CategoriesQuerySchema = z.object({
  includeHierarchy: z.coerce.boolean().optional().default(false),
  includeSkillsCount: z.coerce.boolean().optional().default(true),
  parentId: z.string().cuid().optional(),
  userId: z.string().cuid().optional(), // For user-specific skill counts
});

// Build where clause for category queries
export function buildWhereClause(
  queryParams: z.infer<typeof CategoriesQuerySchema>
) {
  const where: any = {};
  if (queryParams.parentId !== undefined) {
    where.parentId = queryParams.parentId;
  }
  return where;
}

// Validate slug uniqueness
export async function validateSlugUniqueness(slug: string) {
  const existingCategory = await prisma.skillCategory.findUnique({
    where: { slug },
  });

  if (existingCategory) {
    throw new ApiError(
      409,
      "Category with this slug already exists",
      "DUPLICATE_CATEGORY_SLUG"
    );
  }
}

// Validate parent category exists
export async function validateParentCategory(parentId: string) {
  const parentCategory = await prisma.skillCategory.findUnique({
    where: { id: parentId },
  });

  if (!parentCategory) {
    throw new ApiError(
      404,
      "Parent category not found",
      "PARENT_CATEGORY_NOT_FOUND"
    );
  }

  return parentCategory;
}

// Fetch hierarchical categories
export async function fetchHierarchicalCategories(
  where: any,
  includeSkillsCount: boolean,
  userId?: string
) {
  return await prisma.skillCategory.findMany({
    where,
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      // parent/children relations not supported in current schema
      _count: includeSkillsCount
        ? {
            select: {
              skills: userId ? { where: { userId } } : true,
            },
          }
        : undefined,
    } as any,
  });
}

// Fetch flat categories
export async function fetchFlatCategories(
  where: any,
  includeSkillsCount: boolean,
  userId?: string
) {
  return await prisma.skillCategory.findMany({
    where,
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      // parent/children relations not supported in current schema
      _count: includeSkillsCount
        ? {
            select: {
              skills: userId ? { where: { userId } } : true,
            },
          }
        : undefined,
    } as any,
  });
}
