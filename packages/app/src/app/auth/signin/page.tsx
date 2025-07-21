"use client";

import { GoogleLogin } from "@/components/auth/google-login";
import { SignInForm } from "@/components/auth/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useSignInForm } from "@/hooks/use-sign-in-form";

function SignInContent() {
  const searchParams = useSearchParams();

  const {
    formData,
    errors,
    isLoading,
    rememberMe,
    message,
    handleInputChange,
    handleRememberMeChange,
    handleSubmit,
    setMessage,
  } = useSignInForm();

  useEffect(() => {
    const messageParam = searchParams.get("message");
    if (messageParam) {
      setMessage(messageParam);
    }
  }, [searchParams, setMessage]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-xl font-bold">A</span>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInForm
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            rememberMe={rememberMe}
            message={message}
            onInputChange={handleInputChange}
            onRememberMeChange={handleRememberMeChange}
            onSubmit={handleSubmit}
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleLogin className="h-12 w-full" />
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Don't have an account?{" "}
            </span>
            <a
              href="/auth/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md animate-pulse">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/20" />
            <div className="h-8 bg-primary/20 rounded" />
            <div className="h-4 bg-primary/20 rounded mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-10 bg-primary/20 rounded" />
            <div className="h-10 bg-primary/20 rounded" />
            <div className="h-10 bg-primary/20 rounded" />
          </CardContent>
        </Card>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
