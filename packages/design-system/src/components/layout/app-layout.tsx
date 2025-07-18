import * as React from "react";
import { cn } from "../../lib/utils";

export interface AppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarCollapsed?: boolean;
}

const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  (
    {
      className,
      header,
      sidebar,
      footer,
      sidebarCollapsed = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn("min-h-screen bg-background", className)}
        ref={ref}
        {...props}
      >
        {/* Header */}
        {header && (
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {header}
          </header>
        )}

        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Sidebar */}
          {sidebar && (
            <aside
              className={cn(
                "sticky top-16 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300",
                sidebarCollapsed ? "w-16" : "w-64"
              )}
            >
              {sidebar}
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>

        {/* Footer */}
        {footer && <footer className="border-t bg-background">{footer}</footer>}
      </div>
    );
  }
);
AppLayout.displayName = "AppLayout";

export { AppLayout };
