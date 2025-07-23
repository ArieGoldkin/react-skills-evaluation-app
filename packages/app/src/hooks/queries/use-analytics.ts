import { useQuery } from "@tanstack/react-query";
import { AnalyticsService } from "@/services";
import type { AnalyticsData } from "@/services/analytics.service";

// Query keys
export const analyticsKeys = {
  all: ["analytics"] as const,
  dashboard: () => [...analyticsKeys.all, "dashboard"] as const,
};

/**
 * Hook to fetch analytics data
 */
export const useAnalytics = () => {
  return useQuery<AnalyticsData>({
    queryKey: analyticsKeys.dashboard(),
    queryFn: () => AnalyticsService.getAnalytics(),
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};
