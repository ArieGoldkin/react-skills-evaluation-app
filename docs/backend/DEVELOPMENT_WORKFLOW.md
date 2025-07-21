# Backend Development Workflow

## 🚀 Docker-First Development Environment

This guide covers the enhanced development workflow for the hybrid backend implementation, focusing on Docker containerization, API development, and seamless integration with your existing frontend.

---

## 🛠️ Development Environment Setup

### Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development without Docker)
- Your existing `.env.local` file configured

### Quick Start

```bash
# 1. Start development environment with Docker
docker-compose -f docker-compose.dev.yml up

# 2. Access your application
# - Frontend: http://localhost:3000
# - Database Admin: http://localhost:8080 (Adminer)
# - API Health Check: http://localhost:3000/api/health

# 3. Run quality checks
npm run type-check
npm run lint
npm run test
```

---

## 📁 Docker Configuration Files

### Development Environment (`docker-compose.dev.yml`)

```yaml
version: "3.8"

services:
  # Next.js Application
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/skills_evaluation_dev
      - UPSTASH_REDIS_REST_URL=http://redis:6379
      - NEXTAUTH_SECRET=your-dev-secret-key
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - postgres
      - redis
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev

  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: skills_evaluation_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data
      - ./packages/app/prisma/migrations:/docker-entrypoint-initdb.d

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_dev_data:/data

  # Database Admin Interface
  adminer:
    image: adminer
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    environment:
      ADMINER_DEFAULT_SERVER: postgres

volumes:
  postgres_dev_data:
  redis_dev_data:
```

### Development Dockerfile (`Dockerfile.dev`)

```dockerfile
# Development Dockerfile with hot reloading
FROM node:18-alpine

WORKDIR /app

# Install dependencies for development
COPY package*.json ./
COPY packages/app/package*.json ./packages/app/
COPY packages/design-system/package*.json ./packages/design-system/

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Build design system
RUN npm run design-system:build

# Generate Prisma client
WORKDIR /app/packages/app
RUN npm run db:generate

# Return to app root
WORKDIR /app

# Expose port
EXPOSE 3000

# Start development server with hot reloading
CMD ["npm", "run", "dev"]
```

---

## 🔄 Daily Development Workflow

### 1. Start Development Environment

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up

# Start in background
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f app
```

### 2. Database Operations

```bash
# Generate Prisma client (after schema changes)
docker-compose exec app npm run db:generate

# Run database migrations
docker-compose exec app npm run db:migrate

# Seed database with test data
docker-compose exec app npm run db:seed

# Open Prisma Studio
docker-compose exec app npm run db:studio

# Reset database (caution: deletes all data)
docker-compose exec app npm run db:reset
```

### 3. API Development and Testing

```bash
# Test API endpoints
curl -X GET http://localhost:3000/api/v1/skills \
  -H "Content-Type: application/json"

# Test with authentication (get token from browser)
curl -X POST http://localhost:3000/api/v1/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token" \
  -d '{"name":"React","categoryId":"uuid-here","proficiency":8}'

# Check API health
curl http://localhost:3000/api/health

# Test rate limiting
for i in {1..25}; do
  curl -X GET http://localhost:3000/api/v1/skills
done
```

### 4. Code Quality and Testing

```bash
# Run type checking
docker-compose exec app npm run type-check

# Run linting
docker-compose exec app npm run lint

# Fix linting issues
docker-compose exec app npm run lint:fix

# Run tests
docker-compose exec app npm run test

# Run tests in watch mode
docker-compose exec app npm run test:watch

# Check test coverage
docker-compose exec app npm run test:coverage
```

---

## 🔧 API Development Patterns

### Enhanced API Route Structure

```
packages/app/src/app/api/v1/
├── skills/
│   ├── route.ts              # GET /api/v1/skills, POST /api/v1/skills
│   └── [id]/
│       └── route.ts          # GET,PUT,DELETE /api/v1/skills/[id]
├── categories/
│   ├── route.ts              # Categories CRUD
│   └── [id]/route.ts
├── assessments/
│   ├── route.ts              # Assessment engine
│   └── [id]/route.ts
└── health/
    └── route.ts              # Health check endpoint
```

### API Route Template

```typescript
// packages/app/src/app/api/v1/skills/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit";
import { validateRequest } from "@/lib/middleware/validation";
import { handleApiError } from "@/lib/errors";
import { SkillsService } from "@/services/skills.service";
import { CreateSkillSchema, SkillsQuerySchema } from "@/lib/validations/skills";

export async function GET(request: NextRequest) {
  try {
    // Apply middleware in sequence
    const user = await authMiddleware(request);
    await rateLimitMiddleware(request, "skills-read", 100);

    // Validate query parameters
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const validatedQuery = SkillsQuerySchema.parse(query);

    // Business logic (use existing service)
    const result = await SkillsService.getSkills(validatedQuery);

    // Return response with caching headers
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, max-age=300",
        "X-Total-Count": result.total?.toString() || "0",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request);
    await rateLimitMiddleware(request, "skills-write", 20);

    const body = await request.json();
    const validatedData = CreateSkillSchema.parse(body);

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

### Middleware Implementation

```typescript
// packages/app/src/lib/middleware/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";
import { ApiError } from "@/lib/errors";

export async function authMiddleware(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new ApiError(401, "Authentication required");
  }

  return session.user;
}
```

```typescript
// packages/app/src/lib/middleware/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";
import { ApiError } from "@/lib/errors";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const rateLimits = new Map<string, Ratelimit>();

export async function rateLimitMiddleware(
  request: NextRequest,
  identifier: string,
  limit: number
) {
  if (!rateLimits.has(identifier)) {
    rateLimits.set(
      identifier,
      new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, "1 m"),
      })
    );
  }

  const ratelimit = rateLimits.get(identifier)!;
  const ip =
    request.ip || request.headers.get("x-forwarded-for") || "anonymous";
  const key = `${identifier}:${ip}`;

  const { success, remaining, reset } = await ratelimit.limit(key);

  if (!success) {
    throw new ApiError(
      429,
      `Rate limit exceeded. Try again in ${Math.round((reset - Date.now()) / 1000)} seconds.`
    );
  }

  return { remaining, reset };
}
```

### Error Handling

```typescript
// packages/app/src/lib/errors.ts
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status }
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: error.errors.map(e => ({
          field: e.path.join("."),
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  // Generic server error
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
```

---

## 📊 Monitoring and Debugging

### Health Check Endpoint

```typescript
// packages/app/src/app/api/health/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Redis } from "@upstash/redis";

const prisma = new PrismaClient();
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  const checks = {
    database: false,
    redis: false,
    timestamp: new Date().toISOString(),
  };

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch (error) {
    console.error("Database health check failed:", error);
  }

  try {
    // Check Redis connection
    await redis.ping();
    checks.redis = true;
  } catch (error) {
    console.error("Redis health check failed:", error);
  }

  const isHealthy = checks.database && checks.redis;

  return NextResponse.json(
    {
      status: isHealthy ? "healthy" : "unhealthy",
      checks,
      version: process.env.npm_package_version || "unknown",
    },
    { status: isHealthy ? 200 : 503 }
  );
}
```

### Logging Configuration

```typescript
// packages/app/src/lib/logger.ts
export class Logger {
  static info(message: string, data?: any) {
    console.log(`[INFO] ${new Date().toISOString()} ${message}`, data || "");
  }

  static error(message: string, error?: any) {
    console.error(
      `[ERROR] ${new Date().toISOString()} ${message}`,
      error || ""
    );
  }

  static warn(message: string, data?: any) {
    console.warn(`[WARN] ${new Date().toISOString()} ${message}`, data || "");
  }

  static debug(message: string, data?: any) {
    if (process.env.NODE_ENV === "development") {
      console.debug(
        `[DEBUG] ${new Date().toISOString()} ${message}`,
        data || ""
      );
    }
  }
}
```

### Docker Debugging Commands

```bash
# View container logs
docker-compose -f docker-compose.dev.yml logs app
docker-compose -f docker-compose.dev.yml logs postgres
docker-compose -f docker-compose.dev.yml logs redis

# Execute commands in running container
docker-compose exec app bash
docker-compose exec app npm run db:studio
docker-compose exec postgres psql -U postgres -d skills_evaluation_dev

# Inspect container configuration
docker-compose exec app env
docker inspect $(docker-compose ps -q app)

# Monitor resource usage
docker stats
```

---

## 🔄 Integration with Frontend

### API Client Configuration

Your existing API client requires minimal changes:

```typescript
// packages/app/src/lib/api-client.ts (Enhanced)
import { getSession } from "next-auth/react";

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number = 10000;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseURL}/api/v1${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add authentication header if available
    if (!options.skipAuth) {
      const session = await getSession();
      if (session?.accessToken) {
        headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }

    const config: RequestInit = {
      method: options.method || "GET",
      headers,
      body: options.data ? JSON.stringify(options.data) : undefined,
      signal: AbortSignal.timeout(options.timeout || this.defaultTimeout),
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiClientError(
        response.status,
        errorData.error || response.statusText,
        errorData.code
      );
    }

    return response.json();
  }

  // Keep existing methods (get, post, put, delete)
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  // ... other methods remain the same
}

export const apiClient = new ApiClient();
```

### TanStack Query Integration

Your existing query hooks work seamlessly:

```typescript
// packages/app/src/hooks/queries/use-skills.ts (No changes needed)
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SkillsService } from "@/services/skills.service";

export const useSkills = (filters = {}) => {
  return useQuery({
    queryKey: skillsKeys.list(filters),
    queryFn: () => SkillsService.getSkills(filters), // Routes to /api/v1/skills
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SkillsService.createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: skillsKeys.all });
    },
  });
};
```

---

## 🚀 Production Deployment

### Production Docker Configuration

```yaml
# docker-compose.yml (Production)
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### Production Dockerfile

```dockerfile
# Multi-stage production build
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY packages/app/package*.json ./packages/app/
COPY packages/design-system/package*.json ./packages/design-system/

FROM base AS deps
RUN npm ci --only=production && npm cache clean --force

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build:all

FROM node:18-alpine AS runtime
WORKDIR /app

# Copy built application
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/packages/app/.next ./packages/app/.next
COPY --from=build /app/packages/app/public ./packages/app/public
COPY --from=build /app/packages/app/package.json ./packages/app/
COPY --from=build /app/package.json ./

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 📋 Development Checklist

### Daily Development Tasks

- [ ] Start Docker development environment
- [ ] Check health endpoint (http://localhost:3000/api/health)
- [ ] Run quality checks before committing
- [ ] Test API endpoints with sample data
- [ ] Verify frontend integration works

### Before Creating Pull Request

- [ ] All tests pass (`npm run test`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] API endpoints documented
- [ ] Error handling tested
- [ ] Rate limiting verified
- [ ] Database migrations applied

### Weekly Maintenance

- [ ] Update Docker images (`docker-compose pull`)
- [ ] Clean up unused containers (`docker system prune`)
- [ ] Review application logs for errors
- [ ] Monitor API response times
- [ ] Check database performance

This development workflow provides a solid foundation for building and maintaining your enhanced backend while preparing for future microservices architecture.
