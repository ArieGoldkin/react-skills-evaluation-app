"use client";

import React from "react";
import { Button, Checkbox, Input, Label } from "@/components/ui";

export interface SignInFormData {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface SignInFormProps {
  formData: SignInFormData;
  errors: FormErrors;
  isLoading: boolean;
  rememberMe: boolean;
  message?: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRememberMeChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  formData,
  errors,
  isLoading,
  rememberMe,
  message,
  onInputChange,
  onRememberMeChange,
  onSubmit,
}) => {
  return (
    <>
      {message && (
        <div className="rounded-md bg-green-50 p-3">
          <p className="text-sm text-green-600">{message}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={onInputChange}
            className={`h-12 ${errors.email ? "border-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={onInputChange}
            className={`h-12 ${errors.password ? "border-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={checked => onRememberMeChange(checked as boolean)}
            disabled={isLoading}
          />
          <Label
            htmlFor="remember"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>

        {errors.general && (
          <div className="rounded-md bg-red-50 p-3">
            <p className="text-sm text-red-500">{errors.general}</p>
          </div>
        )}

        <Button type="submit" className="h-12 w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </>
  );
};
