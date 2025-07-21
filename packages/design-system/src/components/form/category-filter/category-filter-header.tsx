import React from "react";
import { Badge } from "../../ui/badge";

export interface CategoryFilterHeaderProps {
  selectedCount: number;
  showCount: boolean;
}

export const CategoryFilterHeader: React.FC<CategoryFilterHeaderProps> = ({
  selectedCount,
  showCount,
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        Filter by Category
      </h3>
      {showCount && selectedCount > 0 && (
        <Badge variant="outline" className="text-xs">
          {selectedCount} selected
        </Badge>
      )}
    </div>
  );
};
