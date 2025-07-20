/**
 * Authentication sign-in handler - extracted from useAuthState for better separation of concerns
 */

import { SignInOptions } from "@/types/auth";
import { signIn } from "next-auth/react";

export interface SignInHandlerActions {
  dispatch: (action: any) => void;
  handleAuthErrorWithDispatch: (error: unknown, type?: string) => void;
}

/**
 * Handle sign-in operations with proper error handling
 */
export class AuthSignInHandler {
  constructor(private actions: SignInHandlerActions) {}

  /**
   * Attempt to sign in with error handling
   */
  async attemptSignIn(options: SignInOptions): Promise<void> {
    try {
      this.actions.dispatch({ type: "SET_LOADING" });

      const result = await signIn(options.provider, {
        callbackUrl: options.callbackUrl || "/dashboard",
        redirect: false,
        ...options.params,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Success - the session will be updated via useEffect
      this.actions.dispatch({ type: "RESET_RETRY" });
    } catch (error) {
      this.actions.handleAuthErrorWithDispatch(error, "signin");
      throw error; // Re-throw for caller to handle
    }
  }

  /**
   * Sign in with retry logic wrapper
   */
  async signInWithRetry(options: SignInOptions): Promise<void> {
    try {
      await this.attemptSignIn(options);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  }
}
