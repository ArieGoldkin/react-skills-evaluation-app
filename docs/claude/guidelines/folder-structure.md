# Design System Folder Structure Guidelines

## Overview
This document defines the standardized folder structure for the Skills Evaluation App Design System, ensuring consistency, maintainability, and scalability.

## Main Package Structure

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
export * from './component-one';
export * from './component-two';
export * from './component-three';
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
```markdown
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
|------|------|---------|-------------|

## Examples
[Various usage examples]

## Accessibility
[Accessibility guidelines]

## Best Practices
[Usage recommendations]
```

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
export const Default: Story = { /* ... */ };
export const Variants: Story = { /* ... */ };
export const States: Story = { /* ... */ };
export const Interactive: Story = { /* ... */ };
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

Following these guidelines ensures the design system remains organized, maintainable, and easy to use as it grows.