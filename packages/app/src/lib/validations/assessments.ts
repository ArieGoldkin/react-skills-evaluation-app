import { z } from "zod";

// Assessment type enum
export const AssessmentTypeEnum = z.enum([
  "SELF_ASSESSMENT",
  "PEER_REVIEW",
  "AUTOMATED",
  "CERTIFICATION",
]);

// Assessment creation schema
export const CreateAssessmentSchema = z.object({
  skillId: z.string().cuid("Invalid skill ID"),
  type: AssessmentTypeEnum,
  score: z
    .number()
    .min(0, "Score must be at least 0")
    .max(100, "Score must be at most 100")
    .optional(),
  proficiency: z
    .number()
    .int("Proficiency must be an integer")
    .min(0, "Proficiency must be at least 0")
    .max(10, "Proficiency must be at most 10"),
  feedback: z
    .string()
    .max(1000, "Feedback must be less than 1000 characters")
    .optional(),
  assessorId: z.string().cuid("Invalid assessor ID").optional(),
  metadata: z
    .record(z.string(), z.any())
    .optional()
    .describe("Additional metadata for the assessment"),
});

// Assessment update schema
export const UpdateAssessmentSchema = z.object({
  score: z
    .number()
    .min(0, "Score must be at least 0")
    .max(100, "Score must be at most 100")
    .optional(),
  proficiency: z
    .number()
    .int("Proficiency must be an integer")
    .min(0, "Proficiency must be at least 0")
    .max(10, "Proficiency must be at most 10")
    .optional(),
  feedback: z
    .string()
    .max(1000, "Feedback must be less than 1000 characters")
    .optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Assessment query parameters schema
export const AssessmentsQuerySchema = z.object({
  skillId: z.string().cuid().optional(),
  type: AssessmentTypeEnum.optional(),
  assessorId: z.string().cuid().optional(),
  sortBy: z
    .enum(["createdAt", "completedAt", "score", "proficiency", "type"])
    .optional()
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  minScore: z.coerce.number().min(0).max(100).optional(),
  maxScore: z.coerce.number().min(0).max(100).optional(),
  minProficiency: z.coerce.number().int().min(0).max(10).optional(),
  maxProficiency: z.coerce.number().int().min(0).max(10).optional(),
});

// Bulk assessment creation schema
export const BulkCreateAssessmentsSchema = z.object({
  assessments: z
    .array(
      CreateAssessmentSchema.omit({ assessorId: true }).extend({
        skillId: z.string().cuid(),
      })
    )
    .min(1, "At least one assessment is required")
    .max(50, "Maximum 50 assessments can be created at once"),
});

// Assessment statistics query schema
export const AssessmentStatsQuerySchema = z.object({
  skillId: z.string().cuid().optional(),
  type: AssessmentTypeEnum.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  groupBy: z
    .enum(["type", "skill", "month", "week"])
    .optional()
    .default("type"),
});

// Self-assessment wizard schema
export const SelfAssessmentWizardSchema = z.object({
  assessments: z
    .array(
      z.object({
        skillId: z.string().cuid(),
        proficiency: z.number().int().min(0).max(10),
        confidence: z
          .number()
          .int()
          .min(1, "Confidence must be at least 1")
          .max(5, "Confidence must be at most 5"),
        notes: z.string().max(500).optional(),
        wantToImprove: z.boolean().default(false),
        priority: z
          .enum(["LOW", "MEDIUM", "HIGH"])
          .optional()
          .default("MEDIUM"),
      })
    )
    .min(1, "At least one skill assessment is required")
    .max(100, "Maximum 100 skills can be assessed at once"),
  overallReflection: z
    .string()
    .max(1000, "Overall reflection must be less than 1000 characters")
    .optional(),
  goals: z
    .array(z.string().max(200))
    .max(10, "Maximum 10 goals allowed")
    .optional(),
});

// Peer review request schema
export const PeerReviewRequestSchema = z.object({
  skillId: z.string().cuid(),
  reviewerEmail: z.string().email("Invalid email address"),
  message: z
    .string()
    .max(500, "Message must be less than 500 characters")
    .optional(),
  deadline: z.string().datetime().optional(),
  allowAnonymous: z.boolean().default(false),
});

// Assessment export schema
export const AssessmentExportSchema = z.object({
  format: z.enum(["JSON", "CSV", "PDF"]).default("JSON"),
  skillIds: z.array(z.string().cuid()).optional(),
  types: z.array(AssessmentTypeEnum).optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  includeMetadata: z.boolean().default(false),
  includeFeedback: z.boolean().default(true),
});

// Progress tracking schema
export const ProgressTrackingSchema = z.object({
  skillId: z.string().cuid(),
  targetProficiency: z.number().int().min(0).max(10),
  targetDate: z.string().datetime(),
  milestones: z
    .array(
      z.object({
        proficiency: z.number().int().min(0).max(10),
        targetDate: z.string().datetime(),
        description: z.string().max(200),
      })
    )
    .max(10, "Maximum 10 milestones allowed")
    .optional(),
  notes: z.string().max(1000).optional(),
});

// Export types for use in components and services
export type CreateAssessmentData = z.infer<typeof CreateAssessmentSchema>;
export type UpdateAssessmentData = z.infer<typeof UpdateAssessmentSchema>;
export type AssessmentsQuery = z.infer<typeof AssessmentsQuerySchema>;
export type BulkCreateAssessmentsData = z.infer<
  typeof BulkCreateAssessmentsSchema
>;
export type AssessmentStatsQuery = z.infer<typeof AssessmentStatsQuerySchema>;
export type SelfAssessmentWizardData = z.infer<
  typeof SelfAssessmentWizardSchema
>;
export type PeerReviewRequestData = z.infer<typeof PeerReviewRequestSchema>;
export type AssessmentExportData = z.infer<typeof AssessmentExportSchema>;
export type ProgressTrackingData = z.infer<typeof ProgressTrackingSchema>;
export type AssessmentType = z.infer<typeof AssessmentTypeEnum>;
