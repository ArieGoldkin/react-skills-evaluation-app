import * as React from "react";
import { ColorSwatch } from "./color-swatch";

export const AccentColors: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-foreground">
        Accent - Emerald
      </h3>
      <div className="grid grid-cols-3 gap-2 max-w-md">
        <ColorSwatch
          name="50"
          className="bg-accent-50"
          textColor="text-accent-900"
        />
        <ColorSwatch
          name="500"
          className="bg-accent-500"
          textColor="text-white"
        />
        <ColorSwatch
          name="900"
          className="bg-accent-900"
          textColor="text-white"
        />
      </div>
    </div>
  );
};
