"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { ThemeToggle } from "../../theme/theme-toggle";

export interface HeaderProps {
  logo?: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  showThemeToggle?: boolean;
  themeToggleProps?: {
    size?: "sm" | "md" | "lg";
    variant?: "button" | "switch";
    showLabel?: boolean;
  };
  className?: string;
  fixed?: boolean;
  transparent?: boolean;
}

/**
 * Reusable header component with slots for logo, navigation, actions, and theme toggle
 */
export function Header({
  logo,
  navigation,
  actions,
  showThemeToggle = true,
  themeToggleProps = {
    size: "md",
    variant: "button",
    showLabel: false,
  },
  className,
  fixed = false,
  transparent = false,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "w-full z-10",
        fixed && "fixed top-0 left-0 right-0",
        !transparent && "bg-background border-b border-border",
        transparent && "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          {logo && <div className="flex items-center">{logo}</div>}

          {/* Navigation Section */}
          {navigation && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigation}
            </nav>
          )}

          {/* Actions Section */}
          <div className="flex items-center space-x-4">
            {actions}
            {showThemeToggle && (
              <ThemeToggle
                size={themeToggleProps.size}
                variant={themeToggleProps.variant}
                showLabel={themeToggleProps.showLabel}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
