"use client";

import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

const avatarImageVariants = cva("aspect-square h-full w-full object-cover", {
  variants: {
    shape: {
      circle: "rounded-full",
      square: "rounded-md",
    },
  },
  defaultVariants: {
    shape: "circle",
  },
});

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center bg-muted font-medium text-muted-foreground",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

const avatarStatusVariants = cva(
  "absolute border-2 border-background rounded-full",
  {
    variants: {
      size: {
        xs: "h-2 w-2 -bottom-0 -right-0",
        sm: "h-2.5 w-2.5 -bottom-0 -right-0",
        md: "h-3 w-3 -bottom-0 -right-0",
        lg: "h-3.5 w-3.5 -bottom-1 -right-1",
        xl: "h-4 w-4 -bottom-1 -right-1",
        "2xl": "h-5 w-5 -bottom-1 -right-1",
      },
      status: {
        online: "bg-green-500",
        offline: "bg-gray-400",
        busy: "bg-red-500",
        away: "bg-yellow-500",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  status?: "online" | "offline" | "busy" | "away";
}

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarImageVariants> {}

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarFallbackVariants> {
  name?: string;
}

export interface AvatarStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarStatusVariants> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, shape, status, children, ...props }, ref) => {
    // Clone children and pass size and shape props
    const enhancedChildren = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          size: (child.props as { size?: string }).size || size,
          shape: (child.props as { shape?: string }).shape || shape,
        } as Record<string, unknown>);
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape, className }))}
        {...props}
      >
        {enhancedChildren}
        {status && (
          <AvatarStatus
            size={size}
            status={status}
            className="absolute"
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, shape, alt, ...props }, ref) => (
    <img
      ref={ref}
      className={cn(avatarImageVariants({ shape, className }))}
      alt={alt || "Avatar"}
      {...props}
    />
  )
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, size, shape, name, children, ...props }, ref) => {
    // Generate initials from name prop
    const getInitials = (name: string) => {
      const words = name.trim().split(/\s+/);
      if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
      }
      return (
        words[0].charAt(0) + words[words.length - 1].charAt(0)
      ).toUpperCase();
    };

    const displayText = children || (name ? getInitials(name) : "");

    return (
      <div
        ref={ref}
        className={cn(avatarFallbackVariants({ size, shape, className }))}
        role="img"
        aria-label={name ? `${name}'s avatar` : "User avatar"}
        {...props}
      >
        {displayText}
      </div>
    );
  }
);
AvatarFallback.displayName = "AvatarFallback";

const AvatarStatus = React.forwardRef<HTMLDivElement, AvatarStatusProps>(
  ({ className, size, status, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(avatarStatusVariants({ size, status, className }))}
      {...props}
    />
  )
);
AvatarStatus.displayName = "AvatarStatus";

export { Avatar, AvatarFallback, AvatarImage, AvatarStatus, avatarVariants };
