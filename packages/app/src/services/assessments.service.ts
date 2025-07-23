/**
 * Assessments Service
 *
 * Handles all assessment-related API operations including CRUD,
 * self-assessment wizard, stats, and bulk operations
 */

import { apiClient } from "@/lib/api-client";
import type {
  AssessmentsResponse,
  AssessmentResponse,
  CreateAssessmentData,
  UpdateAssessmentData,
  AssessmentsFilters,
  SelfAssessmentWizardData,
  AssessmentStatsResponse,
} from "./types";

export class AssessmentsService {
  /**
   * Get assessments with optional filtering
   */
  static async getAssessments(
    filters: AssessmentsFilters = {}
  ): Promise<AssessmentsResponse> {
    const params = new URLSearchParams();

    if (filters.skillId) params.set("skillId", filters.skillId);
    if (filters.type) params.set("type", filters.type);
    if (filters.assessorId) params.set("assessorId", filters.assessorId);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    if (filters.order) params.set("order", filters.order);
    if (filters.limit) params.set("limit", filters.limit.toString());
    if (filters.offset) params.set("offset", filters.offset.toString());
    if (filters.fromDate) params.set("fromDate", filters.fromDate);
    if (filters.toDate) params.set("toDate", filters.toDate);
    if (filters.minScore !== undefined)
      params.set("minScore", filters.minScore.toString());
    if (filters.maxScore !== undefined)
      params.set("maxScore", filters.maxScore.toString());
    if (filters.minProficiency !== undefined)
      params.set("minProficiency", filters.minProficiency.toString());
    if (filters.maxProficiency !== undefined)
      params.set("maxProficiency", filters.maxProficiency.toString());

    const queryString = params.toString();
    const endpoint = queryString
      ? `/api/v1/assessments?${queryString}`
      : "/api/v1/assessments";

    return apiClient.get<AssessmentsResponse>(endpoint);
  }

  /**
   * Get assessments for a specific skill
   */
  static async getSkillAssessments(
    skillId: string,
    filters?: Omit<AssessmentsFilters, "skillId">
  ): Promise<AssessmentsResponse> {
    return this.getAssessments({ ...filters, skillId });
  }

  /**
   * Get a single assessment by ID
   */
  static async getAssessment(id: string): Promise<AssessmentResponse> {
    return apiClient.get<AssessmentResponse>(`/api/v1/assessments/${id}`);
  }

  /**
   * Create a new assessment
   */
  static async createAssessment(
    data: CreateAssessmentData
  ): Promise<AssessmentResponse> {
    return apiClient.post<AssessmentResponse>("/api/v1/assessments", data);
  }

  /**
   * Update an existing assessment
   */
  static async updateAssessment(
    id: string,
    data: UpdateAssessmentData
  ): Promise<AssessmentResponse> {
    return apiClient.put<AssessmentResponse>(`/api/v1/assessments/${id}`, data);
  }

  /**
   * Delete an assessment
   */
  static async deleteAssessment(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/api/v1/assessments/${id}`);
  }

  /**
   * Submit self-assessment wizard data
   */
  static async submitSelfAssessmentWizard(
    data: SelfAssessmentWizardData
  ): Promise<{ message: string; assessments: number }> {
    return apiClient.post<{ message: string; assessments: number }>(
      "/api/v1/assessments/wizard/self-assessment",
      data
    );
  }

  /**
   * Get assessment statistics
   */
  static async getAssessmentStats(filters?: {
    skillId?: string;
    type?: string;
    fromDate?: string;
    toDate?: string;
    groupBy?: "type" | "skill" | "month" | "week";
  }): Promise<AssessmentStatsResponse> {
    const params = new URLSearchParams();

    if (filters?.skillId) params.set("skillId", filters.skillId);
    if (filters?.type) params.set("type", filters.type);
    if (filters?.fromDate) params.set("fromDate", filters.fromDate);
    if (filters?.toDate) params.set("toDate", filters.toDate);
    if (filters?.groupBy) params.set("groupBy", filters.groupBy);

    const queryString = params.toString();
    const endpoint = queryString
      ? `/api/v1/assessments/stats?${queryString}`
      : "/api/v1/assessments/stats";

    return apiClient.get<AssessmentStatsResponse>(endpoint);
  }

  /**
   * Bulk create assessments
   */
  static async bulkCreateAssessments(
    assessments: Array<Omit<CreateAssessmentData, "assessorId">>
  ): Promise<{ message: string; created: number }> {
    return apiClient.post<{ message: string; created: number }>(
      "/api/v1/assessments/bulk",
      { assessments }
    );
  }

  /**
   * Export assessments data
   */
  static async exportAssessments(params: {
    format?: "JSON" | "CSV" | "PDF";
    skillIds?: string[];
    types?: string[];
    fromDate?: string;
    toDate?: string;
    includeMetadata?: boolean;
    includeFeedback?: boolean;
  }): Promise<globalThis.Blob> {
    const queryParams = new URLSearchParams();

    if (params.format) queryParams.set("format", params.format);
    if (params.skillIds?.length)
      queryParams.set("skillIds", params.skillIds.join(","));
    if (params.types?.length) queryParams.set("types", params.types.join(","));
    if (params.fromDate) queryParams.set("fromDate", params.fromDate);
    if (params.toDate) queryParams.set("toDate", params.toDate);
    if (params.includeMetadata !== undefined)
      queryParams.set("includeMetadata", params.includeMetadata.toString());
    if (params.includeFeedback !== undefined)
      queryParams.set("includeFeedback", params.includeFeedback.toString());

    const response = await fetch(
      `/api/v1/assessments/export?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Export failed");
    }

    return response.blob();
  }
}
