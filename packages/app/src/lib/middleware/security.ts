import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/errors/types";

export const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:;",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
} as const;

export function applySecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export function validateRequestSize(maxSize = 1024 * 1024) {
  return (request: NextRequest) => {
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > maxSize) {
      throw new ApiError(413, "Request payload too large", "PAYLOAD_TOO_LARGE");
    }
  };
}

export function validateContentType(
  allowedTypes: string[] = ["application/json"]
) {
  return (request: NextRequest) => {
    const contentType = request.headers.get("content-type");
    if (contentType && !allowedTypes.some(type => contentType.includes(type))) {
      throw new ApiError(
        415,
        "Unsupported media type",
        "UNSUPPORTED_MEDIA_TYPE"
      );
    }
  };
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .trim()
    .substring(0, 1000); // Limit length
}

export function validateApiKey(request: NextRequest): void {
  const apiKey = request.headers.get("x-api-key");
  const validApiKeys = process.env.API_KEYS?.split(",") || [];

  if (validApiKeys.length > 0 && (!apiKey || !validApiKeys.includes(apiKey))) {
    throw new ApiError(401, "Invalid API key", "INVALID_API_KEY");
  }
}
