import React from "react";
import { Button } from "../../ui/button";
import { CategoryItem } from "./category-item";

export interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
  icon?: string;
  skillCount?: number;
}

export interface CategoryFilterListProps {
  categories: Category[];
  selectedCategories: string[];
  showCounts: boolean;
  showIcons: boolean;
  onCategoryToggle: (categoryId: string) => void;
  disabled: boolean;
  loading: boolean;
  maxHeight: number;
  emptyMessage: string;
  searchTerm: string;
  onSearchClear: () => void;
}

export const CategoryFilterList: React.FC<CategoryFilterListProps> = ({
  categories,
  selectedCategories,
  showCounts,
  showIcons,
  onCategoryToggle,
  disabled,
  loading,
  maxHeight,
  emptyMessage,
  searchTerm,
  onSearchClear,
}) => {
  if (loading) {
    return (
      <div
        className="space-y-1 overflow-y-auto"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Loading categories...
          </span>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div
        className="space-y-1 overflow-y-auto"
        style={{ maxHeight: `${maxHeight}px` }}
      >
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
              onClick={onSearchClear}
              className="mt-2 text-xs"
            >
              Clear search
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="space-y-1 overflow-y-auto"
      style={{ maxHeight: `${maxHeight}px` }}
    >
      {categories.map(category => (
        <CategoryItem
          key={category.id}
          category={category}
          isSelected={selectedCategories.includes(category.id)}
          showCount={showCounts}
          showIcon={showIcons}
          onToggle={() => onCategoryToggle(category.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
