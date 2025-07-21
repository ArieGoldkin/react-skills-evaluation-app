import React from "react";
import { cn } from "../../../lib/cn";
import { type VariantProps } from "class-variance-authority";
import { badgeVariants } from "./badge";

export interface BadgeDotProps extends VariantProps<typeof badgeVariants> {
  className?: string;
}

export const BadgeDot: React.FC<BadgeDotProps> = ({ variant, className }) => {
  return (
    <span
      className={cn(
        "mr-1 h-2 w-2 rounded-full",
        variant === "default" && "bg-primary-foreground",
        variant === "secondary" && "bg-secondary-foreground",
        variant === "destructive" && "bg-destructive-foreground",
        variant === "outline" && "bg-foreground",
        variant === "success" && "bg-green-600 dark:bg-green-400",
        variant === "warning" && "bg-yellow-600 dark:bg-yellow-400",
        variant === "info" && "bg-blue-600 dark:bg-blue-400",
        className
      )}
      aria-hidden="true"
    />
  );
};
