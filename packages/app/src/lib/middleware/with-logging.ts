import { NextRequest, NextResponse } from "next/server";
import {
  createRequestContext,
  logRequest,
  logResponse,
  logError,
} from "./logging";

export function withLogging<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
  endpoint?: string
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    const context = createRequestContext();

    try {
      // Log the incoming request
      logRequest(request, context, { endpoint });

      // Execute the handler
      const response = await handler(request, ...args);

      // Log the response
      logResponse(response, context, { endpoint });

      return response;
    } catch (error) {
      // Log the error
      logError(error, context, { endpoint });

      // Re-throw to let the error handler deal with it
      throw error;
    }
  };
}

export function withAuthLogging<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
  endpoint?: string
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    // Extract user ID from auth middleware if available
    let userId: string | undefined;
    try {
      // This is a simplified approach - in practice you might extract userId differently
      const authHeader = request.headers.get("authorization");
      if (authHeader) {
        // Placeholder for JWT parsing or session lookup
        userId = "user-from-auth"; // Replace with actual user ID extraction
      }
    } catch {
      // Ignore auth parsing errors for logging
    }

    const context = createRequestContext(userId);

    try {
      // Log the incoming request with user context
      logRequest(request, context, { endpoint, userId });

      // Execute the handler
      const response = await handler(request, ...args);

      // Log the response with user context
      logResponse(response, context, { endpoint, userId });

      return response;
    } catch (error) {
      // Log the error with user context
      logError(error, context, { endpoint, userId });

      // Re-throw to let the error handler deal with it
      throw error;
    }
  };
}
