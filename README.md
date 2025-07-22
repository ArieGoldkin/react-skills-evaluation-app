# Skills Evaluation App - React 19 Monorepo

A comprehensive Skills Evaluation platform built with React 19 and Next.js 15 that provides automated skill assessment through multiple data sources, AI-powered recommendations, and a production-ready design system.

## 🚀 Project Status

**Phase 1.3**: Dashboard Integration Complete ✅  
**Authentication**: Fully Implemented ✅  
**Design System**: 84+ Components Ready ✅  
**Database & API**: Production Ready ✅

## ✨ Key Features

### 🔐 **Authentication System**

- Google OAuth integration with NextAuth v5
- JWT session management with 30-day expiration
- Protected routes and automatic redirects

### 📊 **Skills Dashboard**

- Real-time skills data visualization
- Advanced filtering and search capabilities
- Category-based skill organization
- Proficiency tracking (0-10 scale) with visual indicators

### 🎨 **Production-Ready Design System**

- **84+ components** across 6 categories
- Built on shadcn/ui + Radix UI primitives
- Comprehensive Storybook documentation
- 80%+ test coverage with 472 unit tests
- Full TypeScript support and accessibility compliance

### 🗄️ **Robust Backend**

- PostgreSQL database with Prisma ORM
- Full CRUD API with TanStack Query integration
- Authentication-aware endpoints
- Optimistic updates and intelligent caching

### 🧩 **Component Library**

- **UI Components**: Button, Card, Input, Typography, Badge
- **Layout**: Container, Grid, AppLayout, Header
- **Data Display**: SkillCard, Avatar with proficiency indicators
- **Forms**: CategoryFilter with search and multi-select
- **Feedback**: LoadingSpinner, Modal, Toast system
- **Navigation**: DropdownMenu with keyboard support

## 🏗️ Monorepo Architecture

```
aiSkillimprove/
├── packages/
│   ├── app/                     # Next.js 15 application
│   │   ├── src/app/            # App Router pages
│   │   ├── src/components/     # Application components
│   │   ├── src/lib/            # Utilities and configurations
│   │   └── src/services/       # API services with TanStack Query
│   │
│   └── design-system/          # Shared component library
│       ├── src/components/     # 84+ categorized components
│       ├── .storybook/         # Interactive documentation
│       └── dist/               # Built package for distribution
│
├── docs/                       # Comprehensive documentation
├── .kiro/steering/            # Project guidelines and rules
└── mcp-tests/                 # Integration tests
```

## 🛠️ Tech Stack

### **Frontend**

- **React 19** with Next.js 15 App Router
- **TypeScript** (strict mode, no `any` types)
- **Tailwind CSS** with custom design tokens
- **TanStack Query** for server state management

### **Backend**

- **PostgreSQL** with Prisma ORM
- **NextAuth v5** for authentication
- **API Routes** with full CRUD operations
- **Redis** configured for caching (optional)

### **Development Tools**

- **Storybook** for component development
- **Vitest** + React Testing Library
- **ESLint + Prettier** with quality gates
- **Rollup** for design system bundling

### **External Integrations** (Configured)

- Google OAuth for authentication
- OpenAI API for AI recommendations
- GitHub API for repository analysis

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** with npm
- **PostgreSQL** database (or Docker)
- **Git** for version control

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd aiSkillimprove
```

2. **Install dependencies for the entire monorepo:**

```bash
npm install
```

3. **Set up environment variables:**

```bash
cp packages/app/.env.example packages/app/.env.local
```

4. **Configure your environment:**
   - Add your Google OAuth credentials
   - Configure database connection string
   - Set NextAuth secret and URL

5. **Initialize the database:**

```bash
cd packages/app
npx prisma migrate dev
npx prisma db seed
```

6. **Start the development environment:**

```bash
# From root directory - starts both app and Storybook
npm run dev

# Or separately:
npm run app:dev              # Next.js app on localhost:3000
npm run design-system:dev    # Storybook on localhost:6006
```

## 🧪 Development Commands

### **Essential Commands**

```bash
npm run dev                  # Start app development server
npm run design-system:dev    # Launch Storybook for design system
npm run build:all           # Build all packages
npm run type-check          # TypeScript validation across workspaces
npm run lint                # ESLint across workspaces
npm run test                # Run all tests
npm run quality             # Run type-check, lint, and format
```

### **Package-Specific Commands**

```bash
# App package
npm run app:build           # Build Next.js application
npm run app:test           # Test application components

# Design system package
npm run design-system:build    # Build component library
npm run design-system:test     # Test design system components
npm run design-system:storybook # Interactive component documentation
```

## 📁 Project Structure

### **Application Layer** (`packages/app/`)

- **Authentication**: Complete Google OAuth with NextAuth v5
- **Dashboard**: Functional skills dashboard with real data
- **API Layer**: PostgreSQL + Prisma with full CRUD operations
- **Services**: TanStack Query integration with optimistic updates

### **Design System** (`packages/design-system/`)

- **84+ Components** organized by category
- **Storybook Documentation** with interactive examples
- **Comprehensive Testing** with 472+ unit tests
- **TypeScript Support** with full type definitions

### **Documentation** (`docs/`)

- **Development Guides**: Complete setup and workflow documentation
- **API Documentation**: Comprehensive endpoint reference
- **Component Library**: Design system usage examples
- **Architecture**: Monorepo structure and relationships

## 🔧 Development Workflow

### **Code Quality Standards**

- **Component Size**: Maximum 180 lines per component
- **Type Safety**: Strict TypeScript, no `any` types
- **Testing**: 80%+ coverage requirement
- **Accessibility**: WCAG AA compliance
- **Performance**: Memoization and code splitting patterns

### **Quality Gates**

```bash
npm run quality              # Runs all quality checks
npm run type-check          # TypeScript compliance
npm run lint               # Code style and best practices
npm run test               # Unit and integration tests
```

### **Git Workflow**

- **Branch Naming**: `feature/`, `fix/`, `docs/`, `refactor/`
- **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`)
- **Pre-commit**: Automatic linting and formatting

## 📚 Documentation

### **For Developers**

- **[Development Guide](docs/DEVELOPMENT_GUIDE.md)** - Complete setup and workflow
- **[Architecture Guide](docs/ARCHITECTURE.md)** - System design and structure
- **[Component Library](docs/COMPONENT_LIBRARY.md)** - Design system usage
- **[API Documentation](docs/API_DOCUMENTATION.md)** - Backend API reference

### **For Contributors**

- **[Contributing Guide](docs/CONTRIBUTING.md)** - Contribution workflow
- **[Code Standards](CLAUDE.md)** - Quality standards and patterns
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🎯 Current Features

### **✅ Fully Implemented**

- Google OAuth authentication with session management
- PostgreSQL database with comprehensive skill models
- Complete CRUD API with TanStack Query integration
- Functional skills dashboard with real-time data
- Advanced filtering and search capabilities
- Production-ready design system with 84+ components

### **🔄 In Development**

- Individual skill management forms
- GitHub repository analysis integration
- AI-powered skill recommendations
- Assessment wizard for skill evaluation

## 🚀 Deployment

The application is configured for deployment with:

- **Docker support** for containerized environments
- **Environment configuration** for staging and production
- **Build optimization** with Next.js static generation
- **Database migrations** with Prisma
- **Health checks** and monitoring endpoints

See [Deployment Guide](docs/DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](docs/CONTRIBUTING.md) for:

- Development workflow and branch conventions
- Code standards and quality requirements
- Testing and documentation expectations
- Pull request and review process

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
