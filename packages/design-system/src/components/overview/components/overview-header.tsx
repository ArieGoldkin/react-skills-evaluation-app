import * as React from "react";

export const OverviewHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">DS</span>
        </div>
        <h1 className="text-xl font-semibold text-foreground">
          Design System Overview
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
          Components
        </button>
        <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Storybook
        </button>
      </div>
    </div>
  );
};
