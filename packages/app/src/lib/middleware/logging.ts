import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export interface RequestContext {
  requestId: string;
  userId?: string | undefined;
  startTime: number;
}

export function createRequestContext(userId?: string): RequestContext {
  return {
    requestId: randomUUID(),
    userId,
    startTime: Date.now(),
  };
}

export function logRequest(
  request: NextRequest,
  context: RequestContext,
  additionalData?: Record<string, unknown>
) {
  const logData = {
    requestId: context.requestId,
    method: request.method,
    url: request.url,
    pathname: new URL(request.url).pathname,
    userAgent: request.headers.get("user-agent"),
    ip: request.headers.get("x-forwarded-for") || "unknown",
    userId: context.userId,
    timestamp: new Date().toISOString(),
    ...additionalData,
  };

  console.log("📥 Request:", JSON.stringify(logData, null, 2));
}

export function logResponse(
  response: NextResponse,
  context: RequestContext,
  additionalData?: Record<string, unknown>
) {
  const duration = Date.now() - context.startTime;

  const logData = {
    requestId: context.requestId,
    status: response.status,
    duration: `${duration}ms`,
    userId: context.userId,
    timestamp: new Date().toISOString(),
    ...additionalData,
  };

  const level = response.status >= 400 ? "❌" : "✅";
  console.log(`${level} Response:`, JSON.stringify(logData, null, 2));
}

export function logError(
  error: unknown,
  context: RequestContext,
  additionalData?: Record<string, unknown>
) {
  const logData = {
    requestId: context.requestId,
    error: {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    },
    userId: context.userId,
    duration: `${Date.now() - context.startTime}ms`,
    timestamp: new Date().toISOString(),
    ...additionalData,
  };

  console.error("💥 Error:", JSON.stringify(logData, null, 2));
}
