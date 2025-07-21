# Quick Reference Guide

## Current Project Status

### ✅ Completed Features

- **Authentication**: NextAuth v5 with Google OAuth, JWT sessions
- **Design System**: 15+ components with 418 tests, theme system
- **Database**: Prisma ORM, PostgreSQL, comprehensive data models
- **API Layer**: CRUD endpoints with TanStack Query integration
- **Theme System**: Light/dark mode with semantic color system

### 🔄 Active Development

- **Skills Dashboard**: Real data visualization and management
- **API Integration**: TanStack Query hooks with optimistic updates
- **Component Architecture**: Client/server component boundaries
- **Design System**: Theme-aware components and exports

## 🚀 Common Commands

### Development

```bash
# Start development servers
npm run app:dev                    # Start app development
npm run design-system:storybook    # Start design system Storybook
npm run dev                        # Start app (alias)

# Build commands
npm run build:all                  # Build all packages
npm run design-system:build        # Build design system only
npm run app:build                  # Build app only

# Testing & Quality
npm run test:ci                    # Run all tests
npm run type-check                 # Type check all workspaces
npm run lint                       # Lint all workspaces
npm run quality:ci                 # Full quality check
```

### Workspace Commands

```bash
# Run in specific workspace
npm run <command> --workspace=packages/app
npm run <command> --workspace=packages/design-system

# Run in all workspaces
npm run <command> --workspaces --if-present
```

## 📁 File Structure Quick Reference

### App Package (`packages/app/`)

```
src/
├── app/                 # Next.js App Router pages
├── components/          # App-specific components
│   ├── ui/             # Local UI components
│   ├── auth/           # Authentication components
│   └── dashboard/      # Dashboard components
├── hooks/              # Custom React hooks
│   └── queries/        # TanStack Query hooks
├── lib/                # Utilities and configurations
│   └── api/           # API layer
├── types/              # TypeScript definitions
├── constants/          # App constants
└── utils/              # Utility functions
```

### Design System Package (`packages/design-system/`)

```
src/
├── components/
│   ├── ui/           # Base UI components
│   ├── layout/       # Layout components
│   ├── forms/        # Form components
│   ├── data-display/ # Data visualization
│   ├── feedback/     # Loading, error states
│   └── navigation/   # Navigation components
├── lib/              # Utilities
├── hooks/            # Design system hooks
├── types/            # TypeScript definitions
└── styles/           # Global CSS and design tokens
```

## 🎨 Component Import Patterns

### Design System Components

```tsx
// Available components
import {
  Button,
  Container,
  Grid,
  AppLayout,
  ColorShowcase,
  cn,
} from "@skills-eval/design-system";
```

### App Components

```tsx
// App-specific components
import { Header } from "@/components/layout/header";
import { useAuth } from "@/hooks/use-auth";
import { ApiClient } from "@/lib/api/client";
```

## 🏗️ Component Architecture Rules

### Size Limits

- **Components**: Max 180 lines
- **Files**: Max 150-180 lines
- **Functions**: Max cyclomatic complexity of 11

### Component Structure

```tsx
// Component template
interface ComponentProps {
  // Props with proper typing
}

export function Component({ ...props }: ComponentProps) {
  // Implementation
}
```

### State Management Patterns

```tsx
// Local state
const [state, setState] = useState(initialValue);

// TanStack Query for server state
const { data, isLoading, error } = useQuery({
  queryKey: ["resource", id],
  queryFn: fetchResource,
});

// Mutations
const mutation = useMutation({
  mutationFn: updateResource,
  onSuccess: () => {
    queryClient.invalidateQueries(["resource"]);
  },
});
```

## 🧪 Testing Patterns

### Component Tests

```tsx
// Component test template
import { render, screen } from "@testing-library/react";
import { Component } from "./component";

describe("Component", () => {
  it("renders correctly", () => {
    render(<Component />);
    expect(screen.getByText("text")).toBeInTheDocument();
  });
});
```

### Hook Tests

```tsx
// Hook test template
import { renderHook } from "@testing-library/react";
import { useCustomHook } from "./use-custom-hook";

describe("useCustomHook", () => {
  it("returns expected value", () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current).toBe(expectedValue);
  });
});
```

## 🔧 Git Workflow

### Commit Patterns

```bash
feat(app): add user dashboard
feat(design-system): add new Button variant
fix(monorepo): update shared TypeScript config
docs: update navigation guide
```

### Branch Naming

```bash
feature/app-user-dashboard
feature/design-system-button-variants
fix/monorepo-build-issues
docs/navigation-improvements
```

## 🎯 Common Workflows

### Adding New UI Component

1. Create: `packages/design-system/src/components/ui/[component]/`
2. Implement: `[component].tsx`, `index.ts`, `README.md`
3. Add Storybook: `[component].stories.tsx`
4. Add tests: `[component].test.tsx`
5. Export: `packages/design-system/src/components/ui/index.ts`
6. Use: Import from `@skills-eval/design-system`

### Adding New App Feature

1. Create page: `packages/app/src/app/feature/page.tsx`
2. Create components: `packages/app/src/components/feature/`
3. Add hooks: `packages/app/src/hooks/use-feature.ts`
4. Add types: `packages/app/src/types/feature.ts`

## 🔍 Search Patterns

### Finding Files

```bash
# Components
find . -name "*.tsx" -path "*/components/*"

# Tests
find . -name "*.test.tsx" -o -name "*.spec.tsx"

# Stories
find . -name "*.stories.tsx"

# Configuration
find . -name "tsconfig*.json" -o -name "eslint.config.*"
```

## 📋 Current Component Status

### ✅ Implemented

- **Button** - Complete with variants and CVA
- **Container** - Responsive content wrapper
- **Grid** - Flexible grid system
- **AppLayout** - Main application shell
- **ColorShowcase** - Professional Blue palette

### 🚧 Planned (Phase 1)

- Input, Text/Typography, Card, Loading Spinner

## 🛡️ Quality Gates

### Build Requirements

- Design system must build before app
- All TypeScript errors must be resolved
- All ESLint warnings must be addressed
- All tests must pass

### Performance Requirements

- Bundle size monitoring
- Performance budgets
- Accessibility compliance (WCAG AA)
- Security best practices

## 📚 Documentation Locations

- **Monorepo**: `README.monorepo.md`
- **App**: `packages/app/README.md`
- **Design System**: `packages/design-system/README.md`
- **Components**: Storybook documentation
- **Rules**: `.cursor/rules/`

This quick reference should help you work efficiently within the monorepo structure.
