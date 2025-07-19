import * as React from "react";

// Type definitions for better type safety
interface NavigationItem {
  icon: string;
  label: string;
  active: boolean;
}

interface SampleSidebarProps {
  collapsed?: boolean;
}

interface InteractiveHeaderProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const SampleHeader: React.FC = () => (
  <div className="flex items-center justify-between px-6 py-4">
    <div className="flex items-center space-x-4">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">SK</span>
      </div>
      <h1 className="text-xl font-semibold text-foreground">
        Skills Evaluation
      </h1>
    </div>
    <div className="flex items-center space-x-4">
      <button className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
        Profile
      </button>
      <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
        Sign Out
      </button>
    </div>
  </div>
);

const navigationItems: NavigationItem[] = [
  { icon: "📊", label: "Dashboard", active: true },
  { icon: "👤", label: "Profile", active: false },
  { icon: "📝", label: "Assessments", active: false },
  { icon: "📈", label: "Analytics", active: false },
  { icon: "⚙️", label: "Settings", active: false },
];

export const SampleSidebar: React.FC<SampleSidebarProps> = ({
  collapsed = false,
}) => (
  <div className="p-4 space-y-2">
    <div className="space-y-1">
      {navigationItems.map(item => (
        <div
          key={item.label}
          className={`flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
            item.active
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          {!collapsed && (
            <span className="text-sm font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const SampleContent: React.FC = () => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard</h2>
      <p className="text-muted-foreground">
        Welcome to your skills evaluation dashboard.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="p-4 bg-card border rounded-lg">
          <h3 className="font-semibold text-card-foreground mb-2">Card {i}</h3>
          <p className="text-muted-foreground text-sm">
            This is sample content for card {i}. It demonstrates how the layout
            works with various content.
          </p>
          <div className="mt-4">
            <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90">
              Action
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SampleFooter: React.FC = () => (
  <div className="px-6 py-4 text-center">
    <p className="text-sm text-muted-foreground">
      © 2024 Skills Evaluation App. All rights reserved.
    </p>
  </div>
);

export const InteractiveHeader: React.FC<InteractiveHeaderProps> = ({
  sidebarCollapsed,
  onToggleSidebar,
}) => (
  <div className="flex items-center justify-between px-6 py-4">
    <div className="flex items-center space-x-4">
      <button
        onClick={onToggleSidebar}
        className="p-2 hover:bg-secondary rounded-md"
      >
        <span className="text-lg">{sidebarCollapsed ? "→" : "←"}</span>
      </button>
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">SK</span>
      </div>
      <h1 className="text-xl font-semibold text-foreground">
        Skills Evaluation
      </h1>
    </div>
    <div className="flex items-center space-x-4">
      <button className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
        Profile
      </button>
      <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
        Sign Out
      </button>
    </div>
  </div>
);
