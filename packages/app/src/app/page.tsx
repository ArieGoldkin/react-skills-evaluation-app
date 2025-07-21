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
import type { HomePageProps } from "@/types/homepage";
import { cn } from "@skills-eval/design-system";
import { useState } from "react";

// Feature data - extracted for better maintainability
const FEATURES = [
  {
    title: "Skills Analysis",
    description:
      "Comprehensive evaluation of your technical and professional skills",
  },
  {
    title: "AI Recommendations",
    description: "Personalized suggestions to improve and advance your career",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your skill development over time with detailed analytics",
  },
] as const;

export default function HomePage({ className }: HomePageProps) {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <main
      className={cn(
        "min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
        className
      )}
      role="main"
      aria-label="Skills Evaluation App Homepage"
    >
      {/* Theme Toggle - Better positioned */}
      <div className="absolute top-6 right-6 z-20">
        <button className="p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50">
          Theme Toggle
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Hero Content and Features */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Skills Evaluation App
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Analyze and improve your professional skills with AI-powered
                insights and personalized recommendations.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                Key Features
              </h2>
              <div className="space-y-4">
                {FEATURES.map((feature, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-sm rounded-xl p-6 bg-card/80 text-card-foreground border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-2xl bg-card/95 backdrop-blur-sm border-border/50">
              <CardHeader className="space-y-3 text-center pb-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                  <span className="text-2xl font-bold">A</span>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-foreground font-medium"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="h-12 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-foreground font-medium"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-12 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={checked =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </div>
                <Button className="h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                  Sign in
                </Button>
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
                    Don't have an account?{" "}
                  </span>
                  <a
                    href="/auth/signup"
                    className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                  >
                    Sign up
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
