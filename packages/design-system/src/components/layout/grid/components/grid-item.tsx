import * as React from "react";

export const GridItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`p-4 bg-card border rounded-lg text-center ${className}`}>
    <div className="text-card-foreground font-medium">{children}</div>
  </div>
);
