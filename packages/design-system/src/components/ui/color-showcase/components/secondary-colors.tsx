import * as React from "react";
import { ColorSwatch } from "./color-swatch";

export const SecondaryColors: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-foreground">
        Secondary - Slate Scale
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
        <ColorSwatch
          name="50"
          className="bg-secondary-50"
          textColor="text-secondary-900"
        />
        <ColorSwatch
          name="100"
          className="bg-secondary-100"
          textColor="text-secondary-900"
        />
        <ColorSwatch
          name="200"
          className="bg-secondary-200"
          textColor="text-secondary-900"
        />
        <ColorSwatch
          name="300"
          className="bg-secondary-300"
          textColor="text-secondary-900"
        />
        <ColorSwatch
          name="400"
          className="bg-secondary-400"
          textColor="text-white"
        />
        <ColorSwatch
          name="500"
          className="bg-secondary-500"
          textColor="text-white"
        />
        <ColorSwatch
          name="600"
          className="bg-secondary-600"
          textColor="text-white"
        />
        <ColorSwatch
          name="700"
          className="bg-secondary-700"
          textColor="text-white"
        />
        <ColorSwatch
          name="800"
          className="bg-secondary-800"
          textColor="text-white"
        />
        <ColorSwatch
          name="900"
          className="bg-secondary-900"
          textColor="text-white"
        />
      </div>
    </div>
  );
};
