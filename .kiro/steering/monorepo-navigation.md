---
inclusion: always
---

# Monorepo Navigation Guide

This guide helps you quickly navigate and work with the Skills Evaluation monorepo structure.

## 🗂️ Quick Directory Reference

### Root Level

- `package.json` - Workspace configuration and monorepo scripts
- `tsconfig.base.json` - Shared TypeScript configuration
- `eslint.config.root.mjs` - Shared ESLint rules
- `.prettierrc.root` - Shared formatting configuration
- `README.monorepo.md` - Monorepo documentation

### App Package (`packages/app/`)

```
packages/app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # App-specific components
│   │   ├── ui/             # UI components (local)
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard components
│   │   └── forms/          # Form components
│   ├── hooks/              # Custom React hooks
│   │   └── queries/        # TanStack Query hooks
│   ├── lib/                # Utilities and configurations
│   │   └── api/           # API layer
│   ├── types/              # TypeScript definitions
│   ├── constants/          # App constants
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── package.json           # App dependencies
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

### Design System Package (`packages/design-system/`)

```
packages/design-system/
├── src/
│   ├── components/
│   │   ├── ui/           # Base UI components (Button, ColorShowcase)
│   │   │   ├── button/   # Button component with stories and tests
│   │   │   └── color-showcase/ # Color palette demonstration
│   │   ├── layout/       # Layout components (Container, Grid, AppLayout)
│   │   │   ├── app-layout/ # Main application shell
│   │   │   ├── container/  # Responsive content wrapper
│   │   │   └── grid/       # Flexible grid system
│   │   ├── forms/        # Form components (placeholder)
│   │   ├── data-display/ # Data visualization components (placeholder)
│   │   ├── feedback/     # Loading, error, success states (placeholder)
│   │   └── navigation/   # Navigation components (placeholder)
│   ├── lib/              # Utilities (cn, utils)
│   ├── hooks/            # Design system hooks
│   ├── types/            # TypeScript definitions
│   └── styles/           # Global CSS and design tokens
│       ├── globals.css   # Professional Blue color system
│       └── colors.md     # Color documentation
├── .storybook/           # Storybook configuration
├── dist/                 # Built package output
└── package.json          # Design system dependencies
```

## 🚀 Quick Commands Reference

### Development Commands

```bash
# Start app development
npm run app:dev
# or
npm run dev

# Start design system Storybook
npm run design-system:storybook

# Build everything
npm run build:all
```

### Package-Specific Commands

```bash
# App commands
npm run app:build
npm run app:test
npm run app:lint

# Design system commands
npm run design-system:build
npm run design-system:test
npm run design-system:build-storybook
```

### Workspace Commands

```bash
# Run command in specific workspace
npm run <command> --workspace=packages/app
npm run <command> --workspace=packages/design-system

# Run command in all workspaces
npm run <command> --workspaces --if-present
```

## 📁 File Navigation Patterns

### When Working on App Features

1. **Pages**: `packages/app/src/app/` - Next.js App Router pages
2. **Components**: `packages/app/src/components/` - App-specific components
3. **Hooks**: `packages/app/src/hooks/` - Custom React hooks
4. **API**: `packages/app/src/lib/api/` - API integration
5. **Types**: `packages/app/src/types/` - TypeScript definitions

### When Working on Design System

1. **Components**: `packages/design-system/src/components/` - Reusable components
2. **Stories**: `packages/design-system/src/**/*.stories.tsx` - Storybook stories
3. **Tests**: `packages/design-system/src/**/*.test.tsx` - Component tests
4. **Exports**: `packages/design-system/src/index.ts` - Main exports

### When Working on Configuration

1. **Root Config**: Root level configuration files
2. **App Config**: `packages/app/` - App-specific configuration
3. **Design System Config**: `packages/design-system/` - Package configuration

## 🔍 Quick Search Patterns

### Finding Components

- **App Components**: Search in `packages/app/src/components/`
- **Design System Components**: Search in `packages/design-system/src/components/`
- **All Components**: Search for `*.tsx` files

### Finding Configuration

- **TypeScript**: `tsconfig*.json`
- **ESLint**: `eslint.config.*`
- **Package Config**: `package.json` files
- **Build Config**: `next.config.ts`, `rollup.config.js`

### Finding Tests

- **App Tests**: `packages/app/src/**/*.test.tsx`
- **Design System Tests**: `packages/design-system/src/**/*.test.tsx`
- **All Tests**: Search for `*.test.tsx` or `*.spec.tsx`

## 📋 Current Component Status

### ✅ Implemented Components

**UI Components:**

- `Button` - Complete with variants (default, destructive, outline, secondary, ghost, link) and sizes
- `ColorShowcase` - Professional Blue color palette demonstration

**Layout Components:**

- `Container` - Responsive content wrapper with size and padding variants
- `Grid` - Flexible grid system with responsive options
- `AppLayout` - Main application shell with header/sidebar/footer

**Utilities:**

- `cn` - Class name utility function
- Professional Blue color system with light/dark mode support

### 🚧 Planned Components

**Phase 1 (Foundation):**

- Input, Text/Typography, Card, Loading Spinner

**Phase 2 (Essential UI):**

- Avatar, Badge, Toast/Notification, Modal/Dialog, Dropdown Menu

**Phase 3 (Data & Forms):**

- Table, Select, Checkbox, Radio, Progress, FormField, Alert

## 🎯 Common Workflows

### Adding a New UI Component

1. Create component folder: `packages/design-system/src/components/ui/[component-name]/`
2. Implement component: `[component-name].tsx`, `index.ts`, `README.md`
3. Add Storybook story: `[component-name].stories.tsx`
4. Add tests: `[component-name].test.tsx`
5. Export from category: `packages/design-system/src/components/ui/index.ts`
6. Use in app: Import from `@skills-eval/design-system`

**Current UI Components:**

- `Button` - Complete with variants and CVA
- `ColorShowcase` - Professional Blue palette demonstration

### Adding a New App Feature

1. Create page: `packages/app/src/app/feature/page.tsx`
2. Create components: `packages/app/src/components/feature/`
3. Add hooks: `packages/app/src/hooks/use-feature.ts`
4. Add types: `packages/app/src/types/feature.ts`

### Updating Shared Configuration

1. Root level: Update base configurations
2. Package level: Extend or override in package-specific configs
3. Test: Run `npm run type-check` and `npm run lint`

## 📦 Import Patterns

### In App Package

```tsx
// Design system components (currently available)
import {
  Button,
  Container,
  Grid,
  AppLayout,
  ColorShowcase,
  cn,
} from "@skills-eval/design-system";

// App components
import { Header } from "@/components/layout/header";
import { useAuth } from "@/hooks/use-auth";
import { ApiClient } from "@/lib/api/client";
```

### In Design System Package

```tsx
// Internal utilities
import { cn } from "../../lib/utils";

// External dependencies
import { cva } from "class-variance-authority";
import * as React from "react";
```

## 🛠️ Development Tips

### Working with Multiple Packages

- Use separate terminal tabs for each package
- Run `npm run app:dev` in one terminal
- Run `npm run design-system:storybook` in another

### Testing Changes

- Test design system components in Storybook first
- Then test integration in the app
- Use `npm run build:all` to verify everything builds

### Debugging

- Check package-specific logs in their respective directories
- Use workspace-specific commands for targeted debugging
- Verify dependencies with `npm ls --workspace=packages/app`

## 🔄 Git Workflow

### Commit Patterns

- `feat(app): add user dashboard`
- `feat(design-system): add new Button variant`
- `fix(monorepo): update shared TypeScript config`
- `docs: update navigation guide`

### Branch Naming

- `feature/app-user-dashboard`
- `feature/design-system-button-variants`
- `fix/monorepo-build-issues`
- `docs/navigation-improvements`

## 📚 Documentation Locations

- **Monorepo**: `README.monorepo.md`
- **App**: `packages/app/README.md`
- **Design System**: `packages/design-system/README.md`
- **Components**: Storybook documentation
- **API**: JSDoc comments in code

This navigation guide should be your go-to reference for working efficiently within the monorepo structure.
