import * as React from "react";
import { ColorSwatch } from "./color-swatch";

export const PrimaryColors: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-foreground">
        Primary - Blue Scale
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-2">
        <ColorSwatch
          name="50"
          className="bg-primary-50"
          textColor="text-primary-900"
        />
        <ColorSwatch
          name="100"
          className="bg-primary-100"
          textColor="text-primary-900"
        />
        <ColorSwatch
          name="200"
          className="bg-primary-200"
          textColor="text-primary-900"
        />
        <ColorSwatch
          name="300"
          className="bg-primary-300"
          textColor="text-primary-900"
        />
        <ColorSwatch
          name="400"
          className="bg-primary-400"
          textColor="text-white"
        />
        <ColorSwatch
          name="500"
          className="bg-primary-500"
          textColor="text-white"
        />
        <ColorSwatch
          name="600"
          className="bg-primary-600"
          textColor="text-white"
        />
        <ColorSwatch
          name="700"
          className="bg-primary-700"
          textColor="text-white"
        />
        <ColorSwatch
          name="800"
          className="bg-primary-800"
          textColor="text-white"
        />
        <ColorSwatch
          name="900"
          className="bg-primary-900"
          textColor="text-white"
        />
        <ColorSwatch
          name="950"
          className="bg-primary-950"
          textColor="text-white"
        />
      </div>
    </div>
  );
};
