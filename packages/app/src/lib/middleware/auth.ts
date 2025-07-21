import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";
import { ApiError } from "@/lib/errors/types";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}

/**
 * Authentication middleware for API routes
 * Verifies the user session and returns user info
 */
export async function authMiddleware(
  _request: NextRequest
): Promise<AuthenticatedUser> {
  try {
    // Get session using your existing NextAuth config
    const session = await auth();

    if (!session?.user) {
      throw new ApiError(401, "Authentication required", "AUTH_REQUIRED");
    }

    if (!session.user.email) {
      throw new ApiError(401, "Invalid user session", "INVALID_SESSION");
    }

    return {
      id: session.user.id || session.user.email, // Fallback to email if no ID
      email: session.user.email,
      name: session.user.name || null,
      image: session.user.image || null,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle unexpected errors
    console.error("Authentication middleware error:", error);
    throw new ApiError(500, "Authentication service unavailable", "AUTH_ERROR");
  }
}

/**
 * Optional authentication middleware - allows both authenticated and unauthenticated requests
 * Returns user info if authenticated, null if not
 */
export async function optionalAuthMiddleware(
  request: NextRequest
): Promise<AuthenticatedUser | null> {
  try {
    return await authMiddleware(request);
  } catch (error) {
    // If authentication fails, return null for optional auth
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    // Re-throw other errors
    throw error;
  }
}

/**
 * Role-based authentication middleware (future extension)
 * For now, all authenticated users have access
 */
export function requireRole(role: string) {
  return async (request: NextRequest): Promise<AuthenticatedUser> => {
    const user = await authMiddleware(request);

    // TODO: Add role checking logic when roles are implemented
    // For now, all authenticated users have access to all roles
    console.debug(`Role check for ${role}: granted for user ${user.email}`);

    return user;
  };
}

/**
 * Admin-only middleware
 * Checks if user email is in the admin list
 */
export async function adminMiddleware(
  request: NextRequest
): Promise<AuthenticatedUser> {
  const user = await authMiddleware(request);

  // Check if user is admin based on environment variable
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];

  if (!adminEmails.includes(user.email)) {
    throw new ApiError(403, "Admin access required", "ADMIN_REQUIRED");
  }

  return user;
}

/**
 * Ownership validation middleware
 * Ensures the authenticated user owns the requested resource
 */
export async function requireResourceOwnership(
  request: NextRequest,
  resourceUserId: string
): Promise<AuthenticatedUser> {
  const user = await authMiddleware(request);

  if (user.id !== resourceUserId) {
    throw new ApiError(
      403,
      "Access denied - resource not owned by user",
      "OWNERSHIP_REQUIRED"
    );
  }

  return user;
}
