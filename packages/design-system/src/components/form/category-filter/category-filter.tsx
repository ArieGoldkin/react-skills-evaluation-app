import React, { useState, useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const categoryFilterVariants = cva(
  "rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-800",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        compact: "border-gray-200 shadow-sm",
        outline: "border-2 border-dashed border-gray-300 dark:border-gray-700",
      },
      size: {
        sm: "p-3",
        md: "p-4", 
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface CategoryFilterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof categoryFilterVariants> {
  /** Available categories to filter by */
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    color?: string;
    icon?: string;
    skillCount?: number;
  }>;
  /** Currently selected category IDs */
  selectedCategories: string[];
  /** Called when category selection changes */
  onSelectionChange: (selectedIds: string[]) => void;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Show search input */
  showSearch?: boolean;
  /** Show skill counts */
  showCounts?: boolean;
  /** Show select all/clear all buttons */
  showBulkActions?: boolean;
  /** Show category icons */
  showIcons?: boolean;
  /** Maximum height before scrolling */
  maxHeight?: number;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

const CategoryItem: React.FC<{
  category: CategoryFilterProps["categories"][0];
  isSelected: boolean;
  showCount?: boolean;
  showIcon?: boolean;
  onToggle: () => void;
  disabled?: boolean;
}> = ({ category, isSelected, showCount, showIcon, onToggle, disabled }) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "flex items-center justify-between w-full p-2 rounded-md text-left transition-colors",
        "hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
        isSelected && "bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800",
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

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onSelectionChange,
  variant,
  size,
  searchPlaceholder = "Search categories...",
  showSearch = true,
  showCounts = true,
  showBulkActions = true,
  showIcons = true,
  maxHeight = 300,
  emptyMessage = "No categories found",
  loading = false,
  disabled = false,
  className,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    
    const search = searchTerm.toLowerCase();
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search) ||
      category.slug.toLowerCase().includes(search)
    );
  }, [categories, searchTerm]);

  const allSelected = filteredCategories.length > 0 && 
    filteredCategories.every((cat) => selectedCategories.includes(cat.id));
  
  const someSelected = selectedCategories.length > 0;

  const handleSelectAll = () => {
    const allIds = filteredCategories.map((cat) => cat.id);
    const newSelection = allSelected 
      ? selectedCategories.filter((id) => !allIds.includes(id))
      : [...new Set([...selectedCategories, ...allIds])];
    
    onSelectionChange(newSelection);
  };

  const handleClearAll = () => {
    onSelectionChange([]);
  };

  const handleCategoryToggle = (categoryId: string) => {
    if (disabled) return;
    
    const newSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    onSelectionChange(newSelection);
  };

  return (
    <div className={cn(categoryFilterVariants({ variant, size }), className)} {...props}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Filter by Category
          </h3>
          {someSelected && (
            <Badge variant="outline" className="text-xs">
              {selectedCategories.length} selected
            </Badge>
          )}
        </div>

        {/* Search Input */}
        {showSearch && (
          <div className="relative mb-3">
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={disabled || loading}
              className="pl-8"
            />
            <svg
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        )}

        {/* Bulk Actions */}
        {showBulkActions && filteredCategories.length > 0 && (
          <div className="flex gap-2 mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              disabled={disabled || loading}
              className="text-xs h-7"
            >
              {allSelected ? "Deselect All" : "Select All"}
            </Button>
            {someSelected && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                disabled={disabled || loading}
                className="text-xs h-7"
              >
                Clear All
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Categories List */}
      <div
        className="space-y-1 overflow-y-auto"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              Loading categories...
            </span>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {emptyMessage}
            </p>
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
                className="mt-2 text-xs"
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          filteredCategories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              isSelected={selectedCategories.includes(category.id)}
              showCount={showCounts}
              showIcon={showIcons}
              onToggle={() => handleCategoryToggle(category.id)}
              disabled={disabled}
            />
          ))
        )}
      </div>

      {/* Footer Summary */}
      {filteredCategories.length > 0 && someSelected && (
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {selectedCategories.length} of {categories.length} categories selected
            {searchTerm && filteredCategories.length !== categories.length && 
              ` (${filteredCategories.length} shown)`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;