# API Architecture Documentation

## Overview

This document outlines the centralized API client infrastructure implemented for the Skills Evaluation React 19 monorepo. The architecture eliminates direct `fetch()` usage and provides a consistent, type-safe approach to API communication.

## Architecture Components

### 1. API Client (`/packages/app/src/lib/api-client.ts`)

The core HTTP client that handles all API communications.

#### Features

- **Centralized Configuration**: Single point for base URLs, timeouts, and headers
- **Request/Response Interceptors**: Automatic authentication header injection
- **Error Handling**: Consistent error formatting and network error management
- **Timeout Management**: Configurable request timeouts with automatic cancellation
- **Type Safety**: Full TypeScript support with generic response types

#### Usage Example

```typescript
import { apiClient } from "@/lib/api-client";

// GET request
const users = await apiClient.get<User[]>("/api/users");

// POST request
const newUser = await apiClient.post<User>("/api/users", { name: "John" });

// Custom options
const data = await apiClient.get("/api/data", {
  timeout: 5000,
  skipAuth: true,
});
```

### 2. Services Layer (`/packages/app/src/services/`)

Service classes that encapsulate API operations for different domains.

#### AuthService (`auth.service.ts`)

Handles authentication-related operations:

- User registration
- Password reset requests
- Profile updates
- Account management

```typescript
import { AuthService } from "@/services";

// Register new user
const result = await AuthService.register({
  name: "John Doe",
  email: "john@example.com",
  password: "secure123",
});
```

#### CategoriesService (`categories.service.ts`)

Manages skill categories:

- Fetch all categories
- Category CRUD operations
- Category search and filtering

```typescript
import { CategoriesService } from "@/services";

// Get all categories
const { categories } = await CategoriesService.getCategories();

// Search categories
const results = await CategoriesService.searchCategories("programming");
```

#### SkillsService (`skills.service.ts`)

Comprehensive skills management:

- Skills CRUD operations
- Filtering and search
- Bulk operations
- Import/export functionality
- Statistics and analytics

```typescript
import { SkillsService } from "@/services";

// Get filtered skills
const { skills } = await SkillsService.getSkills({
  categoryId: "tech-123",
  search: "React",
  sortBy: "proficiency",
  order: "desc",
});

// Create new skill
const { skill } = await SkillsService.createSkill({
  name: "React Hooks",
  categoryId: "tech-123",
  proficiency: 8,
  tags: ["frontend", "javascript"],
});
```

### 3. Type Definitions (`/packages/app/src/services/types/`)

Centralized type definitions for all API-related data structures:

- Request/Response interfaces
- Domain models (User, Skill, Category)
- Error types
- Filter and query types

### 4. Query Hooks Integration (`/packages/app/src/hooks/queries/`)

TanStack Query hooks now use the services layer instead of direct fetch calls:

#### Before (Direct Fetch)

```typescript
const fetchSkills = async filters => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/skills?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch skills: ${response.statusText}`);
  }

  return response.json();
};
```

#### After (Service Layer)

```typescript
const useSkills = (filters = {}) => {
  return useQuery({
    queryKey: skillsKeys.list(filters),
    queryFn: () => SkillsService.getSkills(filters),
    // ... other options
  });
};
```

## Error Handling

### Centralized Error Management

The API client provides consistent error handling through the `ApiClientError` class:

```typescript
try {
  const result = await AuthService.register(userData);
} catch (error) {
  if (error instanceof ApiClientError) {
    console.log(`HTTP ${error.status}: ${error.message}`);

    if (error.status === 400) {
      // Handle validation errors
    } else if (error.status === 401) {
      // Handle authentication errors
    }
  } else {
    // Handle network or other errors
  }
}
```

### Error Types

- **ApiClientError**: HTTP errors with status codes and messages
- **Network Errors**: Connection issues, timeouts
- **Validation Errors**: Server-side validation failures

## Authentication Integration

### NextAuth Compatibility

The API client is designed to work seamlessly with NextAuth:

```typescript
private async getAuthHeaders(): Promise<Record<string, string>> {
  try {
    const session = await getSession();
    if (session?.user) {
      // Add custom auth headers if needed
      return {};
    }
    return {};
  } catch {
    return {};
  }
}
```

### Skip Authentication

For public endpoints, authentication can be skipped:

```typescript
const publicData = await apiClient.get("/api/public", {
  skipAuth: true,
});
```

## Performance Optimizations

### Request Timeouts

- Default timeout: 10 seconds
- Configurable per request
- Automatic cancellation for timed-out requests

### Caching Strategy

Integrates with TanStack Query caching:

- **Categories**: 15-minute stale time (rarely change)
- **Skills**: 5-minute stale time (frequently updated)
- **User Data**: 10-minute stale time

### Query Key Patterns

Hierarchical query keys for efficient cache management:

```typescript
export const skillsKeys = {
  all: ["skills"] as const,
  lists: () => [...skillsKeys.all, "list"] as const,
  list: filters => [...skillsKeys.lists(), filters] as const,
  details: () => [...skillsKeys.all, "detail"] as const,
  detail: id => [...skillsKeys.details(), id] as const,
};
```

## Best Practices

### 1. Always Use Services

Never use fetch directly. Always go through the appropriate service:

```typescript
// ❌ Don't do this
const response = await fetch("/api/skills");

// ✅ Do this
const { skills } = await SkillsService.getSkills();
```

### 2. Handle Errors Properly

Always handle both API and network errors:

```typescript
try {
  const result = await SomeService.operation();
  // Handle success
} catch (error) {
  if (error instanceof ApiClientError) {
    // Handle API errors
  } else {
    // Handle network/other errors
  }
}
```

### 3. Use TypeScript Types

Leverage the provided types for better development experience:

```typescript
import type { CreateSkillData, Skill } from "@/services";

const createNewSkill = async (data: CreateSkillData): Promise<Skill> => {
  const { skill } = await SkillsService.createSkill(data);
  return skill;
};
```

### 4. Optimize Query Keys

Use the provided query key factories for consistent caching:

```typescript
// ✅ Use factories
queryKey: skillsKeys.list(filters);

// ❌ Don't create ad-hoc keys
queryKey: ["skills", "list", filters];
```

## Adding New Endpoints

### 1. Update Service Class

Add the new method to the appropriate service:

```typescript
// In SkillsService
static async getSkillRecommendations(skillId: string): Promise<Skill[]> {
  return apiClient.get<Skill[]>(`/api/skills/${skillId}/recommendations`);
}
```

### 2. Add Types (if needed)

Define new types in the types directory:

```typescript
// In types/index.ts
export interface SkillRecommendation {
  skill: Skill;
  confidence: number;
  reason: string;
}
```

### 3. Create Query Hook (if needed)

Add corresponding query hook:

```typescript
export const useSkillRecommendations = (skillId: string) => {
  return useQuery({
    queryKey: ["skills", "recommendations", skillId],
    queryFn: () => SkillsService.getSkillRecommendations(skillId),
    enabled: !!skillId,
  });
};
```

### 4. Update Components

Use the new hook in components:

```typescript
const { data: recommendations } = useSkillRecommendations(skillId);
```

## Testing Strategy

### Service Testing

Mock the API client for service tests:

```typescript
import { apiClient } from "@/lib/api-client";
import { SkillsService } from "@/services";

jest.mock("@/lib/api-client");
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("SkillsService", () => {
  it("should fetch skills", async () => {
    mockedApiClient.get.mockResolvedValue({ skills: [] });

    const result = await SkillsService.getSkills();

    expect(result.skills).toEqual([]);
    expect(mockedApiClient.get).toHaveBeenCalledWith("/api/skills");
  });
});
```

### Hook Testing

Use React Query testing utilities:

```typescript
import { renderHook } from "@testing-library/react";
import { createQueryClientWrapper } from "@/test-utils";
import { useSkills } from "@/hooks/queries/use-skills";

describe("useSkills", () => {
  it("should fetch skills", async () => {
    const { result, waitFor } = renderHook(() => useSkills(), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toBeDefined();
  });
});
```

## Migration Benefits

### Before

- 15 direct `fetch()` calls across multiple files
- Inconsistent error handling
- Duplicate request logic
- No centralized timeout handling
- Manual authentication header management

### After

- Centralized API client with consistent behavior
- Standardized error handling with proper TypeScript types
- Reusable service methods
- Automatic authentication handling
- Built-in timeout management
- Better testability and maintainability

## Monitoring and Debugging

### Error Tracking

API client errors include:

- Request URL and method
- Response status and status text
- Error timestamps
- Request/response headers (in development)

### Development Tools

- Console logging of failed requests
- Network request timing
- Cache hit/miss information from React Query DevTools

This architecture provides a robust, scalable foundation for API communication while maintaining excellent developer experience and type safety throughout the application.
