"use client";

import { cn } from "../../lib/utils";
import { ThemeToggle } from "./theme-toggle";

export interface PositionedThemeToggleProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  offset?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  size?: "sm" | "md" | "lg";
  variant?: "button" | "switch";
  showLabel?: boolean;
  className?: string;
  containerClassName?: string;
}

/**
 * Positioned theme toggle wrapper that provides consistent positioning across pages
 */
export function PositionedThemeToggle({
  position = "top-right",
  offset = {
    top: "1.5rem",
    right: "1.5rem",
    bottom: "1.5rem",
    left: "1.5rem",
  },
  size = "md",
  variant = "button",
  showLabel = false,
  className,
  containerClassName,
}: PositionedThemeToggleProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const positionStyles = {
    "top-left": {
      top: offset.top,
      left: offset.left,
    },
    "top-right": {
      top: offset.top,
      right: offset.right,
    },
    "bottom-left": {
      bottom: offset.bottom,
      left: offset.left,
    },
    "bottom-right": {
      bottom: offset.bottom,
      right: offset.right,
    },
  };

  return (
    <div
      className={cn(
        "fixed z-20",
        positionClasses[position],
        containerClassName
      )}
      style={positionStyles[position]}
    >
      <ThemeToggle
        size={size}
        variant={variant}
        showLabel={showLabel}
        className={cn(
          "bg-card/80 backdrop-blur-sm border-border/50",
          className
        )}
      />
    </div>
  );
}
