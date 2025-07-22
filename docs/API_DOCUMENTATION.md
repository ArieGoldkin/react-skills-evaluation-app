# Skills Evaluation App - API Documentation

## 📊 API Overview

The Skills Evaluation App provides a comprehensive RESTful API for managing user skills and categories. All endpoints require authentication and return JSON responses with consistent error handling.

## 🔐 Authentication

### Authentication Method

- **Strategy**: NextAuth v5 with JWT tokens
- **Provider**: Google OAuth 2.0
- **Session Duration**: 30 days with automatic refresh
- **Headers**: Authentication handled via HTTP-only cookies

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

---

## 📋 Skills Management

### **GET /api/skills**

Retrieve a list of user skills with optional filtering and pagination.

#### Query Parameters

| Parameter    | Type    | Description                                                  | Default     | Example                                |
| ------------ | ------- | ------------------------------------------------------------ | ----------- | -------------------------------------- |
| `categoryId` | UUID    | Filter by specific category                                  | -           | `550e8400-e29b-41d4-a716-446655440000` |
| `search`     | String  | Search in skill names and descriptions                       | -           | `javascript`                           |
| `verified`   | Boolean | Filter by verification status                                | -           | `true`                                 |
| `tags`       | String  | Comma-separated tags to filter by                            | -           | `frontend,react`                       |
| `sortBy`     | String  | Sort field (`name`, `proficiency`, `createdAt`, `updatedAt`) | `createdAt` | `proficiency`                          |
| `order`      | String  | Sort order (`asc`, `desc`)                                   | `desc`      | `asc`                                  |
| `limit`      | Number  | Number of results per page (1-100)                           | `20`        | `50`                                   |
| `offset`     | Number  | Number of results to skip                                    | `0`         | `20`                                   |

#### Example Request

```bash
GET /api/skills?categoryId=550e8400-e29b-41d4-a716-446655440000&search=react&limit=10&sortBy=proficiency&order=desc
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

### **POST /api/skills**

Create a new skill for the authenticated user.

#### Request Body

```typescript
interface CreateSkillRequest {
  name: string; // Required, 1-100 characters
  categoryId: string; // Required, valid UUID
  proficiency: number; // Required, 0-10 integer
  description?: string; // Optional, max 500 characters
  tags?: string[]; // Optional, max 10 tags
}
```

#### Example Request

```json
{
  "name": "TypeScript",
  "categoryId": "550e8400-e29b-41d4-a716-446655440000",
  "proficiency": 7,
  "description": "Strongly typed programming language that builds on JavaScript",
  "tags": ["frontend", "javascript", "typescript"]
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
  "createdAt": "2024-01-21T09:15:00Z",
  "updatedAt": "2024-01-21T09:15:00Z"
}
```

---

### **GET /api/skills/[id]**

Retrieve a specific skill by ID.

#### Path Parameters

- `id` (UUID): The skill ID

#### Response

Returns a single `Skill` object (same format as above) or `404 Not Found`.

---

### **PUT /api/skills/[id]**

Update an existing skill.

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
}
```

#### Example Request

```json
{
  "proficiency": 8,
  "description": "Updated description with more experience"
}
```

#### Response

Returns the updated `Skill` object.

---

### **DELETE /api/skills/[id]**

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

## 🏷️ Categories Management

### **GET /api/categories**

Retrieve all available skill categories.

#### Response Format

```typescript
interface CategoriesResponse {
  categories: SkillCategory[];
}

interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  color: string; // Hex color code
  icon: string; // Icon identifier
  skillCount?: number; // Number of user skills in this category
}
```

#### Example Response

```json
{
  "categories": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Frontend Development",
      "description": "Client-side web development technologies",
      "color": "#3b82f6",
      "icon": "Code",
      "skillCount": 12
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Backend Development",
      "description": "Server-side development and APIs",
      "color": "#10b981",
      "icon": "Server",
      "skillCount": 8
    }
  ]
}
```

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

#### Duplicate Error (409)

```json
{
  "error": "A skill with this name already exists",
  "code": "DUPLICATE_SKILL"
}
```

---

## 🚀 TanStack Query Integration

### Pre-built Hooks

The application provides ready-to-use TanStack Query hooks for all API operations:

```typescript
// Skills hooks
const useSkills = (filters?: SkillsFilters) => UseQueryResult<SkillsResponse>;
const useCreateSkill = () =>
  UseMutationResult<Skill, Error, CreateSkillRequest>;
const useUpdateSkill = () =>
  UseMutationResult<Skill, Error, UpdateSkillRequest>;
const useDeleteSkill = () => UseMutationResult<void, Error, string>;

// Categories hooks
const useCategories = () => UseQueryResult<CategoriesResponse>;
const useCategoriesForFilter = () => UseQueryResult<SkillCategory[]>;
```

### Usage Examples

#### Fetching Skills with Filters

```typescript
import { useSkills } from '@/hooks/useSkills'

function SkillsList() {
  const { data, isLoading, error } = useSkills({
    categoryId: selectedCategory,
    search: searchTerm,
    sortBy: 'proficiency',
    order: 'desc'
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />

  return (
    <div>
      {data?.skills.map(skill => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  )
}
```

#### Creating a New Skill

```typescript
import { useCreateSkill } from '@/hooks/useSkills'

function CreateSkillForm() {
  const createSkill = useCreateSkill()

  const handleSubmit = (data: CreateSkillRequest) => {
    createSkill.mutate(data, {
      onSuccess: (skill) => {
        toast.success(`Created ${skill.name} successfully!`)
        // Navigation or state updates
      },
      onError: (error) => {
        toast.error(`Failed to create skill: ${error.message}`)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

---

## 🎯 Data Validation

### Request Validation

All API endpoints use Zod schemas for request validation:

#### Create Skill Schema

```typescript
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

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional: Redis for caching
REDIS_URL="redis://localhost:6379"
```

### Rate Limiting

- **Read operations**: 100 requests per minute per IP
- **Write operations**: 20 requests per minute per IP
- **Headers included**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

### CORS Configuration

- **Development**: Localhost origins allowed
- **Production**: Configured for your domain
- **Credentials**: Included for authentication cookies

---

This API documentation provides complete coverage of all available endpoints, request/response formats, error handling, and integration patterns for the Skills Evaluation App. The API is designed for reliability, type safety, and ease of use with modern frontend frameworks.
