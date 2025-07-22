# Skills Evaluation App - Architecture Guide

## 🏗️ System Architecture Overview

The Skills Evaluation App is built as a **production-ready monorepo** with a mature design system, comprehensive authentication, and a robust data layer. This architecture enables scalable development while maintaining code quality and consistency.

## 📦 Monorepo Structure

```
aiSkillimprove/
├── packages/
│   ├── app/                     # Next.js 15 Application (Main App)
│   │   ├── src/
│   │   │   ├── app/            # Next.js App Router
│   │   │   │   ├── api/        # API Routes (PostgreSQL + Prisma)
│   │   │   │   ├── auth/       # Authentication pages
│   │   │   │   ├── dashboard/  # Skills dashboard (completed)
│   │   │   │   └── globals.css # Global styles
│   │   │   ├── components/     # Application-specific components
│   │   │   │   ├── auth/       # Auth wrapper components
│   │   │   │   ├── dashboard/  # Dashboard-specific components
│   │   │   │   └── ui/         # App-level UI components
│   │   │   ├── lib/            # Application utilities
│   │   │   │   ├── auth.ts     # NextAuth v5 configuration
│   │   │   │   ├── db.ts       # Prisma client
│   │   │   │   └── api-client.ts # HTTP client for TanStack Query
│   │   │   ├── services/       # Data layer services
│   │   │   │   ├── skills.service.ts    # Skills CRUD operations
│   │   │   │   └── categories.service.ts # Categories operations
│   │   │   ├── hooks/          # TanStack Query hooks
│   │   │   │   ├── useSkills.ts
│   │   │   │   └── useCategories.ts
│   │   │   └── types/          # TypeScript type definitions
│   │   ├── prisma/             # Database schema and migrations
│   │   │   ├── schema.prisma   # Database models
│   │   │   ├── migrations/     # Database version history
│   │   │   └── seed.ts         # Initial data
│   │   ├── public/             # Static assets
│   │   └── package.json        # App-specific dependencies
│   │
│   └── design-system/          # Shared Component Library
│       ├── src/
│       │   ├── components/     # 84+ organized components
│       │   │   ├── ui/         # Base UI components (6)
│       │   │   ├── layout/     # Layout components (4)
│       │   │   ├── data-display/ # Data components (2)
│       │   │   ├── form/       # Form components (1)
│       │   │   ├── feedback/   # Feedback components (3)
│       │   │   ├── navigation/ # Navigation components (1)
│       │   │   └── theme/      # Theme management (2)
│       │   ├── lib/            # Design system utilities
│       │   │   └── utils.ts    # Class name utilities
│       │   └── index.ts        # Main exports
│       ├── .storybook/         # Storybook configuration
│       ├── dist/               # Built package
│       └── package.json        # Design system dependencies
│
├── docs/                       # Comprehensive Documentation
│   ├── README.md               # Documentation index
│   ├── ARCHITECTURE.md         # This file
│   ├── PROJECT_OVERVIEW.md     # Complete project overview
│   ├── app-implementation-progress.md # Development progress
│   ├── backend/                # Backend documentation
│   ├── claude/                 # AI assistant guidelines
│   └── tasks/                  # Task tracking and planning
│
├── .kiro/steering/             # Project rules and guidelines
├── mcp-tests/                  # Integration tests
├── package.json                # Root workspace configuration
└── CLAUDE.md                   # AI assistant project context
```

## 🔧 Technology Stack

### **Frontend Architecture**

#### **Next.js 15 App (packages/app/)**

- **Framework**: Next.js 15 with App Router for file-based routing
- **React Version**: React 19 with latest features and concurrent rendering
- **TypeScript**: Strict mode with no `any` types and full type safety
- **Styling**: Tailwind CSS with custom design tokens and responsive design

#### **Design System (packages/design-system/)**

- **Base Framework**: shadcn/ui components as foundation
- **Primitive Layer**: Radix UI for accessibility and keyboard navigation
- **Styling Approach**: Tailwind CSS with Class Variance Authority (CVA)
- **Bundle Format**: Rollup with CommonJS and ESM outputs for tree-shaking

### **Backend Architecture**

#### **API Layer**

- **Framework**: Next.js API Routes with TypeScript
- **Database**: PostgreSQL with connection pooling
- **ORM**: Prisma with type-safe queries and migrations
- **Authentication**: NextAuth v5 with JWT strategy

#### **Data Models**

```typescript
// Core entities in Prisma schema
User {
  id, email, name, image
  skills: Skill[]
  createdAt, updatedAt
}

Skill {
  id, name, description, proficiency (0-10)
  userId, categoryId
  verified, tags
  skillHistory: SkillHistory[]
}

SkillCategory {
  id, name, description, color, icon
  skills: Skill[]
}

SkillHistory {
  id, skillId, proficiency, notes
  createdAt
}
```

### **State Management Architecture**

#### **TanStack Query Integration**

- **Server State**: All API interactions through TanStack Query
- **Optimistic Updates**: Immediate UI feedback with server sync
- **Caching Strategy**: Intelligent cache invalidation and prefetching
- **Error Handling**: Centralized error boundaries and user feedback

#### **Query Hooks Structure**

```typescript
// Skills data management
useSkills(filters); // List skills with filtering
useCreateSkill(); // Create new skill
useUpdateSkill(); // Update existing skill
useDeleteSkill(); // Delete skill
useCategories(); // Get all categories
useCategoriesForFilter(); // Optimized for filter dropdown
```

## 🎨 Design System Architecture

### **Component Organization**

The design system follows a **categorical structure** for optimal organization and discoverability:

#### **UI Components (6 components)**

- **Button**: Complete shadcn/ui implementation with variants (default, destructive, outline, secondary, ghost)
- **Card**: Standard card component with header, content, and footer sections
- **Input**: Form input with validation states and accessibility features
- **Typography**: Text component with heading levels and body text variants
- **Badge**: Interactive badges with icons and removal functionality
- **ColorShowcase**: Design system color palette visualization

#### **Layout Components (4 components)**

- **AppLayout**: Full application shell with collapsible sidebar navigation
- **Container**: Responsive content wrapper with max-width constraints
- **Grid**: Flexible CSS Grid system with responsive breakpoints
- **Header**: Application header with navigation and user menu

#### **Data Display Components (2 components)**

- **Avatar**: User avatar with fallback initials and loading states
- **SkillCard**: Comprehensive skill display with proficiency indicators, categories, and actions

#### **Form Components (1 component)**

- **CategoryFilter**: Advanced filtering with multi-select, search, bulk actions, and category icons

#### **Feedback Components (3 components)**

- **LoadingSpinner**: Loading state indicators with size variants
- **Modal**: Dialog system built on Radix UI with keyboard trap and focus management
- **Toast**: Notification system using Sonner with success, error, and warning variants

#### **Navigation Components (1 component)**

- **DropdownMenu**: Complete dropdown system with submenus, keyboard navigation, and accessibility

#### **Theme Management (2 components)**

- **ThemeProvider**: Theme context and state management for dark/light mode
- **ThemeToggle**: Theme switcher with smooth transitions

### **Component Development Standards**

#### **Quality Requirements**

- **Size Limit**: Maximum 180 lines per component
- **TypeScript**: Full type safety with proper interfaces and props
- **Testing**: 80%+ test coverage with comprehensive unit tests
- **Documentation**: Complete README with usage examples and props table
- **Accessibility**: WCAG AA compliance with keyboard navigation
- **Storybook**: Interactive stories demonstrating all component variants

#### **Testing Architecture**

- **Framework**: Vitest with React Testing Library
- **Coverage**: 472+ unit tests across 13 test suites
- **Test Types**: Rendering tests, interaction tests, accessibility tests
- **CI Integration**: Automated testing on every pull request

## 🗄️ Database Architecture

### **PostgreSQL Schema Design**

#### **Core Tables**

```sql
-- User management (NextAuth integration)
users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

-- Skill categories (predefined system data)
skill_categories (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(7),  -- Hex color code
  icon VARCHAR(50),  -- Icon identifier
  created_at TIMESTAMP DEFAULT NOW()
)

-- Individual user skills
skills (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES skill_categories(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 10),
  verified BOOLEAN DEFAULT FALSE,
  tags TEXT[], -- PostgreSQL array for skill tags
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

-- Skill progression history
skill_history (
  id UUID PRIMARY KEY,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  proficiency INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
)
```

#### **Indexing Strategy**

- **Primary Keys**: UUID for all tables
- **Foreign Keys**: Proper relationships with cascade deletion
- **Search Indexes**: Skills name and description for full-text search
- **Performance Indexes**: User-skill queries and category filtering

### **Data Access Layer**

#### **Prisma Integration**

- **Type Safety**: Generated TypeScript types for all models
- **Query Builder**: Type-safe database queries with autocompletion
- **Migrations**: Version-controlled schema changes
- **Seeding**: Initial data population for categories

#### **Service Layer Pattern**

```typescript
// services/skills.service.ts
export class SkillsService {
  static async getSkills(filters: SkillsFilters): Promise<SkillsResponse>;
  static async createSkill(data: CreateSkillData): Promise<Skill>;
  static async updateSkill(id: string, data: UpdateSkillData): Promise<Skill>;
  static async deleteSkill(id: string): Promise<void>;
}
```

## 🔐 Authentication Architecture

### **NextAuth v5 Implementation**

#### **Authentication Flow**

1. **OAuth Provider**: Google OAuth 2.0 integration
2. **Session Strategy**: JWT tokens with 30-day expiration
3. **Token Management**: Automatic refresh and secure storage
4. **Route Protection**: Middleware for protected pages and API routes

#### **Session Structure**

```typescript
// Session type definition
interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string;
  };
  expires: string;
}
```

#### **Protected Routes**

- **Pages**: Dashboard and skill management pages require authentication
- **API Routes**: All `/api/skills` and `/api/categories` endpoints
- **Middleware**: Automatic redirects for unauthenticated users

## 🌐 API Architecture

### **RESTful API Design**

#### **Endpoint Structure**

```
/api/skills/
├── GET    /            # List skills with filtering
├── POST   /            # Create new skill
├── GET    /[id]        # Get specific skill
├── PUT    /[id]        # Update skill
└── DELETE /[id]        # Delete skill

/api/categories/
└── GET    /            # List all categories
```

#### **Request/Response Patterns**

```typescript
// Skills API responses
interface SkillsResponse {
  skills: Skill[];
  total: number;
  page: number;
  limit: number;
}

interface Skill {
  id: string;
  name: string;
  description?: string;
  proficiency: number; // 0-10 scale
  category: SkillCategory;
  verified: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

### **Error Handling**

- **Consistent Format**: Standardized error responses across all endpoints
- **HTTP Status Codes**: Proper status codes for different error types
- **Validation**: Request validation with detailed error messages
- **Logging**: Centralized error logging for debugging and monitoring

## 📊 State Management Flow

### **Data Flow Architecture**

```
User Interaction
    ↓
React Component
    ↓
TanStack Query Hook
    ↓
API Service Layer
    ↓
Next.js API Route
    ↓
Prisma ORM
    ↓
PostgreSQL Database
    ↓
Response back through chain
    ↓
Component Re-render with New Data
```

### **Caching Strategy**

- **TanStack Query**: Intelligent background updates and stale-while-revalidate
- **Cache Keys**: Hierarchical structure for efficient invalidation
- **Optimistic Updates**: Immediate UI feedback with rollback on errors
- **Prefetching**: Strategic data loading for improved user experience

## 🚀 Build and Deployment Architecture

### **Development Environment**

- **Monorepo Management**: npm workspaces for dependency management
- **Hot Reload**: Next.js and Storybook with instant updates
- **Quality Gates**: ESLint, Prettier, TypeScript, and tests on every save

### **Build Process**

```bash
# Design system build (first)
npm run design-system:build  # Creates dist/ package

# Application build (uses built design system)
npm run app:build           # Next.js production build

# Full monorepo build
npm run build:all          # Builds all packages in dependency order
```

### **Testing Pipeline**

- **Unit Tests**: Component and service testing with Vitest
- **Integration Tests**: API endpoint testing
- **Type Checking**: Strict TypeScript validation
- **Lint Checking**: Code quality and consistency validation

## 🔧 Development Workflow

### **Component Development Lifecycle**

1. **Design**: Plan component API and variants in Storybook
2. **Implementation**: Build component with TypeScript and accessibility
3. **Testing**: Write comprehensive unit tests
4. **Documentation**: Create README with usage examples
5. **Integration**: Export from design system and use in application

### **Feature Development Process**

1. **Database**: Design and migrate schema changes
2. **API**: Implement backend endpoints with validation
3. **Services**: Create service layer methods
4. **Hooks**: Build TanStack Query hooks
5. **Components**: Develop UI using design system components
6. **Integration**: Connect data layer to user interface
7. **Testing**: End-to-end feature testing

This architecture provides a solid foundation for scalable development while maintaining high code quality, accessibility standards, and user experience consistency throughout the Skills Evaluation App.
