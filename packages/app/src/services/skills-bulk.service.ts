/**
 * Skills Bulk Operations Service
 * 
 * Handles bulk operations for skills (bulk update, delete, import/export)
 */

import { apiClient } from "@/lib/api-client";
import type { UpdateSkillData } from "./types";

export class SkillsBulkService {
  /**
   * Bulk update skills
   */
  static async bulkUpdateSkills(
    updates: Array<{ id: string; data: UpdateSkillData }>
  ): Promise<{ updated: number; message: string }> {
    return apiClient.post<{ updated: number; message: string }>(
      "/api/skills/bulk-update",
      {
        updates,
      }
    );
  }

  /**
   * Bulk delete skills
   */
  static async bulkDeleteSkills(
    skillIds: string[]
  ): Promise<{ deleted: number; message: string }> {
    return apiClient.post<{ deleted: number; message: string }>(
      "/api/skills/bulk-delete",
      {
        skillIds,
      }
    );
  }

  /**
   * Export user skills to different formats
   */
  static async exportSkills(format: "json" | "csv" | "pdf" = "json"): Promise<{
    downloadUrl: string;
    fileName: string;
  }> {
    return apiClient.get(`/api/skills/export?format=${format}`);
  }

  /**
   * Import skills from file
   */
  static async importSkills(formData: globalThis.FormData): Promise<{
    imported: number;
    skipped: number;
    errors: Array<{ row: number; error: string }>;
  }> {
    return apiClient.post("/api/skills/import", formData, {
      headers: {} as Record<string, string>,
    });
  }
}