import React from "react";

export interface CategoryFilterFooterProps {
  selectedCount: number;
  totalCount: number;
  filteredCount: number;
  searchTerm: string;
  showSummary: boolean;
}

export const CategoryFilterFooter: React.FC<CategoryFilterFooterProps> = ({
  selectedCount,
  totalCount,
  filteredCount,
  searchTerm,
  showSummary,
}) => {
  if (!showSummary || selectedCount === 0) return null;

  return (
    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {selectedCount} of {totalCount} categories selected
        {searchTerm &&
          filteredCount !== totalCount &&
          ` (${filteredCount} shown)`}
      </p>
    </div>
  );
};
