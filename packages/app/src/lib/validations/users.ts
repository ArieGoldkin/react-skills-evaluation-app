import { z } from "zod";

// User profile update schema
export const UpdateUserProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim()
    .optional(),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .optional(),
  image: z
    .string()
    .url("Invalid image URL")
    .max(500, "Image URL must be less than 500 characters")
    .optional(),
});

// User registration schema (for email/password auth)
export const UserRegistrationSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .max(255, "Email must be less than 255 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      ),
    confirmPassword: z.string(),
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name must be less than 100 characters")
      .trim(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// User login schema
export const UserLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// User query schema for admin/listing purposes
export const UsersQuerySchema = z.object({
  search: z.string().min(1).max(100).optional(),
  provider: z.enum(["google", "github", "email"]).optional(),
  sortBy: z
    .enum(["name", "email", "createdAt", "updatedAt"])
    .optional()
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  verified: z.coerce.boolean().optional(),
});

// Password reset request schema
export const PasswordResetRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Password reset schema
export const PasswordResetSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// User stats response schema
export const UserStatsSchema = z.object({
  totalSkills: z.number().int(),
  averageProficiency: z.number(),
  skillsByCategory: z.array(
    z.object({
      categoryId: z.string(),
      categoryName: z.string(),
      count: z.number().int(),
      averageProficiency: z.number(),
    })
  ),
  recentAssessments: z.number().int(),
  verifiedSkills: z.number().int(),
});

// Export types for use in components and services
export type UpdateUserProfileData = z.infer<typeof UpdateUserProfileSchema>;
export type UserRegistrationData = z.infer<typeof UserRegistrationSchema>;
export type UserLoginData = z.infer<typeof UserLoginSchema>;
export type UsersQuery = z.infer<typeof UsersQuerySchema>;
export type PasswordResetRequestData = z.infer<
  typeof PasswordResetRequestSchema
>;
export type PasswordResetData = z.infer<typeof PasswordResetSchema>;
export type UserStats = z.infer<typeof UserStatsSchema>;
