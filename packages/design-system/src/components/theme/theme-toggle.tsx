"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/use-theme";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "button" | "switch";
  showLabel?: boolean;
}

/**
 * Theme toggle component with enhanced styling and smooth transitions
 */
export function ThemeToggle({
  className,
  size = "md",
  variant = "icon",
  showLabel = false,
}: ThemeToggleProps) {
  const { isDark, setMode } = useTheme();

  const handleToggle = () => {
    if (isDark) {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  if (variant === "switch") {
    return (
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          isDark ? "bg-primary" : "bg-input"
        } ${className}`}
        aria-label="Toggle theme"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
            isDark ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={handleToggle}
        className={`inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none ${className}`}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <>
            <Sun className="mr-2 h-4 w-4" />
            {showLabel && "Light"}
          </>
        ) : (
          <>
            <Moon className="mr-2 h-4 w-4" />
            {showLabel && "Dark"}
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center justify-center rounded-md border border-input bg-background p-2 ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none ${sizeClasses[size]} ${className}`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={iconSize[size]} /> : <Moon size={iconSize[size]} />}
    </button>
  );
}
