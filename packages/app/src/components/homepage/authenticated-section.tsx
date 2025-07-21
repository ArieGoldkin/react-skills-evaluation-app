"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import React from "react";

export interface AuthenticatedSectionProps {
  userName?: string;
  onGoToDashboard: () => void;
  onSignOut: () => void;
}

export const AuthenticatedSection: React.FC<AuthenticatedSectionProps> = ({
  userName,
  onGoToDashboard,
  onSignOut,
}) => {
  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/95 backdrop-blur-sm border-border/50">
      <CardHeader className="space-y-3 text-center pb-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
          <span className="text-2xl font-bold">✓</span>
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Welcome back, {userName || "User"}!
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          You're already signed in and ready to go.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={onGoToDashboard}
          className="h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          Go to Dashboard
        </Button>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Not you? </span>
          <button
            type="button"
            onClick={onSignOut}
            className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            Sign out
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
