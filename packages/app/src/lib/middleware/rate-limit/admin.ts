import { rateLimiters, redis, type RateLimitOperation } from "./config";

/**
 * Reset rate limit for a specific user/IP (admin function)
 */
export async function resetRateLimit(
  operation: RateLimitOperation,
  identifier: string
) {
  const ratelimit = rateLimiters[operation];
  if (!ratelimit) {
    throw new Error(`Unknown rate limit operation: ${operation}`);
  }

  try {
    // Clear the rate limit for this identifier
    const prefix = `rl:${operation}`;
    await redis.del(`${prefix}:${identifier}`);
    return true;
  } catch (error) {
    console.error("Rate limit reset error:", error);
    return false;
  }
}

/**
 * Get analytics for rate limiting (admin function)
 */
export async function getRateLimitAnalytics(
  operation: RateLimitOperation,
  timeframe: "1h" | "1d" | "7d" = "1h"
) {
  // This would need to be implemented based on your analytics needs
  // and what data Upstash Ratelimit provides

  console.log(
    `Getting rate limit analytics for ${operation} over ${timeframe}`
  );

  return {
    operation,
    timeframe,
    totalRequests: 0,
    blockedRequests: 0,
    uniqueIdentifiers: 0,
  };
}
