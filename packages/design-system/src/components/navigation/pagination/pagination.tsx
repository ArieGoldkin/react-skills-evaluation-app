"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  siblingCount?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  showPageInfo?: boolean;
  className?: string;
  buttonClassName?: string;
  activeClassName?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

function usePagination({
  currentPage,
  totalPages,
  siblingCount = 1,
}: Pick<PaginationProps, "currentPage" | "totalPages" | "siblingCount">) {
  return React.useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 2 + siblingCount * 2;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "dots", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 2 + siblingCount * 2;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, "dots", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, "dots", ...middleRange, "dots", totalPages];
    }

    return [];
  }, [currentPage, totalPages, siblingCount]);
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  showPageInfo = false,
  className,
  buttonClassName,
  activeClassName,
  disabled = false,
  ariaLabel = "Pagination Navigation",
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  if (totalPages <= 0) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const baseButtonClass = cn(
    "min-w-[40px] h-10 px-4 py-2 text-sm font-medium transition-colors",
    "hover:bg-accent hover:text-accent-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    buttonClassName
  );

  const activeButtonClass = cn(
    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
    activeClassName
  );

  return (
    <nav
      role="navigation"
      aria-label={ariaLabel}
      className={cn("flex items-center justify-center", className)}
    >
      <div className="flex items-center gap-1">
        {showFirstLast && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(1)}
            disabled={disabled || isFirstPage}
            aria-label="Go to first page"
            className={baseButtonClass}
          >
            <ChevronLeft className="h-4 w-4" />
            <ChevronLeft className="h-4 w-4 -ml-3" />
          </Button>
        )}

        {showPrevNext && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={disabled || isFirstPage}
            aria-label="Go to previous page"
            className={baseButtonClass}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "dots") {
            return (
              <span
                key={`dots-${index}`}
                className="flex h-10 w-10 items-center justify-center"
                aria-hidden
              >
                <MoreHorizontal className="h-4 w-4" />
              </span>
            );
          }

          const page = pageNumber as number;
          const isActive = page === currentPage;

          return (
            <Button
              key={page}
              variant={isActive ? "default" : "ghost"}
              onClick={() => handlePageChange(page)}
              disabled={disabled}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(baseButtonClass, isActive && activeButtonClass)}
            >
              {page}
            </Button>
          );
        })}

        {showPrevNext && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={disabled || isLastPage}
            aria-label="Go to next page"
            className={baseButtonClass}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        {showFirstLast && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(totalPages)}
            disabled={disabled || isLastPage}
            aria-label="Go to last page"
            className={baseButtonClass}
          >
            <ChevronRight className="h-4 w-4" />
            <ChevronRight className="h-4 w-4 -ml-3" />
          </Button>
        )}
      </div>

      {showPageInfo && pageSize && totalItems && (
        <div className="ml-4 text-sm text-muted-foreground">
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
        </div>
      )}
    </nav>
  );
}

export interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  disabled?: boolean;
}

export function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  disabled = false,
}: SimplePaginationProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
      >
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
