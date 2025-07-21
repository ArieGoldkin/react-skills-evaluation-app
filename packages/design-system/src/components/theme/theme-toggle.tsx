"use client";

import { useTheme } from "../../hooks/use-theme";
import { cn } from "../../lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "button" | "switch";
  showLabel?: boolean;
}

/**
 * Theme toggle component for switching between light and dark modes
 */
export function ThemeToggle({
  className,
  size = "md",
  variant = "button",
  showLabel = false,
}: ThemeToggleProps) {
  const { mode, setMode, isDark, isLight, isSystem } = useTheme();

  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
  };

  const handleToggle = () => {
    if (isLight || isSystem) {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const handleCycle = () => {
    if (mode === "light") {
      setMode("dark");
    } else if (mode === "dark") {
      setMode("system");
    } else {
      setMode("light");
    }
  };

  if (variant === "switch") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        {showLabel && (
          <span className="text-sm font-medium">
            {isDark ? "Dark" : "Light"} Mode
          </span>
        )}
        <button
          onClick={handleToggle}
          className={cn(
            "relative inline-flex items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            isDark ? "bg-primary" : "bg-secondary-200",
            size === "sm" ? "h-5 w-9" : size === "lg" ? "h-7 w-12" : "h-6 w-11"
          )}
          role="switch"
          aria-checked={isDark}
          aria-label="Toggle theme"
        >
          <span
            className={cn(
              "pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              isDark ? "translate-x-5" : "translate-x-0",
              size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
            )}
          />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleCycle}
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        sizeClasses[size],
        className
      )}
      title={`Current: ${mode}. Click to cycle through light/dark/system`}
      aria-label={`Switch theme. Current: ${mode}`}
    >
      {/* Sun icon for light mode */}
      {isLight && (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}

      {/* Moon icon for dark mode */}
      {isDark && (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}

      {/* Monitor icon for system mode */}
      {isSystem && (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )}

      {showLabel && (
        <span className="ml-2 text-sm font-medium capitalize">{mode}</span>
      )}
    </button>
  );
}
