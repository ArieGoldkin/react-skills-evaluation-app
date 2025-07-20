/**
 * Unit tests for useAuthState hook
 *
 * These tests verify the authentication state management functionality
 * including error handling and retry mechanisms.
 */

import { createAuthError } from "@/types/auth";
import {
  AUTH_ERROR_MESSAGES,
  DEFAULT_RETRY_CONFIG,
} from "@/types/auth-constants";
import { act, renderHook } from "@testing-library/react";
import { useAuthState } from "../use-auth-state";

// Mock the auth provider hook
vi.mock("@/components/auth/auth-provider", () => ({
  useAuth: vi.fn(),
}));

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}));

// Import mocked functions
import { useAuth } from "@/components/auth/auth-provider";
const mockUseAuth = vi.mocked(useAuth);
// const mockSignIn = require("next-auth/react").signIn;

describe("useAuthState", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    // Default mock return value
    mockUseAuth.mockReturnValue({
      session: null,
      status: "loading",
      isAuthenticated: false,
      isLoading: true,
      user: null,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Initial State", () => {
    it("initializes with correct default state", () => {
      const { result } = renderHook(() => useAuthState());

      expect(result.current.state.status).toBe("loading");
      expect(result.current.state.session).toBeNull();
      expect(result.current.state.error).toBeNull();
      expect(result.current.state.isRedirecting).toBe(false);
      expect(result.current.state.retryCount).toBe(0);
      expect(result.current.state.isRetrying).toBe(false);
    });

    it("provides correct computed values", () => {
      const { result } = renderHook(() => useAuthState());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.hasError).toBe(false);
      expect(result.current.canRetry).toBe(false);
    });
  });

  describe("State Synchronization", () => {
    it("syncs with authenticated state", () => {
      const session = { user: { email: "test@example.com" } };

      mockUseAuth.mockReturnValue({
        session,
        status: "authenticated",
        isAuthenticated: true,
        isLoading: false,
        user: session.user,
      });

      const { result } = renderHook(() => useAuthState());

      expect(result.current.state.status).toBe("authenticated");
      expect(result.current.state.session).toBe(session);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it("syncs with unauthenticated state", () => {
      mockUseAuth.mockReturnValue({
        session: null,
        status: "unauthenticated",
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      const { result } = renderHook(() => useAuthState());

      expect(result.current.state.status).toBe("unauthenticated");
      expect(result.current.state.session).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("Error Handling", () => {
    it("clears errors when clearError is called", () => {
      mockUseAuth.mockReturnValue({
        session: null,
        status: "unauthenticated",
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      const { result } = renderHook(() => useAuthState());

      act(() => {
        result.current.clearError();
      });

      expect(result.current.state.error).toBeNull();
      expect(result.current.hasError).toBe(false);
    });
  });

  describe("Redirecting State", () => {
    it("sets and clears redirecting state", () => {
      mockUseAuth.mockReturnValue({
        session: null,
        status: "unauthenticated",
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });

      const { result } = renderHook(() => useAuthState());

      act(() => {
        result.current.setRedirecting(true);
      });

      expect(result.current.state.isRedirecting).toBe(true);

      act(() => {
        result.current.setRedirecting(false);
      });

      expect(result.current.state.isRedirecting).toBe(false);
    });
  });

  describe("Type Safety", () => {
    it("creates proper auth errors", () => {
      const error = createAuthError("signin", "Test error", {
        code: "TEST_ERROR",
        retryable: true,
      });

      expect(error.type).toBe("signin");
      expect(error.message).toBe("Test error");
      expect(error.code).toBe("TEST_ERROR");
      expect(error.retryable).toBe(true);
      expect(error.timestamp).toBeInstanceOf(Date);
    });

    it("uses correct error messages", () => {
      expect(AUTH_ERROR_MESSAGES.SIGNIN_FAILED).toBe(
        "Failed to sign in. Please try again."
      );
      expect(AUTH_ERROR_MESSAGES.CALLBACK_ERROR).toBe(
        "Authentication callback failed. Please try signing in again."
      );
      expect(AUTH_ERROR_MESSAGES.SESSION_EXPIRED).toBe(
        "Your session has expired. Please sign in again."
      );
      expect(AUTH_ERROR_MESSAGES.NETWORK_ERROR).toBe(
        "Network error occurred. Please check your connection and try again."
      );
    });

    it("has correct default retry config", () => {
      expect(DEFAULT_RETRY_CONFIG.maxAttempts).toBe(3);
      expect(DEFAULT_RETRY_CONFIG.baseDelay).toBe(1000);
      expect(DEFAULT_RETRY_CONFIG.exponentialBackoff).toBe(true);
      expect(DEFAULT_RETRY_CONFIG.maxDelay).toBe(10000);
    });
  });
});
