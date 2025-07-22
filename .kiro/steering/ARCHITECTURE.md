# Skills Evaluation App - Architecture Guide

## 🏗️ System Architecture Overview

The Skills Evaluation App is built as a **production-ready monorepo** with a sophisticated assessment system, comprehensive learning goal tracking, and advanced analytics capabilities. This architecture enables scalable skill evaluation while maintaining code quality, security, and performance.

## 📦 Monorepo Structure

```
aiSkillimprove/
├── packages/
│   ├── app/                     # Next.js 15 Application (Main App)
│   │   ├── src/
│   │   │   ├── app/            # Next.js App Router
│   │   │   │   ├── api/        # Versioned API Routes (v1)
│   │   │   │   │   ├── v1/     # V1 API Implementation
│   │   │   │   │   │   ├── skills/           # Skills management
│   │   │   │   │   │   │   ├── analytics/    # Skills analytics
│   │   │   │   │   │   │   ├── bulk/         # Bulk operations
│   │   │   │   │   │   │   └── [id]/         # Individual skill ops
│   │   │   │   │   │   ├── assessments/      # Assessment system
│   │   │   │   │   │   │   └── [id]/         # Assessment management
│   │   │   │   │   │   └── categories/       # Category management
│   │   │   │   │   ├── auth/     # NextAuth v5 handlers
│   │   │   │   │   ├── health/   # Health monitoring
│   │   │   │   │   ├── metrics/  # Application metrics
│   │   │   │   │   └── monitoring/ # System status
│   │   │   │   ├── auth/       # Authentication pages
│   │   │   │   ├── dashboard/  # Skills dashboard
│   │   │   │   ├── admin/      # Admin monitoring
│   │   │   │   │   └── monitoring/ # Admin dashboard
│   │   │   │   └── skills/     # Skill detail pages
│   │   │   │       └── [id]/   # Individual skill views
│   │   │   ├── components/     # Application-specific components
│   │   │   │   ├── auth/       # Auth wrapper components
│   │   │   │   ├── dashboard/  # Dashboard-specific components
│   │   │   │   ├── skills/     # Skill management components
│   │   │   │   ├── monitoring/ # Admin monitoring components
│   │   │   │   └── ui/         # App-level UI components
│   │   │   ├── lib/            # Application utilities
│   │   │   │   ├── auth.ts     # NextAuth v5 configuration
│   │   │   │   ├── db.ts       # Prisma client
│   │   │   │   ├── middleware/ # Security & rate limiting
│   │   │   │   ├── errors/     # Error handling
│   │   │   │   ├── validations/ # Zod schemas
│   │   │   │   └── api-client.ts # HTTP client for TanStack Query
│   │   │   ├── services/       # Data layer services
│   │   │   │   ├── skills.service.ts      # Skills CRUD operations
│   │   │   │   ├── assessments.service.ts # Assessment management
│   │   │   │   ├── goals.service.ts       # Learning goal tracking
│   │   │   │   ├── analytics.service.ts   # Analytics & reporting
│   │   │   │   └── categories.service.ts  # Categories operations
│   │   │   ├── hooks/          # TanStack Query hooks
│   │   │   │   ├── useSkills.ts
│   │   │   │   ├── useAssessments.ts
│   │   │   │   ├── useGoals.ts
│   │   │   │   └── useCategories.ts
│   │   │   └── types/          # TypeScript type definitions
│   │   ├── prisma/             # Database schema and migrations
│   │   │   ├── schema.prisma   # Complete 12-model schema
│   │   │   ├── migrations/     # Database version history
│   │   │   └── seed.ts         # Initial data seeding
│   │   ├── public/             # Static assets
│   │   └── package.json        # App-specific dependencies
│   │
│   └── design-system/          # Shared Component Library
│       ├── src/
│       │   ├── components/     # 100+ organized components
│       │   │   ├── ui/         # Base UI components (20+)
│       │   │   ├── layout/     # Layout components (6)
│       │   │   ├── data-display/ # Data components (8+)
│       │   │   ├── form/       # Form components (15+)
│       │   │   ├── feedback/   # Feedback components (8)
│       │   │   ├── navigation/ # Navigation components (6)
│       │   │   └── theme/      # Theme management (4)
│       │   ├── hooks/          # Design system hooks
│       │   │   ├── use-toast.tsx    # Toast notifications
│       │   │   └── use-table.tsx    # Data table management
│       │   ├── lib/            # Design system utilities
│       │   │   └── utils.ts    # Class name utilities
│       │   └── index.ts        # Main exports
│       ├── .storybook/         # Storybook configuration
│       ├── dist/               # Built package
│       └── package.json        # Design system dependencies
│
├── docs/                       # Comprehensive Documentation
├── .kiro/steering/             # Project rules and guidelines
├── mcp-tests/                  # Integration tests
├── package.json                # Root workspace configuration
└── CLAUDE.md                   # AI assistant project context
```

## 🔧 Technology Stack

### **Frontend Architecture**

#### **Next.js 15 App (packages/app/)**

- **Framework**: Next.js 15.4.1 with App Router and Turbopack
- **React Version**: React 19.1.0 with latest features and concurrent rendering
- **TypeScript**: Strict mode with comprehensive type safety (TypeScript 5)
- **Styling**: Tailwind CSS 3.4.17 with custom design tokens and responsive design

#### **Design System (packages/design-system/)**

- **Base Framework**: shadcn/ui components as foundation
- **Primitive Layer**: Radix UI for accessibility and keyboard navigation
- **Styling Approach**: Tailwind CSS with Class Variance Authority (CVA)
- **Bundle Format**: Rollup with CommonJS and ESM outputs for tree-shaking
- **Documentation**: Storybook 8.4.7 with interactive component documentation

### **Backend Architecture**

#### **API Layer (Versioned v1)**

- **Framework**: Next.js API Routes with TypeScript
- **Architecture**: RESTful API with versioned endpoints (`/api/v1/`)
- **Database**: PostgreSQL with connection pooling
- **ORM**: Prisma 6.12.0 with type-safe queries and migrations
- **Authentication**: NextAuth v5 (beta) with JWT strategy and multiple providers

#### **Security & Middleware**

- **Security**: Comprehensive middleware stack with CORS, rate limiting, input sanitization
- **Rate Limiting**: Redis-based with Upstash integration
- **Request Logging**: Full audit trail with user context and performance metrics
- **Error Handling**: Centralized error handling with user-friendly messages

### **Comprehensive Data Models**

The application features a sophisticated 12-model database schema supporting advanced skill evaluation:

#### **Core User & Authentication Models**

```typescript
// NextAuth v5 Integration Models
Account {
  id: string (cuid)
  userId: string
  type: string
  provider: string (google, github, etc.)
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
  createdAt: DateTime
  updatedAt: DateTime

  // Relations
  user: User
}

Session {
  id: string (cuid)
  sessionToken: string (unique)
  userId: string
  expires: DateTime

  // Relations
  user: User
}

VerificationToken {
  identifier: string
  token: string (unique)
  expires: DateTime
}

// Enhanced User Model
User {
  id: string (cuid)
  email: string (unique)
  name?: string
  image?: string
  password?: string  // for email/password auth
  emailVerified?: DateTime
  provider?: string  // google, github
  providerId?: string
  createdAt: DateTime
  updatedAt: DateTime

  // Relations
  accounts: Account[]
  sessions: Session[]
  skills: Skill[]
  assessments: Assessment[]
  skillHistory: SkillHistory[]
  assessmentHistory: AssessmentHistory[]
  learningGoals: LearningGoal[]
  skillProgressions: SkillProgression[]
}
```

#### **Enhanced Skill Management Models**

```typescript
// Skill Categories with UI Properties
SkillCategory {
  id: string (cuid)
  name: string (unique)
  slug: string (unique)
  description?: string
  icon?: string  // icon name or emoji
  color?: string  // hex color for UI
  order: number (default: 0)
  createdAt: DateTime
  updatedAt: DateTime

  // Relations
  skills: Skill[]
}

// Advanced Skill Model with Source Tracking
Skill {
  id: string (cuid)
  userId: string
  categoryId: string
  name: string
  proficiency: number (0-10 scale, default: 0)
  description?: string
  tags: string (JSON array for compatibility)
  source: SkillSource (default: MANUAL)
  verified: boolean (default: false)
  lastAssessed?: DateTime
  createdAt: DateTime
  updatedAt: DateTime

  // Relations
  user: User
  category: SkillCategory
  assessments: Assessment[]
  history: SkillHistory[]
  learningGoals: LearningGoal[]
  progressions: SkillProgression[]
}

// Comprehensive Skill History Tracking
SkillHistory {
  id: string (cuid)
  skillId: string
  userId: string
  proficiency: number  // proficiency at this point in time
  reason?: string      // reason for change
  source: SkillSource
  createdAt: DateTime

  // Relations
  skill: Skill
  user: User
}

// Skill Source Enum
enum SkillSource {
  MANUAL        // User manually added
  ASSESSMENT    // Added via assessment
  GITHUB        // Imported from GitHub analysis
  AI_SUGGESTED  // AI recommendation
  IMPORTED      // Imported from resume/file
}
```

#### **Advanced Assessment System Models**

```typescript
// Assessment Management
Assessment {
  id: string (cuid)
  userId: string
  skillId?: string  // null for general assessments
  type: AssessmentType
  score?: number        // assessment score if applicable
  proficiency?: number  // resulting proficiency level
  feedback?: string     // AI-generated or manual feedback
  metadata?: Json       // additional assessment data
  completedAt?: DateTime
  createdAt: DateTime
  updatedAt: DateTime

  // Relations
  user: User
  skill?: Skill
  questions: AssessmentQuestion[]
  history: AssessmentHistory[]
}

// Assessment Questions and Answers
AssessmentQuestion {
  id: string (cuid)
  assessmentId: string
  question: string
  answer?: string
  isCorrect?: boolean
  metadata?: Json  // additional question data
  createdAt: DateTime

  // Relations
  assessment: Assessment
}

// Assessment History Tracking
AssessmentHistory {
  id: string (cuid)
  assessmentId: string
  userId: string
  action: AssessmentAction
  previousScore?: number       // previous score before change
  newScore?: number           // new score after change
  previousProficiency?: number // previous proficiency before change
  newProficiency?: number     // new proficiency after change
  reason?: string             // reason for change/update
  metadata?: Json             // additional context data
  createdAt: DateTime

  // Relations
  assessment: Assessment
  user: User
}

// Assessment Type Enum
enum AssessmentType {
  SELF_ASSESSMENT  // User rates themselves
  QUIZ            // Knowledge quiz
  PROJECT_REVIEW  // Review of GitHub projects
  PEER_REVIEW     // Peer validation
  AI_EVALUATION   // AI-based evaluation
}

// Assessment Action Enum
enum AssessmentAction {
  CREATED                // Assessment created
  STARTED                // Assessment started
  COMPLETED              // Assessment completed
  UPDATED                // Assessment updated/modified
  DELETED                // Assessment deleted
  SCORE_CHANGED          // Score manually changed
  PROFICIENCY_UPDATED    // Proficiency level updated
  REVIEW_ADDED           // Review/feedback added
}
```

#### **Learning Goal & Progress Tracking Models**

```typescript
// Learning Goals Management
LearningGoal {
  id: string (cuid)
  userId: string
  skillId: string
  targetProficiency: number  // Target proficiency level (1-10)
  currentProficiency: number // Current proficiency when goal was set
  targetDate?: DateTime      // Optional target completion date
  motivation?: string        // Why user wants to learn this
  status: GoalStatus (default: ACTIVE)
  completedAt?: DateTime     // When goal was achieved
  createdAt: DateTime
  updatedAt: DateTime

  // Relations
  user: User
  skill: Skill
}

// Weekly Skill Progression Metrics
SkillProgression {
  id: string (cuid)
  userId: string
  skillId: string
  weekNumber: number       // Week number in year (1-52)
  year: number            // Year
  practiceHours: number (default: 0)    // Hours practiced this week
  assessmentsTaken: number (default: 0) // Number of assessments
  avgScore?: number       // Average assessment score
  proficiencyStart: number // Proficiency at week start
  proficiencyEnd: number   // Proficiency at week end
  milestones?: Json       // JSON array of milestone achievements
  createdAt: DateTime
  updatedAt: DateTime

  // Relations
  user: User
  skill: Skill
}

// Goal Status Enum
enum GoalStatus {
  ACTIVE     // Currently working towards
  ACHIEVED   // Goal reached
  PAUSED     // Temporarily paused
  ABANDONED  // No longer pursuing
}
```

### **Database Architecture**

#### **PostgreSQL Schema Design**

The database uses PostgreSQL with the following key architectural decisions:

- **CUID IDs**: Collision-resistant unique identifiers for all primary keys
- **Comprehensive Indexing**: Strategic indexes on frequently queried fields
- **Cascade Deletions**: Proper data cleanup when users or skills are deleted
- **JSON Fields**: Flexible metadata storage for extensibility
- **Enum Types**: Type-safe categorical data
- **Foreign Key Constraints**: Data integrity enforcement

#### **Key Indexes for Performance**

```sql
-- User and authentication indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- Skills and categories indexes
CREATE INDEX idx_skills_user_category ON skills(user_id, category_id);
CREATE INDEX idx_skills_proficiency ON skills(proficiency);
CREATE INDEX idx_categories_slug ON skill_categories(slug);

-- Assessment and history indexes
CREATE INDEX idx_assessments_user_created ON assessments(user_id, created_at);
CREATE INDEX idx_assessments_skill_id ON assessments(skill_id);
CREATE INDEX idx_skill_history_skill_created ON skill_history(skill_id, created_at);
CREATE INDEX idx_assessment_history_action ON assessment_history(action);

-- Goals and progression indexes
CREATE INDEX idx_goals_user_status ON learning_goals(user_id, status);
CREATE INDEX idx_goals_target_date ON learning_goals(target_date);
CREATE INDEX idx_progression_user_skill ON skill_progressions(user_id, skill_id);
CREATE INDEX idx_progression_year_week ON skill_progressions(year, week_number);
```

## 🎨 Design System Architecture

### **Component Organization**

The design system has grown to **100+ components** organized in a scalable categorical structure:

#### **UI Components (20+ components)**

- **Button**: Complete implementation with 8+ variants (default, destructive, outline, secondary, ghost, link, etc.)
- **Card**: Standard card component with header, content, and footer sections
- **Input**: Enhanced form input with validation states, icons, and accessibility features
- **Select**: Advanced select component with search, multi-select, and custom rendering
- **Slider**: Range slider with multiple handles and custom styling
- **Table**: Comprehensive data table with sorting, filtering, and pagination
- **Typography**: Text component with heading levels and body text variants
- **Badge**: Interactive badges with icons and removal functionality
- **Popover**: Floating UI integration for tooltips and dropdowns
- **SimpleTooltip**: Lightweight tooltip for basic use cases
- **Tooltip**: Advanced tooltip system with rich content support
- **And more**: ColorShowcase, various form controls, layout utilities

#### **Layout Components (6 components)**

- **AppLayout**: Full application shell with collapsible sidebar navigation
- **Container**: Responsive content wrapper with max-width constraints
- **Grid**: Flexible CSS Grid system with responsive breakpoints
- **Header**: Application header with navigation and user menu
- **Sidebar**: Advanced sidebar with navigation, user profile, and collapsible sections
- **PageLayout**: Standard page wrapper with breadcrumbs and actions

#### **Data Display Components (8+ components)**

- **Avatar**: User avatar with fallback initials and loading states
- **SkillCard**: Comprehensive skill display with proficiency indicators, categories, and actions
- **Table**: Advanced data table with sorting, filtering, pagination, and bulk actions
- **StatsCard**: Metric display cards for dashboards
- **ProgressBar**: Progress indicators with multiple variants
- **Chart Components**: Integration with charting libraries
- **DataList**: Structured data presentation
- **And more**: Various data visualization components

#### **Form Components (15+ components)**

- **CategoryFilter**: Advanced filtering with multi-select, search, bulk actions, and category icons
- **MultiSelect**: Advanced multi-selection with search and custom item rendering
- **FileUpload**: Drag-and-drop file upload with progress and validation
- **RichTextEditor**: WYSIWYG editor for rich content
- **FormBuilder**: Dynamic form generation
- **Validation Components**: Form validation feedback and error display
- **DatePicker**: Calendar-based date selection
- **SearchBox**: Advanced search with autocomplete
- **FilterPanel**: Complex filtering interfaces
- **And more**: Various specialized form controls

#### **Feedback Components (8 components)**

- **LoadingSpinner**: Loading state indicators with size variants
- **Modal**: Dialog system built on Radix UI with keyboard trap and focus management
- **Toast**: Notification system using Sonner with success, error, and warning variants
- **ToastProvider**: Context provider for toast notifications
- **AlertDialog**: Confirmation dialogs with customizable actions
- **ProgressIndicator**: Step-by-step progress visualization
- **StatusIndicator**: System status and health displays
- **EmptyState**: No-data states with actions

#### **Navigation Components (6 components)**

- **DropdownMenu**: Complete dropdown system with submenus, keyboard navigation, and accessibility
- **Breadcrumb**: Hierarchical navigation with dynamic path building
- **Pagination**: Advanced pagination with page size controls
- **Tabs**: Tab navigation with various orientations
- **NavigationMenu**: Main navigation with hierarchical menus
- **SidebarNav**: Sidebar navigation with active states and icons

#### **Theme Management (4 components)**

- **ThemeProvider**: Theme context and state management for dark/light mode
- **ThemeToggle**: Theme switcher with smooth transitions
- **ColorPalette**: Design system color management
- **ThemeCustomizer**: Runtime theme customization interface

### **Advanced Features**

#### **Hooks System**

```typescript
// Design System Hooks
useToast(): {
  toast: (message: string, options?: ToastOptions) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

useTable<T>(): {
  data: T[];
  sorting: SortingState;
  filtering: ColumnFiltersState;
  pagination: PaginationState;
  // ... complete table management
}
```

#### **Testing Architecture**

- **Framework**: Vitest with React Testing Library
- **Coverage**: 418+ unit tests across 15+ test suites
- **Test Types**: Rendering tests, interaction tests, accessibility tests, integration tests
- **CI Integration**: Automated testing with coverage reporting
- **Accessibility Testing**: Automated WCAG AA compliance testing

## 🔌 API Architecture

### **Versioned API Design**

The API follows a comprehensive versioned structure:

```
/api/v1/
├── skills/                    # Core skills management
│   ├── GET, POST /           # List & create skills
│   ├── /analytics            # Skills analytics & insights
│   ├── /bulk                 # Bulk operations (PATCH, DELETE)
│   └── /[id]/               # Individual skill operations
│       ├── GET, PUT, PATCH, DELETE
│       └── /history         # Skill history tracking
├── assessments/              # Assessment system
│   ├── GET, POST /          # List & create assessments
│   └── /[id]/               # Individual assessment operations
│       ├── GET, PUT, DELETE
│       ├── /questions       # Assessment questions
│       └── /complete        # Complete assessment workflow
├── categories/               # Category management
│   ├── GET, POST /          # List & create categories
│   └── /[id]/               # Individual category operations
├── goals/                    # Learning goals management
│   ├── GET, POST /          # List & create goals
│   └── /[id]/               # Individual goal operations
├── progression/              # Skill progression tracking
│   ├── GET /                # Get progression data
│   └── /analytics           # Progression analytics
└── users/                    # User management (admin)
    ├── /profile             # User profile management
    └── /preferences         # User preferences
```

### **Legacy API Compatibility**

```
/api/
├── skills → /api/v1/skills        # Legacy proxy endpoints
├── categories → /api/v1/categories # Legacy proxy endpoints
├── health                          # Health monitoring
├── metrics                         # Application metrics
└── monitoring/status               # System status
```

### **Advanced API Features**

#### **Security Middleware Stack**

```typescript
// Comprehensive security pipeline
withApiSecurity(
  withAuthLogging(withRateLimit(withCORS(withInputSanitization(apiHandler))))
);
```

#### **Rate Limiting Strategy**

- **Read Operations**: 100 requests/minute per IP
- **Write Operations**: 20 requests/minute per IP
- **Bulk Operations**: 5 requests/minute per user
- **Analytics**: 30 requests/minute per user
- **Assessment Operations**: 15 requests/minute per user

#### **Caching Strategy**

- **Skills Lists**: 5-minute cache with ETag support
- **Categories**: 1-hour cache (rarely change)
- **Analytics**: 15-minute cache
- **Health Checks**: No caching (real-time)
- **User Profiles**: 10-minute cache

## 🧪 Advanced Assessment System

### **Assessment Types & Workflows**

The application supports 5 distinct assessment types:

1. **SELF_ASSESSMENT**: User-driven skill evaluation with guided questions
2. **QUIZ**: Knowledge-based testing with scoring algorithms
3. **PROJECT_REVIEW**: GitHub project analysis with automated insights
4. **PEER_REVIEW**: Collaborative skill validation
5. **AI_EVALUATION**: ML-powered skill assessment

### **Assessment Scoring Algorithm**

```typescript
interface AssessmentScoring {
  rawScore: number;        // 0-100 scale
  proficiencyMapping: {    // Score to proficiency conversion
    0-20: 1-2,    // Beginner
    21-40: 3-4,   // Novice
    41-60: 5-6,   // Intermediate
    61-80: 7-8,   // Advanced
    81-100: 9-10  // Expert
  };
  confidence: number;      // Confidence in assessment
  recommendations: string[]; // Learning recommendations
}
```

## 📊 Analytics & Monitoring Architecture

### **Application Metrics**

The system tracks comprehensive metrics:

- **User Engagement**: Active users, session duration, feature usage
- **Skills Metrics**: Creation rate, proficiency distributions, category popularity
- **Assessment Metrics**: Completion rates, score distributions, type preferences
- **Goal Tracking**: Achievement rates, time-to-completion, motivation patterns
- **System Performance**: Response times, error rates, database performance

### **Health Monitoring System**

```typescript
interface HealthCheck {
  status: "healthy" | "degraded" | "unhealthy";
  checks: {
    database: ServiceHealth;
    redis: ServiceHealth;
    authentication: ServiceHealth;
    storage: ServiceHealth;
  };
  metrics: SystemMetrics;
  uptime: number;
}
```

### **Real-time Dashboard Features**

- **Live Metrics**: Real-time system performance monitoring
- **User Activity**: Active session tracking and usage patterns
- **Error Monitoring**: Centralized error tracking and alerting
- **Performance Insights**: Database query analysis and optimization suggestions

## 🚀 Performance Optimization

### **Frontend Performance**

- **Code Splitting**: Route-based and component-based splitting
- **Image Optimization**: Next.js Image component with WebP support
- **Bundle Analysis**: Regular bundle size monitoring and optimization
- **Lazy Loading**: Progressive component and data loading

### **Backend Performance**

- **Database Optimization**: Query optimization with explain analysis
- **Connection Pooling**: Prisma connection pooling for database efficiency
- **Caching Strategy**: Multi-layer caching with Redis and in-memory caches
- **API Response Compression**: Gzip compression for API responses

### **Monitoring & Observability**

- **Performance Monitoring**: Core Web Vitals tracking
- **Error Tracking**: Comprehensive error logging and alerting
- **User Analytics**: Behavioral analytics and conversion tracking
- **System Metrics**: Infrastructure monitoring and alerting

## 🔮 Future Architecture Enhancements

### **Planned Improvements (v2)**

- **Microservices Architecture**: Service decomposition for better scalability
- **Real-time Features**: WebSocket integration for live collaboration
- **Advanced AI Integration**: Machine learning models for skill prediction
- **Multi-tenancy**: Organization-level skill management
- **Advanced Analytics**: Custom reporting and business intelligence
- **Mobile Architecture**: React Native app with shared business logic

This architecture provides a solid foundation for a scalable, maintainable, and feature-rich skill evaluation platform with room for future growth and enhancement.
