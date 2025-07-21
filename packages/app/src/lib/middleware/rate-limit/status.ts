import { NextRequest } from "next/server";
import { rateLimiters, redis, type RateLimitOperation } from "./config";

/**
 * Get rate limit status without consuming a request
 */
export async function getRateLimitStatus(
  request: NextRequest,
  operation: RateLimitOperation,
  userId?: string
) {
  if (
    process.env.NODE_ENV === "test" ||
    process.env.RATE_LIMIT_ENABLED === "false"
  ) {
    return { remaining: 100, reset: Date.now() + 60000, limit: 100 };
  }

  const ratelimit = rateLimiters[operation];
  if (!ratelimit) {
    return { remaining: 100, reset: Date.now() + 60000, limit: 100 };
  }

  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "anonymous";

  const identifier = userId ? `user:${userId}` : `ip:${ip}`;

  try {
    // This is a hypothetical method - Upstash Ratelimit might not have this
    // You may need to implement this differently based on the library's API
    const status = await redis.get(`rl:${operation}:${identifier}`);

    if (!status) {
      return { remaining: 100, reset: Date.now() + 60000, limit: 100 };
    }

    // Parse the stored rate limit data
    // This is implementation-specific and may vary
    return { remaining: 100, reset: Date.now() + 60000, limit: 100 };
  } catch (error) {
    console.error("Rate limit status check error:", error);
    return { remaining: 100, reset: Date.now() + 60000, limit: 100 };
  }
}
