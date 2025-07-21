import React from "react";
import { Input } from "../../ui/input";

export interface CategoryFilterSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
  loading: boolean;
}

export const CategoryFilterSearch: React.FC<CategoryFilterSearchProps> = ({
  searchTerm,
  onSearchChange,
  placeholder,
  disabled,
  loading,
}) => {
  return (
    <div className="relative mb-3">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
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
  );
};
