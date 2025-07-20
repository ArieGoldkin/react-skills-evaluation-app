/**
 * Authentication retry handler - extracted from useAuthState for better separation of concerns
 */

import { SignInOptions, createAuthError, isRetryableError } from "@/types/auth";
import { AUTH_ERROR_MESSAGES, type RetryConfig } from "@/types/auth-constants";

export interface RetryHandlerState {
  error: any;
  retryCount: number;
}

export interface RetryHandlerActions {
  dispatch: (action: any) => void;
}

/**
 * Calculate retry delay with exponential backoff
 */
export function calculateRetryDelay(
  attempt: number,
  baseDelay: number,
  maxDelay: number,
  exponentialBackoff: boolean
): number {
  if (!exponentialBackoff) {
    return baseDelay;
  }

  const delay = baseDelay * Math.pow(2, attempt - 1);
  return Math.min(delay, maxDelay);
}

/**
 * Handle retry logic for authentication failures
 */
export class AuthRetryHandler {
  constructor(
    private config: RetryConfig,
    private state: RetryHandlerState,
    private actions: RetryHandlerActions
  ) {}

  /**
   * Check if retry is possible
   */
  canRetry(): boolean {
    return (
      this.state.error &&
      isRetryableError(this.state.error) &&
      this.state.retryCount < this.config.maxAttempts
    );
  }

  /**
   * Execute retry with exponential backoff
   */
  async executeRetry(
    attemptSignIn: (options: SignInOptions) => Promise<void>
  ): Promise<void> {
    if (!this.canRetry()) {
      return;
    }

    if (this.state.retryCount >= this.config.maxAttempts) {
      const maxRetriesError = createAuthError(
        "unknown",
        AUTH_ERROR_MESSAGES.MAX_RETRIES_EXCEEDED,
        {
          code: "MAX_RETRIES_EXCEEDED",
          retryable: false,
        }
      );
      this.actions.dispatch({
        type: "SET_ERROR",
        payload: { error: maxRetriesError },
      });
      return;
    }

    this.actions.dispatch({ type: "INCREMENT_RETRY" });
    this.actions.dispatch({
      type: "SET_RETRYING",
      payload: { isRetrying: true },
    });

    const delay = calculateRetryDelay(
      this.state.retryCount + 1,
      this.config.baseDelay,
      this.config.maxDelay,
      this.config.exponentialBackoff
    );

    try {
      await new Promise(resolve => setTimeout(resolve, delay));

      if (this.state.error.type === "session") {
        window.location.reload();
      } else {
        await attemptSignIn({
          provider: "google",
          callbackUrl: "/dashboard",
        });
      }
    } finally {
      this.actions.dispatch({
        type: "SET_RETRYING",
        payload: { isRetrying: false },
      });
    }
  }
}
