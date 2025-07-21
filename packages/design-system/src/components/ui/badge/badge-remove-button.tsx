import React from "react";
import { cn } from "../../../lib/cn";
import { X } from "lucide-react";
import { cva } from "class-variance-authority";

// Define badgeIconVariants here to avoid circular dependency
const badgeIconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "h-3 w-3",
      default: "h-3 w-3",
      lg: "h-4 w-4",
    },
    position: {
      left: "mr-1",
      right: "ml-1",
    },
  },
  defaultVariants: {
    size: "default",
    position: "left",
  },
});

export interface BadgeRemoveButtonProps {
  onRemove: () => void;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const BadgeRemoveButton: React.FC<BadgeRemoveButtonProps> = ({
  onRemove,
  size = "default",
  className,
}) => {
  const handleRemove = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onRemove();
    },
    [onRemove]
  );

  return (
    <button
      type="button"
      className={cn(
        "ml-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10",
        "focus:outline-none focus:ring-1 focus:ring-ring",
        badgeIconVariants({ size, position: "right" }),
        className
      )}
      onClick={handleRemove}
      aria-label="Remove badge"
    >
      <X className="h-2.5 w-2.5" />
    </button>
  );
};
