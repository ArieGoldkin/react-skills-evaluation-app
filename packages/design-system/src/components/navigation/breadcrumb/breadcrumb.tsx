"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  homeLabel?: string;
  homeHref?: string;
  showHome?: boolean;
  maxItems?: number;
  itemClassName?: string;
  separatorClassName?: string;
  activeClassName?: string;
}

export function Breadcrumb({
  items,
  separator = <ChevronRight className="h-4 w-4" />,
  className,
  homeLabel = "Home",
  homeHref = "/",
  showHome = true,
  maxItems,
  itemClassName,
  separatorClassName,
  activeClassName,
}: BreadcrumbProps) {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if not provided
  const breadcrumbItems = React.useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }

    // Auto-generate from pathname
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const label = path
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return {
        label,
        href: index < paths.length - 1 ? href : undefined, // Last item is not a link
      };
    });
  }, [items, pathname]);

  // Handle max items with ellipsis
  const displayItems = React.useMemo(() => {
    if (!maxItems || breadcrumbItems.length <= maxItems) {
      return breadcrumbItems;
    }

    // Show first item, ellipsis, and last (maxItems - 2) items
    const firstItem = breadcrumbItems[0];
    const lastItems = breadcrumbItems.slice(-(maxItems - 2));

    return [
      firstItem, 
      { label: "...", href: undefined, icon: undefined } as BreadcrumbItem, 
      ...lastItems
    ];
  }, [breadcrumbItems, maxItems]);

  const allItems = showHome
    ? [
        {
          label: homeLabel,
          href: homeHref,
          icon: <Home className="h-4 w-4" />,
        } as BreadcrumbItem,
        ...displayItems,
      ]
    : displayItems;

  if (allItems.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-1 text-sm", className)}
    >
      <ol className="flex items-center space-x-1">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isActive = !item.href || item.href === pathname;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span
                  className={cn(
                    "mx-2 text-muted-foreground",
                    separatorClassName
                  )}
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}

              {item.href && !isActive ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground",
                    itemClassName
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    "flex items-center gap-1.5",
                    isLast || isActive
                      ? cn("font-medium text-foreground", activeClassName)
                      : "text-muted-foreground",
                    itemClassName
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
