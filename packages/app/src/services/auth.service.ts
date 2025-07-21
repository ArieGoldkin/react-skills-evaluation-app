/**
 * Authentication Service
 *
 * Handles all authentication-related API calls
 */

import { apiClient } from "@/lib/api-client";
import type { AuthResponse, LoginCredentials, RegisterUserData } from "./types";

export class AuthService {
  /**
   * Register a new user
   */
  static async register(userData: RegisterUserData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/api/auth/register", userData);
  }

  /**
   * Login user with credentials
   * Note: This is handled by NextAuth, but kept for consistency
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/api/auth/signin", credentials);
  }

  /**
   * Logout user
   * Note: This is handled by NextAuth signOut, but kept for consistency
   */
  static async logout(): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>("/api/auth/signout");
  }

  /**
   * Get current user session
   * Note: This is typically handled by NextAuth useSession hook
   */
  static async getCurrentUser(): Promise<AuthResponse> {
    return apiClient.get<AuthResponse>("/api/auth/session");
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(
    email: string
  ): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>("/api/auth/reset-password", {
      email,
    });
  }

  /**
   * Reset password with token
   */
  static async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(
      "/api/auth/reset-password/confirm",
      {
        token,
        password: newPassword,
      }
    );
  }

  /**
   * Verify email address
   */
  static async verifyEmail(token: string): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>("/api/auth/verify-email", {
      token,
    });
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    updates: Partial<{ name: string; email: string }>
  ): Promise<AuthResponse> {
    return apiClient.patch<AuthResponse>("/api/auth/profile", updates);
  }

  /**
   * Change password
   */
  static async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>("/api/auth/change-password", {
      currentPassword,
      newPassword,
    });
  }

  /**
   * Delete user account
   */
  static async deleteAccount(password: string): Promise<{ message: string }> {
    // Use POST for complex delete operations with body data
    return apiClient.post<{ message: string }>("/api/auth/account/delete", {
      password,
    });
  }
}

export default AuthService;
