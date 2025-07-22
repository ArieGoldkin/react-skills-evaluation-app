/**
 * Categories Service
 *
 * Handles all skill category-related API calls
 */

import { apiClient } from "@/lib/api-client";
import type { CategoriesResponse, SkillCategory } from "./types";

export class CategoriesService {
  /**
   * Get all skill categories
   */
  static async getCategories(): Promise<CategoriesResponse> {
    const response = await apiClient.get<{
      success: boolean;
      data: CategoriesResponse;
      message: string;
      timestamp: string;
    }>("/api/categories");
    return response.data;
  }

  /**
   * Get a single category by ID
   */
  static async getCategory(id: string): Promise<{ category: SkillCategory }> {
    return apiClient.get<{ category: SkillCategory }>(`/api/categories/${id}`);
  }

  /**
   * Get a category by slug
   */
  static async getCategoryBySlug(
    slug: string
  ): Promise<{ category: SkillCategory }> {
    return apiClient.get<{ category: SkillCategory }>(
      `/api/categories/slug/${slug}`
    );
  }

  /**
   * Create a new category
   * Note: This might be admin-only functionality
   */
  static async createCategory(data: {
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    color?: string;
    order?: number;
  }): Promise<{ category: SkillCategory }> {
    return apiClient.post<{ category: SkillCategory }>("/api/categories", data);
  }

  /**
   * Update an existing category
   * Note: This might be admin-only functionality
   */
  static async updateCategory(
    id: string,
    data: Partial<{
      name: string;
      slug: string;
      description?: string;
      icon?: string;
      color?: string;
      order?: number;
    }>
  ): Promise<{ category: SkillCategory }> {
    return apiClient.put<{ category: SkillCategory }>(
      `/api/categories/${id}`,
      data
    );
  }

  /**
   * Delete a category
   * Note: This might be admin-only functionality
   */
  static async deleteCategory(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/api/categories/${id}`);
  }

  /**
   * Reorder categories
   * Note: This might be admin-only functionality
   */
  static async reorderCategories(
    categoryOrders: Array<{ id: string; order: number }>
  ): Promise<{ message: string }> {
    return apiClient.put<{ message: string }>("/api/categories/reorder", {
      categories: categoryOrders,
    });
  }

  /**
   * Get categories with skill counts
   */
  static async getCategoriesWithStats(): Promise<CategoriesResponse> {
    return apiClient.get<CategoriesResponse>(
      "/api/categories?includeStats=true"
    );
  }

  /**
   * Search categories by name or description
   */
  static async searchCategories(query: string): Promise<CategoriesResponse> {
    const params = new URLSearchParams({ q: query });
    return apiClient.get<CategoriesResponse>(
      `/api/categories/search?${params.toString()}`
    );
  }
}

export default CategoriesService;
