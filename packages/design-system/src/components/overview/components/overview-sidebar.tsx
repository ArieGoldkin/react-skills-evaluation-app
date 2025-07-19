import * as React from "react";

const navigationItems = [
  { icon: "🎨", label: "Colors", active: true },
  { icon: "🔘", label: "Buttons", active: false },
  { icon: "📦", label: "Layout", active: false },
  { icon: "📝", label: "Forms", active: false },
  { icon: "📊", label: "Data Display", active: false },
  { icon: "💬", label: "Feedback", active: false },
  { icon: "🧭", label: "Navigation", active: false },
];

export const OverviewSidebar: React.FC = () => {
  return (
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
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
