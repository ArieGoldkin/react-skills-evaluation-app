import { z } from "zod";

// Color validation for hex colors
const HexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Skill category creation schema
export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(50, "Slug must be less than 50 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only"
    ),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional(),
  icon: z.string().max(50, "Icon must be less than 50 characters").optional(),
  color: z
    .string()
    .regex(HexColorRegex, "Color must be a valid hex color (e.g., #FF5733)")
    .optional(),
  order: z
    .number()
    .int()
    .min(0, "Order must be a non-negative integer")
    .optional()
    .default(0),
});

// Category update schema (all fields optional)
export const UpdateCategorySchema = CreateCategorySchema.partial();

// Query parameters schema for categories
export const CategoriesQuerySchema = z.object({
  search: z.string().min(1).max(100).optional(),
  sortBy: z
    .enum(["name", "order", "createdAt", "updatedAt"])
    .optional()
    .default("order"),
  order: z.enum(["asc", "desc"]).optional().default("asc"),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

// Category with skills count schema for responses
export const CategoryWithStatsSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  color: z.string().nullable(),
  order: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    skills: z.number().int(),
  }),
});

// Bulk category reorder schema
export const ReorderCategoriesSchema = z.object({
  categories: z
    .array(
      z.object({
        id: z.string().cuid(),
        order: z.number().int().min(0),
      })
    )
    .min(1)
    .max(100, "Maximum 100 categories can be reordered at once"),
});

// Export types for use in components and services
export type CreateCategoryData = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryData = z.infer<typeof UpdateCategorySchema>;
export type CategoriesQuery = z.infer<typeof CategoriesQuerySchema>;
export type CategoryWithStats = z.infer<typeof CategoryWithStatsSchema>;
export type ReorderCategoriesData = z.infer<typeof ReorderCategoriesSchema>;
