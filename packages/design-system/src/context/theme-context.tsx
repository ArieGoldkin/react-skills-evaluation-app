"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  DARK_THEME,
  DEFAULT_THEME_CONFIG,
  LIGHT_THEME,
} from "../constants/theme";
import type { ThemeContextValue, ThemeMode } from "../types/theme";

// Define MediaQueryListEvent type for browser compatibility
interface MediaQueryListEvent {
  matches: boolean;
}

// Create the theme context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Custom hook to use theme context
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  storageKey?: string;
  enableSystemTheme?: boolean;
}

export function ThemeProvider({
  children,
  defaultMode = DEFAULT_THEME_CONFIG.defaultMode,
  storageKey = DEFAULT_THEME_CONFIG.storageKey,
  enableSystemTheme = DEFAULT_THEME_CONFIG.enableSystemTheme,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [systemMode, setSystemMode] = useState<"light" | "dark">("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Get stored theme preference
    const stored = localStorage.getItem(storageKey) as ThemeMode | null;

    // Get system preference
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setSystemMode(systemPreference);

    // Set initial mode
    if (stored && ["light", "dark", "system"].includes(stored)) {
      setModeState(stored);
    } else if (enableSystemTheme) {
      setModeState("system");
    }
  }, [storageKey, enableSystemTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === "undefined" || !enableSystemTheme) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemMode(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [enableSystemTheme]);

  // Apply theme to document
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    const resolvedMode = mode === "system" ? systemMode : mode;

    root.classList.remove("light", "dark");
    root.classList.add(resolvedMode);

    // Set theme-color meta tag for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      const bgColor =
        resolvedMode === "dark"
          ? DARK_THEME.colors.background
          : LIGHT_THEME.colors.background;
      themeColorMeta.setAttribute("content", bgColor);
    }
  }, [mode, systemMode]);

  const setMode = (newMode: ThemeMode) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newMode);
    }
    setModeState(newMode);
  };

  const toggleMode = () => {
    const resolvedMode = mode === "system" ? systemMode : mode;
    const newMode = resolvedMode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  // Get resolved mode (actual light/dark, not system)
  const resolvedMode = mode === "system" ? systemMode : mode;

  // Get current theme object
  const theme = resolvedMode === "dark" ? DARK_THEME : LIGHT_THEME;

  const value: ThemeContextValue = {
    theme,
    mode,
    setMode,
    toggleMode,
    resolvedMode,
    systemMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
