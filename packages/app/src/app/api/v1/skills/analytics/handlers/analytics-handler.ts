import { NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import { apiResponse } from "@/lib/api-response";
import { getUserFromAuth } from "../utils/user-helpers";
import {
  fetchBasicStats,
  fetchDistributionStats,
  fetchProgressTrends,
  fetchHighlightSkills,
} from "../utils/analytics-queries";

// GET /api/v1/skills/analytics - Get comprehensive skills analytics
export async function handleGetSkillsAnalytics(request: NextRequest) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "skills-read", user.id);

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Get comprehensive analytics data in parallel
  const [
    { totalSkills, averageProficiency, verifiedStats },
    { categoryDistribution, proficiencyDistribution, sourceDistribution },
    { recentActivity, progressTrends },
    { topSkills, improvingSkills, needsAttentionSkills },
  ] = await Promise.all([
    fetchBasicStats(dbUser.id),
    fetchDistributionStats(dbUser.id),
    fetchProgressTrends(dbUser.id),
    fetchHighlightSkills(dbUser.id),
  ]);

  // Format response
  const analytics = {
    overview: {
      totalSkills,
      averageProficiency: averageProficiency._avg.proficiency || 0,
      verified: verifiedStats.find(v => v.verified)?._count || 0,
      unverified: verifiedStats.find(v => !v.verified)?._count || 0,
    },
    distributions: {
      byCategory: categoryDistribution.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        color: cat.color,
        count: cat._count.skills,
      })),
      byProficiency: proficiencyDistribution.map((p: any) => ({
        level: p.proficiency,
        count: p.count,
      })),
      bySource: sourceDistribution.map((s: any) => ({
        source: s.source,
        count: s.count,
      })),
    },
    trends: {
      monthly: progressTrends.map(trend => ({
        month: trend.month,
        averageProficiency: parseFloat(trend.avg_proficiency.toString()),
        activitiesCount: trend.count,
      })),
      recentActivity: recentActivity.map(activity => ({
        id: activity.id,
        proficiency: activity.proficiency,
        reason: activity.reason,
        source: activity.source,
        createdAt: activity.createdAt,
        skill: activity.skill,
      })),
    },
    highlights: {
      topSkills: topSkills.map(skill => ({
        id: skill.id,
        name: skill.name,
        proficiency: skill.proficiency,
        category: skill.category,
      })),
      improving: improvingSkills.map(skill => ({
        id: skill.skill_id,
        name: skill.skill_name,
        currentProficiency: skill.current_proficiency,
        previousProficiency: skill.previous_proficiency,
        improvement: skill.improvement,
        category: {
          name: skill.category_name,
          icon: skill.category_icon,
          color: skill.category_color,
        },
      })),
      needsAttention: needsAttentionSkills.map(skill => ({
        id: skill.id,
        name: skill.name,
        proficiency: skill.proficiency,
        lastAssessed: skill.lastAssessed,
        category: skill.category,
      })),
    },
  };

  const response = apiResponse.success(
    { analytics },
    200,
    "Skills analytics retrieved successfully"
  );

  // Cache analytics for 5 minutes
  response.headers.set("Cache-Control", "private, max-age=300");

  return response;
}
