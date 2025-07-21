/**
 * Shared API Types
 *
 * Common types used across API services
 */

// Base API Response Structure
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  success?: boolean;
}

// Category Types
export interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  _count: {
    skills: number;
  };
}

export interface CategoriesResponse {
  categories: SkillCategory[];
}

// Skill Types
export interface Skill {
  id: string;
  name: string;
  proficiency: number;
  description?: string;
  tags: string[];
  verified: boolean;
  lastAssessed?: string;
  source: "MANUAL" | "ASSESSMENT" | "GITHUB" | "AI_SUGGESTED" | "IMPORTED";
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    color?: string;
  };
  _count: {
    assessments: number;
    history: number;
  };
}

export interface CreateSkillData {
  name: string;
  categoryId: string;
  proficiency?: number;
  description?: string;
  tags?: string[];
}

export interface UpdateSkillData extends Partial<CreateSkillData> {
  verified?: boolean;
}

export interface SkillsFilters {
  categoryId?: string;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface SkillsResponse {
  skills: Skill[];
}

export interface SkillResponse {
  skill: Skill;
}

// Authentication Types
export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
  message?: string;
}

// Common API Error Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  code?: string;
  details?: ValidationError[];
}
