/**
 * Skills Service
 *
 * Handles core skill CRUD operations and search functionality
 */

import { apiClient } from "@/lib/api-client";
import type {
  SkillsResponse,
  SkillResponse,
  CreateSkillData,
  UpdateSkillData,
  SkillsFilters,
} from "./types";

export class SkillsService {
  /**
   * Get skills with optional filtering
   */
  static async getSkills(filters: SkillsFilters = {}): Promise<SkillsResponse> {
    const params = new URLSearchParams();

    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    if (filters.search) params.set("search", filters.search);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    if (filters.order) params.set("order", filters.order);

    const queryString = params.toString();
    const endpoint = queryString ? `/api/skills?${queryString}` : "/api/skills";

    return apiClient.get<SkillsResponse>(endpoint);
  }

  /**
   * Get a single skill by ID
   */
  static async getSkill(id: string): Promise<SkillResponse> {
    return apiClient.get<SkillResponse>(`/api/skills/${id}`);
  }

  /**
   * Create a new skill
   */
  static async createSkill(data: CreateSkillData): Promise<SkillResponse> {
    return apiClient.post<SkillResponse>("/api/skills", data);
  }

  /**
   * Update an existing skill
   */
  static async updateSkill(
    id: string,
    data: UpdateSkillData
  ): Promise<SkillResponse> {
    return apiClient.put<SkillResponse>(`/api/skills/${id}`, data);
  }

  /**
   * Delete a skill
   */
  static async deleteSkill(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/api/skills/${id}`);
  }

  /**
   * Search skills across name, description, and tags
   */
  static async searchSkills(
    query: string,
    filters?: Omit<SkillsFilters, "search">
  ): Promise<SkillsResponse> {
    const params = new URLSearchParams({ search: query });

    if (filters?.categoryId) params.set("categoryId", filters.categoryId);
    if (filters?.sortBy) params.set("sortBy", filters.sortBy);
    if (filters?.order) params.set("order", filters.order);

    return apiClient.get<SkillsResponse>(
      `/api/skills/search?${params.toString()}`
    );
  }
}

export default SkillsService;
