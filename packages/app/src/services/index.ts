/**
 * Services Index
 *
 * Centralized export for all API services
 */

export { AuthService } from "./auth.service";
export { CategoriesService } from "./categories.service";
export { SkillsService } from "./skills.service";
export { SkillsBulkService } from "./skills-bulk.service";
export { SkillsAnalyticsService } from "./skills-analytics.service";

// Export types
export * from "./types";

// Re-export API client for direct use if needed
export { apiClient, ApiClientError } from "@/lib/api-client";
export type { ApiError, RequestOptions } from "@/lib/api-client";
