/**
 * Theme utility functions for the Skills Evaluation design system
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { 
  ColorIntention, 
  ColorProperty, 
  ColorVariant, 
  ComponentSize, 
  ComponentVariant 
} from '../types/theme';
import { COLOR_INTENTIONS, CSS_VARIABLES, SIZE_MAPPINGS } from '../constants/theme';

/**
 * Enhanced cn utility that merges classes and handles theme values
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get a CSS variable value for a color intention and variant
 */
export function getThemeColor(
  intention: ColorIntention,
  variant: ColorVariant = 'default'
): string {
  const colorKey = COLOR_INTENTIONS[intention]?.[variant];
  if (!colorKey) {
    console.warn(`Invalid color intention "${intention}" with variant "${variant}"`);
    return CSS_VARIABLES.foreground;
  }
  
  return CSS_VARIABLES[colorKey as keyof typeof CSS_VARIABLES] || CSS_VARIABLES.foreground;
}

/**
 * Get a Tailwind CSS class for a specific color property
 */
export function getThemeClass(
  property: ColorProperty,
  intention: ColorIntention,
  variant: ColorVariant = 'default'
): string {
  // Handle semantic colors that map directly to CSS variables
  if (['background', 'foreground', 'muted'].includes(intention)) {
    return `${property}-${intention}`;
  }

  // Handle color scale intentions
  const colorKey = COLOR_INTENTIONS[intention]?.[variant];
  if (!colorKey) {
    console.warn(`Invalid color intention "${intention}" with variant "${variant}"`);
    return `${property}-foreground`;
  }

  // Convert color key to Tailwind class
  const className = colorKey.replace('-', '-');
  return `${property}-${className}`;
}

/**
 * Get multiple color classes for different properties
 */
export function getThemeColorClasses(
  intention: ColorIntention,
  variant: ColorVariant = 'default'
) {
  return {
    bg: getThemeClass('bg', intention, variant),
    text: getThemeClass('text', intention, variant),
    border: getThemeClass('border', intention, variant),
    ring: getThemeClass('ring', intention, variant),
  };
}

/**
 * Create component variant classes based on theme system
 */
export function createComponentVariants(baseClasses: string = '') {
  return {
    variant: {
      default: cn(
        baseClasses,
        'bg-primary text-primary-foreground shadow hover:bg-primary/90'
      ),
      primary: cn(
        baseClasses,
        'bg-primary-900 text-white shadow hover:bg-primary-800'
      ),
      secondary: cn(
        baseClasses,
        'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80'
      ),
      outline: cn(
        baseClasses,
        'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'
      ),
      ghost: cn(
        baseClasses,
        'shadow-none hover:bg-accent hover:text-accent-foreground'
      ),
      destructive: cn(
        baseClasses,
        'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
      ),
    },
    size: {
      sm: cn(SIZE_MAPPINGS.sm.padding, SIZE_MAPPINGS.sm.text, SIZE_MAPPINGS.sm.height),
      md: cn(SIZE_MAPPINGS.md.padding, SIZE_MAPPINGS.md.text, SIZE_MAPPINGS.md.height),
      lg: cn(SIZE_MAPPINGS.lg.padding, SIZE_MAPPINGS.lg.text, SIZE_MAPPINGS.lg.height),
    },
  };
}

/**
 * Get size-specific classes
 */
export function getSizeClasses(size: ComponentSize) {
  return SIZE_MAPPINGS[size];
}

/**
 * Get variant-specific classes for buttons
 */
export function getButtonVariantClasses(variant: ComponentVariant): string {
  const variants = {
    default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    primary: 'bg-primary-900 text-white shadow hover:bg-primary-800',
    secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
    outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    ghost: 'shadow-none hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
  };

  return variants[variant] || variants.default;
}

/**
 * Get variant-specific classes for cards
 */
export function getCardVariantClasses(variant: ComponentVariant): string {
  const variants = {
    default: 'bg-card text-card-foreground',
    primary: 'bg-primary-50 dark:bg-primary-950/50 border-primary-200 dark:border-primary-800',
    secondary: 'bg-secondary-50 dark:bg-secondary-900/50 border-secondary-200 dark:border-secondary-700',
    outline: 'border-2 border-input',
    ghost: 'shadow-none border-none',
    destructive: 'bg-destructive/10 border-destructive/20 text-destructive-foreground',
  };

  return variants[variant] || variants.default;
}

/**
 * Create gradient classes
 */
export function getGradientClasses(type: 'hero' | 'primary' | 'secondary' | 'accent'): string {
  const gradients = {
    hero: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800',
    primary: 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/50 dark:to-primary-800/50',
    secondary: 'bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-800 dark:to-secondary-700',
    accent: 'bg-gradient-to-br from-accent-50 to-accent-500/10 dark:from-accent-900/20 dark:to-accent-500/5',
  };
  
  return gradients[type] || gradients.hero;
}

/**
 * Create focus ring classes
 */
export function getFocusClasses(variant: 'default' | 'primary' | 'destructive' = 'default'): string {
  const focusClasses = {
    default: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    primary: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    destructive: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2',
  };

  return focusClasses[variant];
}

/**
 * Create animation classes
 */
export function getAnimationClasses(type: 'fade' | 'slide' | 'scale' = 'fade'): string {
  const animations = {
    fade: 'transition-opacity duration-200 ease-in-out',
    slide: 'transition-transform duration-200 ease-in-out',
    scale: 'transition-transform duration-200 ease-in-out hover:scale-105',
  };

  return animations[type];
}

/**
 * Create spacing classes based on theme
 */
export function getSpacingClasses(spacing: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
  const spacingMap = {
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  return spacingMap[spacing];
}

/**
 * Create responsive text classes
 */
export function getResponsiveTextClasses(
  mobile: 'xs' | 'sm' | 'base' | 'lg' | 'xl',
  desktop?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
): string {
  const mobileClass = `text-${mobile}`;
  const desktopClass = desktop ? `md:text-${desktop}` : '';
  
  return cn(mobileClass, desktopClass);
}

/**
 * Utility to create theme-aware component classes
 */
export function createThemeComponent(
  baseClasses: string,
  options?: {
    variant?: ComponentVariant;
    size?: ComponentSize;
    intention?: ColorIntention;
    colorVariant?: ColorVariant;
  }
): string {
  const { variant = 'default', size = 'md', intention, colorVariant = 'default' } = options || {};

  let classes = baseClasses;

  // Add size classes
  classes = cn(classes, getSizeClasses(size).padding, getSizeClasses(size).text);

  // Add variant classes if no specific intention is provided
  if (!intention && variant !== 'default') {
    classes = cn(classes, getButtonVariantClasses(variant));
  }

  // Add color intention classes
  if (intention) {
    const colorClasses = getThemeColorClasses(intention, colorVariant);
    classes = cn(classes, colorClasses.bg, colorClasses.text);
  }

  return classes;
}