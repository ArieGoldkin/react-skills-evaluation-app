# Backend API Development Guidelines

## Overview

This document defines mandatory quality rules and patterns for Next.js API development in the Skills Evaluation monorepo. These rules MUST be applied to EVERY backend development task to ensure maintainability, performance, type safety, and consistency.

**Critical Rules**: These rules are automatically enforced by Claude AI during backend development.

---

## 🚨 File Size & Complexity Rules

### 1. API Route File Size Limit

- **Maximum Lines**: 180 lines per API route file
- **Enforcement**: MANDATORY - No exceptions
- **Action Required**: If exceeded, split into handler/utility pattern

### 2. Handler Function Size Limit

- **Maximum Lines**: 80 lines per handler function
- **Enforcement**: MANDATORY
- **Action Required**: Extract utilities, helpers, or sub-functions

### 3. Function Complexity Limit

- **Maximum Cyclomatic Complexity**: 11 per function
- **Measurement**: Count decision points (if, switch, loops, ternary operators)
- **Action Required**: Extract functions or use early returns

---

## 🌐 API URL Structure Rules

### MANDATORY: Use v1 API Versioning

ALL new backend API endpoints MUST use the `/api/v1/` prefix:

```
✅ CORRECT API URLs:
/api/v1/skills
/api/v1/skills/123
/api/v1/categories
/api/v1/categories/456
/api/v1/assessments
/api/v1/users/profile

❌ NEVER CREATE:
/api/skills          # Missing version prefix
/api/categories      # Missing version prefix
/api/v2/skills       # v2 not approved yet
/skills              # Missing /api prefix
```

### URL Structure Rules

1. **Base Pattern**: `/api/v1/[resource]/[id?]/[sub-resource?]`
2. **Resource Naming**: Use plural nouns (`skills`, `categories`, `assessments`)
3. **ID Parameters**: Use CUID format for resource IDs
4. **Query Parameters**: Use camelCase (`sortBy`, `categoryId`, `maxResults`)

### URL Examples

```typescript
// ✅ CORRECT URL patterns
GET    /api/v1/skills                           # List all skills
GET    /api/v1/skills?sortBy=updatedAt&order=desc  # List with sorting
GET    /api/v1/skills/clx1234567890             # Get specific skill
POST   /api/v1/skills                           # Create new skill
PUT    /api/v1/skills/clx1234567890             # Update skill
DELETE /api/v1/skills/clx1234567890             # Delete skill

GET    /api/v1/skills/analytics                 # Skills analytics
GET    /api/v1/skills/bulk                      # Bulk operations
POST   /api/v1/skills/bulk                      # Bulk create/update

GET    /api/v1/categories/clx1234567890/skills  # Skills in category
```

### Backward Compatibility Pattern

For legacy support, create proxy routes at root level that redirect to v1:

```typescript
// src/app/api/[resource]/route.ts - PROXY ONLY
import {
  handleGetResource,
  handleCreateResource,
} from "../v1/[resource]/handlers";

// Proxy to v1 handlers
export const GET = handleGetResource;
export const POST = handleCreateResource;
```

**WARNING**: Only use proxy pattern for existing legacy URLs. All NEW endpoints must start with `/api/v1/`.

## 📁 Required File Structure Pattern

### API Route Organization

Every API route MUST follow this modular structure under `/api/v1/`:

```
src/app/api/v1/[resource]/[id?]/
├── route.ts                    # Main route file (exports only)
├── handlers/
│   ├── index.ts               # Handler exports
│   ├── get-[resource].ts      # GET handler
│   ├── create-[resource].ts   # POST handler
│   ├── update-[resource].ts   # PUT/PATCH handler
│   └── delete-[resource].ts   # DELETE handler
└── utils/
    ├── [resource]-helpers.ts  # Business logic utilities
    ├── query-helpers.ts       # Query building utilities
    └── user-helpers.ts        # User authentication utilities
```

### Example Implementation

```typescript
// ✅ src/app/api/v1/users/route.ts - CORRECT v1 path
import { withApiSecurity, withAuthLogging } from "@/lib/middleware";
import {
  handleGetUsers,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
} from "./handlers";

export const GET = withAuthLogging(
  withApiSecurity(handleGetUsers),
  "users-get"
);

export const POST = withAuthLogging(
  withApiSecurity(handleCreateUser),
  "users-create"
);
```

### Version Migration Rules

When updating existing APIs to v1 structure:

```typescript
// ❌ BEFORE - Legacy structure
src/app/api/
├── skills/route.ts
├── categories/route.ts
└── assessments/route.ts

// ✅ AFTER - v1 structure
src/app/api/
├── v1/
│   ├── skills/
│   │   ├── route.ts
│   │   ├── handlers/
│   │   └── utils/
│   ├── categories/
│   │   ├── route.ts
│   │   ├── handlers/
│   │   └── utils/
│   └── assessments/
│       ├── route.ts
│       ├── handlers/
│       └── utils/
├── skills/route.ts        # Proxy to v1 (backward compatibility)
├── categories/route.ts    # Proxy to v1 (backward compatibility)
└── assessments/route.ts   # Proxy to v1 (backward compatibility)
```

---

## 🔧 TypeScript Quality Rules for Backend

### 4. Strict Type Usage

```typescript
// ❌ NEVER - No 'any' types
const handleRequest = (req: any, data: any) => {};

// ✅ ALWAYS - Proper typing with Prisma types
import { User, Skill, Assessment } from "@prisma/client";

const handleRequest = (
  req: NextRequest,
  data: CreateUserRequest
): Promise<ApiResponse<User>> => {};
```

### 5. Zod Schema Validation

```typescript
// ✅ ALWAYS - Define Zod schemas for all inputs
import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  skills: z.array(z.string().cuid()).optional(),
});

type CreateUserRequest = z.infer<typeof CreateUserSchema>;

// ✅ ALWAYS - Use validation middleware
const validatedData = await validateRequestBody(CreateUserSchema)(request);
```

### 6. Prisma Type Integration

```typescript
// ✅ ALWAYS - Use Prisma generated types
import { User, Skill, Prisma } from "@prisma/client";

// ✅ ALWAYS - Use Prisma utility types
type UserWithSkills = Prisma.UserGetPayload<{
  include: { skills: true };
}>;

// ✅ ALWAYS - Type database operations properly
const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  return await prisma.user.create({ data });
};
```

---

## 🏗️ Handler Function Patterns

### 7. Standard Handler Structure

Every handler MUST follow this exact pattern:

```typescript
// ✅ ALWAYS - Standard handler pattern
export async function handleGetUsers(request: NextRequest) {
  // 1. Apply middleware (auth, rate limiting)
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "users-read", user.id);

  // 2. Validate request parameters/body
  const validatedParams = validateQueryParams(UsersQuerySchema)(request);

  // 3. Get authenticated user from database
  const dbUser = await getUserFromAuth(user.email);

  // 4. Perform business logic (keep under 20 lines)
  const users = await fetchUsersList(dbUser.id, validatedParams);

  // 5. Return standardized response
  return apiResponse.success({ users }, 200, "Users retrieved successfully");
}
```

### 8. Error Handling Pattern

```typescript
// ✅ ALWAYS - Use ApiError for consistent error handling
import { ApiError } from "@/lib/errors/types";

export async function handleUpdateUser(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validation
    const { id } = validatePathParams(PathParamsSchema.id, params)();

    // Business logic
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new ApiError(404, "User not found", "USER_NOT_FOUND");
    }

    // Authorization check
    if (user.id !== dbUser.id && !isAdmin(dbUser)) {
      throw new ApiError(403, "Access denied", "ACCESS_DENIED");
    }

    // Continue with update...
  } catch (error) {
    // ApiError will be handled by global error handler
    throw error;
  }
}
```

---

## 🛡️ Security & Validation Rules

### 9. Authentication Middleware

```typescript
// ✅ ALWAYS - Apply auth middleware first
const user = await authMiddleware(request);

// ✅ ALWAYS - Get database user for operations
const dbUser = await getUserFromAuth(user.email);

// ✅ ALWAYS - Validate ownership for user-specific resources
if (resource.userId !== dbUser.id) {
  throw new ApiError(403, "Resource access denied", "RESOURCE_ACCESS_DENIED");
}
```

### 10. Rate Limiting

```typescript
// ✅ ALWAYS - Apply rate limiting after auth
await rateLimitMiddleware(request, "resource-action", user.id);

// ✅ Different limits for different actions
await rateLimitMiddleware(request, "users-read", user.id); // More permissive
await rateLimitMiddleware(request, "users-write", user.id); // More restrictive
await rateLimitMiddleware(request, "auth-login", "anonymous"); // Very restrictive
```

### 11. Input Validation

```typescript
// ✅ ALWAYS - Validate all inputs with Zod
const CreateSkillSchema = z.object({
  name: z.string().min(1).max(100),
  proficiency: z.number().int().min(0).max(10),
  categoryId: z.string().cuid(),
  tags: z.array(z.string()).max(10).optional(),
  description: z.string().max(500).optional(),
});

// ✅ ALWAYS - Use validation middleware
const validatedData = await validateRequestBody(CreateSkillSchema)(request);

// ✅ ALWAYS - Validate path parameters
const { id } = validatePathParams(PathParamsSchema.id, params)();
```

---

## 🗄️ Database Operation Patterns

### 12. Prisma Transaction Usage

```typescript
// ✅ ALWAYS - Use transactions for related operations
const result = await prisma.$transaction(async tx => {
  // Create main resource
  const skill = await tx.skill.create({
    data: validatedData,
  });

  // Create related resource
  await tx.skillHistory.create({
    data: {
      skillId: skill.id,
      userId: dbUser.id,
      proficiency: validatedData.proficiency,
      reason: "Initial creation",
      source: "MANUAL",
    },
  });

  return skill;
});
```

### 13. Query Building Patterns

```typescript
// ✅ ALWAYS - Extract query building to utilities
export const buildSkillsWhereClause = (
  userId: string,
  filters: SkillFilters
): Prisma.SkillWhereInput => ({
  userId,
  ...(filters.categoryId && { categoryId: filters.categoryId }),
  ...(filters.minProficiency && {
    proficiency: { gte: filters.minProficiency },
  }),
  ...(filters.verified !== undefined && { verified: filters.verified }),
  ...(filters.search && {
    OR: [
      { name: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ],
  }),
});

// ✅ ALWAYS - Use helper in handler
const where = buildSkillsWhereClause(dbUser.id, validatedParams);
const skills = await prisma.skill.findMany({ where });
```

### 14. Pagination Pattern

```typescript
// ✅ ALWAYS - Use paginatedResponse for list endpoints
export async function handleGetSkills(request: NextRequest) {
  const queryParams = validateQueryParams(SkillsQuerySchema)(request);
  const where = buildSkillsWhereClause(dbUser.id, queryParams);

  const [totalCount, skills] = await Promise.all([
    prisma.skill.count({ where }),
    prisma.skill.findMany({
      where,
      orderBy: { [queryParams.sortBy]: queryParams.order },
      take: queryParams.limit,
      skip: queryParams.offset,
      include: {
        category: {
          select: { id: true, name: true, icon: true, color: true },
        },
      },
    }),
  ]);

  return paginatedResponse(
    skills,
    totalCount,
    queryParams.limit,
    queryParams.offset,
    "Skills retrieved successfully"
  );
}
```

---

## 🔄 Prisma Schema Alignment Rules

### 15. Schema-First Development

```typescript
// ✅ ALWAYS - Check Prisma schema before coding
// 1. Read the actual schema: prisma/schema.prisma
// 2. Use only fields that exist in the model
// 3. Use correct enum values from the schema

// ❌ NEVER - Assume field exists without checking
const assessment = await prisma.assessment.create({
  data: {
    assessorId: userId, // This field doesn't exist in our schema!
  },
});

// ✅ ALWAYS - Use only existing fields
const assessment = await prisma.assessment.create({
  data: {
    userId: dbUser.id,
    skillId: validatedData.skillId,
    type: validatedData.type,
    // Only use fields defined in schema
  },
});
```

### 16. Enum Validation

```typescript
// ✅ ALWAYS - Use schema-defined enum values
const AssessmentTypeSchema = z.enum([
  "SELF_ASSESSMENT",
  "QUIZ",
  "PROJECT_REVIEW",
  "PEER_REVIEW",
  "AI_EVALUATION",
]); // These MUST match schema.prisma enum

const SkillSourceSchema = z.enum([
  "MANUAL",
  "ASSESSMENT",
  "GITHUB",
  "AI_SUGGESTED",
  "IMPORTED",
]); // These MUST match schema.prisma enum
```

### 17. Relationship Handling

```typescript
// ✅ ALWAYS - Check if relationships exist in schema
// Before using parent/children relations, verify they exist:

// ❌ NEVER - Use non-existent relations
const category = await prisma.skillCategory.findUnique({
  where: { id },
  include: {
    parent: true, // Doesn't exist in our schema
    children: true, // Doesn't exist in our schema
  },
});

// ✅ ALWAYS - Use only existing relations
const category = await prisma.skillCategory.findUnique({
  where: { id },
  include: {
    skills: true, // This relation exists
    _count: {
      select: { skills: true }, // Count existing relations only
    },
  },
});
```

---

## 🚀 Performance & Caching Rules

### 18. Response Caching

```typescript
// ✅ ALWAYS - Add appropriate cache headers
const response = apiResponse.success(data, 200, message);

// For public data
response.headers.set("Cache-Control", "public, max-age=600"); // 10 minutes

// For private data
response.headers.set("Cache-Control", "private, max-age=300"); // 5 minutes

// For frequently changing data
response.headers.set("Cache-Control", "no-cache, must-revalidate");

return response;
```

### 19. Database Query Optimization

```typescript
// ✅ ALWAYS - Use parallel queries when possible
const [user, skills, assessments] = await Promise.all([
  prisma.user.findUnique({ where: { id: userId } }),
  prisma.skill.findMany({ where: { userId } }),
  prisma.assessment.findMany({ where: { userId } }),
]);

// ✅ ALWAYS - Select only needed fields
const skills = await prisma.skill.findMany({
  where: { userId },
  select: {
    id: true,
    name: true,
    proficiency: true,
    category: {
      select: {
        id: true,
        name: true,
        icon: true,
        color: true,
      },
    },
  },
});

// ✅ ALWAYS - Use appropriate limits for lists
const skills = await prisma.skill.findMany({
  where: { userId },
  take: queryParams.limit || 50, // Default reasonable limit
  skip: queryParams.offset || 0,
});
```

---

## 🧪 Testing Patterns

### 20. Handler Testing Structure

```typescript
// ✅ ALWAYS - Test handler functions directly
describe("handleCreateSkill", () => {
  beforeEach(async () => {
    await cleanupDatabase();
    mockAuthMiddleware();
  });

  it("should create skill with valid data", async () => {
    const request = createMockRequest({
      method: "POST",
      body: validSkillData,
    });

    const response = await handleCreateSkill(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data.skill).toBeDefined();
  });

  it("should reject invalid proficiency values", async () => {
    const request = createMockRequest({
      method: "POST",
      body: { ...validSkillData, proficiency: 15 }, // Invalid: > 10
    });

    await expect(handleCreateSkill(request)).rejects.toThrow(ApiError);
  });
});
```

---

## 📋 Development Checklist

Before completing ANY backend API development task, verify:

### URL Structure & Versioning

- [ ] **MANDATORY**: API endpoint uses `/api/v1/` prefix
- [ ] Resource names are plural (`skills`, `categories`, `assessments`)
- [ ] URL follows pattern: `/api/v1/[resource]/[id?]/[sub-resource?]`
- [ ] Query parameters use camelCase naming
- [ ] Legacy proxy routes created if needed for backward compatibility

### File Structure

- [ ] Route file under 180 lines (preferably under 80)
- [ ] Handler functions under 80 lines each
- [ ] Utilities extracted to separate files
- [ ] Proper modular structure followed under `/api/v1/`

### TypeScript Quality

- [ ] No `any` types used (except temporary schema alignment)
- [ ] All inputs validated with Zod schemas
- [ ] Prisma types used correctly
- [ ] Proper error type handling

### Security & Validation

- [ ] Authentication middleware applied
- [ ] Rate limiting implemented
- [ ] Input validation with proper error messages
- [ ] Authorization checks for user-specific resources

### Prisma Integration

- [ ] Schema checked for field existence
- [ ] Only existing enum values used
- [ ] Relationships verified in schema
- [ ] Transactions used for related operations

### Performance

- [ ] Appropriate caching headers
- [ ] Parallel queries where possible
- [ ] Field selection optimized
- [ ] Reasonable query limits

### Error Handling

- [ ] Consistent ApiError usage
- [ ] Proper HTTP status codes
- [ ] Informative error messages
- [ ] Global error handling integration

### Testing

- [ ] Handler unit tests written
- [ ] Edge cases covered
- [ ] Authentication scenarios tested
- [ ] Database cleanup in tests

---

## 🛠️ Common Refactoring Patterns

### When Handler Exceeds 80 Lines

```typescript
// ❌ BEFORE - 120-line handler
export async function handleCreateAssessment(request: NextRequest) {
  // 20 lines of middleware and validation
  // 30 lines of business logic
  // 40 lines of database operations
  // 30 lines of response formatting
}

// ✅ AFTER - Broken into focused pieces
export async function handleCreateAssessment(request: NextRequest) {
  // Apply middleware (5 lines)
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "assessments-write", user.id);

  // Validate input (5 lines)
  const validatedData = await validateRequestBody(CreateAssessmentSchema)(
    request
  );
  const dbUser = await getUserFromAuth(user.email);

  // Perform business logic (5 lines)
  const result = await createAssessmentWithHistory(validatedData, dbUser.id);

  // Return response (3 lines)
  return apiResponse.success(
    { assessment: result },
    201,
    "Assessment created successfully"
  );
}
```

### Extract Complex Database Operations

```typescript
// ✅ Move complex operations to utilities
export async function createAssessmentWithHistory(
  data: CreateAssessmentRequest,
  userId: string
): Promise<AssessmentWithRelations> {
  return await prisma.$transaction(async tx => {
    const assessment = await tx.assessment.create({
      data: { ...data, userId },
      include: assessmentIncludes,
    });

    await updateSkillProficiency(tx, data.skillId, data.proficiency, userId);

    return assessment;
  });
}
```

---

## 🔄 Integration with Frontend Quality Rules

This document extends the React/TypeScript Quality Rules. When building full-stack features:

1. **Apply both sets of rules** - Frontend AND Backend guidelines
2. **Maintain consistent naming** - API endpoints match frontend hooks
3. **Share types when possible** - Use shared types between frontend/backend
4. **Coordinate error handling** - Backend ApiErrors align with frontend error boundaries

---

## 📚 File Templates

### New API Route Template

```typescript
// ✅ MANDATORY PATH: src/app/api/v1/[resource]/route.ts
import { withApiSecurity, withAuthLogging } from "@/lib/middleware";
import {
  handleGetResource,
  handleCreateResource,
  handleUpdateResource,
  handleDeleteResource,
} from "./handlers";

// Results in URL: /api/v1/[resource]
export const GET = withAuthLogging(
  withApiSecurity(handleGetResource),
  "resource-get"
);

export const POST = withAuthLogging(
  withApiSecurity(handleCreateResource),
  "resource-create"
);

export const PUT = withAuthLogging(
  withApiSecurity(handleUpdateResource),
  "resource-update"
);

export const DELETE = withAuthLogging(
  withApiSecurity(handleDeleteResource),
  "resource-delete"
);
```

### Legacy Proxy Route Template (Optional)

```typescript
// ✅ OPTIONAL: src/app/api/[resource]/route.ts - For backward compatibility only
import {
  handleGetResource,
  handleCreateResource,
} from "../v1/[resource]/handlers";

// Proxy legacy URLs to v1 handlers
// /api/[resource] → uses v1 handlers
export const GET = handleGetResource;
export const POST = handleCreateResource;

// Note: Only create if legacy support is explicitly required
```

### Handler Template

```typescript
// handlers/get-resource.ts
import { NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middleware/auth";
import { rateLimitMiddleware } from "@/lib/middleware/rate-limit/middleware";
import { validateQueryParams } from "@/lib/middleware/validation";
import { paginatedResponse } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import {
  ResourceQuerySchema,
  buildResourceWhereClause,
} from "../utils/query-helpers";
import { getUserFromAuth } from "../utils/user-helpers";

export async function handleGetResource(request: NextRequest) {
  // Apply middleware
  const user = await authMiddleware(request);
  await rateLimitMiddleware(request, "resource-read", user.id);

  // Validate query parameters
  const queryParams = validateQueryParams(ResourceQuerySchema)(request);

  // Get user from database
  const dbUser = await getUserFromAuth(user.email);

  // Build query and fetch data
  const where = buildResourceWhereClause(dbUser.id, queryParams);
  const [totalCount, resources] = await Promise.all([
    prisma.resource.count({ where }),
    prisma.resource.findMany({
      where,
      orderBy: { [queryParams.sortBy]: queryParams.order },
      take: queryParams.limit,
      skip: queryParams.offset,
    }),
  ]);

  return paginatedResponse(
    resources,
    totalCount,
    queryParams.limit,
    queryParams.offset,
    "Resources retrieved successfully"
  );
}
```

---

**Document Status**: Active Development Guidelines  
**Last Updated**: 2025-01-22  
**Integration**: React/TypeScript Quality Rules  
**Enforcement**: Automated via Claude AI + Manual Review  
**Owner**: Backend Development Team
