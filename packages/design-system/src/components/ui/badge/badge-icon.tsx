import React from "react";
import { cn } from "../../../lib/cn";
import { cva } from "class-variance-authority";

// Define badgeIconVariants here to avoid circular dependency
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

export interface BadgeIconProps {
  icon: React.ReactNode;
  size?: "sm" | "default" | "lg";
  position?: "left" | "right";
  className?: string;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({
  icon,
  size = "default",
  position = "left",
  className,
}) => {
  return (
    <span className={cn(badgeIconVariants({ size, position }), className)}>
      {icon}
    </span>
  );
};
