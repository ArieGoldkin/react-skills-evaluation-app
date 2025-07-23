"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronDown, Search, X } from "lucide-react";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../navigation/dropdown-menu";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  maxSelectedDisplay?: number;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  emptyMessage?: string;
  searchable?: boolean;
  clearable?: boolean;
  closeOnSelect?: boolean;
}

export function MultiSelect({
  options = [],
  value,
  defaultValue = [],
  onChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search items...",
  maxSelectedDisplay = 3,
  disabled = false,
  className,
  triggerClassName,
  emptyMessage = "No items found",
  searchable = true,
  clearable = true,
  closeOnSelect = false,
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(
    value || defaultValue
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Use controlled or uncontrolled value
  const selectedValues = value !== undefined ? value : internalValue;
  const setSelectedValues = React.useCallback(
    (newValues: string[]) => {
      if (value === undefined) {
        setInternalValue(newValues);
      }
      onChange?.(newValues);
    },
    [value, onChange]
  );

  // Filter options based on search term
  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchTerm.trim()) return options;
    return options.filter(
      option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, searchable]);

  // Get selected option labels
  const selectedOptions = React.useMemo(() => {
    return options.filter(option => selectedValues.includes(option.value));
  }, [options, selectedValues]);

  // Handle option selection
  const handleSelect = React.useCallback(
    (optionValue: string) => {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];

      setSelectedValues(newValues);

      if (closeOnSelect && !selectedValues.includes(optionValue)) {
        setIsOpen(false);
      }
    },
    [selectedValues, setSelectedValues, closeOnSelect]
  );

  // Handle removing selected item
  const handleRemove = React.useCallback(
    (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const newValues = selectedValues.filter(v => v !== optionValue);
      setSelectedValues(newValues);
    },
    [selectedValues, setSelectedValues]
  );

  // Clear all selections
  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedValues([]);
    },
    [setSelectedValues]
  );

  // Handle search input
  const handleSearch = React.useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Reset search when dropdown closes
  React.useEffect(() => {
    if (!isOpen && searchTerm) {
      setSearchTerm("");
    }
  }, [isOpen, searchTerm]);

  // Render trigger content
  const renderTriggerContent = () => {
    if (selectedOptions.length === 0) {
      return <span className="text-muted-foreground">{placeholder}</span>;
    }

    if (selectedOptions.length <= maxSelectedDisplay) {
      return (
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map(option => (
            <Badge
              key={option.value}
              variant="secondary"
              className="text-xs hover:bg-secondary"
            >
              {option.label}
              {!disabled && (
                <X
                  className="ml-1 h-3 w-3 hover:text-destructive cursor-pointer"
                  onClick={e => handleRemove(option.value, e)}
                />
              )}
            </Badge>
          ))}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          {selectedOptions
            .slice(0, maxSelectedDisplay - 1)
            .map(option => option.label)
            .join(", ")}
        </Badge>
        <Badge variant="outline" className="text-xs">
          +{selectedOptions.length - maxSelectedDisplay + 1} more
        </Badge>
      </div>
    );
  };

  return (
    <div className={cn("relative", className)}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={cn(
              "justify-between min-h-10 h-auto w-full",
              triggerClassName
            )}
            disabled={disabled}
          >
            <div className="flex-1 text-left overflow-hidden">
              {renderTriggerContent()}
            </div>
            <div className="flex items-center gap-2 ml-2">
              {clearable && selectedValues.length > 0 && !disabled && (
                <X
                  className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
                  onClick={handleClear}
                />
              )}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-full p-0"
          style={{ minWidth: "var(--radix-dropdown-menu-trigger-width)" }}
        >
          {searchable && (
            <>
              <div className="flex items-center px-3 py-2 border-b">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={e => handleSearch(e.target.value)}
                  className="border-0 focus-visible:ring-0 h-8 p-0"
                />
              </div>
            </>
          )}

          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground text-center">
              {emptyMessage}
            </div>
          ) : (
            <div className="max-h-60 overflow-auto">
              {filteredOptions.map(option => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    onSelect={e => {
                      if (!closeOnSelect) {
                        e.preventDefault();
                      }
                    }}
                    disabled={option.disabled}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div
                      className={cn(
                        "h-4 w-4 border rounded-sm flex items-center justify-center",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-muted-foreground"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      {option.description && (
                        <div className="text-sm text-muted-foreground">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </div>
          )}

          {selectedValues.length > 0 && clearable && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={e => handleClear(e)}
                onSelect={e => {
                  if (!closeOnSelect) {
                    e.preventDefault();
                  }
                }}
                className="text-destructive focus:text-destructive cursor-pointer justify-center"
              >
                Clear all ({selectedValues.length})
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
