"use client";

import { GoogleLogin } from "@/components/auth/google-login";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
} from "@/components/ui";
import React from "react";
import type { AuthErrors, AuthFormData, AuthMode } from "../homepage/types";

export interface AuthSectionProps {
  authMode: AuthMode;
  formData: AuthFormData;
  errors: AuthErrors;
  isLoading: boolean;
  rememberMe: boolean;
  message?: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRememberMeChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleAuthMode: () => void;
}

export const AuthSection: React.FC<AuthSectionProps> = ({
  authMode,
  formData,
  errors,
  isLoading,
  rememberMe,
  message,
  onInputChange,
  onRememberMeChange,
  onSubmit,
  onToggleAuthMode,
}) => {
  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/95 backdrop-blur-sm border-border/50">
      <CardHeader className="space-y-3 text-center pb-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
          <span className="text-2xl font-bold">A</span>
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          {authMode === "signin" ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {authMode === "signin"
            ? "Enter your credentials to access your account"
            : "Enter your information to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <div className="rounded-md bg-green-50 p-3">
            <p className="text-sm text-green-600">{message}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {authMode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={onInputChange}
                className={`h-12 border-border/50 focus:border-primary ${
                  errors.name ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={onInputChange}
              className={`h-12 border-border/50 focus:border-primary ${
                errors.email ? "border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={
                authMode === "signup"
                  ? "Create a password"
                  : "Enter your password"
              }
              value={formData.password}
              onChange={onInputChange}
              className={`h-12 border-border/50 focus:border-primary ${
                errors.password ? "border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {authMode === "signup" && (
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-foreground font-medium"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={onInputChange}
                className={`h-12 border-border/50 focus:border-primary ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {authMode === "signin" && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={checked =>
                  onRememberMeChange(checked as boolean)
                }
                disabled={isLoading}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-normal text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>
          )}

          {errors.general && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-500">{errors.general}</p>
            </div>
          )}

          <Button
            type="submit"
            className="h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            disabled={isLoading}
          >
            {isLoading
              ? authMode === "signin"
                ? "Signing in..."
                : "Creating account..."
              : authMode === "signin"
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-3 text-muted-foreground uppercase font-medium">
              Or continue with
            </span>
          </div>
        </div>
        <GoogleLogin className="h-12 w-full" />
        <div className="text-center text-sm pt-2">
          <span className="text-muted-foreground">
            {authMode === "signin"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            onClick={onToggleAuthMode}
            className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
            disabled={isLoading}
          >
            {authMode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
