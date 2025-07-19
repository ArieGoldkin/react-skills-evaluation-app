import * as React from "react";
import {
  AccentColors,
  DesignSystemTokens,
  PrimaryColors,
  SecondaryColors,
  UsageExamples,
} from "./components";

export const ColorShowcase: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Professional Blue Color Palette
        </h2>
        <p className="text-muted-foreground mb-6">
          A comprehensive color system designed for trust, expertise, and
          professionalism.
        </p>
      </div>

      <PrimaryColors />
      <SecondaryColors />
      <AccentColors />
      <DesignSystemTokens />
      <UsageExamples />
    </div>
  );
};
