import { NextResponse } from "next/server";

/**
 * Creates a standardized success response
 */
export function createSuccessResponse(
  data: unknown,
  status: number = 200,
  message?: string
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message ? { message } : {}),
    },
    { status }
  );
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  message: string,
  code: string,
  status: number = 400,
  details?: unknown
): NextResponse {
  return NextResponse.json(
    {
      error: message,
      code,
      ...(details ? { details } : {}),
    },
    { status }
  );
}

/**
 * Wraps an async API handler with error handling
 */
export function withErrorHandler<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      const { handleApiError } = await import("./handlers");
      return handleApiError(error);
    }
  };
}
