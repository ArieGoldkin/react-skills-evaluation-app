/**
 * Theme constants and default configurations
 */

import type { Theme, ThemeConfig } from "../types/theme";

// Default theme configuration
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  defaultMode: "system",
  storageKey: "skills-eval-theme",
  enableSystemTheme: true,
  transitions: {
    duration: "200ms",
    easing: "ease-in-out",
  },
};

// CSS variable mappings to our semantic color system
export const CSS_VARIABLES = {
  // Primary colors
  "primary-50": "var(--primary-50)",
  "primary-100": "var(--primary-100)",
  "primary-200": "var(--primary-200)",
  "primary-300": "var(--primary-300)",
  "primary-400": "var(--primary-400)",
  "primary-500": "var(--primary-500)",
  "primary-600": "var(--primary-600)",
  "primary-700": "var(--primary-700)",
  "primary-800": "var(--primary-800)",
  "primary-900": "var(--primary-900)",
  "primary-950": "var(--primary-950)",

  // Secondary colors
  "secondary-50": "var(--secondary-50)",
  "secondary-100": "var(--secondary-100)",
  "secondary-200": "var(--secondary-200)",
  "secondary-300": "var(--secondary-300)",
  "secondary-400": "var(--secondary-400)",
  "secondary-500": "var(--secondary-500)",
  "secondary-600": "var(--secondary-600)",
  "secondary-700": "var(--secondary-700)",
  "secondary-800": "var(--secondary-800)",
  "secondary-900": "var(--secondary-900)",

  // Accent colors
  "accent-50": "var(--accent-50)",
  "accent-500": "var(--accent-500)",
  "accent-900": "var(--accent-900)",

  // Semantic colors
  background: "var(--background)",
  foreground: "var(--foreground)",
  card: "var(--card)",
  cardForeground: "var(--card-foreground)",
  popover: "var(--popover)",
  popoverForeground: "var(--popover-foreground)",
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",
  secondary: "var(--secondary)",
  secondaryForeground: "var(--secondary-foreground)",
  muted: "var(--muted)",
  mutedForeground: "var(--muted-foreground)",
  accent: "var(--accent)",
  accentForeground: "var(--accent-foreground)",
  destructive: "var(--destructive)",
  destructiveForeground: "var(--destructive-foreground)",
  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",
} as const;

// Light theme definition
export const LIGHT_THEME: Theme = {
  mode: "light",
  colors: {
    primary: {
      50: "hsl(204 100% 97%)",
      100: "hsl(204 94% 94%)",
      200: "hsl(201 94% 86%)",
      300: "hsl(199 95% 74%)",
      400: "hsl(198 93% 60%)",
      500: "hsl(199 89% 48%)",
      600: "hsl(200 98% 39%)",
      700: "hsl(201 96% 32%)",
      800: "hsl(201 90% 27%)",
      900: "hsl(202 80% 24%)",
      950: "hsl(202 76% 16%)",
    },
    secondary: {
      50: "hsl(210 40% 98%)",
      100: "hsl(210 40% 96%)",
      200: "hsl(214 32% 91%)",
      300: "hsl(213 27% 84%)",
      400: "hsl(215 20% 65%)",
      500: "hsl(215 16% 47%)",
      600: "hsl(215 19% 35%)",
      700: "hsl(215 25% 27%)",
      800: "hsl(217 33% 17%)",
      900: "hsl(222 47% 11%)",
    },
    accent: {
      50: "hsl(151 81% 96%)",
      500: "hsl(160 84% 39%)",
      900: "hsl(164 86% 16%)",
    },
    background: "hsl(210 40% 98%)",
    foreground: "hsl(222 47% 11%)",
    card: "hsl(210 40% 98%)",
    cardForeground: "hsl(222 47% 11%)",
    popover: "hsl(210 40% 98%)",
    popoverForeground: "hsl(222 47% 11%)",
    muted: "hsl(214 32% 91%)",
    mutedForeground: "hsl(215 19% 35%)",
    border: "hsl(213 27% 84%)",
    input: "hsl(213 27% 84%)",
    ring: "hsl(199 89% 48%)",
    destructive: "hsl(0 84% 60%)",
    destructiveForeground: "hsl(0 0% 100%)",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "Menlo", "Monaco", "monospace"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },
  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "1rem",
    full: "9999px",
  },
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
};

// Dark theme definition
export const DARK_THEME: Theme = {
  ...LIGHT_THEME,
  mode: "dark",
  colors: {
    ...LIGHT_THEME.colors,
    background: "hsl(222 47% 11%)",
    foreground: "hsl(210 40% 98%)",
    card: "hsl(217 33% 17%)",
    cardForeground: "hsl(210 40% 98%)",
    popover: "hsl(217 33% 17%)",
    popoverForeground: "hsl(210 40% 98%)",
    primary: {
      ...LIGHT_THEME.colors.primary,
      500: "hsl(198 93% 60%)", // Lighter for dark mode
    },
    muted: "hsl(215 25% 27%)",
    mutedForeground: "hsl(215 20% 65%)",
    border: "hsl(215 25% 27%)",
    input: "hsl(215 25% 27%)",
    ring: "hsl(199 95% 74%)",
    destructive: "hsl(0 63% 31%)",
    destructiveForeground: "hsl(210 40% 98%)",
  },
};

// Color intention mappings for semantic usage
export const COLOR_INTENTIONS = {
  primary: {
    default: "primary-600",
    emphasis: "primary-900",
    subtle: "primary-100",
    muted: "primary-50",
  },
  secondary: {
    default: "secondary-500",
    emphasis: "secondary-900",
    subtle: "secondary-100",
    muted: "secondary-50",
  },
  accent: {
    default: "accent-500",
    emphasis: "accent-900",
    subtle: "accent-50",
    muted: "accent-50",
  },
  destructive: {
    default: "destructive",
    emphasis: "destructive",
    subtle: "destructive",
    muted: "destructive",
  },
  muted: {
    default: "muted",
    emphasis: "muted",
    subtle: "muted",
    muted: "muted",
  },
  background: {
    default: "background",
    emphasis: "background",
    subtle: "background",
    muted: "background",
  },
  foreground: {
    default: "foreground",
    emphasis: "foreground",
    subtle: "foreground",
    muted: "foreground",
  },
} as const;

// Component size mappings
export const SIZE_MAPPINGS = {
  sm: {
    padding: "px-3 py-1.5",
    text: "text-sm",
    height: "h-8",
  },
  md: {
    padding: "px-4 py-2",
    text: "text-base",
    height: "h-10",
  },
  lg: {
    padding: "px-6 py-3",
    text: "text-lg",
    height: "h-12",
  },
} as const;

// Gradient definitions
export const GRADIENTS = {
  primary: "bg-gradient-to-br from-primary-50 to-primary-100",
  "primary-dark": "dark:from-secondary-900 dark:to-secondary-800",
  secondary: "bg-gradient-to-br from-secondary-50 to-secondary-100",
  "secondary-dark": "dark:from-secondary-800 dark:to-secondary-700",
  accent: "bg-gradient-to-br from-accent-50 to-accent-500/10",
  hero: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
} as const;
