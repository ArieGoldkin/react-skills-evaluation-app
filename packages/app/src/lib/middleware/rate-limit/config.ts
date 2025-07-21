import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client using your existing Redis config
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limit configurations for different operations
export const rateLimiters = {
  // Read operations: 100 requests per minute
  "skills-read": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 m"),
    analytics: true,
    prefix: "rl:skills:read",
  }),

  // Write operations: 20 requests per minute
  "skills-write": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 m"),
    analytics: true,
    prefix: "rl:skills:write",
  }),

  // Category operations: 50 requests per minute
  "categories-read": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, "1 m"),
    analytics: true,
    prefix: "rl:categories:read",
  }),

  "categories-write": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "rl:categories:write",
  }),

  // User operations: 30 requests per minute
  "users-read": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 m"),
    analytics: true,
    prefix: "rl:users:read",
  }),

  "users-write": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "rl:users:write",
  }),

  // AI operations: 10 requests per minute (expensive operations)
  "ai-requests": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "rl:ai:requests",
  }),

  // File upload operations: 5 requests per minute
  "file-upload": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
    prefix: "rl:files:upload",
  }),

  // Authentication operations: 30 requests per minute
  "auth-requests": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 m"),
    analytics: true,
    prefix: "rl:auth:requests",
  }),

  // Health check operations: More lenient
  "health-check": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(200, "1 m"),
    analytics: false,
    prefix: "rl:health:check",
  }),
};

export type RateLimitOperation = keyof typeof rateLimiters;
