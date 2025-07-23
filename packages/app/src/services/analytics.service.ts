import { apiClient } from "@/lib/api-client";

export interface AnalyticsOverview {
  totalSkills: number;
  averageProficiency: number;
  verified: number;
  unverified: number;
}

export interface CategoryDistribution {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  count: number;
}

export interface ProficiencyDistribution {
  level: number;
  count: number;
}

export interface SourceDistribution {
  source: string;
  count: number;
}

export interface TrendData {
  month: string;
  averageProficiency: number;
  activitiesCount: number;
}

export interface RecentActivity {
  id: string;
  proficiency: number;
  reason: string;
  source: string;
  createdAt: string;
  skill: {
    id: string;
    name: string;
    categoryId: string;
  };
}

export interface TopSkill {
  id: string;
  name: string;
  proficiency: number;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
}

export interface ImprovingSkill {
  id: string;
  name: string;
  currentProficiency: number;
  previousProficiency: number;
  improvement: number;
  category: {
    name: string;
    icon: string;
    color: string;
  };
}

export interface NeedsAttentionSkill {
  id: string;
  name: string;
  proficiency: number;
  lastAssessed: string;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  distributions: {
    byCategory: CategoryDistribution[];
    byProficiency: ProficiencyDistribution[];
    bySource: SourceDistribution[];
  };
  trends: {
    monthly: TrendData[];
    recentActivity: RecentActivity[];
  };
  highlights: {
    topSkills: TopSkill[];
    improving: ImprovingSkill[];
    needsAttention: NeedsAttentionSkill[];
  };
}

export class AnalyticsService {
  /**
   * Get comprehensive analytics data
   */
  static async getAnalytics(): Promise<AnalyticsData> {
    const response = await apiClient.get<{ analytics: AnalyticsData }>(
      "/v1/skills/analytics"
    );
    return response.analytics;
  }
}
