import { NextRequest } from "next/server";
import { z } from "zod";

export class ValidationError extends Error {
  constructor(
    public errors: z.ZodIssue[],
    message = "Validation failed"
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Validates request body against a Zod schema
 */
export function validateRequestBody<T>(schema: z.ZodSchema<T>) {
  return async (request: NextRequest): Promise<T> => {
    try {
      const body = await request.json();
      return schema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError((error as any).errors);
      }
      if (error instanceof SyntaxError) {
        throw new ValidationError(
          [
            {
              code: "custom" as const,
              message: "Invalid JSON format",
              path: [],
              input: undefined,
            },
          ],
          "Invalid JSON in request body"
        );
      }
      throw error;
    }
  };
}

/**
 * Validates query parameters against a Zod schema
 */
export function validateQueryParams<T>(schema: z.ZodSchema<T>) {
  return (request: NextRequest): T => {
    try {
      const url = new URL(request.url);
      const params = Object.fromEntries(url.searchParams.entries());
      return schema.parse(params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError((error as any).errors);
      }
      throw error;
    }
  };
}

/**
 * Validates URL path parameters against a Zod schema
 */
export function validatePathParams<T>(
  schema: z.ZodSchema<T>,
  pathParams: Record<string, string>
) {
  return (): T => {
    try {
      return schema.parse(pathParams);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError((error as any).errors);
      }
      throw error;
    }
  };
}

/**
 * Common path parameter schemas
 */
export const PathParamsSchema = {
  id: z.object({
    id: z.string().cuid("Invalid ID format"),
  }),
  slug: z.object({
    slug: z.string().min(1, "Slug is required"),
  }),
  userId: z.object({
    userId: z.string().cuid("Invalid user ID format"),
  }),
};

/**
 * Validates file upload
 */
export function validateFileUpload(
  allowedTypes: string[],
  maxSizeBytes: number = 5 * 1024 * 1024 // 5MB default
) {
  return async (request: NextRequest): Promise<globalThis.File> => {
    const formData = await request.formData();
    const file = formData.get("file") as globalThis.File | null;

    if (!file) {
      throw new ValidationError([
        {
          code: "custom" as const,
          message: "File is required",
          path: ["file"],
          input: undefined,
        },
      ]);
    }

    if (!allowedTypes.includes(file.type)) {
      throw new ValidationError([
        {
          code: "custom" as const,
          message: `File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(", ")}`,
          path: ["file"],
          input: file.type,
        },
      ]);
    }

    if (file.size > maxSizeBytes) {
      throw new ValidationError([
        {
          code: "custom" as const,
          message: `File size ${Math.round(file.size / 1024)}KB exceeds maximum ${Math.round(maxSizeBytes / 1024)}KB`,
          path: ["file"],
          input: file.size,
        },
      ]);
    }

    return file;
  };
}

/**
 * Sanitizes HTML content to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "");
}

/**
 * Validates and sanitizes search query
 */
export const SearchQuerySchema = z.object({
  q: z
    .string()
    .min(1, "Search query is required")
    .max(100, "Search query too long")
    .transform(val => val.trim())
    .refine(val => val.length > 0, "Search query cannot be empty"),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;
