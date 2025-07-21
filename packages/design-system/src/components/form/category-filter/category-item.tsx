import React from "react";
import { cn } from "../../../lib/cn";
import { Badge } from "../../ui/badge";

export interface CategoryItemProps {
  category: {
    id: string;
    name: string;
    slug: string;
    color?: string;
    icon?: string;
    skillCount?: number;
  };
  isSelected: boolean;
  showCount?: boolean;
  showIcon?: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  isSelected,
  showCount,
  showIcon,
  onToggle,
  disabled,
}) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "flex items-center justify-between w-full p-2 rounded-md text-left transition-colors",
        "hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
        isSelected &&
          "bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        {showIcon && category.icon && (
          <span className="text-lg flex-shrink-0" aria-hidden="true">
            {category.icon}
          </span>
        )}
        <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
          {category.name}
        </span>
        {isSelected && (
          <svg
            className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-label="Selected"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      {showCount && typeof category.skillCount === "number" && (
        <Badge
          variant="secondary"
          className="text-xs ml-2 flex-shrink-0"
          style={{
            backgroundColor: category.color ? `${category.color}20` : undefined,
            color: category.color || undefined,
          }}
        >
          {category.skillCount}
        </Badge>
      )}
    </button>
  );
};
