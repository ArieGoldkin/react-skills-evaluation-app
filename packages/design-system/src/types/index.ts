// Common types for the design system

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface VariantProps {
  variant?: string;
  size?: string;
}

// Component state types
export type ComponentState = "idle" | "loading" | "success" | "error";

// Responsive breakpoint types
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

// Export React types for convenience
export type { ComponentProps, ReactElement, ReactNode } from "react";

// Export theme types
export * from "./theme";
