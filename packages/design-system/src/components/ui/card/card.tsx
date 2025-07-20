import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        outlined: "border-2 border-border",
        elevated: "border-none shadow-lg",
        ghost: "border-none shadow-none bg-transparent",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
      clickable: {
        true: "cursor-pointer transition-colors hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      clickable: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      clickable,
      asChild = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "div" : "div"; // Could be extended for other elements

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        clickable &&
        onClick &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        onClick(event as any);
      }
    };

    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, padding, clickable, className }))}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={clickable ? onClick : undefined}
        onKeyDown={clickable ? handleKeyDown : undefined}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-4 pb-2",
      default: "p-6 pb-2",
      lg: "p-8 pb-4",
    },
  },
  defaultVariants: {
    padding: "default",
  },
});

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ padding, className }))}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const cardTitleVariants = cva(
  "text-2xl font-semibold leading-none tracking-tight",
  {
    variants: {
      size: {
        sm: "text-lg",
        default: "text-2xl",
        lg: "text-3xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cardTitleVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, as: Comp = "h3", ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(cardTitleVariants({ size, className }))}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const cardDescriptionVariants = cva("text-sm text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof cardDescriptionVariants> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, size, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(cardDescriptionVariants({ size, className }))}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const cardContentVariants = cva("", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-4 pt-0",
      default: "p-6 pt-0",
      lg: "p-8 pt-0",
    },
  },
  defaultVariants: {
    padding: "default",
  },
});

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ padding, className }))}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const cardFooterVariants = cva("flex items-center", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-4 pt-0",
      default: "p-6 pt-0",
      lg: "p-8 pt-0",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
  },
  defaultVariants: {
    padding: "default",
    justify: "start",
  },
});

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding, justify, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ padding, justify, className }))}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  cardContentVariants,
  CardDescription,
  cardDescriptionVariants,
  CardFooter,
  cardFooterVariants,
  CardHeader,
  cardHeaderVariants,
  CardTitle,
  cardTitleVariants,
  cardVariants,
};
