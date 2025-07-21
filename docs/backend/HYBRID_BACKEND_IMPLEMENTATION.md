# Hybrid Backend Implementation Guide

## 🚀 Progressive Enhancement Strategy: Start Small, Scale Smart

This guide implements a **hybrid approach** to backend development that builds upon your excellent 95% complete Next.js API foundation. The strategy is: enhance what you have, prepare for future scalability, and extract services only when justified by actual scale requirements.

## 📋 Philosophy & Principles

### Start Small, Move Fast

- Build upon your existing Next.js API routes and service layer
- Enhance current patterns rather than rebuilding from scratch
- Maintain development velocity while improving architecture

### Scale Responsibly

- Extract services only when justified by traffic, complexity, or team size
- Keep tightly coupled logic together in the monolith
- Use data-driven decisions for service boundaries

### Future-Proof Architecture

- Structure code for easy service extraction when needed
- Implement patterns that work in both monolith and microservices
- Maintain backward compatibility throughout migration

---

## 🏗️ Implementation Phases

## Phase 1: Enhanced Monolith (Week 1-2) ⚡ IMMEDIATE VALUE

### Goal: Improve your existing foundation without architectural changes

### 1.1 Enhance Existing API Routes

**Current State:** You have working API routes in `/packages/app/src/app/api/`
**Enhancement:** Add production-ready middleware and validation

#### API Structure Enhancement

```
packages/app/src/app/api/v1/
├── skills/
│   ├── route.ts           # Enhanced with Zod validation
│   └── [id]/route.ts      # Enhanced error handling
├── categories/
│   └── route.ts           # Enhanced with caching
├── assessments/           # NEW - assessment engine
│   ├── route.ts
│   └── [id]/route.ts
└── middleware/            # NEW - shared middleware
    ├── auth.ts            # Authentication middleware
    ├── validation.ts      # Request validation
    ├── rate-limit.ts      # Rate limiting with Redis
    └── logging.ts         # Request/response logging
```

#### Implementation Steps

**Step 1: Add Zod Validation**

```typescript
// packages/app/src/lib/validations/skills.ts
import { z } from "zod";

export const CreateSkillSchema = z.object({
  name: z.string().min(1).max(100),
  categoryId: z.string().uuid(),
  proficiency: z.number().int().min(0).max(10),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
});

export const UpdateSkillSchema = CreateSkillSchema.partial();
export const SkillsQuerySchema = z.object({
  categoryId: z.string().uuid().optional(),
  search: z.string().optional(),
  sortBy: z.enum(["name", "proficiency", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});
```

**Step 2: Enhanced API Route Example**

```typescript
// packages/app/src/app/api/v1/skills/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/middleware/auth";
import { validateRequest } from "@/lib/middleware/validation";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit";
import { CreateSkillSchema, SkillsQuerySchema } from "@/lib/validations/skills";
import { SkillsService } from "@/services/skills.service";

// Enhanced GET with validation and caching
export async function GET(request: NextRequest) {
  try {
    // Apply middleware
    const user = await authMiddleware(request);
    await rateLimitMiddleware(request, "skills-read", 100); // 100 requests per minute

    // Validate query parameters
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const validatedQuery = SkillsQuerySchema.parse(query);

    // Use existing service with enhancements
    const result = await SkillsService.getSkills(validatedQuery);

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, max-age=300", // 5 minute cache
        "X-Total-Count": result.skills.length.toString(),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Enhanced POST with validation
export async function POST(request: NextRequest) {
  try {
    const user = await authMiddleware(request);
    await rateLimitMiddleware(request, "skills-write", 20); // 20 writes per minute

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

**Step 3: Middleware Implementation**

```typescript
// packages/app/src/lib/middleware/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function authMiddleware(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new ApiError(401, "Unauthorized - Authentication required");
  }

  return session.user;
}

// packages/app/src/lib/middleware/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
});

export async function rateLimitMiddleware(
  request: NextRequest,
  identifier: string,
  limit: number
) {
  const ip = request.ip || "anonymous";
  const key = `${identifier}:${ip}`;

  const { success, remaining } = await ratelimit.limit(key);

  if (!success) {
    throw new ApiError(429, `Rate limit exceeded. Try again later.`);
  }

  return { remaining };
}
```

### 1.2 Docker Development Environment

**Goal:** Containerize your development environment for consistency

#### Docker Compose Setup

```yaml
# docker-compose.dev.yml
version: "3.8"

services:
  # Your existing Next.js app
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/skills_evaluation_dev
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev

  # PostgreSQL (you already have this configured)
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

  # Redis (you already have this configured)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # Optional: Database admin interface
  adminer:
    image: adminer
    ports:
      - "8080:8080"
    depends_on:
      - postgres

volumes:
  postgres_data:
  redis_data:
```

#### Development Dockerfile

```dockerfile
# Dockerfile.dev
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY packages/app/package*.json ./packages/app/
COPY packages/design-system/package*.json ./packages/design-system/
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npm run db:generate

EXPOSE 3000

# Development command with hot reloading
CMD ["npm", "run", "dev"]
```

### 1.3 Enhanced Service Layer

**Goal:** Strengthen your existing service patterns for future extraction

#### Service Enhancement Example

```typescript
// packages/app/src/services/skills.service.ts (Enhanced)
import { apiClient } from "@/lib/api-client";
import { Redis } from "@upstash/redis";
import type {
  SkillsResponse,
  SkillResponse,
  CreateSkillData,
  UpdateSkillData,
  SkillsFilters,
} from "./types";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export class SkillsService {
  /**
   * Get skills with caching and enhanced filtering
   */
  static async getSkills(filters: SkillsFilters = {}): Promise<SkillsResponse> {
    const cacheKey = `skills:${JSON.stringify(filters)}`;

    // Try cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return cached as SkillsResponse;
    }

    // Build query parameters
    const params = new URLSearchParams();
    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    if (filters.search) params.set("search", filters.search);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    if (filters.order) params.set("order", filters.order);

    const queryString = params.toString();
    const endpoint = queryString
      ? `/api/v1/skills?${queryString}`
      : "/api/v1/skills";

    const result = await apiClient.get<SkillsResponse>(endpoint);

    // Cache for 5 minutes
    await redis.setex(cacheKey, 300, JSON.stringify(result));

    return result;
  }

  /**
   * Create skill with cache invalidation
   */
  static async createSkill(data: CreateSkillData): Promise<SkillResponse> {
    const result = await apiClient.post<SkillResponse>("/api/v1/skills", data);

    // Invalidate relevant caches
    await this.invalidateSkillsCaches();

    return result;
  }

  /**
   * Background job processing with Inngest
   */
  static async scheduleSkillAnalysis(skillId: string): Promise<void> {
    // Use your existing Inngest configuration
    await inngest.send({
      name: "skill/analyze",
      data: { skillId },
    });
  }

  private static async invalidateSkillsCaches(): Promise<void> {
    const pattern = "skills:*";
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}
```

---

## Phase 2: Modular Monolith (Week 3-4) 📦 PREPARE FOR SCALE

### Goal: Organize code for easy future service extraction

### 2.1 Backend Core Package

**Create shared backend logic that can be extracted later**

```
packages/backend-core/
├── lib/                    # Shared utilities
│   ├── auth.ts            # Authentication utilities
│   ├── cache.ts           # Caching utilities
│   ├── database.ts        # Database utilities
│   ├── queue.ts           # Job queue utilities
│   └── validation.ts      # Shared validation schemas
├── services/              # Business logic services
│   ├── skills/            # Skills domain service
│   ├── categories/        # Categories domain service
│   ├── assessments/       # Assessments domain service
│   └── integrations/      # External integrations
├── middleware/            # Reusable middleware
│   ├── auth.ts
│   ├── cors.ts
│   ├── logging.ts
│   └── rate-limiting.ts
├── types/                 # Shared TypeScript types
│   ├── api.ts
│   ├── database.ts
│   └── services.ts
├── jobs/                  # Background job definitions
│   ├── skill-analysis.ts
│   ├── github-sync.ts
│   └── notifications.ts
└── package.json
```

#### Backend Core Package Setup

```json
// packages/backend-core/package.json
{
  "name": "@skills-eval/backend-core",
  "version": "1.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint src/",
    "test": "vitest"
  },
  "dependencies": {
    "@prisma/client": "^6.12.0",
    "@upstash/redis": "^1.35.1",
    "inngest": "^3.40.1",
    "zod": "^4.0.5"
  },
  "devDependencies": {
    "typescript": "^5",
    "vitest": "^3.2.4"
  }
}
```

### 2.2 Domain-Driven Service Organization

**Organize your existing services by business domain**

#### Skills Domain Service

```typescript
// packages/backend-core/src/services/skills/skills.service.ts
import { PrismaClient } from "@prisma/client";
import { SkillsRepository } from "./skills.repository";
import { SkillAnalyticsService } from "./skill-analytics.service";
import type {
  CreateSkillData,
  UpdateSkillData,
  SkillsFilters,
} from "../../types";

export class SkillsService {
  constructor(
    private prisma: PrismaClient,
    private repository: SkillsRepository,
    private analytics: SkillAnalyticsService
  ) {}

  async getSkills(userId: string, filters: SkillsFilters = {}) {
    const skills = await this.repository.findByUser(userId, filters);
    const stats = await this.analytics.getSkillsStats(userId);

    return {
      skills,
      stats,
      total: skills.length,
    };
  }

  async createSkill(userId: string, data: CreateSkillData) {
    // Business logic
    const skill = await this.repository.create({
      ...data,
      userId,
    });

    // Trigger analytics update (background job)
    await this.analytics.scheduleStatsUpdate(userId);

    return { skill };
  }

  async updateSkill(skillId: string, userId: string, data: UpdateSkillData) {
    // Authorization check
    await this.repository.validateOwnership(skillId, userId);

    const skill = await this.repository.update(skillId, data);

    return { skill };
  }
}
```

### 2.3 Integration Layer Preparation

**Prepare for external service integrations**

#### GitHub Integration Foundation

```typescript
// packages/backend-core/src/services/integrations/github.service.ts
export class GitHubIntegrationService {
  constructor(private token: string) {}

  async analyzeRepository(repoUrl: string, userId: string) {
    // This will be extracted to a separate service later
    // For now, implement as background job

    return await inngest.send({
      name: "github/analyze-repository",
      data: { repoUrl, userId },
    });
  }

  async getRepositories(userId: string) {
    // Implement GitHub API calls
    // This logic can be extracted to a separate service when needed
  }
}
```

---

## Phase 3: Service Extraction Foundation (Week 5-6) 🔧 FUTURE-PROOF

### Goal: Build infrastructure for future service extraction

### 3.1 API Gateway Layer

**Prepare for service distribution with gateway pattern**

```typescript
// packages/app/src/lib/gateway/router.ts
export class APIGateway {
  private services: Map<string, ServiceConfig> = new Map();

  constructor() {
    // For now, all services are internal
    this.registerService("skills", {
      type: "internal",
      handler: SkillsService,
    });

    this.registerService("categories", {
      type: "internal",
      handler: CategoriesService,
    });
  }

  async route(serviceName: string, method: string, data: any) {
    const service = this.services.get(serviceName);

    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }

    if (service.type === "internal") {
      return await service.handler[method](data);
    } else {
      // Future: route to external service
      return await this.callExternalService(service, method, data);
    }
  }

  // Future: implement external service calls
  private async callExternalService(
    service: ServiceConfig,
    method: string,
    data: any
  ) {
    // HTTP calls to external services
  }
}
```

### 3.2 Service Health Monitoring

**Add monitoring for future service extraction**

```typescript
// packages/backend-core/src/lib/health.ts
export class HealthChecker {
  private checks: HealthCheck[] = [];

  addCheck(name: string, check: () => Promise<boolean>) {
    this.checks.push({ name, check });
  }

  async runAllChecks(): Promise<HealthReport> {
    const results = await Promise.allSettled(
      this.checks.map(async ({ name, check }) => ({
        name,
        status: (await check()) ? "healthy" : "unhealthy",
        timestamp: new Date().toISOString(),
      }))
    );

    return {
      status: results.every(
        r => r.status === "fulfilled" && r.value.status === "healthy"
      )
        ? "healthy"
        : "unhealthy",
      checks: results.map(r =>
        r.status === "fulfilled"
          ? r.value
          : {
              name: "unknown",
              status: "error",
              timestamp: new Date().toISOString(),
            }
      ),
    };
  }
}

// Health check endpoint
// packages/app/src/app/api/health/route.ts
import { HealthChecker } from "@skills-eval/backend-core";

const healthChecker = new HealthChecker();

healthChecker.addCheck("database", async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
});

healthChecker.addCheck("redis", async () => {
  try {
    await redis.ping();
    return true;
  } catch {
    return false;
  }
});

export async function GET() {
  const health = await healthChecker.runAllChecks();
  return Response.json(health, {
    status: health.status === "healthy" ? 200 : 503,
  });
}
```

---

## Phase 4: Selective Service Extraction (Week 7+) ⚖️ SCALE AS NEEDED

### Goal: Extract services only when justified by scale

### 4.1 Service Extraction Decision Matrix

**When to extract a service:**

| Factor         | Monolith           | Extract Service          |
| -------------- | ------------------ | ------------------------ |
| **Traffic**    | < 1000 req/min     | > 1000 req/min           |
| **Team Size**  | < 3 developers     | > 3 developers           |
| **Deployment** | Weekly releases    | Need independent deploys |
| **Technology** | Same stack         | Different stack needed   |
| **Data**       | Shared database OK | Need data isolation      |
| **Complexity** | < 1000 LOC         | > 1000 LOC               |

### 4.2 Service Extraction Pattern

**Example: Extracting AI Service**

**Step 1: Create service package**

```
packages/ai-service/
├── src/
│   ├── app.ts           # Express app
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── middleware/      # Service middleware
├── Dockerfile
└── package.json
```

**Step 2: Implement service**

```typescript
// packages/ai-service/src/app.ts
import express from "express";
import { OpenAIService } from "./services/openai.service";

const app = express();

app.post("/recommendations/:userId", async (req, res) => {
  const { userId } = req.params;
  const { skills } = req.body;

  const recommendations = await OpenAIService.generateRecommendations(
    userId,
    skills
  );

  res.json({ recommendations });
});

export default app;
```

**Step 3: Update gateway to route to service**

```typescript
// packages/app/src/lib/gateway/router.ts
this.registerService("ai", {
  type: "external",
  url: process.env.AI_SERVICE_URL || "http://ai-service:3001",
});
```

### 4.3 What to Keep in Monolith

**Keep these in the monolith (they're fast and tightly coupled):**

- ✅ **Skills CRUD** - Fast database operations, frequently accessed
- ✅ **User Authentication** - Security critical, needs to be fast
- ✅ **Categories Management** - Simple CRUD, rarely changes
- ✅ **Dashboard APIs** - Aggregates data from multiple sources

**Extract only when justified:**

- 🔄 **AI Service** - External API calls, can be slow/expensive
- 🔄 **GitHub Integration** - External rate limits, complex processing
- 🔄 **Background Jobs** - Resource intensive, can be scaled separately
- 🔄 **Analytics** - Heavy computation, different scaling needs

---

## 🚀 Getting Started - Implementation Steps

### Week 1: Enhanced Monolith Setup

1. **Add API Versioning**

   ```bash
   mkdir -p packages/app/src/app/api/v1
   mv packages/app/src/app/api/skills packages/app/src/app/api/v1/
   mv packages/app/src/app/api/categories packages/app/src/app/api/v1/
   ```

2. **Install Additional Dependencies**

   ```bash
   cd packages/app
   npm install zod @upstash/ratelimit @upstash/redis
   ```

3. **Create Validation Schemas**

   ```bash
   mkdir -p packages/app/src/lib/validations
   # Create skills.ts, categories.ts schemas
   ```

4. **Enhance Existing API Routes**

   ```bash
   # Add middleware and validation to existing routes
   # Follow the examples in section 1.1
   ```

5. **Set Up Docker Development Environment**
   ```bash
   # Create docker-compose.dev.yml
   # Create Dockerfile.dev
   docker-compose -f docker-compose.dev.yml up
   ```

### Week 2: Testing and Optimization

1. **Add API Tests**

   ```bash
   # Test enhanced API routes
   npm run test
   ```

2. **Performance Testing**

   ```bash
   # Test with rate limiting
   # Verify caching works
   ```

3. **Documentation Updates**
   ```bash
   # Update API documentation
   # Document new development workflow
   ```

### Week 3-4: Modular Monolith

1. **Create Backend Core Package**

   ```bash
   mkdir -p packages/backend-core/src
   cd packages/backend-core
   npm init -y
   # Set up TypeScript and dependencies
   ```

2. **Extract Business Logic**

   ```bash
   # Move service logic to backend-core
   # Keep API routes thin, delegate to services
   ```

3. **Add Background Jobs**
   ```bash
   # Set up Inngest job definitions
   # Add job scheduling to services
   ```

---

## 📊 Success Metrics

### Phase 1 Success Criteria

- ✅ All existing API routes have validation and middleware
- ✅ Docker development environment working
- ✅ Rate limiting implemented with Redis
- ✅ API response times < 200ms for cached requests
- ✅ Zero breaking changes to frontend

### Phase 2 Success Criteria

- ✅ Backend-core package created and integrated
- ✅ Business logic separated from API routes
- ✅ Background jobs implemented for heavy operations
- ✅ Health monitoring endpoints active
- ✅ Code organized for easy service extraction

### Phase 3 Success Criteria

- ✅ API gateway pattern implemented
- ✅ Service extraction patterns documented
- ✅ Monitoring and logging infrastructure ready
- ✅ Decision matrix for service extraction defined

### Phase 4 Success Criteria

- ✅ First service extracted successfully (when justified)
- ✅ Zero downtime during service extraction
- ✅ Performance maintained or improved
- ✅ Development velocity maintained

---

## 🛠️ Development Workflow

### Daily Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Run quality checks
npm run type-check
npm run lint
npm run test

# API development and testing
curl -X POST http://localhost:3000/api/v1/skills \
  -H "Content-Type: application/json" \
  -d '{"name":"React","categoryId":"uuid","proficiency":8}'
```

### Service Extraction Workflow

```bash
# 1. Identify extraction candidate
npm run analyze-service-boundaries

# 2. Create service package
npx create-service ai-service

# 3. Extract service logic
npm run extract-service ai-service

# 4. Test service independently
cd packages/ai-service && npm test

# 5. Update gateway routing
npm run update-gateway-config

# 6. Deploy service
docker-compose up ai-service
```

---

## 🔍 Migration Patterns

### Service Extraction Checklist

**Before Extraction:**

- [ ] Service has > 1000 lines of code or > 1000 req/min traffic
- [ ] Team has > 3 developers or needs independent deployments
- [ ] Service logic is well-isolated and tested
- [ ] Data dependencies are clearly identified
- [ ] Monitoring and logging are in place

**During Extraction:**

- [ ] Create service package with same API interface
- [ ] Implement service with comprehensive tests
- [ ] Add health checks and monitoring
- [ ] Update gateway to route to new service
- [ ] Deploy service alongside monolith
- [ ] Gradually shift traffic to new service

**After Extraction:**

- [ ] Monitor service performance and errors
- [ ] Remove extracted code from monolith
- [ ] Update documentation and runbooks
- [ ] Train team on service operations

---

## 📚 Additional Resources

### Commands Reference

```bash
# Development
npm run dev                    # Start development server
docker-compose -f docker-compose.dev.yml up  # Start with Docker
npm run db:studio             # Database admin interface

# Quality Assurance
npm run type-check            # TypeScript validation
npm run lint                  # Code quality checks
npm run test                  # Run test suite
npm run quality               # All quality checks

# Service Management
npm run health-check          # Check service health
npm run analyze-boundaries    # Analyze service extraction opportunities
npm run extract-service <name> # Extract service to new package

# Production
docker-compose up             # Production deployment
npm run monitor               # Monitor service performance
```

### Integration Points

- **Frontend API Client**: Minimal changes, routes through enhanced APIs
- **Authentication**: Integrated with existing NextAuth patterns
- **Database**: Uses existing Prisma schema and connection
- **Caching**: Leverages configured Redis instance
- **Jobs**: Uses configured Inngest for background processing

This hybrid approach provides immediate improvements while building the foundation for future microservices architecture when scale and team size justify the complexity.
