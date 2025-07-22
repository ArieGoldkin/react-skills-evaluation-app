import { prisma } from "@/lib/db";

// Fetch basic statistics (counts and averages)
export async function fetchBasicStats(userId: string) {
  const [totalSkills, averageProficiency, verifiedStats] = await Promise.all([
    // Total skills count
    prisma.skill.count({
      where: { userId },
    }),

    // Average proficiency
    prisma.skill.aggregate({
      where: { userId },
      _avg: { proficiency: true },
    }),

    // Verified vs unverified
    prisma.skill.groupBy({
      by: ["verified"],
      where: { userId },
      _count: true,
    }),
  ]);

  return { totalSkills, averageProficiency, verifiedStats };
}

// Fetch distribution statistics (by category, proficiency, source)
export async function fetchDistributionStats(userId: string) {
  const [categoryDistribution, proficiencyDistribution, sourceDistribution] =
    await Promise.all([
      // Skills by category
      prisma.skillCategory.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          icon: true,
          color: true,
          _count: {
            select: {
              skills: {
                where: { userId },
              },
            },
          },
        },
        where: {
          skills: {
            some: { userId },
          },
        },
        orderBy: {
          skills: {
            _count: "desc",
          },
        },
      }),

      // Skills by proficiency level
      prisma.$queryRaw<Array<{ proficiency: number; count: number }>>`
        SELECT proficiency, COUNT(*)::int as count
        FROM "Skill"
        WHERE "userId" = ${userId}
        GROUP BY proficiency
        ORDER BY proficiency ASC
      `,

      // Skills by source
      prisma.$queryRaw<Array<{ source: string; count: number }>>`
        SELECT source, COUNT(*)::int as count
        FROM "Skill"
        WHERE "userId" = ${userId}
        GROUP BY source
        ORDER BY count DESC
      `,
    ]);

  return { categoryDistribution, proficiencyDistribution, sourceDistribution };
}

// Fetch progress trends and recent activity
export async function fetchProgressTrends(userId: string) {
  const [recentActivity, progressTrends] = await Promise.all([
    // Recent activity (last 30 days)
    prisma.skillHistory.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      select: {
        id: true,
        proficiency: true,
        reason: true,
        source: true,
        createdAt: true,
        skill: {
          select: {
            id: true,
            name: true,
            category: {
              select: { name: true, icon: true, color: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),

    // Progress trends (monthly averages for last 6 months)
    prisma.$queryRaw<
      Array<{ month: string; avg_proficiency: number; count: number }>
    >`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') as month,
        AVG(proficiency)::numeric(4,2) as avg_proficiency,
        COUNT(*)::int as count
      FROM "SkillHistory"
      WHERE "userId" = ${userId}
        AND "createdAt" >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month ASC
    `,
  ]);

  return { recentActivity, progressTrends };
}

// Fetch highlight skills (top, improving, needs attention)
export async function fetchHighlightSkills(userId: string) {
  const [topSkills, improvingSkills, needsAttentionSkills] = await Promise.all([
    // Top skills (highest proficiency)
    prisma.skill.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        proficiency: true,
        category: {
          select: { name: true, icon: true, color: true },
        },
      },
      orderBy: [{ proficiency: "desc" }, { name: "asc" }],
      take: 10,
    }),

    // Improving skills (positive trend in last 3 months)
    prisma.$queryRaw<
      Array<{
        skill_id: string;
        skill_name: string;
        category_name: string;
        category_icon: string;
        category_color: string;
        current_proficiency: number;
        previous_proficiency: number;
        improvement: number;
      }>
    >`
        WITH recent_skills AS (
          SELECT DISTINCT ON (skill_id)
            skill_id,
            proficiency as current_proficiency
          FROM "SkillHistory"
          WHERE "userId" = ${userId}
            AND "createdAt" >= NOW() - INTERVAL '3 months'
          ORDER BY skill_id, "createdAt" DESC
        ),
        older_skills AS (
          SELECT DISTINCT ON (skill_id)
            skill_id,
            proficiency as previous_proficiency
          FROM "SkillHistory"
          WHERE "userId" = ${userId}
            AND "createdAt" < NOW() - INTERVAL '3 months'
          ORDER BY skill_id, "createdAt" DESC
        )
        SELECT 
          s.id as skill_id,
          s.name as skill_name,
          c.name as category_name,
          c.icon as category_icon,
          c.color as category_color,
          rs.current_proficiency,
          COALESCE(os.previous_proficiency, 0) as previous_proficiency,
          (rs.current_proficiency - COALESCE(os.previous_proficiency, 0)) as improvement
        FROM recent_skills rs
        JOIN "Skill" s ON s.id = rs.skill_id
        JOIN "Category" c ON c.id = s."categoryId"
        LEFT JOIN older_skills os ON os.skill_id = rs.skill_id
        WHERE rs.current_proficiency > COALESCE(os.previous_proficiency, 0)
        ORDER BY improvement DESC
        LIMIT 5
      `,

    // Skills needing attention (low proficiency or declining)
    prisma.skill.findMany({
      where: {
        userId,
        proficiency: { lte: 3 },
      },
      select: {
        id: true,
        name: true,
        proficiency: true,
        lastAssessed: true,
        category: {
          select: { name: true, icon: true, color: true },
        },
      },
      orderBy: [{ proficiency: "asc" }, { lastAssessed: "asc" }],
      take: 5,
    }),
  ]);

  return { topSkills, improvingSkills, needsAttentionSkills };
}
