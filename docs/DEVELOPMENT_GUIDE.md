# Skills Evaluation App - Development Guide

## 🚀 Getting Started

This comprehensive guide will help you set up, develop, and contribute to the Skills Evaluation App - a production-ready monorepo with React 19, Next.js 15, and an extensive design system.

## 📋 Prerequisites

### **Required Software**

- **Node.js 18+** with npm (tested with Node.js 18.17+)
- **PostgreSQL 14+** or Docker for database
- **Git** for version control
- **VS Code** (recommended) with suggested extensions

### **Recommended VS Code Extensions**

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "steoates.autoimport-es6-ts"
  ]
}
```

### **System Requirements**

- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 2GB free space for dependencies and database
- **OS**: macOS, Linux, or Windows with WSL2

---

## 🏗️ Project Setup

### **1. Clone and Install**

```bash
# Clone the repository
git clone <repository-url>
cd aiSkillimprove

# Install all dependencies (monorepo)
npm install

# Verify installation
npm run --workspaces --if-present test:quick
```

### **2. Environment Configuration**

```bash
# Copy environment template
cp packages/app/.env.example packages/app/.env.local

# Edit environment variables
nano packages/app/.env.local
```

#### **Required Environment Variables**

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/skills_evaluation_dev"

# Authentication (NextAuth v5)
NEXTAUTH_SECRET="your-development-secret-32-characters-minimum"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (required for authentication)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional: Redis for caching
REDIS_URL="redis://localhost:6379"

# Optional: OpenAI for future AI features
OPENAI_API_KEY="your-openai-api-key"
```

#### **Setting Up Google OAuth**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

### **3. Database Setup**

#### **Option A: Local PostgreSQL**

```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb skills_evaluation_dev

# Run migrations and seed data
cd packages/app
npx prisma migrate dev
npx prisma db seed
```

#### **Option B: Docker (Recommended)**

```bash
# Start PostgreSQL with Docker
docker run --name skills-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=skills_evaluation_dev -p 5432:5432 -d postgres:14

# Run migrations
cd packages/app
npx prisma migrate dev
npx prisma db seed
```

### **4. Development Server**

```bash
# Start all development servers
npm run dev

# Or start individually:
npm run app:dev              # Next.js app (localhost:3000)
npm run design-system:dev    # Storybook (localhost:6006)
```

#### **Verify Installation**

- **Application**: http://localhost:3000 (should show homepage)
- **Storybook**: http://localhost:6006 (design system components)
- **Authentication**: Try signing in with Google OAuth
- **Dashboard**: Should display after authentication

---

## 🛠️ Development Workflow

### **Daily Development Commands**

```bash
# Start development (most common)
npm run dev                  # Start both app and Storybook

# Quality checks (run before commits)
npm run quality             # Runs type-check, lint, format, test
npm run type-check          # TypeScript validation
npm run lint               # ESLint across workspaces
npm run test               # Run all tests
npm run build:all          # Test production builds
```

### **Package-Specific Commands**

#### **App Package** (`packages/app/`)

```bash
# Development
cd packages/app
npm run dev                 # Next.js development server
npm run build              # Production build
npm run start              # Production server
npm run test               # App component tests
npm run test:watch         # Tests in watch mode

# Database operations
npx prisma studio          # Database GUI
npx prisma migrate dev     # Create and apply migrations
npx prisma generate        # Regenerate Prisma client
npx prisma db seed         # Seed database with initial data
```

#### **Design System Package** (`packages/design-system/`)

```bash
# Development
cd packages/design-system
npm run dev                # Storybook development
npm run build              # Build package for distribution
npm run test               # Component unit tests
npm run test:coverage      # Tests with coverage report
npm run storybook          # Start Storybook server
```

### **Git Workflow**

#### **Branch Naming Convention**

```
feature/task-description     # New features
fix/issue-description       # Bug fixes
docs/documentation-update   # Documentation changes
refactor/code-improvement   # Code refactoring
test/test-improvements      # Adding or improving tests
chore/maintenance-task      # Maintenance and tooling
```

#### **Commit Message Format**

```
<type>(<scope>): <description>

feat(dashboard): add skill creation form
fix(auth): resolve OAuth callback error
docs(api): update endpoint documentation
test(components): add unit tests for SkillCard
refactor(services): simplify data fetching logic
chore(deps): update dependencies to latest versions
```

#### **Development Process**

```bash
# 1. Create feature branch
git checkout -b feature/skill-editing-form

# 2. Make changes and commit regularly
git add .
git commit -m "feat(skills): implement skill editing form"

# 3. Run quality checks before push
npm run quality

# 4. Push branch and create PR
git push -u origin feature/skill-editing-form
# Create pull request via GitHub UI

# 5. After review and merge, clean up
git checkout main
git pull origin main
git branch -d feature/skill-editing-form
```

---

## 🧪 Testing Strategy

### **Test Structure**

```
packages/
├── app/
│   ├── src/__tests__/          # App integration tests
│   └── src/**/*.test.tsx       # Component unit tests
│
└── design-system/
    └── src/**/*.test.tsx       # Design system unit tests
```

### **Running Tests**

```bash
# Run all tests
npm test

# Test specific packages
npm run app:test                # App tests only
npm run design-system:test      # Design system tests only

# Test with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### **Test Categories**

#### **Unit Tests** (Components)

```typescript
// Example: SkillCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { SkillCard } from './SkillCard'

describe('SkillCard', () => {
  const mockSkill = {
    id: '1',
    name: 'React.js',
    proficiency: 8,
    category: { name: 'Frontend', color: '#3b82f6' }
  }

  test('renders skill information correctly', () => {
    render(<SkillCard skill={mockSkill} />)

    expect(screen.getByText('React.js')).toBeInTheDocument()
    expect(screen.getByText('8/10')).toBeInTheDocument()
  })

  test('calls onEdit when edit button clicked', () => {
    const onEdit = jest.fn()
    render(<SkillCard skill={mockSkill} onEdit={onEdit} />)

    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(onEdit).toHaveBeenCalledWith(mockSkill)
  })
})
```

#### **Integration Tests** (API Routes)

```typescript
// Example: skills.api.test.ts
import { createMocks } from "node-mocks-http";
import handler from "@/app/api/skills/route";

describe("/api/skills", () => {
  test("GET returns user skills", async () => {
    const { req, res } = createMocks({
      method: "GET",
      headers: { authorization: "Bearer valid-token" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty("skills");
  });
});
```

#### **E2E Tests** (Critical User Flows)

```typescript
// Example: skills-dashboard.e2e.test.ts
import { test, expect } from "@playwright/test";

test("user can view and filter skills", async ({ page }) => {
  await page.goto("/dashboard");

  // Should show skills after authentication
  await expect(
    page.locator('[data-testid="skill-card"]')
  ).toHaveCount.greaterThan(0);

  // Should filter by category
  await page.click('[data-testid="category-filter"]');
  await page.click("text=Frontend Development");

  await expect(page.locator('[data-testid="skill-card"]')).toContainText(
    "React.js"
  );
});
```

### **Coverage Requirements**

- **Minimum**: 80% line coverage for business logic
- **Components**: All variants and interactions tested
- **API Routes**: All endpoints with success/error cases
- **Integration**: Critical user flows covered

---

## 🏗️ Architecture & Code Organization

### **Monorepo Structure**

```
aiSkillimprove/
├── packages/
│   ├── app/                    # Next.js application
│   │   ├── prisma/            # Database schema & migrations
│   │   ├── src/
│   │   │   ├── app/           # App Router pages & API routes
│   │   │   ├── components/    # App-specific components
│   │   │   ├── hooks/         # TanStack Query hooks
│   │   │   ├── lib/           # Utilities & configuration
│   │   │   ├── services/      # API service layer
│   │   │   └── types/         # TypeScript definitions
│   │   └── package.json
│   │
│   └── design-system/         # Shared component library
│       ├── src/components/    # Component categories
│       ├── .storybook/        # Storybook configuration
│       └── package.json
│
├── docs/                      # Project documentation
├── .kiro/steering/           # Development guidelines
└── package.json              # Root workspace config
```

### **Component Development Guidelines**

#### **Component Structure**

```
components/category/component-name/
├── index.ts                   # Main export
├── ComponentName.tsx          # Implementation
├── ComponentName.test.tsx     # Unit tests
├── ComponentName.stories.tsx  # Storybook stories
└── README.md                  # Documentation
```

#### **Component Template**

```typescript
// ComponentName.tsx
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface ComponentNameProps {
  variant?: 'default' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

const ComponentName = forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ variant = 'default', size = 'md', className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        // Variant styles
        {
          'bg-primary text-primary-foreground': variant === 'primary',
          'bg-secondary text-secondary-foreground': variant === 'secondary'
        },
        // Size styles
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg'
        },
        className
      )}
      {...props}
    />
  )
})

ComponentName.displayName = 'ComponentName'

export { ComponentName, type ComponentNameProps }
```

### **Code Quality Standards**

#### **TypeScript Guidelines**

```typescript
// ✅ Good: Explicit interfaces
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Good: Proper generic constraints
function processItems<T extends { id: string }>(items: T[]): T[] {
  return items.filter(item => item.id);
}

// ❌ Bad: Using 'any'
function processData(data: any): any {
  return data;
}
```

#### **Component Guidelines**

- **Size Limit**: Maximum 180 lines per component
- **Single Responsibility**: One clear purpose per component
- **Props Interface**: Always define explicit prop types
- **Accessibility**: Include ARIA labels, keyboard navigation
- **Performance**: Use React.memo for expensive components

#### **File Organization**

- **Naming**: Use PascalCase for components, camelCase for utilities
- **Imports**: Group and order imports (external, internal, relative)
- **Exports**: Use named exports, avoid default exports for components
- **Structure**: Consistent file organization within categories

---

## 📊 Performance & Optimization

### **Development Performance**

```bash
# Bundle analysis
npm run app:analyze

# Performance profiling
npm run app:dev -- --turbo

# Build time optimization
npm run build:all -- --verbose
```

### **Optimization Strategies**

#### **Code Splitting**

```typescript
// Dynamic imports for heavy components
const SkillAnalytics = dynamic(() => import('./SkillAnalytics'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})

// Route-based splitting (automatic with Next.js App Router)
// Each page in app/ directory is automatically code split
```

#### **Bundle Optimization**

```typescript
// Tree-shaking friendly exports
export { Button } from "./ui/button";
export { SkillCard } from "./data-display/skill-card";

// Avoid importing entire libraries
import { debounce } from "lodash/debounce"; // ✅ Good
import _ from "lodash"; // ❌ Bad
```

#### **Database Performance**

```typescript
// Efficient queries with Prisma
const skills = await prisma.skill.findMany({
  where: { userId },
  include: {
    category: {
      select: { name: true, color: true, icon: true },
    },
  },
  orderBy: { updatedAt: "desc" },
  take: 20, // Pagination
  skip: offset,
});
```

### **Caching Strategy**

```typescript
// TanStack Query caching
const skillsQuery = useQuery({
  queryKey: ["skills", filters],
  queryFn: () => SkillsService.getSkills(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});

// Next.js API caching
export async function GET() {
  const skills = await getSkills();

  return NextResponse.json(skills, {
    headers: {
      "Cache-Control": "public, max-age=300", // 5 minutes
    },
  });
}
```

---

## 🚨 Troubleshooting

### **Common Development Issues**

#### **Database Connection Issues**

```bash
# Check PostgreSQL status
brew services list | grep postgres

# Reset database
cd packages/app
npx prisma migrate reset
npx prisma db seed
```

#### **Node Version Issues**

```bash
# Check Node version
node --version  # Should be 18+

# Using nvm to switch versions
nvm install 18
nvm use 18
```

#### **Port Conflicts**

```bash
# Kill processes on common ports
lsof -ti:3000 | xargs kill -9  # Next.js app
lsof -ti:6006 | xargs kill -9  # Storybook
lsof -ti:5432 | xargs kill -9  # PostgreSQL
```

#### **TypeScript Errors**

```bash
# Regenerate types
cd packages/app
npx prisma generate

# Clear TypeScript cache
npx tsc --build --clean
npm run type-check
```

### **Build Issues**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
cd packages/app
rm -rf .next
npm run build
```

### **Design System Issues**

```bash
# Rebuild design system
cd packages/design-system
npm run build

# Restart Storybook
npm run storybook
```

---

## 🔧 Development Tools

### **Debugging**

```json
// VS Code launch.json for debugging
{
  "configurations": [
    {
      "name": "Next.js Debug",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/packages/app/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/packages/app"
    }
  ]
}
```

### **Database Tools**

```bash
# Prisma Studio (GUI)
cd packages/app
npx prisma studio  # Opens at http://localhost:5555

# Database queries
npx prisma db execute --stdin < query.sql
```

### **Performance Monitoring**

```bash
# Bundle analyzer
cd packages/app
npm run analyze

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

---

This development guide provides comprehensive coverage of the Skills Evaluation App development process. For additional help, check the [Troubleshooting Guide](./TROUBLESHOOTING.md) or create an issue in the repository.
