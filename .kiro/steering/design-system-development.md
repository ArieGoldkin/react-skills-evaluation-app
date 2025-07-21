---
inclusion: always
---

# Design System Development Guidelines

## Current Project Status

### ✅ Completed Components (13/25+ planned - 52% complete)

**UI Components:**

- Button Component ✅ (19 tests, shadcn/ui base)
- Card Component ✅ (53 tests, composition patterns)
- Input Component ✅ (30 tests, form integration)
- Text Component ✅ (30 tests, semantic variants)
- Badge Component ✅ (48 tests, 7 variants, interactive features)
- Color Showcase Component ✅ (design system documentation)

**Layout Components:**

- Container Component ✅ (15 tests, responsive layout)
- Grid Component ✅ (responsive grid system)
- App Layout Component ✅ (application shell)

**Data Display Components:**

- Avatar Component ✅ (63 tests, status indicators, size variants)

**Feedback Components:**

- Loading Spinner Component ✅ (42 tests, animation variants)
- Toast/Notification System ✅ (43 tests, Sonner integration)
- Modal/Dialog Component ✅ (40 tests, 6 size variants, composition patterns)

### 🎯 Next Priority: Dropdown Menu Component

**Target Location**: `packages/design-system/src/components/navigation/dropdown-menu/`
**Dependencies**: shadcn/ui DropdownMenu integration, Radix UI DropdownMenu primitives

## Documentation References

- **Implementation Plan**: `docs/tasks/implementation-plan.md` - Master roadmap with phases
- **Current Progress**: `docs/tasks/current-progress.md` - Real-time status tracking
- **Component Checklist**: `docs/tasks/component-checklist.md` - Quality gates
- **Component Task Template**: `docs/tasks/component-task-template.md` - Implementation workflow

## Component Organization Structure

### Individual Component Folders

Each design system component MUST be organized in its own dedicated folder for proper separation of concerns:

```
packages/design-system/src/components/[category]/[component-name]/
├── index.ts                    # Main export
├── [component-name].tsx        # Component implementation
├── [component-name].stories.tsx # Storybook stories
├── [component-name].test.tsx   # Unit tests
├── [component-name].types.ts   # TypeScript interfaces (if complex)
└── README.md                   # Component documentation
```

**Example Structure:**

```
packages/design-system/src/components/ui/button/
├── index.ts                    # export { Button, buttonVariants } from './button'
├── button.tsx                  # Button component implementation
├── button.stories.tsx          # Storybook stories with all variants
├── button.test.tsx            # Comprehensive unit tests
└── README.md                  # Usage documentation and examples
```

### Category Organization

Components are organized by functional categories:

- `ui/` - Base UI components (Button, Input, Text, Card, etc.)
- `layout/` - Layout and structure components (Container, Grid, AppLayout)
- `forms/` - Form-specific components (FormField, Select, Checkbox)
- `data-display/` - Data visualization (Table, Badge, Avatar)
- `feedback/` - User feedback (Toast, Alert, Loading, Progress)
- `navigation/` - Navigation components (Tabs, Breadcrumb, Pagination)

## Component Implementation Priority

### 1. First Choice: shadcn/ui Components

Always start by checking if a shadcn/ui component exists for the functionality:

```bash
# Check available shadcn/ui components
npx shadcn-ui@latest add --help

# Add shadcn/ui component to design system
npx shadcn-ui@latest add button
```

**Benefits:**

- Battle-tested implementations
- Consistent API patterns
- Built-in accessibility
- Radix UI primitives foundation
- Community-maintained

### 2. Second Choice: Radix UI Primitives

If shadcn/ui doesn't have the component, use Radix UI primitives directly:

```tsx
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as Tabs from "@radix-ui/react-tabs";

// Build custom component on top of Radix primitives
export const Modal = ({ children, ...props }) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">{children}</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
```

**Benefits:**

- Unstyled, accessible primitives
- Comprehensive keyboard navigation
- ARIA attributes handled automatically
- Flexible composition patterns

### 3. Last Resort: Custom HTML Implementation

Only implement from scratch when neither shadcn/ui nor Radix UI provides the needed functionality:

```tsx
// Only when no shadcn/ui or Radix alternative exists
export const CustomComponent = ({ ...props }) => {
  // Ensure proper accessibility implementation
  // Add comprehensive keyboard navigation
  // Include proper ARIA attributes
  // Handle focus management
};
```

**Requirements for Custom Implementation:**

- Full accessibility compliance (WCAG AA)
- Comprehensive keyboard navigation
- Proper ARIA attributes and roles
- Focus management and trapping
- Screen reader compatibility
- High contrast mode support

## Path Aliases

The design system uses TypeScript path mapping for cleaner imports:

```typescript
// Instead of relative imports
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";

// Use path aliases
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
```

### Available Path Aliases

- `@/*` - Maps to `src/*`
- `@/components/*` - Maps to `src/components/*`
- `@/lib/*` - Maps to `src/lib/*`
- `@/types/*` - Maps to `src/types/*`
- `@/hooks/*` - Maps to `src/hooks/*`
- `@/styles/*` - Maps to `src/styles/*`

### Configuration

Path aliases are configured in:

- `tsconfig.json` - TypeScript compilation
- `rollup.config.js` - Build system
- `.storybook/main.ts` - Storybook development
- `jest.config.cjs` - Testing environment

## Component Development Workflow

### 1. Research Phase

Before implementing any component:

```bash
# Check if shadcn/ui has the component
npx shadcn-ui@latest add [component-name]

# If not available, check Radix UI primitives
# Visit: https://www.radix-ui.com/primitives

# Research existing implementations and patterns
```

### 2. Implementation Phase

```bash
# Create component folder structure
mkdir -p packages/design-system/src/components/[category]/[component-name]

# Create all required files
touch packages/design-system/src/components/[category]/[component-name]/index.ts
touch packages/design-system/src/components/[category]/[component-name]/[component-name].tsx
touch packages/design-system/src/components/[category]/[component-name]/[component-name].stories.tsx
touch packages/design-system/src/components/[category]/[component-name]/[component-name].test.tsx
```

### 3. Development Order (Critical)

Follow the standardized workflow from `docs/tasks/component-task-template.md`:

1. **Component Implementation** - Core functionality with TypeScript
2. **Storybook Stories** - All variants and interactive states (12+ variations)
3. **Unit Tests** - Comprehensive coverage (90% minimum, 30+ tests typical)
4. **Documentation** - Usage examples and API reference in README.md
5. **Export Management** - Update category and main indexes

### 4. Quality Gates (Reference: docs/tasks/component-checklist.md)

Before marking any component complete, verify:

- [ ] TypeScript compilation passes (zero errors)
- [ ] All tests pass (≥90% coverage)
- [ ] Storybook stories complete (all variants)
- [ ] Accessibility audit passes (WCAG AA)
- [ ] Component README written
- [ ] Exported in index files
- [ ] Used successfully in app package

## Required Files for Each Component

### 1. Component Implementation ([component-name].tsx)

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Use CVA for variant management
const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "default-styles",
      secondary: "secondary-styles",
    },
    size: {
      sm: "small-styles",
      md: "medium-styles",
      lg: "large-styles",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Component-specific props
}

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Component.displayName = "Component";
```

### 2. Storybook Stories ([component-name].stories.tsx)

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Component } from "./component";

const meta: Meta<typeof Component> = {
  title: "Components/[Category]/Component",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Component content",
  },
};

// Variant stories
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Component variant="default">Default</Component>
      <Component variant="secondary">Secondary</Component>
    </div>
  ),
};

// Size stories
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Component size="sm">Small</Component>
      <Component size="md">Medium</Component>
      <Component size="lg">Large</Component>
    </div>
  ),
};

// Interactive stories for complex components
export const Interactive: Story = {
  args: {
    // Interactive props
  },
};
```

### 3. Unit Tests ([component-name].test.tsx)

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Component } from "./component";

describe("Component", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<Component>Test content</Component>);
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Component className="custom-class">Test</Component>);
      expect(screen.getByText("Test")).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("renders default variant correctly", () => {
      render(<Component variant="default">Default</Component>);
      // Test variant-specific classes
    });

    it("renders secondary variant correctly", () => {
      render(<Component variant="secondary">Secondary</Component>);
      // Test variant-specific classes
    });
  });

  describe("Interactions", () => {
    it("handles click events", async () => {
      const handleClick = jest.fn();
      render(<Component onClick={handleClick}>Clickable</Component>);

      await userEvent.click(screen.getByText("Clickable"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<Component aria-label="Test component">Content</Component>);
      expect(screen.getByLabelText("Test component")).toBeInTheDocument();
    });

    it("supports keyboard navigation", async () => {
      render(<Component>Focusable</Component>);

      await userEvent.tab();
      expect(screen.getByText("Focusable")).toHaveFocus();
    });
  });
});
```

### 4. Index Export (index.ts)

```tsx
export { Component, type ComponentProps } from "./component";
export { componentVariants } from "./component";
```

### 5. Component Documentation (README.md)

````markdown
# Component

Brief description of the component and its purpose.

## Usage

```tsx
import { Component } from "@skills-eval/design-system";

export function Example() {
  return (
    <Component variant="default" size="md">
      Content
    </Component>
  );
}
```
````

## Props

| Prop    | Type                     | Default   | Description    |
| ------- | ------------------------ | --------- | -------------- |
| variant | 'default' \| 'secondary' | 'default' | Visual variant |
| size    | 'sm' \| 'md' \| 'lg'     | 'md'      | Size variant   |

## Examples

### Basic Usage

[Examples with code snippets]

### Advanced Usage

[Complex examples and patterns]

## Accessibility

- Supports keyboard navigation
- Includes proper ARIA attributes
- Compatible with screen readers
- Meets WCAG AA contrast requirements

````

## Export Management

### Category Index Files

Each category must have an index.ts file that exports all components:

```tsx
// packages/design-system/src/components/ui/index.ts
export * from './button';
export * from './input';
export * from './text';
export * from './card';
````

### Main Package Export

Update the main package index to include new components:

```tsx
// packages/design-system/src/index.ts
export * from "./components/ui";
export * from "./components/layout";
export * from "./components/forms";
export * from "./components/data-display";
export * from "./components/feedback";
export * from "./components/navigation";

// Utility exports
export * from "./lib/utils";
export * from "./lib/cn";
```

## Quality Standards

### Code Quality (Reference: .kiro/steering/react-typescript-quality-rules.md)

- **Component Size Limit**: Maximum 180 lines per component file
- **Function Complexity**: Maximum cyclomatic complexity of 11
- TypeScript strict mode compliance (zero `any` types)
- ESLint and Prettier formatting
- Comprehensive prop interfaces with React.FC patterns
- Proper error handling and displayName for all components

### Testing Requirements (Current Standard: 418 tests passing across all components)

- **Minimum 90% test coverage** (current components achieve 100%)
- All variants and props tested comprehensively
- Interaction testing with user-event
- Accessibility testing (ARIA, keyboard navigation)
- Custom className application tested
- Error states and edge cases covered

### Documentation Standards (Established Pattern)

- **Complete Storybook stories** (12+ variations per component)
- **Interactive examples** for complex components
- **README with usage examples** and API reference
- **TypeScript interface documentation**
- **Accessibility guidelines** documented

### Performance Requirements

- React.memo for pure components
- Proper dependency arrays in hooks
- Optimized re-render patterns with useCallback/useMemo
- Bundle size monitoring (target: ≤100KB gzipped)

## Success Metrics (Current Achievement)

- ✅ **13 components completed** with 100% test coverage
- ✅ **418 tests passing** across all components
- ✅ **Zero TypeScript compilation errors**
- ✅ **WCAG AA accessibility compliance** on all components
- ✅ **Complete documentation** (READMEs and Storybook stories)
- ✅ **Vitest migration completed** (fully migrated from Jest)

## Integration with Project Documentation

This steering file works in conjunction with:

- `docs/tasks/current-progress.md` - Real-time component status
- `docs/tasks/implementation-plan.md` - Phase-by-phase roadmap
- `docs/claude/guidelines/design-system.md` - Comprehensive development guide
- `docs/tasks/component-checklist.md` - Quality assurance checklist

This structure ensures consistent, maintainable, and well-documented components that follow established patterns and deliver excellent developer experience.
