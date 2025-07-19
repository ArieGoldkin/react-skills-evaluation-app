import { cn } from "@/lib/utils";
import * as React from "react";

export interface ColorSwatchProps {
  name: string;
  className: string;
  textColor?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  className,
  textColor = "text-white",
}) => (
  <div
    className={cn(
      "p-4 rounded-lg flex items-center justify-center min-h-[80px]",
      className
    )}
  >
    <span className={cn("font-medium text-sm", textColor)}>{name}</span>
  </div>
);
