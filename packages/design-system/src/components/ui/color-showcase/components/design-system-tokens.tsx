import * as React from "react";
import { ColorSwatch } from "./color-swatch";

export const DesignSystemTokens: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-foreground">
        Design System Tokens
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <ColorSwatch name="Primary" className="bg-primary" />
          <ColorSwatch
            name="Secondary"
            className="bg-secondary"
            textColor="text-secondary-foreground"
          />
          <ColorSwatch name="Accent" className="bg-accent" />
        </div>
        <div className="space-y-2">
          <ColorSwatch
            name="Muted"
            className="bg-muted"
            textColor="text-muted-foreground"
          />
          <ColorSwatch
            name="Card"
            className="bg-card border"
            textColor="text-card-foreground"
          />
          <ColorSwatch
            name="Popover"
            className="bg-popover border"
            textColor="text-popover-foreground"
          />
        </div>
        <div className="space-y-2">
          <ColorSwatch name="Destructive" className="bg-destructive" />
          <div className="p-4 border rounded-lg">
            <span className="text-sm font-medium text-foreground">
              Border & Input
            </span>
          </div>
          <div className="p-4 rounded-lg ring-2 ring-ring bg-background">
            <span className="text-sm font-medium text-foreground">
              Focus Ring
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
