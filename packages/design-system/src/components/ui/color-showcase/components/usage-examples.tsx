import * as React from "react";

export const UsageExamples: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-foreground">
        Usage Examples
      </h3>
      <div className="space-y-4">
        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-700 transition-colors">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary-300 transition-colors">
            Secondary Button
          </button>
          <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent-500/90 transition-colors">
            Success Button
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-card border rounded-lg">
            <h4 className="font-semibold text-card-foreground mb-2">
              Default Card
            </h4>
            <p className="text-muted-foreground text-sm">
              This card uses the default background and foreground colors.
            </p>
          </div>
          <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <h4 className="font-semibold text-primary-900 mb-2">
              Primary Themed Card
            </h4>
            <p className="text-primary-700 text-sm">
              This card uses primary color variants for a branded look.
            </p>
          </div>
        </div>

        {/* Alert/Banner */}
        <div className="p-4 bg-accent-50 border-l-4 border-accent-500 rounded-r-lg">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-accent-500 rounded-full mr-3"></div>
            <div>
              <h4 className="font-semibold text-accent-900">Success Message</h4>
              <p className="text-accent-800 text-sm">
                Your changes have been saved successfully.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
