# Skills Evaluation App - Development Guide

## 🚀 Getting Started

This comprehensive guide will help you set up, develop, and contribute to the Skills Evaluation App - a production-ready monorepo featuring Next.js 15, React 19, PostgreSQL, and a sophisticated design system with 100+ components.

## 📋 Prerequisites

### **System Requirements**

- **Node.js 18.17+** (Current: v22.17.0 ✅)
- **npm 9+** (Current: v11.4.2 ✅)
- **PostgreSQL 13+** for database storage
- **Redis 6+** for caching and sessions
- **Git 2.34+** for version control

### **Development Environment**

- **RAM**: 16GB recommended for optimal development experience
- **Storage**: 5GB free space for dependencies, database, and builds
- **OS**: macOS, Linux, or Windows with WSL2
- **Editor**: VS Code highly recommended (with configured tasks system)

### **Recommended VS Code Extensions**

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "Prisma.prisma",
    "steoates.autoimport-es6-ts",
    "vitest.explorer"
  ]
}
```

---

## 🏗️ Project Architecture Overview

### **Technology Stack**

- **Framework**: Next.js 15.4.1 with App Router and React 19.1.0
- **Language**: TypeScript 5 with strict configuration
- **Database**: PostgreSQL with Prisma 6.12.0 ORM
- **Authentication**: NextAuth.js v5 (beta) with OAuth providers
- **Styling**: Tailwind CSS 3.4.17 with shadcn/ui foundation
- **State Management**: TanStack Query for server state management
- **Testing**: Vitest with React Testing Library (620+ tests)
- **Caching**: Redis (Upstash or local) for performance
- **AI Integration**: OpenAI API for intelligent features
- **Monorepo**: Two packages - main application and design system

### **Monorepo Structure**

```
aiSkillimprove/
├── packages/
│   ├── app/                    # Next.js application (main app)
│   │   ├── src/app/           # Next.js App Router pages & API
│   │   ├── src/components/    # App-specific components
│   │   ├── src/lib/           # Utilities and configurations
│   │   ├── prisma/            # Database schema & migrations
│   │   └── package.json       # App dependencies & scripts
│   │
│   └── design-system/         # Shared UI component library
│       ├── src/components/    # 100+ reusable components
│       ├── src/hooks/         # Shared React hooks
│       ├── .storybook/        # Component documentation
│       └── package.json       # Design system dependencies
│
├── .vscode/                   # Comprehensive VS Code configuration
├── docs/                      # Project documentation
├── .kiro/steering/           # AI assistant guidelines
└── package.json              # Root workspace configuration
```

---

## 🚀 Initial Setup

### **1. Clone and Install Dependencies**

```bash
# Clone the repository
git clone <repository-url>
cd aiSkillimprove

# Install all dependencies (root + both packages)
npm install

# Verify installation
npm run type-check
```

### **2. Environment Configuration**

Create environment files from templates:

```bash
# Root environment file
cp .env.example .env.local

# App-specific environment file
cp packages/app/.env.example packages/app/.env.local

# Edit environment variables
code packages/app/.env.local  # Or use your preferred editor
```

### **3. Required Environment Variables**

#### **🔐 Authentication (Required)**

```bash
# NextAuth v5 Configuration
NEXTAUTH_SECRET="your_random_32_character_secret_key"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"                   # Development URL

# Google OAuth (https://console.cloud.google.com/)
GOOGLE_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"

# GitHub OAuth (optional but recommended)
GITHUB_CLIENT_ID="your_github_oauth_client_id"
GITHUB_CLIENT_SECRET="your_github_oauth_client_secret"
```

#### **🗄️ Database (Required)**

```bash
# Local PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/skills_evaluation_dev"

# OR Supabase (cloud alternative)
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]?pgbouncer=true"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
```

#### **⚡ Caching & Performance (Required)**

```bash
# Local Redis
REDIS_URL="redis://localhost:6379"

# OR Upstash Redis (cloud alternative)
UPSTASH_REDIS_REST_URL="https://your-redis-endpoint.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your_upstash_redis_token"
```

#### **🤖 AI Services (Optional)**

```bash
# OpenAI API for AI-powered features
OPENAI_API_KEY="your_openai_api_key"

# Feature toggles
ENABLE_AI_EVALUATIONS="true"
ENABLE_ANALYTICS="true"
ENABLE_BULK_OPERATIONS="true"
```

#### **🔧 Development & Monitoring (Optional)**

```bash
# Development settings
NODE_ENV="development"
LOG_LEVEL="debug"
ENABLE_REQUEST_LOGGING="true"

# Monitoring configuration
MONITORING_SECRET="your_monitoring_secret"
ENABLE_DETAILED_METRICS="true"
```

---

## 🛠️ Development Services Setup

### **Database Setup**

#### **Option A: Local PostgreSQL**

```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Create development database
createdb skills_evaluation_dev

# Set up database schema and seed data
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Apply database migrations
npm run db:seed      # Populate with sample data
```

#### **Option B: Supabase (Cloud PostgreSQL)**

1. Visit [Supabase](https://supabase.com) and create a new project
2. Get your database connection string from Settings → Database
3. Set `DATABASE_URL` in your `.env.local` file
4. Run migrations: `npm run db:migrate`

### **Redis Setup**

#### **Option A: Local Redis**

```bash
# Install Redis (macOS with Homebrew)
brew install redis
brew services start redis

# Verify Redis is running
redis-cli ping  # Should return "PONG"
```

#### **Option B: Upstash (Cloud Redis)**

1. Visit [Upstash](https://upstash.com) and create a new Redis database
2. Copy the REST URL and token from the database dashboard
3. Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in your `.env.local`

### **OAuth Provider Setup**

#### **Google OAuth Configuration**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API in APIs & Services
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set Application Type to "Web application"
6. Add Authorized Redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret to your `.env.local`

#### **GitHub OAuth Configuration (Optional)**

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Set Homepage URL: `http://localhost:3000`
4. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Client Secret to your `.env.local`

---

## 🚦 VS Code Tasks System (Recommended Workflow)

This project includes a comprehensive VS Code tasks system for streamlined development. Access via **Cmd/Ctrl + Shift + P** → **Tasks: Run Task**.

### **🚀 Essential Development Tasks**

- **`🚦 Dev | Start All`** - Starts both Next.js app and Storybook simultaneously
- **`🎨 Frontend | Dev Server`** - Next.js development server (http://localhost:3000)
- **`🎨 Design System | Dev`** - Storybook server (http://localhost:6006)

### **✅ Quality Control Tasks**

- **`✅ Quality | Check All`** - Run TypeScript check, linting, and format check
- **`✅ Quality | Fix All`** - Fix TypeScript issues, lint errors, and format code
- **`🚦 Git | Pre-commit Check`** - Complete quality check before committing

### **🗄️ Database Management Tasks**

- **`🗄️ Database | Setup`** - Complete database initialization (generate, migrate, seed)
- **`🗄️ Database | Studio`** - Open Prisma Studio GUI (http://localhost:5555)
- **`🗄️ Database | Migrate`** - Apply pending database migrations
- **`🗄️ Database | Seed`** - Populate database with sample data
- **`🗄️ Database | Reset`** - Reset database and reseed (destructive)

### **🧪 Testing Tasks**

- **`🧪 Test | Run`** - Execute all tests once
- **`🧪 Test | Watch`** - Run tests in watch mode with hot reload
- **`🧪 Test | Coverage`** - Generate comprehensive test coverage report

### **🚀 Deployment Tasks**

- **`🚀 Deploy | Build All`** - Build both packages for production
- **`🚀 Deploy | Pre-check`** - Complete pre-deployment validation

---

## 📜 Available Scripts Reference

### **Root Level Scripts**

```bash
# 🎯 Development
npm run dev                     # Start Next.js app (localhost:3000)
npm run design-system:dev       # Start Storybook (localhost:6006)
npm run design-system:dev:open  # Start Storybook and open browser

# 🏗️ Building
npm run build                   # Build main application
npm run design-system:build     # Build design system package
npm run build:all              # Build all packages

# ✅ Quality Control
npm run type-check             # TypeScript validation for all packages
npm run lint                   # Lint all code with ESLint
npm run lint:fix              # Auto-fix linting issues
npm run format                # Format all code with Prettier
npm run format:check          # Check code formatting compliance
npm run quality               # Run complete quality check
npm run quality:fix           # Fix all quality issues

# 🧪 Testing
npm run test                  # Run all tests
npm run test:watch           # Run tests in watch mode
npm run test:coverage        # Generate test coverage report
npm run test:ui              # Open Vitest testing UI

# 🧹 Cleanup
npm run clean                # Clean build artifacts
npm run clean:all            # Clean everything including node_modules
```

### **Database Operations (App Package)**

```bash
# 📊 Database Management
npm run db:generate          # Generate Prisma client types
npm run db:migrate           # Apply database schema migrations
npm run db:push             # Push schema changes without migrations
npm run db:seed             # Populate database with sample data
npm run db:studio           # Open Prisma Studio database GUI
npm run db:reset            # Reset database completely (destructive)

# 🔍 Database Utilities
npm run db:format           # Format Prisma schema file
npm run db:validate         # Validate Prisma schema
```

---

## 🏃‍♂️ Quick Start Commands

### **First-Time Setup Sequence**

```bash
# 1. Install all dependencies
npm install

# 2. Configure environment variables (see Environment Configuration section)
cp .env.example .env.local
cp packages/app/.env.example packages/app/.env.local
# Edit the .env.local files with your actual values

# 3. Set up database (ensure PostgreSQL is running)
npm run db:generate
npm run db:migrate
npm run db:seed

# 4. Start development environment
# Option A: Use VS Code task (recommended)
# Cmd/Ctrl + Shift + P → "Tasks: Run Task" → "🚦 Dev | Start All"

# Option B: Manual startup
npm run design-system:dev &  # Storybook on :6006 (background)
npm run dev                  # Next.js on :3000 (foreground)
```

### **Daily Development Workflow**

```bash
# Start complete development environment (recommended)
# Use VS Code task: "🚦 Dev | Start All"

# Or start services individually
npm run dev                  # Main app: http://localhost:3000
npm run design-system:dev    # Storybook: http://localhost:6006
npm run db:studio           # Database GUI: http://localhost:5555
```

### **Pre-Commit Quality Check**

```bash
# Complete quality validation (use before committing)
# Use VS Code task: "🚦 Git | Pre-commit Check"

# Or run manually
npm run quality:fix          # Fix all quality issues
npm run test                 # Ensure all tests pass
npm run build:all           # Verify production builds
```

---

## 🌐 Development URLs & Access Points

### **Application URLs**

- **Main Application**: [http://localhost:3000](http://localhost:3000)
- **Storybook (Design System)**: [http://localhost:6006](http://localhost:6006)
- **Prisma Studio (Database GUI)**: [http://localhost:5555](http://localhost:5555)

### **Key Application Pages**

- **Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Skills Management**: [http://localhost:3000/skills](http://localhost:3000/skills)
- **Admin Monitoring**: [http://localhost:3000/admin/monitoring](http://localhost:3000/admin/monitoring)
- **API Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

### **Authentication Flow**

- **Sign In**: [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)
- **Register**: [http://localhost:3000/auth/register](http://localhost:3000/auth/register)
- **OAuth Callback**: `http://localhost:3000/api/auth/callback/[provider]`

---

## 🧰 Development Tools & Features

### **Comprehensive Testing Suite**

```bash
# Run specific test suites
npm run test -- --reporter=verbose           # Detailed test output
npm run test -- --coverage                   # With coverage report
npm run test -- --watch                     # Watch mode
npm run test -- packages/design-system      # Test specific package
npm run test -- --ui                        # Open Vitest UI
```

**Testing Statistics**:

- **Total Tests**: 620+ automated tests
- **Design System**: 585+ component tests
- **Application**: 35+ integration tests
- **Coverage**: 80%+ on business logic

### **Design System Development**

```bash
# Storybook development
npm run design-system:dev        # Start development server
npm run design-system:build      # Build static Storybook
npm run design-system:test       # Run component tests
```

**Component Library**:

- **100+ Components** across 7 categories
- **Interactive Documentation** via Storybook
- **Accessibility Testing** with WCAG AA compliance
- **Cross-package Usage** in main application

### **Database Development Tools**

```bash
# Database management
npm run db:studio               # Visual database editor
npm run db:migrate:dev         # Create and apply migration
npm run db:seed:dev            # Custom development seeding
```

**Database Features**:

- **12 Comprehensive Models** with relationships
- **Audit Trail System** for all operations
- **Migration History** with rollback support
- **Sample Data Seeding** for development

---

## 🚨 Troubleshooting Guide

### **Common Development Issues**

#### **1. Port Conflicts**

```bash
# Check what's using port 3000 or 6006
lsof -ti:3000 | xargs kill -9     # Kill processes on port 3000
lsof -ti:6006 | xargs kill -9     # Kill processes on port 6006
lsof -ti:5555 | xargs kill -9     # Kill processes on port 5555 (Prisma Studio)
```

#### **2. Database Connection Issues**

```bash
# Check PostgreSQL status
brew services list | grep postgresql

# Start PostgreSQL if stopped
brew services start postgresql@15

# Test database connection
psql -d skills_evaluation_dev -c "SELECT version();"

# Reset database if corrupted
npm run db:reset
```

#### **3. Redis Connection Issues**

```bash
# Check Redis status
redis-cli ping                    # Should return "PONG"

# Start Redis if stopped
brew services start redis

# Check Redis configuration
redis-cli INFO server
```

#### **4. Node Modules and Dependency Issues**

```bash
# Complete clean reinstall
npm run clean:all                 # Remove all build artifacts and node_modules
npm install                       # Fresh installation
npm run db:generate              # Regenerate Prisma client
```

#### **5. TypeScript and Build Errors**

```bash
# Check TypeScript configuration
npm run type-check               # Validate all TypeScript files

# Rebuild design system (dependency for app)
npm run design-system:build
npm run build                    # Then build main app

# Clear Next.js cache
rm -rf packages/app/.next
npm run dev                      # Restart development server
```

#### **6. Test Failures**

```bash
# Run tests with verbose output
npm run test -- --reporter=verbose

# Run tests for specific package
npm run test -- packages/design-system
npm run test -- packages/app

# Clear test cache
npm run test -- --clear-cache
```

### **Environment Variable Issues**

#### **Missing or Invalid Variables**

```bash
# Validate environment variables
node -e "console.log(process.env)" | grep -E "(NEXTAUTH|DATABASE|REDIS|GOOGLE)"

# Test specific services
curl http://localhost:3000/api/health    # Should return system health
```

#### **OAuth Configuration Issues**

1. **Google OAuth**:
   - Verify redirect URI exactly matches: `http://localhost:3000/api/auth/callback/google`
   - Ensure Google+ API is enabled in Google Cloud Console
   - Check client ID and secret have no extra spaces

2. **GitHub OAuth**:
   - Verify callback URL exactly matches: `http://localhost:3000/api/auth/callback/github`
   - Ensure OAuth App is configured for the correct organization

---

## 📊 Performance Optimization

### **Development Performance Tips**

```bash
# Enable Turbopack for faster builds (Next.js 15)
npm run dev -- --turbo

# Use specific test patterns for faster testing
npm run test -- --testNamePattern="Button"
npm run test -- --testPathPattern="components/ui"

# Build design system once, then develop
npm run design-system:build
npm run dev
```

### **Production Build Optimization**

```bash
# Analyze bundle size
npm run build                    # Build with analysis
npm run analyze                  # Bundle analyzer (if configured)

# Pre-deployment checks
npm run quality:fix              # Fix all quality issues
npm run test                     # Ensure tests pass
npm run build:all               # Verify production builds
```

---

## 🎯 Development Best Practices

### **Code Quality Standards**

- **TypeScript**: Strict mode enabled, no `any` types allowed
- **ESLint**: Comprehensive rules with auto-fixing
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality enforcement
- **Testing**: Minimum 80% coverage on business logic

### **Component Development Patterns**

```typescript
// Component development template
interface ComponentProps {
  // Define comprehensive prop types
}

export const Component: React.FC<ComponentProps> = ({
  // Destructure props with defaults
}) => {
  // Component logic with proper hooks usage
  return (
    // JSX with proper accessibility attributes
  );
};

// Export component with proper typing
export default Component;
```

### **API Development Patterns**

```typescript
// API route template with security and validation
import { withApiSecurity } from "@/lib/middleware/with-security";
import { withAuthLogging } from "@/lib/middleware/with-logging";
import { handleApiError } from "@/lib/errors/handlers";

async function handler(request: NextRequest) {
  try {
    // Request validation with Zod
    // Business logic implementation
    // Return typed response
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withAuthLogging(withApiSecurity(handler), "endpoint-name");
```

### **Database Development Patterns**

```typescript
// Database operations with proper error handling
import { prisma } from "@/lib/db";
import { handleDatabaseError } from "@/lib/errors/database";

export async function createSkill(data: CreateSkillInput) {
  try {
    const skill = await prisma.skill.create({
      data,
      include: {
        category: true,
        history: true,
      },
    });
    return skill;
  } catch (error) {
    throw handleDatabaseError(error);
  }
}
```

---

## 📚 Additional Resources

### **Project Documentation**

- **Architecture Guide**: `.kiro/steering/ARCHITECTURE.md`
- **API Documentation**: `.kiro/steering/API_DOCUMENTATION.md`
- **Monitoring Guide**: `.kiro/steering/MONITORING_GUIDE.md`
- **Project Status**: `.kiro/steering/PROJECT_STATUS.md`

### **External Resources**

- **Next.js 15 Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **React 19 Documentation**: [https://react.dev](https://react.dev)
- **Prisma Documentation**: [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **NextAuth.js v5**: [https://authjs.dev](https://authjs.dev)
- **TanStack Query**: [https://tanstack.com/query](https://tanstack.com/query)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

### **VS Code Configuration Files**

- **Tasks Configuration**: `.vscode/tasks.json` (50+ pre-configured tasks)
- **Settings**: `.vscode/settings.json` (optimized for TypeScript development)
- **Extensions**: `.vscode/extensions.json` (recommended extension list)
- **Launch Configuration**: `.vscode/launch.json` (debugging setup)

---

This development guide provides comprehensive setup instructions and workflows for the Skills Evaluation App. The project includes sophisticated tooling, comprehensive testing, and production-ready architecture that supports scalable development practices.

For additional help or questions, refer to the project documentation in the `.kiro/steering/` directory or the VS Code tasks system for streamlined development workflows.

_Last Updated: Reflecting current production-ready implementation with all features and tooling_
