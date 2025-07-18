// Common types for the design system

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface VariantProps {
  variant?: string;
  size?: string;
}

// Theme types
export interface ThemeConfig {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, string>;
}

// Component state types
export type ComponentState = "idle" | "loading" | "success" | "error";

// Responsive breakpoint types
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

// Export React types for convenience
export type { ComponentProps, ReactElement, ReactNode } from "react";
