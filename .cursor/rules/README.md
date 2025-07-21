# Cursor Rules for Skills Evaluation App

This directory contains comprehensive rules and guidelines for the Skills Evaluation monorepo project. These rules help Cursor understand the project structure, coding standards, and development workflows.

## 📁 Rules Structure

### Core Rules Files

- **`project-standards.md`** - Main project standards and coding guidelines
- **`monorepo-navigation.md`** - Monorepo structure and navigation patterns
- **`design-system-development.md`** - Design system component development guidelines
- **`quick-reference.md`** - Quick reference for common patterns and commands

### Additional Rules (To be added as needed)

- `testing-guidelines.md` - Testing standards and patterns
- `security-standards.md` - Security requirements and best practices
- `accessibility-guidelines.md` - A11y standards and requirements
- `performance-guidelines.md` - Performance optimization rules
- `api-integration.md` - API integration patterns and standards

## 🎯 How to Use These Rules

### For Cursor AI

These rules help Cursor understand:

- Project structure and file organization
- Coding standards and best practices
- Monorepo navigation patterns
- Component architecture guidelines
- State management patterns
- Testing requirements
- Security standards

### For Developers

- Reference these rules when working on the project
- Follow the established patterns and conventions
- Use the navigation guide for efficient development
- Maintain consistency across the codebase

## 🏗️ Project Overview

This is a React 19-based application that evaluates user skills through multiple data sources including personal information, Git repository analysis, and Google account integration. The app provides personalized skill assessments and AI-powered recommendations using a custom design system built on shadcn/ui.

## 📦 Monorepo Structure

```
aiSkillimprove/
├── packages/
│   ├── app/                 # Next.js application
│   └── design-system/       # Custom design system
├── .cursor/
│   └── rules/              # Cursor rules and guidelines
└── .kiro/
    └── steering/           # Project steering documents
```

## 🔧 Key Development Commands

```bash
# Development
npm run app:dev              # Start app development
npm run design-system:storybook  # Start design system Storybook

# Building
npm run build:all            # Build all packages
npm run design-system:build  # Build design system only
npm run app:build            # Build app only

# Testing & Quality
npm run test:ci              # Run all tests
npm run type-check           # Type check all workspaces
npm run lint                 # Lint all workspaces
```

## 📋 Current Status

### ✅ Completed Foundation

- **Authentication System**: NextAuth v5 with Google OAuth, JWT sessions, protected routes
- **Application Infrastructure**: Next.js 15 App Router, TypeScript strict config, Tailwind CSS
- **Design System**: 15+ components with 418 tests, 89% compliance score
- **Database & API**: Prisma ORM, PostgreSQL, comprehensive data models, CRUD APIs
- **State Management**: TanStack Query for server state, Context API for app state
- **Theme System**: Comprehensive theme context with light/dark mode support

### 🔄 Current Development Focus

- **Skills Dashboard**: Real data visualization with filtering and management
- **API Integration**: TanStack Query hooks with optimistic updates
- **Design System**: Theme-aware components and semantic color system
- **Component Architecture**: Client/server component boundary management

### ✅ Implemented Components

- **UI Components**: Button, Input, Card, Badge, ColorShowcase
- **Form Elements**: Checkbox, Switch, Select, Textarea
- **Feedback**: Modal, Toast, LoadingSpinner, Skeleton
- **Data Display**: Avatar, Progress, SkillCard
- **Navigation**: DropdownMenu
- **Layout**: Container, Grid, AppLayout

## 🎨 Design System Integration

The project uses a custom design system (`@skills-eval/design-system`) that must be built before the app. All UI components should use the design system components when available.

## 🔄 State Management

- **Server State**: TanStack Query for all API interactions
- **Client State**: React hooks for component-level state
- **Global State**: Context API for simple global state

## 🛡️ Security & Quality

- Strict TypeScript configuration
- Comprehensive testing requirements
- Security best practices for authentication
- Accessibility compliance (WCAG AA)
- Performance optimization guidelines

## 📚 Documentation

- **Monorepo**: `README.monorepo.md`
- **App**: `packages/app/README.md`
- **Design System**: `packages/design-system/README.md`
- **Components**: Storybook documentation

## 🤝 Contributing

When adding new rules or guidelines:

1. Create new markdown files in this directory
2. Update this README to reference new files
3. Follow the established naming conventions
4. Ensure rules are clear and actionable

## 🔍 Quick Reference

### File Locations

- **App Pages**: `packages/app/src/app/`
- **App Components**: `packages/app/src/components/`
- **Design System**: `packages/design-system/src/components/`
- **Tests**: `**/*.test.tsx` or `**/*.spec.tsx`
- **Stories**: `**/*.stories.tsx`

### Import Patterns

```tsx
// Design system components
import { Button, Container } from "@skills-eval/design-system";

// App components
import { Header } from "@/components/layout/header";
```

### Build Order

1. Design System (`npm run design-system:build`)
2. App (`npm run app:build`)
3. Or use `npm run build:all` for both

This rules structure ensures consistent development practices and helps maintain code quality across the monorepo.
