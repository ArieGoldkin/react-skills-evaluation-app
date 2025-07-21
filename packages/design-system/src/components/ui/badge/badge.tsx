"use client";

import { cn } from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { BadgeDot } from "./badge-dot";
import { BadgeIcon } from "./badge-icon";
import { BadgeRemoveButton } from "./badge-remove-button";
import { useBadgeInteractions } from "./use-badge-interactions";

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

    const { isClickable, isInteractive, handleClick, handleKeyDown } =
      useBadgeInteractions({ onClick, removable, asChild });

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
        {dot && <BadgeDot variant={variant} />}

        {icon && iconPosition === "left" && (
          <BadgeIcon icon={icon} size={size || "default"} position="left" />
        )}

        {children}

        {icon && iconPosition === "right" && (
          <BadgeIcon icon={icon} size={size || "default"} position="right" />
        )}

        {removable && onRemove && (
          <BadgeRemoveButton onRemove={onRemove} size={size || "default"} />
        )}
      </Comp>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
