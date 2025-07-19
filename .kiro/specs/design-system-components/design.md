# Design System Components - Design Document

## Overview

The Skills Evaluation App Design System is a comprehensive collection of reusable UI components built on top of shadcn/ui and Tailwind CSS. The system follows atomic design principles and provides a consistent, accessible, and performant foundation for building user interfaces.

## Architecture

### Current Component Hierarchy

```
@skills-eval/design-system
├── src/
│   ├── components/
│   │   ├── ui/              # Base UI components (shadcn/ui)
│   │   │   └── button.tsx   ✅ (implemented)
│   │   ├── layout/          # Layout and structure components
│   │   │   ├── app-layout.tsx    ✅ (implemented)
│   │   │   ├── container.tsx     ✅ (implemented)
│   │   │   └── grid.tsx          ✅ (implemented)
│   │   ├── forms/           # Form and input components (placeholder)
│   │   ├── data-display/    # Data visualization components (placeholder)
│   │   ├── feedback/        # Loading, error, success states (placeholder)
│   │   └── navigation/      # Navigation components (placeholder)
│   ├── lib/                 # Utilities and helpers
│   │   ├── utils.ts         ✅ (cn function implemented)
│   │   └── cn.ts            ✅ (re-export)
│   ├── styles/              # Global styles and CSS
│   │   └── globals.css      ✅ (design tokens implemented)
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         ✅ (base types implemented)
│   └── hooks/               # Reusable React hooks (placeholder)
```

### Current Technology Stack

- **Base Framework**: React 19 with TypeScript ✅
- **Styling**: Tailwind CSS with CSS custom properties ✅
- **Component Base**: shadcn/ui and Radix UI primitives ✅
- **Variant Management**: class-variance-authority (CVA) ✅
- **Utility Functions**: clsx + tailwind-merge ✅
- **Icons**: Lucide React ✅
- **Build System**: Rollup with TypeScript ✅
- **Testing**: Jest + React Testing Library ✅
- **Documentation**: Storybook with essential addons ✅

### Existing Design Tokens

The design system already includes comprehensive design tokens in `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
  /* ... complete token system with dark mode variants */
}
```

## Components and Interfaces

### Phase 1: Foundation Components

#### Button Component ✅ (Already Implemented)

```typescript
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Current variants implemented:
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
  }
);
```

**Current Implementation:**

- ✅ Uses CVA for variant management
- ✅ Supports Radix Slot for asChild composition
- ✅ Full accessibility with focus management
- ✅ Complete variant system with proper hover states
- ✅ Storybook documentation and unit tests

#### Input Component

```typescript
interface InputProps {
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}
```

**Design Decisions:**

- Controlled and uncontrolled variants supported
- Icon support for enhanced visual hierarchy
- Built-in error state styling
- Proper ARIA attributes for accessibility

#### Text/Typography Component

```typescript
interface TextProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  variant?:
    | "display"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "body-lg"
    | "body"
    | "body-sm"
    | "caption"
    | "overline";
  color?: "primary" | "secondary" | "muted" | "error" | "success" | "warning";
  align?: "left" | "center" | "right" | "justify";
  weight?: "normal" | "medium" | "semibold" | "bold";
  truncate?: boolean | number; // true for single line, number for multi-line
  children: React.ReactNode;
}
```

**Design Decisions:**

- Semantic HTML element selection with `as` prop
- Visual variant separate from semantic meaning
- Multi-line truncation support
- Comprehensive color system integration

### Phase 2: Essential UI Components

#### Avatar Component

```typescript
interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  status?: "online" | "offline" | "busy" | "away";
  shape?: "circle" | "square";
  border?: boolean;
  onClick?: () => void;
}
```

#### Toast/Notification System

```typescript
interface ToastProps {
  id: string;
  type?: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}
```

**Design Decisions:**

- Context-based toast management
- Auto-dismiss with configurable duration
- Action buttons for interactive notifications
- Stacking and positioning system

### Phase 3: Data and Form Components

#### Table Component

```typescript
interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  sortBy?: keyof T;
  sortDirection?: "asc" | "desc";
  onSort?: (key: keyof T, direction: "asc" | "desc") => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  };
  emptyState?: React.ReactNode;
  rowSelection?: {
    selectedRows: string[];
    onSelectionChange: (selectedRows: string[]) => void;
  };
}
```

#### Form Components

```typescript
interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

interface SelectProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string | string[];
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  loading?: boolean;
  error?: string;
  onChange: (value: string | string[]) => void;
}
```

## Data Models

### Design Tokens Structure

```typescript
interface DesignTokens {
  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    neutral: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
  };
  typography: {
    fontFamily: {
      sans: string[];
      mono: string[];
    };
    fontSize: Record<
      string,
      [string, { lineHeight: string; letterSpacing?: string }]
    >;
    fontWeight: Record<string, string>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  animations: {
    duration: Record<string, string>;
    easing: Record<string, string>;
  };
}

interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string; // Base color
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}
```

### Theme Configuration

```typescript
interface Theme {
  name: string;
  tokens: DesignTokens;
  components?: {
    [componentName: string]: {
      defaultProps?: Record<string, any>;
      styles?: Record<string, string>;
    };
  };
}
```

## Error Handling

### Component Error Boundaries

- Each complex component wrapped in error boundary
- Graceful degradation for missing props
- Development vs production error messages
- Error reporting integration

### Validation and Type Safety

- Runtime prop validation with TypeScript
- Default props for optional values
- Comprehensive TypeScript interfaces
- JSDoc documentation for all props

## Testing Strategy

### Unit Testing Approach

```typescript
// Example test structure
describe("Button Component", () => {
  describe("Variants", () => {
    it("renders primary variant correctly", () => {});
    it("renders secondary variant correctly", () => {});
    // ... other variants
  });

  describe("States", () => {
    it("handles loading state", () => {});
    it("handles disabled state", () => {});
  });

  describe("Interactions", () => {
    it("calls onClick when clicked", () => {});
    it("prevents click when disabled", () => {});
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {});
    it("supports keyboard navigation", () => {});
  });
});
```

### Visual Regression Testing

- Storybook with Chromatic for visual testing
- Cross-browser compatibility testing
- Responsive design validation
- Dark/light theme testing

### Performance Testing

- Bundle size monitoring
- Render performance benchmarks
- Memory leak detection
- Animation performance validation

## Implementation Phases

### Phase 1: Complete Foundation (Week 1)

**Priority**: Critical
**Status**: Partially Complete ✅
**Components**:

- ✅ Button (complete with stories and tests)
- ⏳ Input (to implement)
- ⏳ Text/Typography (to implement)
- ⏳ Card (to implement)
- ⏳ Loading Spinner (to implement)

**Already Delivered**:

- ✅ Complete Storybook setup with essential addons
- ✅ Comprehensive design token system with light/dark themes
- ✅ CVA-based variant management system
- ✅ Jest + React Testing Library setup
- ✅ Rollup build system with proper exports
- ✅ Button component with full test coverage

**Remaining Deliverables**:

- Input component with validation states
- Typography system with semantic variants
- Card component with composition patterns
- Loading spinner with animation options

### Phase 2: Essential UI (Week 2)

**Priority**: High
**Components**: Avatar, Badge, Toast, Modal, Dropdown Menu
**Deliverables**:

- Toast context and provider system
- Modal focus management and portal rendering
- Dropdown positioning with Floating UI
- Comprehensive accessibility improvements

### Phase 3: Data & Forms (Week 3)

**Priority**: High
**Components**: Table, Select, Checkbox, Radio, Progress, Alert
**Deliverables**:

- Complex form validation
- Table sorting and pagination
- Progress tracking components
- Form field wrapper system

### Phase 4: Navigation (Week 4)

**Priority**: Medium
**Components**: Tabs, Breadcrumb, Navigation, Pagination, Sidebar
**Deliverables**:

- Navigation state management
- Responsive navigation patterns
- Breadcrumb automation
- Sidebar collapse animations

### Phase 5: Layout & Polish (Week 5)

**Priority**: Medium
**Components**: Container, Grid, Flex, Empty State, Skeleton, Tooltip
**Deliverables**:

- Responsive layout system
- Loading state improvements
- Micro-interactions
- Final accessibility audit

## Performance Considerations

### Bundle Optimization

- Tree-shaking support for individual component imports
- Dynamic imports for heavy components
- CSS-in-JS optimization for runtime performance
- Icon optimization and lazy loading

### Runtime Performance

- React.memo for pure components
- useMemo for expensive calculations
- useCallback for event handlers
- Virtualization for large lists

### Accessibility Performance

- Reduced motion support
- High contrast mode
- Screen reader optimization
- Keyboard navigation performance

## Migration Strategy

### From Existing Components

1. Audit current component usage
2. Create compatibility layer
3. Gradual migration with codemods
4. Deprecation warnings and timeline
5. Complete removal of old components

### Integration with Existing Codebase

- Namespace design system components
- Provide migration guides
- Maintain backward compatibility during transition
- Automated testing for breaking changes
