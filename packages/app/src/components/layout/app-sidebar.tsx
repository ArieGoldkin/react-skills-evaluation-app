"use client";

import {
  BarChart,
  BookOpen,
  CheckCircle,
  ChevronRight,
  FolderOpen,
  Home,
  LogOut,
  Plus,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { SignOutButton } from "@/components/auth/signout-button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  ThemeToggle,
} from "@skills-eval/design-system";
import {
  NavigationItem,
  hasActiveChild,
  isActiveNavItem,
} from "@/lib/navigation";

// Navigation data structure
const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Skills",
    icon: BookOpen,
    items: [
      {
        title: "All Skills",
        url: "/skills",
        icon: FolderOpen,
      },
      {
        title: "Add New Skill",
        url: "/skills/new",
        icon: Plus,
      },
      {
        title: "Categories",
        url: "/skills/categories",
        icon: FolderOpen,
      },
    ],
  },
  {
    title: "Assessments",
    url: "/assessments",
    icon: CheckCircle,
    badge: "3", // Example badge
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart,
  },
];

const adminNavigationItems: NavigationItem[] = [
  {
    title: "Admin",
    url: "/admin",
    icon: Settings,
  },
];

// Individual navigation item component
function NavItem({
  item,
  currentPath,
}: {
  item: NavigationItem;
  currentPath: string;
}) {
  const isActive = item.url ? isActiveNavItem(item.url, currentPath) : false;
  const hasActiveSubItem = hasActiveChild(item.items, currentPath);
  const [isOpen, setIsOpen] = React.useState(hasActiveSubItem);

  React.useEffect(() => {
    if (hasActiveSubItem) {
      setIsOpen(true);
    }
  }, [hasActiveSubItem]);

  if (item.items) {
    // Collapsible menu item with sub-items
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} asChild>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title} isActive={hasActiveSubItem}>
              {item.icon && <item.icon className="size-4" />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map(subItem => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={
                      subItem.url
                        ? isActiveNavItem(subItem.url, currentPath)
                        : false
                    }
                  >
                    <Link href={subItem.url || "#"}>
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  // Simple menu item
  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={item.title} asChild isActive={isActive}>
        <Link href={item.url || "#"}>
          {item.icon && <item.icon className="size-4" />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentPath = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-hover:group-data-[collapsible=icon]:justify-start group-hover:group-data-[collapsible=icon]:px-2 flex items-center gap-2 px-2 py-2" role="banner">
          <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="size-4" aria-hidden="true" />
          </div>
          <div className="group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0 group-hover:group-data-[collapsible=icon]:w-auto group-hover:group-data-[collapsible=icon]:opacity-100 grid flex-1 text-left text-sm leading-tight transition-all duration-200 overflow-hidden">
            <span className="truncate font-semibold whitespace-nowrap">Skills Evaluation</span>
            <span className="truncate text-xs whitespace-nowrap">Personal Development</span>
          </div>
          <ThemeToggle size="sm" variant="icon" className="group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0 group-hover:group-data-[collapsible=icon]:w-8 group-hover:group-data-[collapsible=icon]:opacity-100 h-8 w-8 shrink-0 border-0 bg-transparent hover:bg-accent dark:hover:bg-accent transition-all duration-200" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <nav role="navigation" aria-label="Main navigation">
          <SidebarGroup>
            <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map(item => (
                  <NavItem
                    key={item.title}
                    item={item}
                    currentPath={currentPath}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </nav>
        <nav role="navigation" aria-label="Administration">
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavigationItems.map(item => (
                  <NavItem
                    key={item.title}
                    item={item}
                    currentPath={currentPath}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <User className="size-4" />
                  </div>
                  <div className="group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0 group-hover:group-data-[collapsible=icon]:w-auto group-hover:group-data-[collapsible=icon]:opacity-100 grid flex-1 text-left text-sm leading-tight transition-all duration-200 overflow-hidden">
                    <span className="truncate font-semibold whitespace-nowrap">User Profile</span>
                    <span className="truncate text-xs whitespace-nowrap">Settings & Account</span>
                  </div>
                  <ChevronRight className="group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0 group-hover:group-data-[collapsible=icon]:w-4 group-hover:group-data-[collapsible=icon]:opacity-100 ml-auto transition-all duration-200" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem className="gap-2">
                  <User className="h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <SignOutButton className="w-full justify-start gap-2 p-2 bg-transparent hover:bg-destructive/10 text-destructive font-normal rounded-sm">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
