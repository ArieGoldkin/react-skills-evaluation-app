"use client";

import React from "react";
import { ThemeProvider as BaseThemeProvider } from "../../context/theme-context";
import type { ThemeMode } from "../../types/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  storageKey?: string;
  enableSystemTheme?: boolean;
}

/**
 * Theme provider component that wraps the application with theme context
 * This is the main component to use in your app layout
 */
export function ThemeProvider({
  children,
  defaultMode = "system",
  storageKey = "skills-eval-theme",
  enableSystemTheme = true,
}: ThemeProviderProps) {
  return (
    <BaseThemeProvider
      defaultMode={defaultMode}
      storageKey={storageKey}
      enableSystemTheme={enableSystemTheme}
    >
      {children}
    </BaseThemeProvider>
  );
}
