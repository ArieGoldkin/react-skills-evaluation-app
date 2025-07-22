import { z } from "zod";

export const AssessmentsQuerySchema = z.object({
  skillId: z.string().cuid().optional(),
  type: z
    .enum(["SELF_ASSESSMENT", "PEER_REVIEW", "AUTOMATED", "CERTIFICATION"])
    .optional(),
  sortBy: z
    .enum(["createdAt", "completedAt", "score", "proficiency"])
    .optional()
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export function buildWhereClause(
  userId: string,
  queryParams: z.infer<typeof AssessmentsQuerySchema>
) {
  const where: any = { userId };

  if (queryParams.skillId) {
    where.skillId = queryParams.skillId;
  }

  if (queryParams.type) {
    where.type = queryParams.type;
  }

  if (queryParams.fromDate || queryParams.toDate) {
    where.createdAt = {};
    if (queryParams.fromDate) {
      where.createdAt.gte = new Date(queryParams.fromDate);
    }
    if (queryParams.toDate) {
      where.createdAt.lte = new Date(queryParams.toDate);
    }
  }

  return where;
}
