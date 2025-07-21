"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui";

export const LoadingSection: React.FC = () => {
  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/95 backdrop-blur-sm border-border/50">
      <CardContent className="p-8 text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary"></div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </CardContent>
    </Card>
  );
};
