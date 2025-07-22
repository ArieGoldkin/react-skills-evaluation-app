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
import { cn, PositionedThemeToggle } from "@skills-eval/design-system";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth";
import { AuthService, ApiClientError } from "@/services";

// Types for authentication
type AuthMode = "signin" | "signup";

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

interface AuthErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  general?: string;
}

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
  const router = useRouter();
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();

  // Authentication state
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState<AuthErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: AuthErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (authMode === "signup") {
      if (!formData.name?.trim()) {
        newErrors.name = "Name is required";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof AuthErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (authMode === "signup") {
        // Handle signup
        await AuthService.register({
          name: formData.name!,
          email: formData.email,
          password: formData.password,
        });

        // Success - show message and switch to signin
        setMessage("Account created successfully! You can now sign in.");
        setAuthMode("signin");
        setFormData({
          email: formData.email,
          password: "",
          confirmPassword: "",
          name: "",
        });
      } else {
        // Handle signin
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setErrors({
            general: "Invalid email or password. Please try again.",
          });
        } else {
          // Success - redirect to dashboard
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);

      if (error instanceof ApiClientError) {
        if (
          error.status === 400 &&
          error.message.includes("email already exists")
        ) {
          setErrors({ email: "An account with this email already exists" });
        } else {
          setErrors({ general: error.message || "Failed to create account" });
        }
      } else {
        setErrors({ general: "Network error. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle between signin and signup
  const toggleAuthMode = () => {
    setAuthMode(prev => (prev === "signin" ? "signup" : "signin"));
    setErrors({});
    setMessage(null);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  };

  return (
    <main
      className={cn(
        "min-h-screen relative bg-gradient-to-br from-background via-background/95 to-muted/30 dark:from-background dark:via-background/95 dark:to-muted/20",
        className
      )}
      role="main"
      aria-label="Skills Evaluation App Homepage"
    >
      {/* Theme Toggle - Using design system's positioned component */}
      <PositionedThemeToggle position="top-right" size="md" variant="button" />

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

          {/* Right Column - Authentication Area */}
          <div className="flex justify-center lg:justify-end">
            {authLoading ? (
              <Card className="w-full max-w-md shadow-2xl bg-card/95 backdrop-blur-sm border-border/50">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary"></div>
                  <p className="text-sm text-muted-foreground">Loading...</p>
                </CardContent>
              </Card>
            ) : isAuthenticated ? (
              <Card className="w-full max-w-md shadow-2xl bg-card/95 backdrop-blur-sm border-border/50">
                <CardHeader className="space-y-3 text-center pb-6">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                    <span className="text-2xl font-bold">✓</span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Welcome back, {user?.name || "User"}!
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    You're already signed in and ready to go.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => router.push("/dashboard")}
                    className="h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    Go to Dashboard
                  </Button>
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Not you? </span>
                    <button
                      type="button"
                      onClick={() => {
                        // Add sign out logic here if needed
                        window.location.href = "/api/auth/signout";
                      }}
                      className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full max-w-md shadow-2xl bg-card/95 backdrop-blur-sm border-border/50">
                <CardHeader className="space-y-3 text-center pb-6">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                    <span className="text-2xl font-bold">A</span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {authMode === "signin"
                      ? "Welcome back"
                      : "Create an account"}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {authMode === "signin"
                      ? "Enter your credentials to access your account"
                      : "Enter your information to create your account"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {message && (
                    <div className="rounded-md bg-green-500/10 dark:bg-green-500/20 p-3">
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {message}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {authMode === "signup" && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-foreground font-medium"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`h-12 border-border/50 focus:border-primary ${errors.name ? "border-red-500" : ""}`}
                          disabled={isLoading}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-foreground font-medium"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`h-12 border-border/50 focus:border-primary ${errors.email ? "border-red-500" : ""}`}
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
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
                        name="password"
                        type="password"
                        placeholder={
                          authMode === "signup"
                            ? "Create a password"
                            : "Enter your password"
                        }
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`h-12 border-border/50 focus:border-primary ${errors.password ? "border-red-500" : ""}`}
                        disabled={isLoading}
                      />
                      {errors.password && (
                        <p className="text-sm text-red-500">
                          {errors.password}
                        </p>
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
                          onChange={handleInputChange}
                          className={`h-12 border-border/50 focus:border-primary ${errors.confirmPassword ? "border-red-500" : ""}`}
                          disabled={isLoading}
                        />
                        {errors.confirmPassword && (
                          <p className="text-sm text-red-500">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    )}

                    {authMode === "signin" && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={checked =>
                            setRememberMe(checked as boolean)
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
                      <div className="rounded-md bg-destructive/10 dark:bg-destructive/20 p-3">
                        <p className="text-sm text-destructive">
                          {errors.general}
                        </p>
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
                      onClick={toggleAuthMode}
                      className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                      disabled={isLoading}
                    >
                      {authMode === "signin" ? "Sign up" : "Sign in"}
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
