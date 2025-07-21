# API Enhancement Guide

## 🚀 Enhancing Your Existing Next.js API Routes

This guide shows you how to transform your current 95% complete Next.js API foundation into a production-ready, scalable backend while preserving all existing functionality.

---

## 📋 Current State Assessment

### What You Already Have (95% Complete!)

- ✅ **Working API Routes**: `/api/skills/`, `/api/categories/`
- ✅ **Service Layer**: Well-structured service classes
- ✅ **Database Integration**: Prisma ORM with comprehensive schema
- ✅ **Authentication**: NextAuth with Google OAuth
- ✅ **API Client**: Centralized HTTP client with TanStack Query
- ✅ **Type Safety**: Full TypeScript integration
- ✅ **Error Handling**: Basic error boundaries

### What We'll Add (The Missing 5%)

- 🔄 **Request Validation**: Zod schemas for all endpoints
- 🔄 **Rate Limiting**: Redis-based request throttling
- 🔄 **API Versioning**: Future-proof URL structure
- 🔄 **Enhanced Middleware**: Authentication, logging, CORS
- 🔄 **Production Monitoring**: Health checks and metrics
- 🔄 **Docker Environment**: Containerized development workflow

---

## 🎯 Enhancement Strategy

### Phase 1: API Versioning and Structure

#### Step 1: Migrate to Versioned URLs

```bash
# Create versioned API structure
mkdir -p packages/app/src/app/api/v1

# Move existing routes
mv packages/app/src/app/api/skills packages/app/src/app/api/v1/
mv packages/app/src/app/api/categories packages/app/src/app/api/v1/
```

#### Step 2: Update API Client Base URL

```typescript
// packages/app/src/lib/api-client.ts (Minimal change)
class ApiClient {
  private baseURL: string;

  constructor() {
    // Add /v1 prefix to all API calls
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    // Automatically prefix with /v1
    const url = `${this.baseURL}/api/v1${endpoint}`;

    // Rest of your existing implementation remains the same
    // ...
  }
}
```

#### Step 3: Update Service Layer

```typescript
// packages/app/src/services/skills.service.ts (Minimal change)
export class SkillsService {
  static async getSkills(filters: SkillsFilters = {}): Promise<SkillsResponse> {
    const params = new URLSearchParams();
    // ... existing parameter building logic

    // Change endpoint to v1
    const endpoint = queryString ? `/skills?${queryString}` : "/skills";
    return apiClient.get<SkillsResponse>(endpoint); // Auto-prefixed to /api/v1/skills
  }

  // All other methods remain exactly the same
}
```

### Phase 2: Request Validation with Zod

#### Step 1: Create Validation Schemas

```typescript
// packages/app/src/lib/validations/skills.ts (NEW FILE)
import { z } from "zod";

// Skill creation schema
export const CreateSkillSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  categoryId: z.string().uuid("Invalid category ID"),
  proficiency: z
    .number()
    .int("Proficiency must be an integer")
    .min(0, "Proficiency must be at least 0")
    .max(10, "Proficiency must be at most 10"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),
});

// Skill update schema (all fields optional)
export const UpdateSkillSchema = CreateSkillSchema.partial();

// Query parameters schema
export const SkillsQuerySchema = z.object({
  categoryId: z.string().uuid().optional(),
  search: z.string().min(1).max(100).optional(),
  sortBy: z.enum(["name", "proficiency", "createdAt", "updatedAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

// Export types for use in components
export type CreateSkillData = z.infer<typeof CreateSkillSchema>;
export type UpdateSkillData = z.infer<typeof UpdateSkillSchema>;
export type SkillsQuery = z.infer<typeof SkillsQuerySchema>;
```

#### Step 2: Create Validation Middleware

```typescript
// packages/app/src/lib/middleware/validation.ts (NEW FILE)
import { NextRequest } from "next/server";
import { z } from "zod";

export class ValidationError extends Error {
  constructor(
    public errors: z.ZodError["errors"],
    message = "Validation failed"
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateRequestBody<T>(schema: z.ZodSchema<T>) {
  return async (request: NextRequest): Promise<T> => {
    try {
      const body = await request.json();
      return schema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error.errors);
      }
      throw error;
    }
  };
}

export function validateQueryParams<T>(schema: z.ZodSchema<T>) {
  return (request: NextRequest): T => {
    try {
      const url = new URL(request.url);
      const params = Object.fromEntries(url.searchParams.entries());
      return schema.parse(params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error.errors);
      }
      throw error;
    }
  };
}
```

#### Step 3: Enhance Existing API Routes

```typescript
// packages/app/src/app/api/v1/skills/route.ts (Enhanced version of your existing route)
import { NextRequest, NextResponse } from "next/server";
import { SkillsService } from "@/services/skills.service";
import {
  validateQueryParams,
  validateRequestBody,
} from "@/lib/middleware/validation";
import { CreateSkillSchema, SkillsQuerySchema } from "@/lib/validations/skills";
import { authMiddleware } from "@/lib/middleware/auth";
import { handleApiError } from "@/lib/errors";

// Enhanced GET endpoint with validation
export async function GET(request: NextRequest) {
  try {
    // Authenticate user (using your existing auth)
    const user = await authMiddleware(request);

    // Validate query parameters
    const query = validateQueryParams(SkillsQuerySchema)(request);

    // Use your existing service (no changes needed)
    const result = await SkillsService.getSkills(query);

    // Return with enhanced headers
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, max-age=300", // 5 minute cache
        "X-Total-Count": result.total?.toString() || "0",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Enhanced POST endpoint with validation
export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request);

    // Validate request body
    const validatedData = await validateRequestBody(CreateSkillSchema)(request);

    // Use your existing service with validated data
    const result = await SkillsService.createSkill({
      ...validatedData,
      userId: user.id, // Add user context
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
```

### Phase 3: Rate Limiting with Redis

#### Step 1: Install Rate Limiting Dependencies

```bash
cd packages/app
npm install @upstash/ratelimit @upstash/redis
```

#### Step 2: Create Rate Limiting Middleware

```typescript
// packages/app/src/lib/middleware/rate-limit.ts (NEW FILE)
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

// Initialize Redis client (using your existing Redis config)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limit configurations for different operations
const rateLimiters = {
  // Read operations: 100 requests per minute
  "skills-read": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 m"),
    analytics: true,
  }),

  // Write operations: 20 requests per minute
  "skills-write": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 m"),
    analytics: true,
  }),

  // AI operations: 10 requests per minute (expensive)
  "ai-requests": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
  }),
};

export class RateLimitError extends Error {
  constructor(
    public limit: number,
    public remaining: number,
    public reset: number
  ) {
    super(`Rate limit exceeded. Limit: ${limit}, Remaining: ${remaining}`);
    this.name = "RateLimitError";
  }
}

export async function rateLimitMiddleware(
  request: NextRequest,
  operation: keyof typeof rateLimiters
) {
  const ratelimit = rateLimiters[operation];

  // Use IP address as identifier (could also use user ID for authenticated requests)
  const ip =
    request.ip || request.headers.get("x-forwarded-for") || "anonymous";
  const key = `${operation}:${ip}`;

  const { success, limit, remaining, reset } = await ratelimit.limit(key);

  if (!success) {
    throw new RateLimitError(limit, remaining, reset);
  }

  return { limit, remaining, reset };
}
```

#### Step 3: Apply Rate Limiting to API Routes

```typescript
// packages/app/src/app/api/v1/skills/route.ts (Add rate limiting)
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit";

export async function GET(request: NextRequest) {
  try {
    const user = await authMiddleware(request);

    // Apply rate limiting for read operations
    const rateLimitInfo = await rateLimitMiddleware(request, "skills-read");

    const query = validateQueryParams(SkillsQuerySchema)(request);
    const result = await SkillsService.getSkills(query);

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, max-age=300",
        "X-Total-Count": result.total?.toString() || "0",
        // Add rate limit info to response headers
        "X-RateLimit-Limit": rateLimitInfo.limit.toString(),
        "X-RateLimit-Remaining": rateLimitInfo.remaining.toString(),
        "X-RateLimit-Reset": rateLimitInfo.reset.toString(),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request);

    // Apply stricter rate limiting for write operations
    await rateLimitMiddleware(request, "skills-write");

    const validatedData = await validateRequestBody(CreateSkillSchema)(request);
    const result = await SkillsService.createSkill({
      ...validatedData,
      userId: user.id,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
```

### Phase 4: Enhanced Error Handling

#### Step 1: Create Comprehensive Error Handler

```typescript
// packages/app/src/lib/errors.ts (Enhanced version)
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ValidationError } from "./middleware/validation";
import { RateLimitError } from "./middleware/rate-limit";
import { ApiClientError } from "./api-client";

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error);

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

  // Handle validation errors
  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        details: error.errors.map(e => ({
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
    const retryAfter = Math.round((error.reset - Date.now()) / 1000);

    return NextResponse.json(
      {
        error: error.message,
        code: "RATE_LIMIT_EXCEEDED",
        details: {
          limit: error.limit,
          remaining: error.remaining,
          retryAfter,
        },
      },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
          "X-RateLimit-Limit": error.limit.toString(),
          "X-RateLimit-Remaining": error.remaining.toString(),
          "X-RateLimit-Reset": error.reset.toString(),
        },
      }
    );
  }

  // Handle Zod validation errors (fallback)
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Validation failed",
        code: "SCHEMA_VALIDATION_ERROR",
        details: error.errors,
      },
      { status: 400 }
    );
  }

  // Handle Prisma errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as { code: string; message: string };

    switch (prismaError.code) {
      case "P2002":
        return NextResponse.json(
          { error: "Resource already exists", code: "DUPLICATE_ERROR" },
          { status: 409 }
        );
      case "P2025":
        return NextResponse.json(
          { error: "Resource not found", code: "NOT_FOUND_ERROR" },
          { status: 404 }
        );
      default:
        console.error("Unhandled Prisma error:", prismaError);
    }
  }

  // Generic server error
  return NextResponse.json(
    {
      error:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : error instanceof Error
            ? error.message
            : "Unknown error",
      code: "INTERNAL_ERROR",
    },
    { status: 500 }
  );
}
```

### Phase 5: Authentication Middleware

#### Step 1: Create Auth Middleware

```typescript
// packages/app/src/lib/middleware/auth.ts (Enhanced version)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";
import { ApiError } from "@/lib/errors";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

export async function authMiddleware(
  request: NextRequest
): Promise<AuthenticatedUser> {
  // Get session using your existing NextAuth config
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new ApiError(401, "Authentication required", "AUTH_REQUIRED");
  }

  if (!session.user.email) {
    throw new ApiError(401, "Invalid user session", "INVALID_SESSION");
  }

  return {
    id: session.user.id || session.user.email, // Fallback to email if no ID
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
  };
}

// Optional: Role-based authentication
export function requireRole(role: string) {
  return async (request: NextRequest): Promise<AuthenticatedUser> => {
    const user = await authMiddleware(request);

    // Add role checking logic if you implement roles
    // For now, all authenticated users have access

    return user;
  };
}

// Optional: Admin-only middleware
export async function adminMiddleware(
  request: NextRequest
): Promise<AuthenticatedUser> {
  const user = await authMiddleware(request);

  // Check if user is admin (implement based on your needs)
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];

  if (!adminEmails.includes(user.email)) {
    throw new ApiError(403, "Admin access required", "ADMIN_REQUIRED");
  }

  return user;
}
```

### Phase 6: Health Monitoring

#### Step 1: Create Health Check Endpoint

```typescript
// packages/app/src/app/api/health/route.ts (NEW FILE)
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Redis } from "@upstash/redis";

const prisma = new PrismaClient();
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface HealthCheck {
  service: string;
  status: "healthy" | "unhealthy" | "degraded";
  responseTime: number;
  details?: string;
}

export async function GET() {
  const startTime = Date.now();
  const checks: HealthCheck[] = [];

  // Check database connection
  const dbStart = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.push({
      service: "database",
      status: "healthy",
      responseTime: Date.now() - dbStart,
    });
  } catch (error) {
    checks.push({
      service: "database",
      status: "unhealthy",
      responseTime: Date.now() - dbStart,
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }

  // Check Redis connection
  const redisStart = Date.now();
  try {
    await redis.ping();
    checks.push({
      service: "redis",
      status: "healthy",
      responseTime: Date.now() - redisStart,
    });
  } catch (error) {
    checks.push({
      service: "redis",
      status: "unhealthy",
      responseTime: Date.now() - redisStart,
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }

  // Determine overall health
  const hasUnhealthy = checks.some(check => check.status === "unhealthy");
  const hasDegraded = checks.some(check => check.status === "degraded");

  const overallStatus = hasUnhealthy
    ? "unhealthy"
    : hasDegraded
      ? "degraded"
      : "healthy";
  const responseTime = Date.now() - startTime;

  const healthReport = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    responseTime,
    version: process.env.npm_package_version || "1.0.0",
    environment: process.env.NODE_ENV || "development",
    checks,
  };

  // Return appropriate status code
  const statusCode =
    overallStatus === "healthy"
      ? 200
      : overallStatus === "degraded"
        ? 200
        : 503;

  return NextResponse.json(healthReport, { status: statusCode });
}
```

---

## 🧪 Testing Your Enhanced APIs

### API Testing Examples

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test skills API with authentication
curl -X GET "http://localhost:3000/api/v1/skills?limit=10" \
  -H "Cookie: next-auth.session-token=your-session-token"

# Test validation (should return 400)
curl -X POST "http://localhost:3000/api/v1/skills" \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=your-session-token" \
  -d '{"name":"","proficiency":15}' # Invalid data

# Test rate limiting (make many requests quickly)
for i in {1..25}; do
  curl -X GET "http://localhost:3000/api/v1/skills"
done
```

### Integration with Your Frontend

Your existing frontend code requires **zero changes**! The API client automatically routes to `/api/v1/` endpoints:

```typescript
// This code remains exactly the same in your components
const { data: skills } = useSkills(filters);
const createSkill = useCreateSkill();

// Under the hood, requests now go to:
// GET /api/v1/skills (instead of /api/skills)
// POST /api/v1/skills (instead of /api/skills)
```

---

## 📊 Monitoring and Observability

### Request Logging Middleware

```typescript
// packages/app/src/lib/middleware/logging.ts (NEW FILE)
import { NextRequest } from "next/server";

export class RequestLogger {
  static log(
    request: NextRequest,
    response: { status: number },
    duration: number
  ) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      status: response.status,
      duration,
      ip: request.ip || request.headers.get("x-forwarded-for"),
      userAgent: request.headers.get("user-agent"),
    };

    // In development, log to console
    if (process.env.NODE_ENV === "development") {
      console.log(
        `${logEntry.method} ${logEntry.url} - ${logEntry.status} (${logEntry.duration}ms)`
      );
    }

    // In production, you might send to a logging service
    // Example: sendToLoggingService(logEntry);
  }
}

// Usage in API routes
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // ... your API logic
    const response = NextResponse.json(result);

    RequestLogger.log(request, { status: 200 }, Date.now() - startTime);
    return response;
  } catch (error) {
    RequestLogger.log(request, { status: 500 }, Date.now() - startTime);
    return handleApiError(error);
  }
}
```

### Performance Metrics

```typescript
// packages/app/src/lib/metrics.ts (NEW FILE)
export class MetricsCollector {
  private static metrics: Map<string, number[]> = new Map();

  static recordResponseTime(endpoint: string, duration: number) {
    if (!this.metrics.has(endpoint)) {
      this.metrics.set(endpoint, []);
    }

    const times = this.metrics.get(endpoint)!;
    times.push(duration);

    // Keep only last 100 measurements
    if (times.length > 100) {
      times.shift();
    }
  }

  static getStats(endpoint: string) {
    const times = this.metrics.get(endpoint) || [];

    if (times.length === 0) {
      return null;
    }

    const sorted = [...times].sort((a, b) => a - b);

    return {
      count: times.length,
      avg: times.reduce((a, b) => a + b, 0) / times.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    };
  }
}
```

---

## 🚀 Deployment Preparation

### Environment Variables

```bash
# .env.local (Development)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/skills_evaluation_dev"
UPSTASH_REDIS_REST_URL="http://localhost:6379"
NEXTAUTH_SECRET="your-dev-secret"
NEXTAUTH_URL="http://localhost:3000"

# Additional for enhanced features
ADMIN_EMAILS="admin@yourcompany.com,devops@yourcompany.com"
RATE_LIMIT_ENABLED="true"
API_LOGGING_ENABLED="true"
```

### Docker Development Setup

```yaml
# docker-compose.dev.yml
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/skills_evaluation_dev
      - UPSTASH_REDIS_REST_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - .:/app
      - /app/node_modules

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: skills_evaluation_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## ✅ Implementation Checklist

### Phase 1: API Structure (Week 1)

- [ ] Create `/api/v1/` directory structure
- [ ] Move existing routes to versioned structure
- [ ] Update API client to use versioned URLs
- [ ] Test existing functionality works with new structure

### Phase 2: Validation & Middleware (Week 2)

- [ ] Install Zod and create validation schemas
- [ ] Implement validation middleware
- [ ] Add validation to all existing routes
- [ ] Create comprehensive error handling
- [ ] Add authentication middleware to protected routes

### Phase 3: Rate Limiting & Monitoring (Week 2)

- [ ] Implement rate limiting with Redis
- [ ] Add health check endpoint
- [ ] Implement request logging
- [ ] Add performance metrics collection
- [ ] Test rate limiting functionality

### Phase 4: Testing & Documentation (Week 2)

- [ ] Write integration tests for enhanced APIs
- [ ] Document new API features
- [ ] Create troubleshooting guide
- [ ] Verify frontend integration works seamlessly

This enhancement guide transforms your excellent foundation into a production-ready API while maintaining 100% backward compatibility with your existing frontend code. The changes are incremental and can be implemented without disrupting your current development workflow.
