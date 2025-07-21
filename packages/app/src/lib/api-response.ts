import { NextResponse } from "next/server";

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
  meta?: {
    pagination?: {
      total: number;
      limit: number;
      offset: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
    [key: string]: unknown;
  };
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
  timestamp: string;
}

export const apiResponse = {
  success: <T>(
    data: T,
    status = 200,
    message?: string,
    meta?: ApiSuccessResponse<T>["meta"]
  ): NextResponse => {
    const response: ApiSuccessResponse<T> = {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };

    if (message) response.message = message;
    if (meta) response.meta = meta;

    return NextResponse.json(response, { status });
  },

  error: (
    message: string,
    code: string,
    status = 400,
    details?: unknown
  ): NextResponse => {
    const response: ApiErrorResponse = {
      success: false,
      error: { message, code, details },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status });
  },
};

// Helper for paginated responses
export const paginatedResponse = <T>(
  data: T[],
  total: number,
  limit: number,
  offset: number,
  message?: string
) => {
  return apiResponse.success(data, 200, message, {
    pagination: {
      total,
      limit,
      offset,
      hasNext: offset + limit < total,
      hasPrevious: offset > 0,
    },
  });
};
