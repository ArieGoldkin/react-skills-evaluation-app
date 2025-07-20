import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      // Display and headings (without font-weight, handled by weight prop)
      display: "scroll-m-20 text-4xl tracking-tight lg:text-5xl",
      h1: "scroll-m-20 text-4xl tracking-tight",
      h2: "scroll-m-20 border-b pb-2 text-3xl tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl tracking-tight",
      h4: "scroll-m-20 text-xl tracking-tight",
      // Body text variants
      "body-lg": "text-lg leading-7",
      body: "leading-7",
      "body-sm": "text-sm leading-6",
      // Specialized text
      lead: "text-xl text-muted-foreground",
      large: "text-lg",
      caption: "text-sm text-muted-foreground",
      overline: "text-xs uppercase tracking-wide",
      muted: "text-sm text-muted-foreground",
    },
    color: {
      primary: "text-foreground",
      secondary: "text-muted-foreground",
      muted: "text-muted-foreground",
      error: "text-destructive",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      info: "text-blue-600 dark:text-blue-400",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "primary",
    align: "left",
    weight: "normal",
  },
  compoundVariants: [
    // Default font weights for heading variants
    {
      variant: ["display", "h1"],
      weight: "normal",
      class: "font-extrabold",
    },
    {
      variant: ["h2", "h3", "h4"],
      weight: "normal",
      class: "font-semibold",
    },
    {
      variant: "large",
      weight: "normal",
      class: "font-semibold",
    },
    {
      variant: "overline",
      weight: "normal",
      class: "font-medium",
    },
  ],
});

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";
  truncate?: boolean | number; // true for single line, number for multi-line
  children: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant,
      color,
      align,
      weight,
      as,
      truncate,
      children,
      ...props
    },
    ref
  ) => {
    // Determine default element based on variant
    const getDefaultElement = (
      variant: string | null | undefined
    ): React.ElementType => {
      switch (variant) {
        case "display":
        case "h1":
          return "h1";
        case "h2":
          return "h2";
        case "h3":
          return "h3";
        case "h4":
          return "h4";
        case "body-lg":
        case "body":
        case "body-sm":
        case "lead":
          return "p";
        case "large":
        case "caption":
        case "overline":
        case "muted":
          return "span";
        default:
          return "p";
      }
    };

    const Element = as || getDefaultElement(variant);

    // Handle truncation classes
    const getTruncationClasses = (truncate: boolean | number | undefined) => {
      if (truncate === true) {
        return "truncate";
      }
      if (typeof truncate === "number" && truncate > 1) {
        return `line-clamp-${truncate}`;
      }
      return "";
    };

    const truncationClasses = getTruncationClasses(truncate);

    return React.createElement(
      Element,
      {
        className: cn(
          typographyVariants({ variant, color, align, weight }),
          truncationClasses,
          className
        ),
        ref,
        ...props,
      },
      children
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
export type { TypographyProps };
