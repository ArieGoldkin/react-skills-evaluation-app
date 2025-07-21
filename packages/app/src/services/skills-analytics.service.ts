/**
 * Skills Analytics Service
 *
 * Handles skill analytics, statistics, suggestions, and assessments
 */

import { apiClient } from "@/lib/api-client";
import type { Skill } from "./types";

export class SkillsAnalyticsService {
  /**
   * Get user's skill statistics
   */
  static async getSkillStats(): Promise<{
    total: number;
    verified: number;
    byCategory: Array<{
      category: string;
      count: number;
      avgProficiency: number;
    }>;
    bySource: Array<{ source: string; count: number }>;
    recentlyUpdated: Skill[];
  }> {
    return apiClient.get("/api/skills/stats");
  }

  /**
   * Get skill suggestions based on existing skills
   */
  static async getSkillSuggestions(limit: number = 10): Promise<{
    suggestions: Array<{
      name: string;
      category: string;
      reason: string;
      confidence: number;
    }>;
  }> {
    return apiClient.get(`/api/skills/suggestions?limit=${limit}`);
  }

  /**
   * Get skill assessment history
   */
  static async getSkillHistory(skillId: string): Promise<{
    history: Array<{
      id: string;
      proficiency: number;
      assessmentType: string;
      notes?: string;
      createdAt: string;
    }>;
  }> {
    return apiClient.get(`/api/skills/${skillId}/history`);
  }

  /**
   * Add skill assessment
   */
  static async addSkillAssessment(
    skillId: string,
    assessment: {
      proficiency: number;
      assessmentType: string;
      notes?: string;
    }
  ): Promise<{ message: string }> {
    return apiClient.post(`/api/skills/${skillId}/assessment`, assessment);
  }

  /**
   * Get skills by category with pagination
   */
  static async getSkillsByCategory(
    categoryId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{
    skills: Skill[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    return apiClient.get(
      `/api/skills/category/${categoryId}?page=${page}&limit=${limit}`
    );
  }
}
