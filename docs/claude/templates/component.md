# Component Implementation Template

## Basic Component Structure

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

## Index File Template

```tsx
// index.ts
export * from "./component";
export type { ComponentProps } from "./component";
```

## Folder Structure

```
[component-name]/
├── index.ts
├── [component-name].tsx
├── [component-name].stories.tsx
├── [component-name].test.tsx
└── README.md
```
