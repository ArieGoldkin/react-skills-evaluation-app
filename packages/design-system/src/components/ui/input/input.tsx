import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2 py-1 text-xs",
        default: "h-10 px-3 py-2",
        lg: "h-12 px-4 py-3 text-base",
      },
      state: {
        default: "",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
      },
    },
    defaultVariants: {
      size: "default",
      state: "default",
    },
  }
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  success?: boolean;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      size,
      state,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      success,
      containerClassName,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    // Determine state based on props
    const currentState = error ? "error" : success ? "success" : state;

    // Auto-show success/error icons
    const showLeftIcon = leftIcon;
    const showRightIcon = rightIcon || error || success;
    const autoRightIcon = error ? (
      <AlertCircle className="h-4 w-4 text-destructive" />
    ) : success ? (
      <CheckCircle2 className="h-4 w-4 text-green-500" />
    ) : null;

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {showLeftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ size, state: currentState }),
              showLeftIcon && "pl-10",
              showRightIcon && "pr-10",
              className
            )}
            ref={ref}
            id={inputId}
            required={required}
            aria-describedby={cn(errorId, hintId)}
            aria-invalid={error ? true : undefined}
            {...props}
          />
          {showRightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon || autoRightIcon}
            </div>
          )}
        </div>
        {hint && !error && (
          <p id={hintId} className="text-xs text-muted-foreground">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
export type { InputProps };
