import { NextRequest } from "next/server";
import { rateLimiters, type RateLimitOperation } from "./config";
import { RateLimitError } from "./error";

/**
 * Rate limiting middleware for API routes
 * Uses IP address and optionally user ID as identifier
 */
export async function rateLimitMiddleware(
  request: NextRequest,
  operation: RateLimitOperation,
  userId?: string
) {
  // Skip rate limiting in test environment
  if (process.env.NODE_ENV === "test") {
    return { remaining: 100, reset: Date.now() + 60000, limit: 100 };
  }

  // Skip if rate limiting is disabled
  if (process.env.RATE_LIMIT_ENABLED === "false") {
    return { remaining: 100, reset: Date.now() + 60000, limit: 100 };
  }

  const ratelimit = rateLimiters[operation];

  if (!ratelimit) {
    console.warn(`Unknown rate limit operation: ${operation}`);
    return { remaining: 100, reset: Date.now() + 60000, limit: 100 };
  }

  // Create identifier: use user ID if available, otherwise IP
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "anonymous";

  const identifier = userId ? `user:${userId}` : `ip:${ip}`;
  const key = `${identifier}`;

  try {
    const { success, limit, remaining, reset } = await ratelimit.limit(key);

    if (!success) {
      const retryAfter = Math.round((reset - Date.now()) / 1000);
      throw new RateLimitError(limit, remaining, reset, retryAfter);
    }

    return { limit, remaining, reset };
  } catch (error) {
    if (error instanceof RateLimitError) {
      throw error;
    }

    // If Redis is down, log error but don't block requests
    console.error("Rate limiting error:", error);

    // Return permissive values if Redis fails
    return { remaining: 100, reset: Date.now() + 60000, limit: 100 };
  }
}
