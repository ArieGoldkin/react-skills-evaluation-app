/**
 * Authentication state reducer for managing auth state transitions
 */

import { AuthAction, AuthState } from "@/types/auth";

/**
 * Authentication state reducer
 */
export function authStateReducer(
  state: AuthState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        status: "loading",
        error: null,
      };

    case "SET_AUTHENTICATED":
      return {
        ...state,
        status: "authenticated",
        session: action.payload.session,
        error: null,
        retryCount: 0,
        isRetrying: false,
      };

    case "SET_UNAUTHENTICATED":
      return {
        ...state,
        status: "unauthenticated",
        session: null,
        error: null,
        retryCount: 0,
        isRetrying: false,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload.error,
        isRetrying: false,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
        retryCount: 0,
        isRetrying: false,
      };

    case "SET_REDIRECTING":
      return {
        ...state,
        isRedirecting: action.payload.isRedirecting,
      };

    case "INCREMENT_RETRY":
      return {
        ...state,
        retryCount: state.retryCount + 1,
      };

    case "RESET_RETRY":
      return {
        ...state,
        retryCount: 0,
        isRetrying: false,
      };

    case "SET_RETRYING":
      return {
        ...state,
        isRetrying: action.payload.isRetrying,
      };

    default:
      return state;
  }
}

/**
 * Initial authentication state
 */
export const initialAuthState: AuthState = {
  status: "loading",
  session: null,
  error: null,
  isRedirecting: false,
  retryCount: 0,
  isRetrying: false,
};
