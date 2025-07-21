import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../../lib/cn";
import { CategoryFilterHeader } from "./category-filter-header";
import { CategoryFilterSearch } from "./category-filter-search";
import { CategoryFilterBulkActions } from "./category-filter-bulk-actions";
import { CategoryFilterList } from "./category-filter-list";
import { CategoryFilterFooter } from "./category-filter-footer";
import { useCategoryFilter } from "./use-category-filter";

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
  const {
    searchTerm,
    setSearchTerm,
    filteredCategories,
    allSelected,
    someSelected,
    handleSelectAll,
    handleClearAll,
    handleCategoryToggle,
    handleSearchClear,
  } = useCategoryFilter({
    categories,
    selectedCategories,
    onSelectionChange,
    disabled,
  });

  return (
    <div
      className={cn(categoryFilterVariants({ variant, size }), className)}
      {...props}
    >
      <div className="mb-4">
        <CategoryFilterHeader
          selectedCount={selectedCategories.length}
          showCount={someSelected}
        />

        {showSearch && (
          <CategoryFilterSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder={searchPlaceholder}
            disabled={disabled}
            loading={loading}
          />
        )}

        {showBulkActions && (
          <CategoryFilterBulkActions
            allSelected={allSelected}
            someSelected={someSelected}
            onSelectAll={handleSelectAll}
            onClearAll={handleClearAll}
            disabled={disabled}
            loading={loading}
            hasCategories={filteredCategories.length > 0}
          />
        )}
      </div>

      <CategoryFilterList
        categories={filteredCategories}
        selectedCategories={selectedCategories}
        showCounts={showCounts}
        showIcons={showIcons}
        onCategoryToggle={handleCategoryToggle}
        disabled={disabled}
        loading={loading}
        maxHeight={maxHeight}
        emptyMessage={emptyMessage}
        searchTerm={searchTerm}
        onSearchClear={handleSearchClear}
      />

      <CategoryFilterFooter
        selectedCount={selectedCategories.length}
        totalCount={categories.length}
        filteredCount={filteredCategories.length}
        searchTerm={searchTerm}
        showSummary={filteredCategories.length > 0 && someSelected}
      />
    </div>
  );
};

export default CategoryFilter;
