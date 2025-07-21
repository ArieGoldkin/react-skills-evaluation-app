/**
 * Centralized API Client
 *
 * Main entry point for the API client with default instance
 */

import { ApiClient } from "./api-client-core";

// Re-export all types and classes
export type { ApiClientConfig, RequestOptions } from "./api-client-config";
export { ApiClient } from "./api-client-core";
export { ApiClientError } from "./api-client-errors";
export type { ApiError } from "./api-client-errors";

// Create default API client instance
export const apiClient = new ApiClient({
  baseUrl: "", // Use relative URLs for Next.js API routes
});
