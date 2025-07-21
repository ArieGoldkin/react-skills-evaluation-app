/**
 * Theme system types for the Skills Evaluation design system
 */

export type ThemeMode = "light" | "dark" | "system";

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
};

export type SemanticColors = {
  primary: ColorScale;
  secondary: ColorScale;
  accent: {
    50: string;
    500: string;
    900: string;
  };
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  destructive: string;
  destructiveForeground: string;
};

export type ThemeSpacing = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
};

export type ThemeTypography = {
  fontFamily: {
    sans: string[];
    mono: string[];
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
    "6xl": string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
};

export type ThemeRadius = {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
};

export type ThemeShadow = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
};

export interface Theme {
  mode: ThemeMode;
  colors: SemanticColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  radius: ThemeRadius;
  shadow: ThemeShadow;
}

export interface ThemeConfig {
  defaultMode: ThemeMode;
  storageKey: string;
  enableSystemTheme: boolean;
  transitions: {
    duration: string;
    easing: string;
  };
}

// Semantic color intentions for better developer experience
export type ColorIntention =
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "destructive"
  | "background"
  | "foreground";

export type ColorVariant = "default" | "emphasis" | "subtle" | "muted";

export type ColorProperty = "bg" | "text" | "border" | "ring";

// Theme context types
export interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  resolvedMode: "light" | "dark";
  systemMode: "light" | "dark";
}

// Component variant types
export type ComponentSize = "sm" | "md" | "lg";
export type ComponentVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

export interface ComponentThemeProps {
  size?: ComponentSize;
  variant?: ComponentVariant;
  className?: string;
}
