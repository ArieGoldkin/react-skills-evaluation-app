import { NextRequest, NextResponse } from "next/server";
import {
  applySecurityHeaders,
  validateContentType,
  validateRequestSize,
} from "./security";

export interface SecurityOptions {
  maxRequestSize?: number;
  allowedContentTypes?: string[];
  skipSizeValidation?: boolean;
  skipContentTypeValidation?: boolean;
  customHeaders?: Record<string, string>;
}

export function withSecurity<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
  options: SecurityOptions = {}
) {
  const {
    maxRequestSize = 1024 * 1024, // 1MB default
    allowedContentTypes = ["application/json"],
    skipSizeValidation = false,
    skipContentTypeValidation = false,
    customHeaders = {},
  } = options;

  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    // Apply request size validation
    if (
      !skipSizeValidation &&
      (request.method === "POST" ||
        request.method === "PUT" ||
        request.method === "PATCH")
    ) {
      validateRequestSize(maxRequestSize)(request);
    }

    // Apply content type validation
    if (
      !skipContentTypeValidation &&
      (request.method === "POST" ||
        request.method === "PUT" ||
        request.method === "PATCH")
    ) {
      validateContentType(allowedContentTypes)(request);
    }

    // Execute the handler
    const response = await handler(request, ...args);

    // Apply security headers
    const secureResponse = applySecurityHeaders(response);

    // Apply custom headers if provided
    Object.entries(customHeaders).forEach(([key, value]) => {
      secureResponse.headers.set(key, value);
    });

    return secureResponse;
  };
}

// Convenience wrapper for API routes with standard security
export function withApiSecurity<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return withSecurity(handler, {
    maxRequestSize: 1024 * 1024, // 1MB
    allowedContentTypes: ["application/json"],
    customHeaders: {
      "X-API-Version": "1.0",
      "X-Powered-By": "Skills Evaluation API",
    },
  });
}

// Convenience wrapper for file upload routes
export function withFileUploadSecurity<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return withSecurity(handler, {
    maxRequestSize: 10 * 1024 * 1024, // 10MB
    allowedContentTypes: ["multipart/form-data", "application/octet-stream"],
    customHeaders: {
      "X-API-Version": "1.0",
      "X-Upload-Enabled": "true",
    },
  });
}
