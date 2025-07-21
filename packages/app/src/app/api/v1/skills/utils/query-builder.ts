import { SkillsQuery } from "@/lib/validations/skills";

/**
 * Builds database query filters for skills
 */
export function buildSkillsQuery(
  userId: string,
  queryParams: SkillsQuery
): Record<string, unknown> {
  const where: Record<string, unknown> = { userId };

  if (queryParams.categoryId) {
    where.categoryId = queryParams.categoryId;
  }

  if (queryParams.search) {
    where.OR = [
      { name: { contains: queryParams.search, mode: "insensitive" } },
      { description: { contains: queryParams.search, mode: "insensitive" } },
    ];
  }

  if (queryParams.source) {
    where.source = queryParams.source;
  }

  if (queryParams.verified !== undefined) {
    where.verified = queryParams.verified;
  }

  if (
    queryParams.minProficiency !== undefined ||
    queryParams.maxProficiency !== undefined
  ) {
    const proficiencyFilter: Record<string, number> = {};
    if (queryParams.minProficiency !== undefined) {
      proficiencyFilter.gte = queryParams.minProficiency;
    }
    if (queryParams.maxProficiency !== undefined) {
      proficiencyFilter.lte = queryParams.maxProficiency;
    }
    where.proficiency = proficiencyFilter;
  }

  return where;
}
