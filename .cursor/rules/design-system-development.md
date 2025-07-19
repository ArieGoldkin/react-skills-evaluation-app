# Design System Development Guidelines

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

### 3. Development Order

1. **Component Implementation** - Core functionality
2. **TypeScript Interfaces** - Proper typing
3. **Storybook Stories** - All variants and states
4. **Unit Tests** - Comprehensive test coverage
5. **Documentation** - Usage examples and guidelines

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

### Code Quality

- TypeScript strict mode compliance
- ESLint and Prettier formatting
- Comprehensive prop interfaces
- Proper error handling

### Testing Requirements

- Minimum 90% test coverage
- All variants and props tested
- Interaction testing with user-event
- Accessibility testing with jest-axe

### Documentation Standards

- Complete Storybook stories
- Usage examples in README
- TypeScript interface documentation
- Accessibility guidelines

### Performance Requirements

- React.memo for pure components
- Proper dependency arrays in hooks
- Optimized re-render patterns
- Bundle size monitoring

## Component Development Checklist

### Before Implementation

- [ ] Research shadcn/ui availability
- [ ] Check Radix UI primitives
- [ ] Review existing patterns
- [ ] Plan component structure

### During Implementation

- [ ] Create component folder structure
- [ ] Implement core functionality
- [ ] Add TypeScript interfaces
- [ ] Create Storybook stories
- [ ] Write comprehensive tests
- [ ] Add documentation

### After Implementation

- [ ] Update category exports
- [ ] Update main package exports
- [ ] Test in Storybook
- [ ] Run all tests
- [ ] Check bundle size
- [ ] Verify accessibility
- [ ] Update component status

This structure ensures consistent, maintainable, and well-documented components that follow best practices and provide excellent developer experience.
