import { NextResponse } from "next/server";

/**
 * Transform skills response with tags parsed from JSON
 */
export function transformSkillsResponse(skills: unknown[]): unknown[] {
  return skills.map((skill: unknown) => {
    const skillObj = skill as { tags?: string | null };
    return {
      ...skillObj,
      tags: skillObj.tags ? JSON.parse(skillObj.tags) : [],
    };
  });
}

/**
 * Add rate limit headers to response
 */
export function addRateLimitHeaders(
  response: NextResponse,
  rateLimitInfo: { limit: number; remaining: number }
): void {
  response.headers.set("X-RateLimit-Limit", rateLimitInfo.limit.toString());
  response.headers.set(
    "X-RateLimit-Remaining",
    rateLimitInfo.remaining.toString()
  );
}

/**
 * Add cache headers to response
 */
export function addCacheHeaders(
  response: NextResponse,
  totalCount: number
): void {
  response.headers.set("Cache-Control", "private, max-age=60");
  response.headers.set("X-Total-Count", totalCount.toString());
}
