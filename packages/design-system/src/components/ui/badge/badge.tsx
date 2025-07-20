"use client";

import { cn } from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800",
        warning:
          "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800",
        info: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
);

const badgeIconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "h-3 w-3",
      default: "h-3 w-3",
      lg: "h-4 w-4",
    },
    position: {
      left: "mr-1",
      right: "ml-1",
    },
  },
  defaultVariants: {
    size: "default",
    position: "left",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      asChild = false,
      removable = false,
      onRemove,
      icon,
      iconPosition = "left",
      dot = false,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    const isClickable = onClick || removable || asChild;
    const isInteractive = isClickable && !removable;

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (onClick) {
          onClick(event);
        }
      },
      [onClick]
    );

    const handleRemove = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (onRemove) {
          onRemove();
        }
      },
      [onRemove]
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isInteractive && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          handleClick(event as any);
        }
      },
      [isInteractive, handleClick]
    );

    return (
      <Comp
        ref={ref}
        className={cn(
          badgeVariants({ variant, size, shape }),
          isClickable && "cursor-pointer",
          isInteractive && "hover:opacity-80",
          className
        )}
        onClick={isInteractive ? handleClick : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        role={isInteractive ? "button" : undefined}
        {...props}
      >
        {/* Dot indicator */}
        {dot && (
          <span
            className={cn(
              "mr-1 h-2 w-2 rounded-full",
              variant === "default" && "bg-primary-foreground",
              variant === "secondary" && "bg-secondary-foreground",
              variant === "destructive" && "bg-destructive-foreground",
              variant === "outline" && "bg-foreground",
              variant === "success" && "bg-green-600 dark:bg-green-400",
              variant === "warning" && "bg-yellow-600 dark:bg-yellow-400",
              variant === "info" && "bg-blue-600 dark:bg-blue-400"
            )}
            aria-hidden="true"
          />
        )}

        {/* Left icon */}
        {icon && iconPosition === "left" && (
          <span className={cn(badgeIconVariants({ size, position: "left" }))}>
            {icon}
          </span>
        )}

        {/* Content */}
        {children}

        {/* Right icon */}
        {icon && iconPosition === "right" && (
          <span className={cn(badgeIconVariants({ size, position: "right" }))}>
            {icon}
          </span>
        )}

        {/* Remove button */}
        {removable && (
          <button
            type="button"
            className={cn(
              "ml-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10",
              "focus:outline-none focus:ring-1 focus:ring-ring",
              badgeIconVariants({ size, position: "right" })
            )}
            onClick={handleRemove}
            aria-label="Remove badge"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        )}
      </Comp>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
