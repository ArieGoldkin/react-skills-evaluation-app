import { z } from "zod";

// Enums matching Prisma schema
export const SkillSourceEnum = z.enum([
  "MANUAL",
  "ASSESSMENT",
  "GITHUB",
  "AI_SUGGESTED",
  "IMPORTED",
]);

// Skill creation schema
export const CreateSkillSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  categoryId: z.string().cuid("Invalid category ID"),
  proficiency: z
    .number()
    .int("Proficiency must be an integer")
    .min(0, "Proficiency must be at least 0")
    .max(10, "Proficiency must be at most 10"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag cannot be empty")
        .max(50, "Tag must be less than 50 characters")
        .regex(
          /^[a-zA-Z0-9\-_\s]+$/,
          "Tag can only contain letters, numbers, hyphens, underscores, and spaces"
        )
    )
    .max(10, "Maximum 10 tags allowed")
    .optional()
    .default([])
    .transform(tags =>
      // Remove duplicates, trim, and normalize case
      [...new Set(tags.map(tag => tag.trim().toLowerCase()))].filter(
        tag => tag.length > 0
      )
    ),
  source: SkillSourceEnum.optional().default("MANUAL"),
  verified: z.boolean().optional().default(false),
});

// Skill update schema (all fields optional except proficiency constraints)
export const UpdateSkillSchema = CreateSkillSchema.partial().refine(
  data => {
    if (data.proficiency !== undefined) {
      return data.proficiency >= 0 && data.proficiency <= 10;
    }
    return true;
  },
  {
    message: "Proficiency must be between 0 and 10",
    path: ["proficiency"],
  }
);

// Query parameters schema for skills
export const SkillsQuerySchema = z.object({
  categoryId: z.string().cuid().optional(),
  search: z.string().min(1).max(100).optional(),
  sortBy: z
    .enum(["name", "proficiency", "createdAt", "updatedAt"])
    .optional()
    .default("name"),
  order: z.enum(["asc", "desc"]).optional().default("asc"),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  source: SkillSourceEnum.optional(),
  verified: z.coerce.boolean().optional(),
  minProficiency: z.coerce.number().int().min(0).max(10).optional(),
  maxProficiency: z.coerce.number().int().min(0).max(10).optional(),
});

// Skill history creation schema
export const CreateSkillHistorySchema = z.object({
  proficiency: z.number().int().min(0).max(10),
  reason: z.string().max(200).optional(),
  source: SkillSourceEnum,
});

// Bulk skills update schema
export const BulkUpdateSkillsSchema = z.object({
  skills: z
    .array(
      z.object({
        id: z.string().cuid(),
        proficiency: z.number().int().min(0).max(10).optional(),
        description: z.string().max(500).optional(),
        tags: z.array(z.string().min(1)).max(10).optional(),
        verified: z.boolean().optional(),
      })
    )
    .min(1)
    .max(50, "Maximum 50 skills can be updated at once"),
});

// Form schema for UI (simplified)
export const skillSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  proficiency: z.number().min(1).max(10),
  yearsOfExperience: z.number().optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

// Export types for use in components and services
export type CreateSkillData = z.infer<typeof CreateSkillSchema>;
export type UpdateSkillData = z.infer<typeof UpdateSkillSchema>;
export type SkillsQuery = z.infer<typeof SkillsQuerySchema>;
export type CreateSkillHistoryData = z.infer<typeof CreateSkillHistorySchema>;
export type BulkUpdateSkillsData = z.infer<typeof BulkUpdateSkillsSchema>;
export type SkillSource = z.infer<typeof SkillSourceEnum>;
export type SkillFormData = z.infer<typeof skillSchema>;
