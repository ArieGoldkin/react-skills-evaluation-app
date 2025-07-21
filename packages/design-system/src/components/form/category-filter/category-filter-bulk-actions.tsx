import React from "react";
import { Button } from "../../ui/button";

export interface CategoryFilterBulkActionsProps {
  allSelected: boolean;
  someSelected: boolean;
  onSelectAll: () => void;
  onClearAll: () => void;
  disabled: boolean;
  loading: boolean;
  hasCategories: boolean;
}

export const CategoryFilterBulkActions: React.FC<
  CategoryFilterBulkActionsProps
> = ({
  allSelected,
  someSelected,
  onSelectAll,
  onClearAll,
  disabled,
  loading,
  hasCategories,
}) => {
  if (!hasCategories) return null;

  return (
    <div className="flex gap-2 mb-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onSelectAll}
        disabled={disabled || loading}
        className="text-xs h-7"
      >
        {allSelected ? "Deselect All" : "Select All"}
      </Button>
      {someSelected && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          disabled={disabled || loading}
          className="text-xs h-7"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};
