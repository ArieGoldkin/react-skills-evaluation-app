"use client";

import { COLOR_INTENTIONS, CSS_VARIABLES } from "../constants/theme";
import { useThemeContext } from "../context/theme-context";
import type {
  ColorIntention,
  ColorProperty,
  ColorVariant,
} from "../types/theme";

/**
 * Main theme hook that provides access to theme state and utilities
 */
export function useTheme() {
  const context = useThemeContext();

  /**
   * Get a CSS variable value for a color
   * @param intention - The color intention (primary, secondary, etc.)
   * @param variant - The color variant (default, emphasis, subtle, muted)
   * @returns CSS variable string
   */
  const getColorVar = (
    intention: ColorIntention,
    variant: ColorVariant = "default"
  ): string => {
    const colorKey = COLOR_INTENTIONS[intention]?.[variant];
    if (!colorKey) {
      console.warn(
        `Invalid color intention "${intention}" with variant "${variant}"`
      );
      return CSS_VARIABLES.foreground;
    }

    return (
      CSS_VARIABLES[colorKey as keyof typeof CSS_VARIABLES] ||
      CSS_VARIABLES.foreground
    );
  };

  /**
   * Get a Tailwind CSS class for a color
   * @param property - The CSS property (bg, text, border, ring)
   * @param intention - The color intention
   * @param variant - The color variant
   * @returns Tailwind CSS class string
   */
  const getColorClass = (
    property: ColorProperty,
    intention: ColorIntention,
    variant: ColorVariant = "default"
  ): string => {
    // Handle semantic colors that map directly to CSS variables
    if (["background", "foreground", "muted"].includes(intention)) {
      return `${property}-${intention}`;
    }

    // Handle color scale intentions
    const colorKey = COLOR_INTENTIONS[intention]?.[variant];
    if (!colorKey) {
      console.warn(
        `Invalid color intention "${intention}" with variant "${variant}"`
      );
      return `${property}-foreground`;
    }

    // Convert color key to Tailwind class
    const className = colorKey.replace("-", "-");
    return `${property}-${className}`;
  };

  /**
   * Get multiple color classes for different properties
   * @param intention - The color intention
   * @param variant - The color variant
   * @returns Object with common color classes
   */
  const getColorClasses = (
    intention: ColorIntention,
    variant: ColorVariant = "default"
  ) => {
    return {
      bg: getColorClass("bg", intention, variant),
      text: getColorClass("text", intention, variant),
      border: getColorClass("border", intention, variant),
      ring: getColorClass("ring", intention, variant),
    };
  };

  /**
   * Get theme-aware gradient classes
   * @param type - The gradient type
   * @returns Gradient classes string
   */
  const getGradient = (
    type: "hero" | "primary" | "secondary" | "accent"
  ): string => {
    const gradients = {
      hero: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
      primary:
        "bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/50 dark:to-primary-800/50",
      secondary:
        "bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-800 dark:to-secondary-700",
      accent:
        "bg-gradient-to-br from-accent-50 to-accent-500/10 dark:from-accent-900/20 dark:to-accent-500/5",
    };

    return gradients[type] || gradients.hero;
  };

  /**
   * Check if current mode is dark
   */
  const isDark = context.resolvedMode === "dark";

  /**
   * Check if current mode is light
   */
  const isLight = context.resolvedMode === "light";

  /**
   * Check if system theme is being used
   */
  const isSystem = context.mode === "system";

  return {
    // Theme state
    theme: context.theme,
    mode: context.mode,
    resolvedMode: context.resolvedMode,
    systemMode: context.systemMode,

    // Theme controls
    setMode: context.setMode,
    toggleMode: context.toggleMode,

    // Utility functions
    getColorVar,
    getColorClass,
    getColorClasses,
    getGradient,

    // Convenience flags
    isDark,
    isLight,
    isSystem,
  };
}
