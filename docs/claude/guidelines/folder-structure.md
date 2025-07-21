# Project Folder Structure Guidelines

## Overview

This document defines the standardized folder structure for the Skills Evaluation App, covering both the Design System and Backend Architecture, ensuring consistency, maintainability, and scalability across the entire monorepo.

## Monorepo Structure

```
aiSkillimprove/
├── packages/
│   ├── app/                       # Next.js application (frontend + API)
│   ├── design-system/             # Shared UI component library
│   ├── backend-core/             # Shared backend logic (Phase 2+)
│   └── services/                 # Extracted microservices (Phase 4+)
│       ├── ai-service/           # AI recommendations service
│       ├── github-service/       # Repository analysis service
│       └── analytics-service/    # Analytics and reporting service
├── docs/                         # Project documentation
│   ├── backend/                  # Backend implementation guides
│   ├── claude/                   # AI assistant guidelines
│   └── PROJECT_OVERVIEW.md       # High-level project documentation
├── infrastructure/               # Docker, deployment configs
│   ├── docker-compose.yml        # Production orchestration
│   ├── docker-compose.dev.yml    # Development environment
│   └── monitoring/               # Logging and monitoring setup
└── .env.example                  # Environment variables template
```

## Design System Package Structure

```
packages/design-system/
├── docs/                           # Documentation (NEW)
│   ├── tasks/                      # Implementation tracking
│   │   ├── implementation-plan.md  # Master implementation plan
│   │   ├── current-progress.md     # Progress tracking
│   │   └── component-checklist.md  # Quality checklist
│   ├── components/                 # Component documentation
│   └── guidelines/                 # Design system guidelines
├── src/                           # Source code
│   ├── components/                # All components organized by category
│   │   ├── ui/                   # Base UI components (shadcn/ui based)
│   │   ├── layout/               # Layout and structure components
│   │   ├── forms/                # Form and input components
│   │   ├── data-display/         # Data visualization components
│   │   ├── feedback/             # Loading, error, success states
│   │   └── navigation/           # Navigation components
│   ├── lib/                      # Utilities and helpers
│   ├── styles/                   # Global styles and CSS
│   ├── types/                    # TypeScript type definitions
│   └── hooks/                    # Reusable React hooks
├── .storybook/                   # Storybook configuration
├── dist/                         # Built package output
└── package.json                  # Package configuration
```

## Backend Architecture Structure

### App Package (Enhanced Monolith - Phase 1)

```
packages/app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/v1/              # Versioned API routes
│   │   │   ├── skills/          # Skills CRUD operations
│   │   │   ├── categories/      # Categories management
│   │   │   ├── assessments/     # Assessment engine
│   │   │   ├── integrations/    # External service APIs
│   │   │   └── middleware/      # API middleware
│   │   ├── dashboard/           # Dashboard pages
│   │   └── auth/               # Authentication pages
│   ├── components/             # UI components (using design-system)
│   ├── hooks/                  # Application hooks
│   ├── lib/                    # Application utilities
│   │   ├── api-client.ts       # HTTP client
│   │   ├── auth.ts            # Authentication config
│   │   ├── validations/       # Zod validation schemas
│   │   ├── middleware/        # API middleware functions
│   │   └── gateway/           # API gateway (Phase 3+)
│   └── services/              # Service layer
│       ├── skills.service.ts
│       ├── categories.service.ts
│       ├── auth.service.ts
│       └── types/             # Service type definitions
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/                    # Static assets
└── package.json
```

### Backend Core Package (Modular Monolith - Phase 2)

```
packages/backend-core/
├── src/
│   ├── lib/                   # Shared utilities
│   │   ├── auth.ts           # Authentication utilities
│   │   ├── cache.ts          # Caching utilities
│   │   ├── database.ts       # Database utilities
│   │   ├── queue.ts          # Job queue utilities
│   │   └── validation.ts     # Shared validation schemas
│   ├── services/             # Business logic services
│   │   ├── skills/           # Skills domain service
│   │   │   ├── skills.service.ts
│   │   │   ├── skills.repository.ts
│   │   │   └── skill-analytics.service.ts
│   │   ├── categories/       # Categories domain service
│   │   ├── assessments/      # Assessments domain service
│   │   └── integrations/     # External integrations
│   │       ├── github.service.ts
│   │       ├── openai.service.ts
│   │       └── google.service.ts
│   ├── middleware/           # Reusable middleware
│   │   ├── auth.ts
│   │   ├── cors.ts
│   │   ├── logging.ts
│   │   └── rate-limiting.ts
│   ├── types/                # Shared TypeScript types
│   │   ├── api.ts
│   │   ├── database.ts
│   │   └── services.ts
│   └── jobs/                 # Background job definitions
│       ├── skill-analysis.ts
│       ├── github-sync.ts
│       └── notifications.ts
├── dist/                     # Built package output
└── package.json
```

### Microservices Structure (Service Extraction - Phase 4)

```
packages/services/
├── ai-service/               # AI recommendations service
│   ├── src/
│   │   ├── app.ts           # Express application
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Service middleware
│   │   └── types/          # Service types
│   ├── Dockerfile
│   └── package.json
├── github-service/           # Repository analysis service
│   ├── src/
│   │   ├── app.ts
│   │   ├── routes/
│   │   ├── services/
│   │   └── workers/         # Background workers
│   ├── Dockerfile
│   └── package.json
└── analytics-service/        # Analytics and reporting
    ├── src/
    │   ├── app.ts
    │   ├── routes/
    │   └── aggregators/     # Data aggregation logic
    ├── Dockerfile
    └── package.json
```

## Component Folder Structure

### Standard Component Structure

```
src/components/{category}/{component-name}/
├── {component-name}.tsx            # Main component implementation
├── {component-name}.stories.tsx    # Storybook stories
├── {component-name}.test.tsx       # Unit tests
├── index.ts                       # Component exports
└── README.md                      # Component documentation
```

### Complex Component Structure (with sub-components)

```
src/components/{category}/{component-name}/
├── {component-name}.tsx            # Main component
├── {component-name}.stories.tsx    # Stories
├── {component-name}.test.tsx       # Tests
├── components/                     # Sub-components
│   ├── sub-component.tsx
│   ├── another-component.tsx
│   └── index.ts                   # Sub-component exports
├── hooks/                         # Component-specific hooks
│   ├── use-component-logic.ts
│   └── index.ts
├── index.ts                       # Main exports
└── README.md                      # Documentation
```

## Category Definitions

### 1. UI Components (`src/components/ui/`)

**Purpose**: Base UI components, primarily based on shadcn/ui
**Examples**: Button, Input, Text, Card, Badge

```
src/components/ui/
├── button/
│   ├── button.tsx               ✅ COMPLETED
│   ├── button.stories.tsx       ✅ COMPLETED
│   ├── button.test.tsx          ✅ COMPLETED
│   ├── index.ts                 ✅ COMPLETED
│   └── README.md                ✅ COMPLETED
├── input/
│   ├── input.tsx                ✅ COMPLETED (Enhanced shadcn/ui base)
│   ├── input.stories.tsx        ✅ COMPLETED (12 story variations)
│   ├── input.test.tsx           ✅ COMPLETED (30 comprehensive tests)
│   ├── index.ts                 ✅ COMPLETED (Proper exports)
│   └── README.md                ✅ COMPLETED (Full documentation)
├── text/
│   ├── text.tsx                 ✅ COMPLETED (Comprehensive typography system)
│   ├── text.stories.tsx         ✅ COMPLETED (11 story variations)
│   ├── text.test.tsx            ✅ COMPLETED (30 comprehensive tests)
│   ├── index.ts                 ✅ COMPLETED (Proper exports)
│   └── README.md                ✅ COMPLETED (Full documentation)
├── card/                        🔄 IN PROGRESS
└── index.ts                     ✅ UPDATED (Input & Text exports added)
```

### 2. Layout Components (`src/components/layout/`)

**Purpose**: Layout and structural components
**Examples**: Container, Grid, AppLayout, Sidebar

```
src/components/layout/
├── app-layout/                  ✅ COMPLETED
├── container/                   ✅ COMPLETED
├── grid/                        ✅ COMPLETED
└── index.ts                     # Category exports
```

### 3. Form Components (`src/components/forms/`)

**Purpose**: Form-specific components and wrappers
**Examples**: FormField, Select, Checkbox, Radio

```
src/components/forms/
├── form-field/                  ⏳ PENDING
├── select/                      ⏳ PENDING
├── checkbox/                    ⏳ PENDING
├── radio/                       ⏳ PENDING
└── index.ts                     # Category exports
```

### 4. Data Display Components (`src/components/data-display/`)

**Purpose**: Components for displaying data and information
**Examples**: Table, Avatar, Badge, List

```
src/components/data-display/
├── table/                       ⏳ PENDING
├── avatar/                      ⏳ PENDING
├── badge/                       ⏳ PENDING
└── index.ts                     # Category exports
```

### 5. Feedback Components (`src/components/feedback/`)

**Purpose**: Loading states, alerts, notifications
**Examples**: Spinner, Toast, Alert, Progress

```
src/components/feedback/
├── spinner/                     ⏳ PENDING
├── toast/                       ⏳ PENDING
├── alert/                       ⏳ PENDING
├── progress/                    ⏳ PENDING
└── index.ts                     # Category exports
```

### 6. Navigation Components (`src/components/navigation/`)

**Purpose**: Navigation and routing components
**Examples**: Tabs, Breadcrumb, Menu, Pagination

```
src/components/navigation/
├── tabs/                        ⏳ PENDING
├── breadcrumb/                  ⏳ PENDING
├── menu/                        ⏳ PENDING
├── pagination/                  ⏳ PENDING
└── index.ts                     # Category exports
```

## File Naming Conventions

### Component Files

- **Main Component**: `{component-name}.tsx` (kebab-case)
- **Stories**: `{component-name}.stories.tsx`
- **Tests**: `{component-name}.test.tsx`
- **Index**: `index.ts`
- **Documentation**: `README.md`

### Examples

```
✅ Good:
- input.tsx
- input.stories.tsx
- input.test.tsx
- dropdown-menu.tsx
- form-field.tsx

❌ Bad:
- Input.tsx
- InputComponent.tsx
- input-component.tsx
- inputStories.tsx
```

### Component Names (in code)

- **Export Name**: PascalCase (`Input`, `DropdownMenu`, `FormField`)
- **Display Name**: PascalCase (`Input`, `DropdownMenu`, `FormField`)
- **File Name**: kebab-case (`input.tsx`, `dropdown-menu.tsx`)

## Index File Structure

### Component Index (`src/components/{category}/index.ts`)

```typescript
// Export all components in this category
export * from "./component-one";
export * from "./component-two";
export * from "./component-three";
```

### Main Package Index (`src/index.ts`)

```typescript
// Core UI Components
export * from "./components/ui";

// Layout Components
export * from "./components/layout";

// Form Components
export * from "./components/forms";

// Data Display Components
export * from "./components/data-display";

// Feedback Components
export * from "./components/feedback";

// Navigation Components
export * from "./components/navigation";

// Utilities
export * from "./lib/cn";
export * from "./lib/utils";

// Types
export * from "./types";

// Hooks
export * from "./hooks";
```

## Documentation Structure

### Component README Template

````markdown
# {Component Name}

Brief description of the component.

## Features

- Feature 1
- Feature 2

## Basic Usage

\```tsx
import { ComponentName } from "@skills-eval/design-system";

<ComponentName prop="value" />
\```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |

## Examples

[Various usage examples]

## Accessibility

[Accessibility guidelines]

## Best Practices

[Usage recommendations]
````

### Main Documentation Structure

```
docs/
├── tasks/                      # Implementation tracking
│   ├── implementation-plan.md  # Master plan
│   ├── current-progress.md     # Progress tracking
│   └── component-checklist.md  # Quality checklist
├── components/                 # Component-specific docs
│   ├── input.md               # Input component guide
│   ├── typography.md          # Typography guide
│   └── card.md                # Card component guide
└── guidelines/                 # Design system guidelines
    ├── folder-structure.md     # This document
    ├── component-patterns.md   # Component patterns
    ├── accessibility.md        # Accessibility guidelines
    └── testing.md             # Testing guidelines
```

## Storybook Organization

### Story File Structure

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./component-name";

const meta = {
  title: "Category/ComponentName",
  component: ComponentName,
  // ... configuration
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories
export const Default: Story = {
  /* ... */
};
export const Variants: Story = {
  /* ... */
};
export const States: Story = {
  /* ... */
};
export const Interactive: Story = {
  /* ... */
};
```

### Story Naming Convention

- **Default**: Basic usage example
- **Variants**: Showcase different variants
- **Sizes**: Different size options
- **States**: Different states (disabled, loading, etc.)
- **Interactive**: Interactive examples with state
- **Composition**: Complex composition examples
- **Kitchen Sink**: All features combined

## Testing Structure

### Test File Organization

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentName } from "./component-name";

describe("ComponentName", () => {
  describe("Basic Rendering", () => {
    // Basic rendering tests
  });

  describe("Variants", () => {
    // Variant tests
  });

  describe("States", () => {
    // State tests
  });

  describe("Interactions", () => {
    // User interaction tests
  });

  describe("Accessibility", () => {
    // Accessibility tests
  });
});
```

## Best Practices

### ✅ Do

- Use kebab-case for file names
- Use PascalCase for component names
- Keep components in organized category folders
- Include comprehensive documentation
- Follow the standard folder structure
- Export components consistently
- Use descriptive story names

### ❌ Don't

- Mix naming conventions
- Create deep folder nesting unnecessarily
- Skip documentation files
- Use unclear component names
- Break the established patterns
- Create circular dependencies

## Migration Guidelines

### Adding New Components

1. **Choose Category**: Determine appropriate category folder
2. **Create Folder**: Follow standard folder structure
3. **Implement Component**: Follow component patterns
4. **Add Tests**: Comprehensive test coverage
5. **Create Stories**: Storybook documentation
6. **Write README**: Component documentation
7. **Update Exports**: Add to category and main index
8. **Update Docs**: Update progress tracking

### Refactoring Existing Components

1. **Plan Structure**: Design new folder structure
2. **Create Migration Plan**: Document breaking changes
3. **Implement Gradually**: Phase the migration
4. **Update Imports**: Update all import paths
5. **Test Thoroughly**: Ensure no regressions
6. **Update Documentation**: Reflect changes

## Conclusion

This folder structure provides:

- **Organization**: Clear categorization of components
- **Scalability**: Easy to add new components and categories
- **Maintainability**: Consistent patterns and documentation
- **Developer Experience**: Easy to find and use components
- **Quality**: Built-in testing and documentation requirements

## Backend Implementation Phases

### Phase 1: Enhanced Monolith (Weeks 1-2)
**Goal**: Improve existing Next.js API foundation

#### File Organization Changes
```bash
# Move existing API routes to versioned structure
packages/app/src/app/api/v1/
├── skills/                    # Enhanced existing skills API
├── categories/               # Enhanced categories API  
├── assessments/              # New assessment engine
├── integrations/             # GitHub, Google APIs (prepare)
├── ai/                       # OpenAI integration (prepare)
└── analytics/                # Dashboard metrics
```

#### New Files to Create
- `packages/app/src/lib/validations/skills.ts` - Zod validation schemas
- `packages/app/src/lib/middleware/auth.ts` - Authentication middleware
- `packages/app/src/lib/middleware/rate-limit.ts` - Rate limiting
- `docker-compose.dev.yml` - Development environment
- `Dockerfile.dev` - Development container

### Phase 2: Modular Monolith (Weeks 3-4)
**Goal**: Organize code for future service extraction

#### New Package Structure
```bash
packages/backend-core/        # New package for shared logic
├── src/services/            # Extracted business logic
├── src/middleware/          # Reusable middleware
├── src/types/              # Shared types
└── src/jobs/               # Background job definitions
```

### Phase 3: Service Extraction Foundation (Weeks 5-6)
**Goal**: Build infrastructure for future microservices

#### Infrastructure Files
```bash
infrastructure/
├── docker-compose.yml       # Production orchestration
├── docker-compose.dev.yml   # Development environment
└── monitoring/              # Logging and monitoring
```

### Phase 4: Selective Microservices (Week 7+)
**Goal**: Extract services only when justified by scale

#### Service Extraction Pattern
```bash
packages/services/{service-name}/
├── src/
│   ├── app.ts              # Express application
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── middleware/         # Service middleware
├── Dockerfile
└── package.json
```

## Backend Naming Conventions

### API Routes
- **Versioned URLs**: `/api/v1/skills`, `/api/v1/categories`
- **RESTful patterns**: GET, POST, PUT, DELETE
- **Resource-based**: `/api/v1/skills/{id}`, `/api/v1/categories/{id}`

### Service Files
- **Services**: `skills.service.ts`, `categories.service.ts`
- **Repositories**: `skills.repository.ts`, `categories.repository.ts`
- **Middleware**: `auth.ts`, `rate-limit.ts`, `logging.ts`
- **Jobs**: `skill-analysis.ts`, `github-sync.ts`

### Package Names
- **Internal packages**: `@skills-eval/backend-core`, `@skills-eval/shared`
- **Service packages**: `@skills-eval/ai-service`, `@skills-eval/github-service`

## Backend Quality Standards

### Code Organization
- **180-line limit** per service file (same as components)
- **Domain-driven structure** - organize by business domain
- **Separation of concerns** - routes, services, repositories
- **Dependency injection** - for testability and flexibility

### Testing Requirements
- **Unit tests** for all service methods
- **Integration tests** for API endpoints
- **80%+ test coverage** minimum
- **API contract testing** between services

### Documentation Standards
- **README.md** for each service package
- **API documentation** for all endpoints
- **Service boundary documentation** for extraction decisions
- **Deployment guides** for each phase

## Docker Development Workflow

### Development Environment
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Individual services (Phase 4+)
docker-compose up ai-service
docker-compose up github-service
```

### Production Deployment
```bash
# Full stack deployment
docker-compose up -d

# Service-specific deployment
docker-compose up -d --scale ai-service=3
```

## Service Extraction Decision Matrix

### Extract Service When:
- **Traffic**: > 1000 requests/minute
- **Team Size**: > 3 developers working on domain
- **Deployment**: Need independent deployment cycles
- **Technology**: Different tech stack requirements
- **Complexity**: > 1000 lines of code in domain

### Keep in Monolith When:
- **Fast operations**: Database CRUD < 100ms
- **Tightly coupled**: Frequent cross-domain queries  
- **Security critical**: Authentication, authorization
- **Simple operations**: Basic validation, formatting

## Migration Best Practices

### ✅ Do
- Start with enhanced monolith patterns
- Use versioned APIs from the beginning
- Implement health checks and monitoring early
- Extract services based on data-driven decisions
- Maintain backward compatibility during transitions
- Document service boundaries and data flows

### ❌ Don't  
- Extract services prematurely without scale justification
- Create circular dependencies between services
- Skip comprehensive testing during extraction
- Break existing API contracts without versioning
- Ignore monitoring and logging infrastructure
- Extract services without clear business boundaries

Following these guidelines ensures the backend architecture remains organized, scalable, and maintainable as it evolves from enhanced monolith to selective microservices based on actual scaling needs.
