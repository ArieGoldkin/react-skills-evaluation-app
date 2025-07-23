export interface NavigationItem {
  title: string;
  url?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  items?: NavigationItem[];
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export function isActiveNavItem(itemUrl: string, currentPath: string): boolean {
  if (itemUrl === currentPath) return true;
  if (itemUrl === "/dashboard" && currentPath === "/") return true;
  if (itemUrl !== "/" && currentPath.startsWith(itemUrl)) return true;
  return false;
}

export function hasActiveChild(
  items: NavigationItem[] | undefined,
  currentPath: string
): boolean {
  if (!items) return false;
  return items.some(item =>
    item.url
      ? isActiveNavItem(item.url, currentPath)
      : hasActiveChild(item.items, currentPath)
  );
}
