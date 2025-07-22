"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import * as React from "react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../navigation/dropdown-menu";

interface PaginationState {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
}

interface DataTablePaginationProps {
  pagination: PaginationState;
  onPaginationChange?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  pageSizeOptions?: number[];
  showPageNumbers?: boolean;
}

export function DataTablePagination({
  pagination,
  onPaginationChange,
  pageSizeOptions = [10, 20, 50, 100],
  showPageNumbers = true,
}: DataTablePaginationProps) {
  const { pageIndex, pageSize, pageCount, totalCount } = pagination;

  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalCount);

  const handlePageChange = (newPageIndex: number) => {
    if (onPaginationChange) {
      onPaginationChange({
        pageIndex: Math.max(0, Math.min(newPageIndex, pageCount - 1)),
        pageSize,
      });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (onPaginationChange) {
      onPaginationChange({
        pageIndex: 0, // Reset to first page when changing page size
        pageSize: newPageSize,
      });
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const pages: (number | "...")[] = [];

    if (pageCount <= maxVisiblePages) {
      // Show all pages
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page context, and last page
      pages.push(0);

      const start = Math.max(1, pageIndex - 1);
      const end = Math.min(pageCount - 2, pageIndex + 1);

      if (start > 1) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        if (i !== 0 && i !== pageCount - 1) {
          pages.push(i);
        }
      }

      if (end < pageCount - 2) {
        pages.push("...");
      }

      if (pageCount > 1) {
        pages.push(pageCount - 1);
      }
    }

    return pages;
  };

  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;

  return (
    <div className="flex items-center justify-between px-2">
      {/* Items info */}
      <div className="flex-1 text-sm text-muted-foreground">
        {totalCount > 0 ? (
          <>
            Showing {startItem.toLocaleString()} to {endItem.toLocaleString()}{" "}
            of {totalCount.toLocaleString()} entries
          </>
        ) : (
          "No entries to show"
        )}
      </div>

      {/* Page size selector */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-[70px]"
                disabled={!onPaginationChange}
              >
                {pageSize}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {pageSizeOptions.map(size => (
                <DropdownMenuItem
                  key={size}
                  onClick={() => handlePageSizeChange(size)}
                  className={size === pageSize ? "font-medium" : ""}
                >
                  {size}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Page navigation */}
        <div className="flex items-center space-x-2">
          {/* Page info */}
          <div className="text-sm font-medium">
            Page {pageIndex + 1} of {Math.max(1, pageCount)}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(0)}
              disabled={!canPreviousPage || !onPaginationChange}
              aria-label="Go to first page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={!canPreviousPage || !onPaginationChange}
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page numbers */}
            {showPageNumbers && (
              <div className="flex items-center space-x-1">
                {getPageNumbers().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === "..." ? (
                      <span className="px-2 py-1 text-sm text-muted-foreground">
                        ...
                      </span>
                    ) : (
                      <Button
                        variant={page === pageIndex ? "default" : "outline"}
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(page as number)}
                        disabled={!onPaginationChange}
                      >
                        {(page as number) + 1}
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={!canNextPage || !onPaginationChange}
              aria-label="Go to next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(pageCount - 1)}
              disabled={!canNextPage || !onPaginationChange}
              aria-label="Go to last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
