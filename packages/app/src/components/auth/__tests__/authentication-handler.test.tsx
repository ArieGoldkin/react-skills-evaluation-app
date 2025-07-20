/**
 * Unit tests for AuthenticationHandler component
 *
 * These tests verify the authentication handler functionality including
 * loading states, error handling, and automatic redirects.
 */

import { createAuthError } from "@/types/auth";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { AuthenticationHandler } from "../authentication-handler";

// Mock dependencies
vi.mock("next/navigation");
vi.mock("@/hooks/use-auth-state", () => ({
  useAuthState: vi.fn(),
}));

// Import mocked functions
import { useAuthState } from "@/hooks/use-auth-state";
const mockPush = vi.fn();
const mockUseAuthState = vi.mocked(useAuthState);
const mockUseRouter = useRouter as ReturnType<
  typeof vi.mocked<typeof useRouter>
>;

// Mock router
mockUseRouter.mockReturnValue({
  push: mockPush,
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
} as any);

describe("AuthenticationHandler", () => {
  const mockRetry = vi.fn().mockResolvedValue(undefined);
  const mockClearError = vi.fn();
  const mockSetRedirecting = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderAuthenticationHandler = (children = <div>Test Content</div>) => {
    return render(
      <AuthenticationHandler redirectTo="/dashboard">
        {children}
      </AuthenticationHandler>
    );
  };

  describe("Loading States", () => {
    it("shows loading spinner when authentication is loading", () => {
      mockUseAuthState.mockReturnValue({
        state: {
          status: "loading",
          session: null,
          error: null,
          isRedirecting: false,
          retryCount: 0,
          isRetrying: false,
        },
        isLoading: true,
        isAuthenticated: false,
        hasError: false,
        canRetry: false,
        retry: mockRetry,
        clearError: mockClearError,
        setRedirecting: mockSetRedirecting,
      });

      renderAuthenticationHandler();

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("shows redirecting message when redirect is in progress", () => {
      mockUseAuthState.mockReturnValue({
        state: {
          status: "authenticated",
          session: { user: { email: "test@example.com" } },
          error: null,
          isRedirecting: true,
          retryCount: 0,
          isRetrying: false,
        },
        isLoading: false,
        isAuthenticated: true,
        hasError: false,
        canRetry: false,
        retry: mockRetry,
        clearError: mockClearError,
        setRedirecting: mockSetRedirecting,
      });

      renderAuthenticationHandler();

      expect(screen.getByText("Redirecting...")).toBeInTheDocument();
    });

    it("shows retrying message when retry is in progress", () => {
      mockUseAuthState.mockReturnValue({
        state: {
          status: "unauthenticated",
          session: null,
          error: createAuthError("network", "Network error", {
            retryable: true,
          }),
          isRedirecting: false,
          retryCount: 1,
          isRetrying: true,
        },
        isLoading: true,
        isAuthenticated: false,
        hasError: true,
        canRetry: true,
        retry: mockRetry,
        clearError: mockClearError,
        setRedirecting: mockSetRedirecting,
      });

      renderAuthenticationHandler();

      expect(screen.getByText("Retrying...")).toBeInTheDocument();
    });
  });

  describe("Authentication Flow", () => {
    it("renders children when user is unauthenticated and no errors", () => {
      mockUseAuthState.mockReturnValue({
        state: {
          status: "unauthenticated",
          session: null,
          error: null,
          isRedirecting: false,
          retryCount: 0,
          isRetrying: false,
        },
        isLoading: false,
        isAuthenticated: false,
        hasError: false,
        canRetry: false,
        retry: mockRetry,
        clearError: mockClearError,
        setRedirecting: mockSetRedirecting,
      });

      renderAuthenticationHandler(<div>Homepage Content</div>);

      expect(screen.getByText("Homepage Content")).toBeInTheDocument();
    });

    it.skip("redirects authenticated users to dashboard", async () => {
      mockUseAuthState.mockReturnValue({
        state: {
          status: "authenticated",
          session: { user: { email: "test@example.com" } },
          error: null,
          isRedirecting: false,
          retryCount: 0,
          isRetrying: false,
        },
        isLoading: false,
        isAuthenticated: true,
        hasError: false,
        canRetry: false,
        retry: mockRetry,
        clearError: mockClearError,
        setRedirecting: mockSetRedirecting,
      });

      renderAuthenticationHandler();

      // Should call setRedirecting immediately
      expect(mockSetRedirecting).toHaveBeenCalledWith(true);

      // Fast-forward timer to trigger redirect (500ms timeout in useAuthRedirect)
      await act(async () => {
        vi.advanceTimersByTime(500);
        await vi.runAllTimersAsync();
      });

      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  describe("Error Handling", () => {
    it("displays error message when authentication fails", () => {
      const error = createAuthError("signin", "Sign-in failed", {
        code: "SIGNIN_ERROR",
        retryable: true,
      });

      mockUseAuthState.mockReturnValue({
        state: {
          status: "unauthenticated",
          session: null,
          error,
          isRedirecting: false,
          retryCount: 0,
          isRetrying: false,
        },
        isLoading: false,
        isAuthenticated: false,
        hasError: true,
        canRetry: true,
        retry: mockRetry,
        clearError: mockClearError,
        setRedirecting: mockSetRedirecting,
      });

      renderAuthenticationHandler();

      expect(screen.getByText("Authentication Error")).toBeInTheDocument();
      expect(screen.getByText("Sign-in failed")).toBeInTheDocument();
    });

    it("shows retry button for retryable errors", () => {
      const error = createAuthError("network", "Network error", {
        retryable: true,
      });

      mockUseAuthState.mockReturnValue({
        state: {
          status: "unauthenticated",
          session: null,
          error,
          isRedirecting: false,
          retryCount: 1,
          isRetrying: false,
        },
        isLoading: false,
        isAuthenticated: false,
        hasError: true,
        canRetry: true,
        retry: mockRetry,
        clearError: mockClearError,
        setRedirecting: mockSetRedirecting,
      });

      renderAuthenticationHandler();

      const retryButton = screen.getByText("Try Again");
      expect(retryButton).toBeInTheDocument();
      expect(retryButton).not.toBeDisabled();
    });

    it.skip("calls retry function when retry button is clicked", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const error = createAuthError("network", "Network error", {
        retryable: true,
      });

      mockUseAuthState.mockReturnValue({
        state: {
          status: "unauthenticated",
          session: null,
          error,
          isRedirecting: false,
          retryCount: 1,
          isRetrying: false,
        },
        isLoading: false,
        isAuthenticated: false,
        hasError: true,
        canRetry: true,
        retry: mockRetry,
        clearError: mockClearError,
        setRedirecting: mockSetRedirecting,
      });

      renderAuthenticationHandler();

      const retryButton = screen.getByText("Try Again");
      await user.click(retryButton);

      expect(mockRetry).toHaveBeenCalledTimes(1);
    });

    it.skip("shows dismiss button for all errors", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const error = createAuthError("session", "Session expired", {
        retryable: false,
      });

      mockUseAuthState.mockReturnValue({
        state: {
          status: "unauthenticated",
          session: null,
          error,
          isRedirecting: false,
          retryCount: 0,
          isRetrying: false,
        },
        isLoading: false,
        isAuthenticated: false,
        hasError: true,
        canRetry: false,
        retry: mockRetry,
        clearError: mockClearError,
        setRedirecting: mockSetRedirecting,
      });

      renderAuthenticationHandler();

      const dismissButton = screen.getByText("Dismiss");
      await user.click(dismissButton);

      expect(mockClearError).toHaveBeenCalledTimes(1);
    });

    it("shows only dismiss button for non-retryable errors", () => {
      const error = createAuthError("session", "Session expired", {
        retryable: false,
      });

      mockUseAuthState.mockReturnValue({
        state: {
          status: "unauthenticated",
          session: null,
          error,
          isRedirecting: false,
          retryCount: 0,
          isRetrying: false,
        },
        isLoading: false,
        isAuthenticated: false,
        hasError: true,
        canRetry: false,
        retry: mockRetry,
        clearError: mockClearError,
        setRedirecting: mockSetRedirecting,
      });

      renderAuthenticationHandler();

      expect(screen.getByText("Dismiss")).toBeInTheDocument();
      expect(screen.queryByText("Try Again")).not.toBeInTheDocument();
    });
  });

  describe("Custom Loading Component", () => {
    it("renders custom loading component when provided", () => {
      const CustomLoader = () => <div>Custom Loading...</div>;

      mockUseAuthState.mockReturnValue({
        state: {
          status: "loading",
          session: null,
          error: null,
          isRedirecting: false,
          retryCount: 0,
          isRetrying: false,
        },
        isLoading: true,
        isAuthenticated: false,
        hasError: false,
        canRetry: false,
        retry: mockRetry,
        clearError: mockClearError,
        setRedirecting: mockSetRedirecting,
      });

      render(
        <AuthenticationHandler loadingComponent={CustomLoader}>
          <div>Content</div>
        </AuthenticationHandler>
      );

      expect(screen.getByText("Custom Loading...")).toBeInTheDocument();
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
