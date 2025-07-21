import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ValidationError } from "../middleware/validation";
import { RateLimitError } from "../middleware/rate-limit/error";
import { ApiError, DatabaseError, ExternalServiceError } from "./types";

/**
 * Comprehensive API error handler
 * Transforms various error types into consistent API responses
 */
export function handleApiError(error: unknown): NextResponse {
  console.error("API Error:", {
    name: error instanceof Error ? error.name : "Unknown",
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });

  // Handle custom API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        details: error.details,
      },
      { status: error.status }
    );
  }

  // Handle validation errors from middleware
  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        details: error.errors.map((e: any) => ({
          field: e.path.join("."),
          message: e.message,
          code: e.code,
        })),
      },
      { status: 400 }
    );
  }

  // Handle rate limit errors
  if (error instanceof RateLimitError) {
    const rateLimitError = error as RateLimitError;
    return NextResponse.json(
      {
        error: rateLimitError.message,
        code: "RATE_LIMIT_EXCEEDED",
        details: {
          limit: rateLimitError.limit,
          remaining: rateLimitError.remaining,
          retryAfter: rateLimitError.retryAfter,
        },
      },
      {
        status: 429,
        headers: {
          "Retry-After": rateLimitError.retryAfter.toString(),
          "X-RateLimit-Limit": rateLimitError.limit.toString(),
          "X-RateLimit-Remaining": rateLimitError.remaining.toString(),
          "X-RateLimit-Reset": rateLimitError.reset.toString(),
        },
      }
    );
  }

  // Handle database errors
  if (error instanceof DatabaseError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code || "DATABASE_ERROR",
      },
      { status: 500 }
    );
  }

  // Handle external service errors
  if (error instanceof ExternalServiceError) {
    return NextResponse.json(
      {
        error: `${error.service} service unavailable`,
        code: "EXTERNAL_SERVICE_ERROR",
        details: {
          service: error.service,
          originalError:
            process.env.NODE_ENV === "development"
              ? error.originalError
              : undefined,
        },
      },
      { status: 503 }
    );
  }

  // Handle Zod validation errors (fallback)
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Schema validation failed",
        code: "SCHEMA_VALIDATION_ERROR",
        details: (error as any).errors.map((e: any) => ({
          field: e.path.join("."),
          message: e.message,
          code: e.code,
        })),
      },
      { status: 400 }
    );
  }

  // Handle Prisma errors, NextAuth errors, and other common error types
  return handleSpecificErrors(error);
}

function handleSpecificErrors(error: unknown): NextResponse {
  // Handle Prisma errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as {
      code: string;
      message: string;
      meta?: unknown;
    };

    const prismaErrorResponse = handlePrismaError(prismaError);
    if (prismaErrorResponse) return prismaErrorResponse;
  }

  // Handle NextAuth errors
  if (error && typeof error === "object" && "type" in error) {
    const authError = error as { type: string; message: string };

    if (authError.type === "AccessDenied") {
      return NextResponse.json(
        {
          error: "Access denied",
          code: "ACCESS_DENIED",
        },
        { status: 403 }
      );
    }
  }

  // Handle specific HTTP errors
  if (error instanceof Error) {
    const httpErrorResponse = handleHttpErrors(error);
    if (httpErrorResponse) return httpErrorResponse;
  }

  // Generic server error
  return NextResponse.json(
    {
      error:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : error instanceof Error
            ? error.message
            : "Unknown error occurred",
      code: "INTERNAL_ERROR",
    },
    { status: 500 }
  );
}

function handlePrismaError(prismaError: {
  code: string;
  message: string;
  meta?: unknown;
}): NextResponse | null {
  switch (prismaError.code) {
    case "P2002":
      return NextResponse.json(
        {
          error: "Resource already exists",
          code: "DUPLICATE_ERROR",
          details: {
            field: (prismaError.meta as any)?.target?.[0] || "unknown",
          },
        },
        { status: 409 }
      );

    case "P2025":
      return NextResponse.json(
        {
          error: "Resource not found",
          code: "NOT_FOUND_ERROR",
        },
        { status: 404 }
      );

    case "P2003":
      return NextResponse.json(
        {
          error: "Foreign key constraint failed",
          code: "CONSTRAINT_ERROR",
        },
        { status: 400 }
      );

    case "P2006":
      return NextResponse.json(
        {
          error: "Invalid data provided",
          code: "INVALID_DATA_ERROR",
        },
        { status: 400 }
      );

    case "P2014":
      return NextResponse.json(
        {
          error: "Invalid relation",
          code: "RELATION_ERROR",
        },
        { status: 400 }
      );

    default:
      console.error("Unhandled Prisma error:", prismaError);
      return NextResponse.json(
        {
          error: "Database operation failed",
          code: "DATABASE_ERROR",
        },
        { status: 500 }
      );
  }
}

function handleHttpErrors(error: Error): NextResponse | null {
  // Handle JSON parsing errors
  if (error.message.includes("JSON") || error.name === "SyntaxError") {
    return NextResponse.json(
      {
        error: "Invalid JSON format",
        code: "INVALID_JSON",
      },
      { status: 400 }
    );
  }

  // Handle timeout errors
  if (error.message.includes("timeout") || error.message.includes("TIMEOUT")) {
    return NextResponse.json(
      {
        error: "Request timeout",
        code: "TIMEOUT_ERROR",
      },
      { status: 408 }
    );
  }

  return null;
}
