# Design System Development Guidelines

## Overview

This guide provides comprehensive instructions for Claude AI when working on the Skills Evaluation design system. It covers component development, testing, documentation, and quality standards to ensure consistency and maintainability.

## Quick Reference

**Primary Goal**: Build a robust, accessible, and performant design system using modern React patterns with TypeScript.

### Essential Commands

```bash
# Start Storybook for development
npm run design-system:storybook

# Run tests for design system
cd packages/design-system && npm run test

# Build design system
cd packages/design-system && npm run build

# Check design system types
cd packages/design-system && npm run type-check
```

## Component Development Priority System

### 🥇 First Choice: shadcn/ui Components

**Always start here** - Check if shadcn/ui has the component:

```bash
# Check available components
npx shadcn-ui@latest add --help

# Add to design system
npx shadcn-ui@latest add button
```

**Why shadcn/ui First:**

- Battle-tested implementations with community validation
- Consistent API patterns across components
- Built-in accessibility and keyboard navigation
- Radix UI primitives foundation for solid behavior
- Well-maintained with regular updates

### 🥈 Second Choice: Radix UI Primitives

If shadcn/ui doesn't provide the component, build on Radix primitives:

```tsx
import * as Dialog from "@radix-ui/react-dialog";

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

**Radix UI Benefits:**

- Unstyled, accessible primitives
- Comprehensive keyboard navigation built-in
- ARIA attributes handled automatically
- Flexible composition patterns

### 🥉 Last Resort: Custom Implementation

Only when neither shadcn/ui nor Radix UI provides the functionality:

**Requirements for Custom Components:**

- ✅ Full WCAG AA accessibility compliance
- ✅ Comprehensive keyboard navigation
- ✅ Proper ARIA attributes and roles
- ✅ Focus management and trapping
- ✅ Screen reader compatibility
- ✅ High contrast mode support

## Component Structure & Organization

### Mandatory Folder Structure

```
packages/design-system/src/components/[category]/[component-name]/
├── index.ts                    # Main export
├── [component-name].tsx        # Component implementation
├── [component-name].stories.tsx # Storybook stories
├── [component-name].test.tsx   # Unit tests
├── [component-name].types.ts   # TypeScript interfaces (if complex)
└── README.md                   # Component documentation
```

### Component Categories

- `ui/` - Base UI components (Button, Input, Text, Card)
- `layout/` - Layout and structure (Container, Grid, AppLayout)
- `forms/` - Form-specific (FormField, Select, Checkbox)
- `data-display/` - Data visualization (Table, Badge, Avatar)
- `feedback/` - User feedback (Toast, Alert, Loading, Progress)
- `navigation/` - Navigation (Tabs, Breadcrumb, Pagination)

## Development Workflow

### 1. Pre-Development Research

```bash
# Check shadcn/ui availability
npx shadcn-ui@latest add [component-name]

# If not available, check Radix UI
# Visit: https://www.radix-ui.com/primitives

# Research existing patterns in codebase
```

### 2. Component Creation Process

```bash
# Create component folder structure
mkdir -p packages/design-system/src/components/[category]/[component-name]

# Create all required files
touch packages/design-system/src/components/[category]/[component-name]/index.ts
touch packages/design-system/src/components/[category]/[component-name]/[component-name].tsx
touch packages/design-system/src/components/[category]/[component-name]/[component-name].stories.tsx
touch packages/design-system/src/components/[category]/[component-name]/[component-name].test.tsx
touch packages/design-system/src/components/[category]/[component-name]/README.md
```

### 3. Development Order (Critical)

1. **Component Implementation** - Core functionality with TypeScript
2. **Storybook Stories** - All variants and interactive states
3. **Unit Tests** - Comprehensive coverage (90% minimum)
4. **Documentation** - Usage examples and API reference
5. **Export Management** - Update category and main indexes

## Required Implementation Patterns

### Component Implementation Template

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

### Storybook Stories Template

```tsx
import type { Meta, StoryObj } from "@storybook/react";
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Component content",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Component variant="default">Default</Component>
      <Component variant="secondary">Secondary</Component>
    </div>
  ),
};
```

### Testing Template

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

## Path Aliases & Import Patterns

### Available Aliases

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/lib/*` → `src/lib/*`
- `@/types/*` → `src/types/*`
- `@/hooks/*` → `src/hooks/*`
- `@/styles/*` → `src/styles/*`

### Preferred Import Style

```tsx
// ✅ Correct - Use path aliases
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ❌ Avoid - Relative imports
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
```

## Export Management System

### Category Index Files

```tsx
// packages/design-system/src/components/ui/index.ts
export * from "./button";
export * from "./input";
export * from "./text";
export * from "./card";
```

### Main Package Export

```tsx
// packages/design-system/src/index.ts
export * from "./components/ui";
export * from "./components/layout";
export * from "./components/forms";

// Utility exports
export * from "./lib/utils";
export * from "./lib/cn";
```

**Critical**: Always update both category and main indexes when adding components.

## Quality Standards & Requirements

### Code Quality Checklist

- [ ] TypeScript strict mode compliance
- [ ] ESLint and Prettier formatting passes
- [ ] Comprehensive prop interfaces defined
- [ ] Proper error handling implemented
- [ ] React.forwardRef used for DOM elements
- [ ] displayName set for debugging

### Testing Requirements

- [ ] **Minimum 90% test coverage**
- [ ] All variants and props tested
- [ ] Interaction testing with user-event
- [ ] Accessibility testing (ARIA, keyboard nav)
- [ ] Custom className application tested
- [ ] Error states and edge cases covered

### Documentation Standards

- [ ] Complete Storybook stories with all variants
- [ ] Interactive examples for complex components
- [ ] README with usage examples
- [ ] TypeScript interface documentation
- [ ] Accessibility guidelines documented

### Performance Requirements

- [ ] React.memo for pure components
- [ ] Proper dependency arrays in hooks
- [ ] Optimized re-render patterns
- [ ] Bundle size impact considered

## Design System Specific Patterns

### Component Size Limits

- **Maximum 180 lines per component file**
- **Break down complex components** into smaller, focused pieces
- **Extract hooks** for complex logic (> 50 lines)

### Styling Approach

- **Use Tailwind CSS** for styling
- **CVA (Class Variance Authority)** for variant management
- **CSS Modules** only when Tailwind insufficient
- **Consistent spacing scale** (4px base unit)

### Accessibility Requirements

- **WCAG AA compliance** mandatory
- **Keyboard navigation** for all interactive elements
- **ARIA labels and roles** properly implemented
- **Focus management** in complex components
- **Screen reader testing** for critical components

## Working with Existing Components

### Before Modifying Existing Components

1. **Read component README** to understand purpose
2. **Check Storybook stories** to see all variants
3. **Run existing tests** to ensure they pass
4. **Review usage** in the app package

### Modification Process

1. **Update component implementation**
2. **Add/update Storybook stories** for new variants
3. **Add/update tests** for new functionality
4. **Update documentation** in README
5. **Verify app package** still works correctly

## Troubleshooting Common Issues

### Build Issues

```bash
# Check TypeScript errors
cd packages/design-system && npm run type-check

# Check for circular dependencies
npm run build 2>&1 | grep -i circular
```

### Test Issues

```bash
# Run tests with verbose output
npm run test -- --verbose

# Run specific test file
npm run test button.test.tsx
```

### Storybook Issues

```bash
# Clear Storybook cache
rm -rf .storybook-cache

# Restart with fresh cache
npm run design-system:storybook
```

## Integration with App Package

### Using Design System Components

```tsx
// In app package
import { Button, Input, Card } from "@skills-eval/design-system";

export function LoginForm() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button variant="primary">Login</Button>
    </Card>
  );
}
```

### Development Workflow

1. **Develop components** in design system package
2. **Test in Storybook** for isolation
3. **Import and use** in app package
4. **Iterate based on usage** patterns

## Success Metrics

### Component Quality Indicators

- ✅ All tests passing with 90%+ coverage
- ✅ Storybook stories comprehensive and interactive
- ✅ Documentation complete with examples
- ✅ Accessibility audit passing
- ✅ Performance budget maintained
- ✅ Used successfully in app package

### Process Efficiency

- ✅ shadcn/ui checked first for existing solutions
- ✅ Radix UI used for accessible primitives
- ✅ Custom implementation only when necessary
- ✅ Consistent file structure followed
- ✅ Export management maintained

This guide ensures that all design system work maintains high quality, accessibility, and consistency while following established patterns and best practices.
