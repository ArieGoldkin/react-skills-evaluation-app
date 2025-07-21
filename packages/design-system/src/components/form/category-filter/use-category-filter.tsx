import { useMemo, useState, useCallback } from "react";

export interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
  icon?: string;
  skillCount?: number;
}

export interface UseCategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  disabled?: boolean;
}

export const useCategoryFilter = ({
  categories,
  selectedCategories,
  onSelectionChange,
  disabled = false,
}: UseCategoryFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;

    const search = searchTerm.toLowerCase();
    return categories.filter(
      category =>
        category.name.toLowerCase().includes(search) ||
        category.slug.toLowerCase().includes(search)
    );
  }, [categories, searchTerm]);

  const allSelected =
    filteredCategories.length > 0 &&
    filteredCategories.every(cat => selectedCategories.includes(cat.id));

  const someSelected = selectedCategories.length > 0;

  const handleSelectAll = useCallback(() => {
    const allIds = filteredCategories.map(cat => cat.id);
    const newSelection = allSelected
      ? selectedCategories.filter(id => !allIds.includes(id))
      : [...new Set([...selectedCategories, ...allIds])];

    onSelectionChange(newSelection);
  }, [allSelected, filteredCategories, selectedCategories, onSelectionChange]);

  const handleClearAll = useCallback(() => {
    onSelectionChange([]);
  }, [onSelectionChange]);

  const handleCategoryToggle = useCallback(
    (categoryId: string) => {
      if (disabled) return;

      const newSelection = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories, categoryId];

      onSelectionChange(newSelection);
    },
    [disabled, selectedCategories, onSelectionChange]
  );

  const handleSearchClear = useCallback(() => {
    setSearchTerm("");
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filteredCategories,
    allSelected,
    someSelected,
    handleSelectAll,
    handleClearAll,
    handleCategoryToggle,
    handleSearchClear,
  };
};
