import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Check if Redis credentials are available
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Initialize Redis client only if credentials are available
export const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken,
      })
    : null;

// Check if Redis is configured
export const isRedisConfigured = !!redis;

// Rate limit configurations for different operations
export const rateLimiters: Record<string, Ratelimit | null> = isRedisConfigured
  ? {
      // Read operations: 100 requests per minute
      "skills-read": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(100, "1 m"),
        analytics: true,
        prefix: "rl:skills:read",
      }),

      // Write operations: 20 requests per minute
      "skills-write": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(20, "1 m"),
        analytics: true,
        prefix: "rl:skills:write",
      }),

      // Category operations: 50 requests per minute
      "categories-read": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(50, "1 m"),
        analytics: true,
        prefix: "rl:categories:read",
      }),

      "categories-write": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(10, "1 m"),
        analytics: true,
        prefix: "rl:categories:write",
      }),

      // User operations: 30 requests per minute
      "users-read": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(30, "1 m"),
        analytics: true,
        prefix: "rl:users:read",
      }),

      "users-write": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(10, "1 m"),
        analytics: true,
        prefix: "rl:users:write",
      }),

      // AI operations: 10 requests per minute (expensive operations)
      "ai-requests": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(10, "1 m"),
        analytics: true,
        prefix: "rl:ai:requests",
      }),

      // File upload operations: 5 requests per minute
      "file-upload": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(5, "1 m"),
        analytics: true,
        prefix: "rl:files:upload",
      }),

      // Authentication operations: 30 requests per minute
      "auth-requests": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(30, "1 m"),
        analytics: true,
        prefix: "rl:auth:requests",
      }),

      // Assessment operations
      "assessments-read": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(100, "1 m"),
        analytics: true,
        prefix: "rl:assessments:read",
      }),

      "assessments-write": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(25, "1 m"),
        analytics: true,
        prefix: "rl:assessments:write",
      }),

      // Bulk operations: More restrictive
      "skills-bulk-write": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(5, "1 m"),
        analytics: true,
        prefix: "rl:skills:bulk",
      }),

      "assessments-bulk-write": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(3, "1 m"),
        analytics: true,
        prefix: "rl:assessments:bulk",
      }),

      // Health check operations: More lenient
      "health-check": new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(200, "1 m"),
        analytics: false,
        prefix: "rl:health:check",
      }),
    }
  : {};

export type RateLimitOperation = keyof typeof rateLimiters;
