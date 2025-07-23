# Skills Evaluation App - API Documentation

## 📊 API Overview

The Skills Evaluation App provides a comprehensive RESTful API for managing user skills, categories, assessments, and learning goals. The API is built with Next.js 15 and includes advanced features like analytics, bulk operations, health monitoring, and real-time skill progression tracking.

**Key Features:**

- 🏗️ **Versioned API** (v1) with backward compatibility
- 🔐 **NextAuth v5** authentication with multiple providers
- 📊 **Advanced Analytics** with skill distributions and progression tracking
- 🧪 **Assessment System** with 5 different assessment types
- 🎯 **Learning Goals** with progress tracking and milestone achievements
- 📈 **Skill Progression** with weekly metrics and practice hour tracking
- 🔄 **Bulk Operations** for efficient data management
- 🚨 **Health Monitoring** with comprehensive system status checks

## 🔐 Authentication

### Authentication Method

- **Strategy**: NextAuth v5 with JWT tokens and session management
- **Providers**:
  - Google OAuth 2.0
  - Email/Password authentication with verification
- **Session Duration**: 30 days with automatic refresh
- **Headers**: Authentication handled via HTTP-only cookies
- **Registration**: User registration endpoint available at `/api/auth/register`

### Authentication Endpoints

| Endpoint                  | Method    | Description                                           |
| ------------------------- | --------- | ----------------------------------------------------- |
| `/api/auth/[...nextauth]` | GET, POST | NextAuth.js handlers for OAuth and session management |
| `/api/auth/register`      | POST      | User registration with email/password validation      |

### Protected Endpoints

All API endpoints require authentication. Unauthenticated requests will receive a `401 Unauthorized` response.

```json
{
  "error": "Authentication required",
  "code": "AUTH_REQUIRED"
}
```

## 🛡️ API Endpoints

### Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

### API Versioning

The API uses versioning with the current version being **v1**. All new endpoints should use the versioned path:

```
/api/v1/{resource}
```

**Legacy endpoints** at `/api/{resource}` are maintained for backward compatibility but proxy to v1 handlers.

---

## 📋 Skills Management (V1 API)

### **GET /api/v1/skills**

Retrieve a list of user skills with optional filtering and pagination.

#### Query Parameters

| Parameter    | Type    | Description                                                                           | Default     | Example                                |
| ------------ | ------- | ------------------------------------------------------------------------------------- | ----------- | -------------------------------------- |
| `categoryId` | UUID    | Filter by specific category                                                           | -           | `550e8400-e29b-41d4-a716-446655440000` |
| `search`     | String  | Search in skill names and descriptions                                                | -           | `javascript`                           |
| `verified`   | Boolean | Filter by verification status                                                         | -           | `true`                                 |
| `tags`       | String  | Comma-separated tags to filter by                                                     | -           | `frontend,react`                       |
| `source`     | String  | Filter by skill source (`MANUAL`, `ASSESSMENT`, `GITHUB`, `AI_SUGGESTED`, `IMPORTED`) | -           | `ASSESSMENT`                           |
| `sortBy`     | String  | Sort field (`name`, `proficiency`, `createdAt`, `updatedAt`)                          | `createdAt` | `proficiency`                          |
| `order`      | String  | Sort order (`asc`, `desc`)                                                            | `desc`      | `asc`                                  |
| `limit`      | Number  | Number of results per page (1-100)                                                    | `20`        | `50`                                   |
| `offset`     | Number  | Number of results to skip                                                             | `0`         | `20`                                   |

#### Example Request

```bash
GET /api/v1/skills?categoryId=550e8400-e29b-41d4-a716-446655440000&search=react&limit=10&sortBy=proficiency&order=desc
```

#### Response Format

```typescript
interface SkillsResponse {
  skills: Skill[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

interface Skill {
  id: string;
  name: string;
  description?: string;
  proficiency: number; // 0-10 scale
  category: {
    id: string;
    name: string;
    color: string;
    icon: string;
  };
  verified: boolean;
  tags: string[];
  source: "MANUAL" | "ASSESSMENT" | "GITHUB" | "AI_SUGGESTED" | "IMPORTED";
  lastAssessed?: string; // ISO 8601
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

#### Example Response

```json
{
  "skills": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "React.js",
      "description": "Frontend library for building user interfaces",
      "proficiency": 8,
      "category": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Frontend Development",
        "color": "#3b82f6",
        "icon": "Code"
      },
      "verified": true,
      "tags": ["frontend", "javascript", "react"],
      "source": "ASSESSMENT",
      "lastAssessed": "2024-01-18T16:45:00Z",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-20T14:22:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "hasMore": true
}
```

---

### **POST /api/v1/skills**

Create a new skill for the authenticated user.

#### Request Body

```typescript
interface CreateSkillRequest {
  name: string; // Required, 1-100 characters
  categoryId: string; // Required, valid UUID
  proficiency: number; // Required, 0-10 integer
  description?: string; // Optional, max 500 characters
  tags?: string[]; // Optional, max 10 tags
  source?: "MANUAL" | "ASSESSMENT" | "GITHUB" | "AI_SUGGESTED" | "IMPORTED"; // Default: MANUAL
}
```

#### Example Request

```json
{
  "name": "TypeScript",
  "categoryId": "550e8400-e29b-41d4-a716-446655440000",
  "proficiency": 7,
  "description": "Strongly typed programming language that builds on JavaScript",
  "tags": ["frontend", "javascript", "typescript"],
  "source": "MANUAL"
}
```

#### Response

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174001",
  "name": "TypeScript",
  "description": "Strongly typed programming language that builds on JavaScript",
  "proficiency": 7,
  "category": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Frontend Development",
    "color": "#3b82f6",
    "icon": "Code"
  },
  "verified": false,
  "tags": ["frontend", "javascript", "typescript"],
  "source": "MANUAL",
  "createdAt": "2024-01-21T09:15:00Z",
  "updatedAt": "2024-01-21T09:15:00Z"
}
```

---

### **GET /api/v1/skills/[id]**

Retrieve a specific skill by ID with full details including history and related assessments.

#### Path Parameters

- `id` (UUID): The skill ID

#### Response

Returns a single `Skill` object with additional details:

```typescript
interface SkillDetails extends Skill {
  history: SkillHistory[];
  assessments: Assessment[];
  learningGoals: LearningGoal[];
  progressions: SkillProgression[];
}
```

---

### **PUT /api/v1/skills/[id]**

Update an existing skill (full replacement).

#### Path Parameters

- `id` (UUID): The skill ID

#### Request Body

```typescript
interface UpdateSkillRequest {
  name?: string; // 1-100 characters
  categoryId?: string; // Valid UUID
  proficiency?: number; // 0-10 integer
  description?: string; // Max 500 characters
  tags?: string[]; // Max 10 tags
  verified?: boolean; // Verification status
}
```

#### Response

Returns the updated `Skill` object.

---

### **PATCH /api/v1/skills/[id]**

Partially update an existing skill (recommended for single field updates).

#### Path Parameters

- `id` (UUID): The skill ID

#### Request Body

```typescript
interface PatchSkillRequest {
  name?: string; // 1-100 characters
  categoryId?: string; // Valid UUID
  proficiency?: number; // 0-10 integer
  description?: string; // Max 500 characters
  tags?: string[]; // Max 10 tags
  verified?: boolean; // Mark as verified
}
```

#### Example Request

```json
{
  "proficiency": 8
}
```

#### Response

Returns the updated `Skill` object.

---

### **DELETE /api/v1/skills/[id]**

Delete a specific skill.

#### Path Parameters

- `id` (UUID): The skill ID

#### Response

```json
{
  "message": "Skill deleted successfully"
}
```

---

### **GET /api/v1/skills/analytics**

Get comprehensive analytics data for user skills including distributions, trends, and progress metrics.

#### Query Parameters

| Parameter        | Type    | Description                                           | Default |
| ---------------- | ------- | ----------------------------------------------------- | ------- |
| `period`         | String  | Analytics period (`week`, `month`, `quarter`, `year`) | `month` |
| `categoryId`     | UUID    | Filter analytics by category                          | -       |
| `includeHistory` | Boolean | Include historical progression data                   | `false` |

#### Response Format

```typescript
interface SkillsAnalytics {
  summary: {
    totalSkills: number;
    averageProficiency: number;
    verifiedSkills: number;
    categoriesUsed: number;
    lastAssessment?: string;
  };
  proficiencyDistribution: {
    [level: string]: number; // 0-10 scale counts
  };
  categoryBreakdown: {
    categoryId: string;
    categoryName: string;
    skillCount: number;
    averageProficiency: number;
    color: string;
  }[];
  progressTrends: {
    date: string;
    averageProficiency: number;
    skillsAdded: number;
    assessmentsTaken: number;
  }[];
  topSkills: Skill[]; // Top 10 highest proficiency
  recentActivity: {
    date: string;
    action: string;
    skillName: string;
    details: string;
  }[];
}
```

---

### **PATCH /api/v1/skills/bulk**

Update multiple skills in a single request (maximum 50 skills).

#### Request Body

```typescript
interface BulkUpdateRequest {
  updates: {
    id: string; // Skill ID
    proficiency?: number;
    categoryId?: string;
    verified?: boolean;
    tags?: string[];
  }[];
}
```

#### Response

Returns updated skills and any errors for failed updates.

---

### **DELETE /api/v1/skills/bulk**

Delete multiple skills in a single request (maximum 50 skills).

#### Request Body

```typescript
interface BulkDeleteRequest {
  skillIds: string[]; // Array of skill IDs (max 50)
}
```

#### Response

```json
{
  "message": "Successfully deleted 12 skills",
  "deletedCount": 12,
  "errors": [] // Any skills that couldn't be deleted
}
```

---

## 🧪 Assessments Management (V1 API)

### **GET /api/v1/assessments**

Retrieve paginated list of user assessments with filtering and sorting options.

#### Query Parameters

| Parameter   | Type    | Description                               | Default     | Example                                |
| ----------- | ------- | ----------------------------------------- | ----------- | -------------------------------------- |
| `skillId`   | UUID    | Filter by specific skill                  | -           | `123e4567-e89b-12d3-a456-426614174000` |
| `type`      | String  | Filter by assessment type                 | -           | `SELF_ASSESSMENT`                      |
| `completed` | Boolean | Filter by completion status               | -           | `true`                                 |
| `sortBy`    | String  | Sort field (`createdAt`, `score`, `type`) | `createdAt` | `score`                                |
| `order`     | String  | Sort order (`asc`, `desc`)                | `desc`      | `asc`                                  |
| `limit`     | Number  | Results per page (1-100)                  | `20`        | `50`                                   |
| `offset`    | Number  | Results to skip                           | `0`         | `20`                                   |

#### Assessment Types

- `SELF_ASSESSMENT` - User self-evaluation
- `QUIZ` - Knowledge-based quiz
- `PROJECT_REVIEW` - GitHub project analysis
- `PEER_REVIEW` - Peer validation assessment
- `AI_EVALUATION` - AI-powered skill evaluation

#### Response Format

```typescript
interface AssessmentsResponse {
  assessments: Assessment[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

interface Assessment {
  id: string;
  skillId?: string;
  type: AssessmentType;
  score?: number; // 0-100 scale
  proficiency?: number; // Resulting proficiency (0-10)
  feedback?: string;
  metadata?: any; // Additional assessment data
  completedAt?: string; // ISO 8601
  createdAt: string;
  updatedAt: string;
  skill?: {
    id: string;
    name: string;
    category: {
      name: string;
      color: string;
    };
  };
  questions?: AssessmentQuestion[];
}
```

---

### **POST /api/v1/assessments**

Create a new assessment for a skill or general assessment.

#### Request Body

```typescript
interface CreateAssessmentRequest {
  skillId?: string; // Optional - null for general assessments
  type: AssessmentType; // Required
  questions?: {
    question: string;
    answer?: string;
    isCorrect?: boolean;
    metadata?: any;
  }[];
  metadata?: any; // Additional context data
}
```

#### Example Request

```json
{
  "skillId": "123e4567-e89b-12d3-a456-426614174000",
  "type": "SELF_ASSESSMENT",
  "questions": [
    {
      "question": "Rate your React.js component design skills",
      "answer": "8",
      "metadata": { "category": "design-patterns" }
    }
  ]
}
```

---

### **GET /api/v1/assessments/[id]**

Retrieve a specific assessment with full details including questions and history.

#### Path Parameters

- `id` (UUID): The assessment ID

#### Response

Returns a complete `Assessment` object with related questions and skill information.

---

### **PUT /api/v1/assessments/[id]**

Update an assessment (typically to complete it or update scores).

#### Request Body

```typescript
interface UpdateAssessmentRequest {
  score?: number; // 0-100 scale
  proficiency?: number; // 0-10 scale
  feedback?: string;
  completedAt?: string; // ISO 8601
  metadata?: any;
}
```

---

### **DELETE /api/v1/assessments/[id]**

Delete a specific assessment and its associated history.

#### Response

```json
{
  "message": "Assessment deleted successfully"
}
```

---

## 🎯 Learning Goals Management

### **GET /api/v1/goals**

Retrieve user learning goals with progress tracking.

#### Query Parameters

| Parameter | Type   | Description                                                         | Default     |
| --------- | ------ | ------------------------------------------------------------------- | ----------- |
| `status`  | String | Filter by goal status (`ACTIVE`, `ACHIEVED`, `PAUSED`, `ABANDONED`) | -           |
| `skillId` | UUID   | Filter by specific skill                                            | -           |
| `sortBy`  | String | Sort field (`targetDate`, `createdAt`, `progress`)                  | `createdAt` |

#### Response Format

```typescript
interface LearningGoal {
  id: string;
  skillId: string;
  targetProficiency: number; // 1-10 scale
  currentProficiency: number;
  targetDate?: string; // ISO 8601
  motivation?: string;
  status: "ACTIVE" | "ACHIEVED" | "PAUSED" | "ABANDONED";
  completedAt?: string;
  progress: number; // Calculated progress percentage
  skill: {
    name: string;
    proficiency: number;
    category: {
      name: string;
      color: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
```

---

### **POST /api/v1/goals**

Create a new learning goal for a skill.

#### Request Body

```typescript
interface CreateGoalRequest {
  skillId: string;
  targetProficiency: number; // 1-10 scale
  targetDate?: string; // ISO 8601
  motivation?: string;
}
```

---

## 📊 Skill Progression & Analytics

### **GET /api/v1/progression**

Get detailed skill progression metrics with weekly tracking data.

#### Query Parameters

| Parameter | Type   | Description                | Default      |
| --------- | ------ | -------------------------- | ------------ |
| `skillId` | UUID   | Filter by specific skill   | -            |
| `weeks`   | Number | Number of weeks to include | `12`         |
| `year`    | Number | Filter by specific year    | current year |

#### Response Format

```typescript
interface SkillProgression {
  skillId: string;
  weekNumber: number;
  year: number;
  practiceHours: number;
  assessmentsTaken: number;
  avgScore?: number;
  proficiencyStart: number;
  proficiencyEnd: number;
  milestones?: string[]; // Achievement milestones
  createdAt: string;
  updatedAt: string;
}
```

---

## 🏷️ Categories Management (V1 API)

### **GET /api/v1/categories**

Retrieve all available skill categories.

#### Response Format

```typescript
interface CategoriesResponse {
  categories: SkillCategory[];
}

interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string; // Hex color code
  icon: string; // Icon identifier
  order: number; // Display order
  skillCount?: number; // Number of user skills in this category
  createdAt: string;
  updatedAt: string;
}
```

#### Example Response

```json
{
  "categories": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Frontend Development",
      "slug": "frontend-development",
      "description": "Client-side web development technologies",
      "color": "#3b82f6",
      "icon": "Code",
      "order": 1,
      "skillCount": 12,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### **POST /api/v1/categories**

Create a new skill category (admin only).

#### Request Body

```typescript
interface CreateCategoryRequest {
  name: string; // Required, unique
  slug?: string; // Auto-generated if not provided
  description?: string;
  icon?: string; // Icon name or emoji
  color?: string; // Hex color code
  order?: number; // Display order
}
```

---

### **GET /api/v1/categories/[id]**

Get a specific category with full details and skill counts.

---

### **PUT /api/v1/categories/[id]**

Update a category (admin only).

---

### **DELETE /api/v1/categories/[id]**

Delete a category (admin only). Cannot delete categories with associated skills.

---

## 🩺 Health & Monitoring

### **GET /api/health**

Comprehensive health check with database connectivity, Redis status, and system metrics.

#### Response Format

```typescript
interface HealthResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  uptime: number; // Seconds
  version: string;
  checks: {
    database: {
      status: "healthy" | "unhealthy";
      responseTime: number; // ms
      error?: string;
    };
    redis?: {
      status: "healthy" | "unhealthy";
      responseTime: number; // ms
      error?: string;
    };
  };
  metrics: {
    memory: {
      used: number; // bytes
      total: number; // bytes
      percentage: number;
    };
    cpu: {
      percentage: number;
    };
  };
}
```

---

### **GET /api/metrics**

Application metrics including performance, database stats, and user activity.

#### Response Format

```typescript
interface MetricsResponse {
  performance: {
    averageResponseTime: number; // ms
    requestsPerMinute: number;
    errorRate: number; // percentage
  };
  database: {
    totalUsers: number;
    totalSkills: number;
    totalAssessments: number;
    activeUsers24h: number;
  };
  features: {
    skillsCreated24h: number;
    assessmentsCompleted24h: number;
    goalsAchieved24h: number;
  };
}
```

---

### **GET /api/monitoring/status**

System status with service dependencies, feature toggles, and deployment information.

#### Response Format

```typescript
interface StatusResponse {
  status: "operational" | "maintenance" | "partial-outage" | "major-outage";
  services: {
    api: "operational" | "degraded" | "down";
    database: "operational" | "degraded" | "down";
    authentication: "operational" | "degraded" | "down";
    redis?: "operational" | "degraded" | "down";
  };
  features: {
    assessments: boolean;
    analytics: boolean;
    bulkOperations: boolean;
  };
  deployment: {
    version: string;
    environment: string;
    deployedAt: string;
  };
}
```

---

## 🔄 Legacy Compatibility

### Legacy Endpoints

For backward compatibility, the following legacy endpoints are maintained:

| Legacy Endpoint   | Proxies to           | Status    |
| ----------------- | -------------------- | --------- |
| `/api/skills`     | `/api/v1/skills`     | ✅ Active |
| `/api/categories` | `/api/v1/categories` | ✅ Active |

**Note**: New applications should use the versioned v1 endpoints directly.

---

## ⚠️ Error Handling

### Error Response Format

All errors follow a consistent format:

```typescript
interface ErrorResponse {
  error: string; // Human-readable error message
  code: string; // Machine-readable error code
  details?: any; // Additional error details (validation errors, etc.)
}
```

### HTTP Status Codes

| Status Code | Description           | Example                                              |
| ----------- | --------------------- | ---------------------------------------------------- |
| `200`       | Success               | Successful GET/PUT requests                          |
| `201`       | Created               | Successful POST requests                             |
| `400`       | Bad Request           | Invalid request data or validation errors            |
| `401`       | Unauthorized          | Missing or invalid authentication                    |
| `404`       | Not Found             | Resource doesn't exist                               |
| `409`       | Conflict              | Duplicate resource (e.g., skill name already exists) |
| `422`       | Unprocessable Entity  | Request data doesn't pass validation                 |
| `429`       | Too Many Requests     | Rate limit exceeded                                  |
| `500`       | Internal Server Error | Unexpected server errors                             |

### Common Error Examples

#### Validation Error (400)

```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "proficiency",
      "message": "Proficiency must be between 0 and 10",
      "code": "invalid_range"
    },
    {
      "field": "name",
      "message": "Name is required",
      "code": "required"
    }
  ]
}
```

#### Not Found Error (404)

```json
{
  "error": "Skill not found",
  "code": "NOT_FOUND"
}
```

#### Rate Limit Error (429)

```json
{
  "error": "Too many requests",
  "code": "RATE_LIMIT_EXCEEDED",
  "details": {
    "limit": 100,
    "remaining": 0,
    "resetTime": "2024-01-21T10:30:00Z"
  }
}
```

---

## 🛡️ Security & Rate Limiting

### Security Middleware

All API endpoints are protected with:

- **Authentication Middleware**: Validates NextAuth sessions
- **Security Middleware**: CORS, security headers, input sanitization
- **Rate Limiting**: Different limits for read vs write operations
- **Request Logging**: Comprehensive audit trail with user context

### Rate Limits

| Operation Type                               | Limit        | Window              | Headers Included |
| -------------------------------------------- | ------------ | ------------------- | ---------------- |
| **Read Operations** (GET)                    | 100 requests | per minute per IP   | ✅               |
| **Write Operations** (POST/PUT/PATCH/DELETE) | 20 requests  | per minute per IP   | ✅               |
| **Bulk Operations**                          | 5 requests   | per minute per user | ✅               |
| **Analytics**                                | 30 requests  | per minute per user | ✅               |

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 85
X-RateLimit-Reset: 1640995200
X-RateLimit-Window: 60
```

---

## 🚀 TanStack Query Integration

### Pre-built Hooks

The application provides ready-to-use TanStack Query hooks for all API operations:

```typescript
// Skills hooks
const useSkills = (filters?: SkillsFilters) => UseQueryResult<SkillsResponse>;
const useSkillsAnalytics = (params?: AnalyticsParams) =>
  UseQueryResult<SkillsAnalytics>;
const useCreateSkill = () =>
  UseMutationResult<Skill, Error, CreateSkillRequest>;
const useUpdateSkill = () =>
  UseMutationResult<Skill, Error, UpdateSkillRequest>;
const usePatchSkill = () => UseMutationResult<Skill, Error, PatchSkillRequest>;
const useDeleteSkill = () => UseMutationResult<void, Error, string>;
const useBulkUpdateSkills = () =>
  UseMutationResult<BulkUpdateResponse, Error, BulkUpdateRequest>;
const useBulkDeleteSkills = () =>
  UseMutationResult<BulkDeleteResponse, Error, BulkDeleteRequest>;

// Categories hooks
const useCategories = () => UseQueryResult<CategoriesResponse>;
const useCategoriesForFilter = () => UseQueryResult<SkillCategory[]>;
const useCreateCategory = () =>
  UseMutationResult<SkillCategory, Error, CreateCategoryRequest>;

// Assessments hooks
const useAssessments = (filters?: AssessmentsFilters) =>
  UseQueryResult<AssessmentsResponse>;
const useCreateAssessment = () =>
  UseMutationResult<Assessment, Error, CreateAssessmentRequest>;
const useUpdateAssessment = () =>
  UseMutationResult<Assessment, Error, UpdateAssessmentRequest>;
const useDeleteAssessment = () => UseMutationResult<void, Error, string>;

// Learning Goals hooks
const useLearningGoals = (filters?: GoalsFilters) =>
  UseQueryResult<LearningGoal[]>;
const useCreateLearningGoal = () =>
  UseMutationResult<LearningGoal, Error, CreateGoalRequest>;

// Progression hooks
const useSkillProgression = (params?: ProgressionParams) =>
  UseQueryResult<SkillProgression[]>;

// Health & Monitoring hooks
const useHealthStatus = () => UseQueryResult<HealthResponse>;
const useAppMetrics = () => UseQueryResult<MetricsResponse>;
```

### Usage Examples

#### Fetching Skills with Analytics

```typescript
import { useSkills, useSkillsAnalytics } from '@/hooks/useSkills'

function SkillsList() {
  const { data, isLoading, error } = useSkills({
    categoryId: selectedCategory,
    search: searchTerm,
    sortBy: 'proficiency',
    order: 'desc',
    limit: 20,
    offset: page * 20
  })

  const { data: analytics } = useSkillsAnalytics({
    period: 'month',
    categoryId: selectedCategory,
    includeHistory: true
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />

  return (
    <div>
      {/* Analytics Summary */}
      {analytics && (
        <AnalyticsCard
          totalSkills={analytics.summary.totalSkills}
          averageProficiency={analytics.summary.averageProficiency}
          distribution={analytics.proficiencyDistribution}
        />
      )}

      {/* Skills Grid */}
      <div className="skills-grid">
        {data?.skills.map(skill => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      {/* Pagination */}
      {data?.hasMore && (
        <LoadMoreButton onClick={() => setPage(page + 1)} />
      )}
    </div>
  )
}
```

#### Creating Skills with Assessments

```typescript
import { useCreateSkill, useCreateAssessment } from '@/hooks/useSkills'
import { useQueryClient } from '@tanstack/react-query'

function CreateSkillForm() {
  const queryClient = useQueryClient()
  const createSkill = useCreateSkill()
  const createAssessment = useCreateAssessment()

  const handleSubmit = async (data: CreateSkillRequest) => {
    try {
      const skill = await createSkill.mutateAsync(data)

      // Optionally create initial self-assessment
      if (data.createAssessment) {
        await createAssessment.mutateAsync({
          skillId: skill.id,
          type: 'SELF_ASSESSMENT',
          questions: [{
            question: `Initial self-assessment for ${skill.name}`,
            answer: data.proficiency.toString()
          }]
        })
      }

      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['skills'] })
      queryClient.invalidateQueries({ queryKey: ['skills-analytics'] })

      toast.success(`Created ${skill.name} successfully!`)
    } catch (error) {
      toast.error(`Failed to create skill: ${error.message}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Enhanced form fields with assessment option */}
      <SkillFormFields />
      <AssessmentToggle />
    </form>
  )
}
```

---

## 🎯 Data Validation

### Request Validation

All API endpoints use Zod schemas for request validation:

#### Skills Validation Schemas

```typescript
// Skills validation schemas
const CreateSkillSchema = z.object({
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
  source: z
    .enum(["MANUAL", "ASSESSMENT", "GITHUB", "AI_SUGGESTED", "IMPORTED"])
    .default("MANUAL"),
});

const PatchSkillSchema = z.object({
  name: z.string().min(1).max(100).trim().optional(),
  categoryId: z.string().uuid().optional(),
  proficiency: z.number().int().min(0).max(10).optional(),
  description: z.string().max(500).optional(),
  tags: z.array(z.string()).max(10).optional(),
  verified: z.boolean().optional(),
});
```

#### Assessment Validation Schemas

```typescript
const CreateAssessmentSchema = z.object({
  skillId: z.string().uuid().optional(),
  type: z.enum([
    "SELF_ASSESSMENT",
    "QUIZ",
    "PROJECT_REVIEW",
    "PEER_REVIEW",
    "AI_EVALUATION",
  ]),
  questions: z
    .array(
      z.object({
        question: z.string().min(1).max(1000),
        answer: z.string().optional(),
        isCorrect: z.boolean().optional(),
        metadata: z.any().optional(),
      })
    )
    .optional(),
  metadata: z.any().optional(),
});
```

#### Bulk Operations Schemas

```typescript
const BulkUpdateSchema = z.object({
  updates: z
    .array(
      z.object({
        id: z.string().uuid(),
        proficiency: z.number().int().min(0).max(10).optional(),
        categoryId: z.string().uuid().optional(),
        verified: z.boolean().optional(),
        tags: z.array(z.string()).max(10).optional(),
      })
    )
    .max(50, "Maximum 50 skills per bulk update"),
});

const BulkDeleteSchema = z.object({
  skillIds: z
    .array(z.string().uuid())
    .max(50, "Maximum 50 skills per bulk delete"),
});
```

### Response Validation

All responses include proper TypeScript types and runtime validation to ensure data consistency.

---

## 🔧 API Configuration

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/skills_evaluation"

# Authentication (NextAuth v5)
AUTH_SECRET="your-nextauth-secret-32-chars-min"
AUTH_URL="http://localhost:3000" # or your production URL
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional: Additional OAuth Providers
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Optional: Redis for caching and rate limiting
UPSTASH_REDIS_REST_URL="https://your-redis-endpoint.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"

# Optional: Feature toggles
ENABLE_ANALYTICS="true"
ENABLE_AI_EVALUATIONS="true"
ENABLE_BULK_OPERATIONS="true"

# Optional: Monitoring and logging
LOG_LEVEL="info" # debug, info, warn, error
ENABLE_REQUEST_LOGGING="true"
MONITORING_SECRET="your-monitoring-secret"

# Optional: Email verification (if using email/password)
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="noreply@yourdomain.com"
EMAIL_SERVER_PASSWORD="your-email-password"
EMAIL_FROM="noreply@yourdomain.com"
```

### Performance & Caching

#### Response Caching

- **Skills lists**: Cached for 5 minutes with ETag support
- **Categories**: Cached for 1 hour (rarely change)
- **Analytics**: Cached for 15 minutes
- **Health checks**: No caching (real-time status)

#### Database Optimization

- **Connection pooling**: Prisma with connection pooling enabled
- **Query optimization**: Indexed queries for common filters
- **Pagination**: Cursor-based pagination for large datasets
- **Bulk operations**: Transaction-based for data consistency

### Monitoring & Observability

#### Request Logging

All API requests are logged with:

- User context (ID, email)
- Request timing and size
- Response status and errors
- IP address and user agent

#### Health Monitoring

- **Uptime monitoring**: `/api/health` endpoint
- **Performance metrics**: `/api/metrics` endpoint
- **Database connectivity**: Real-time connection health
- **Redis status**: Cache and rate limiting health

#### Error Tracking

- Comprehensive error logging
- User-friendly error messages
- Developer error details in development
- Error aggregation and alerting

---

## 🔮 Future API Enhancements

### Planned Features (v2)

- **Real-time subscriptions** with WebSocket support
- **Advanced AI evaluations** with ML-powered skill assessment
- **Team collaboration** with shared skill libraries
- **Integration APIs** for external learning platforms
- **Advanced analytics** with custom reporting
- **Mobile app API** optimizations

---

This comprehensive API documentation covers all 25+ endpoints across the Skills Evaluation App's microservice architecture. The API is built for scalability, reliability, and developer experience with modern patterns including comprehensive validation, security middleware, health monitoring, and advanced features like bulk operations and real-time analytics.
