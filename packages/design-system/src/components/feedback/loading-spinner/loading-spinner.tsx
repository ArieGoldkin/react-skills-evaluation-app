import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

const loadingSpinnerVariants = cva("inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "w-4 h-4",
      default: "w-6 h-6",
      lg: "w-8 h-8",
    },
    speed: {
      slow: "animate-spin [animation-duration:2s]",
      default: "animate-spin [animation-duration:1s]",
      fast: "animate-spin [animation-duration:0.5s]",
    },
  },
  defaultVariants: {
    size: "default",
    speed: "default",
  },
});

const loadingContainerVariants = cva("inline-flex items-center gap-2", {
  variants: {
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col text-center",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingSpinnerVariants>,
    VariantProps<typeof loadingContainerVariants> {
  show?: boolean;
  text?: string;
  "aria-label"?: string;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    {
      className,
      size,
      speed,
      direction,
      show = true,
      text,
      children,
      "aria-label": ariaLabel = "Loading",
      ...props
    },
    ref
  ) => {
    if (!show) {
      return null;
    }

    const spinnerContent = (
      <Loader2
        className={cn(loadingSpinnerVariants({ size, speed }), "text-current")}
        aria-hidden="true"
      />
    );

    const loadingText = text || children;

    if (loadingText) {
      return (
        <div
          ref={ref}
          className={cn(loadingContainerVariants({ direction, className }))}
          role="status"
          aria-live="polite"
          aria-label={ariaLabel}
          {...props}
        >
          {spinnerContent}
          <span className="text-sm text-muted-foreground">{loadingText}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(loadingSpinnerVariants({ size, speed, className }))}
        role="status"
        aria-live="polite"
        aria-label={ariaLabel}
        {...props}
      >
        {spinnerContent}
      </div>
    );
  }
);
LoadingSpinner.displayName = "LoadingSpinner";

export { loadingContainerVariants, LoadingSpinner, loadingSpinnerVariants };
