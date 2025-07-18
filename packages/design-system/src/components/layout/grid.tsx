import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    responsive: {
      true: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      false: "",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: "md",
    responsive: false,
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: React.ElementType;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    { className, cols, gap, responsive, as: Component = "div", ...props },
    ref
  ) => {
    return (
      <Component
        className={cn(gridVariants({ cols, gap, responsive, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

export { Grid };
