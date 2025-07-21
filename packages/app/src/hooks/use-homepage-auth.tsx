"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type {
  AuthMode,
  AuthFormData,
  AuthErrors,
} from "../components/homepage/types";

export const useHomepageAuth = () => {
  const router = useRouter();

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
  const validateForm = useCallback((): boolean => {
    const newErrors: AuthErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
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
  }, [authMode, formData]);

  // Handle input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name as keyof AuthErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      setErrors({});

      try {
        if (authMode === "signup") {
          // Handle signup
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              password: formData.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            if (
              response.status === 400 &&
              data.error === "User with this email already exists"
            ) {
              setErrors({ email: "An account with this email already exists" });
            } else {
              setErrors({ general: data.error || "Failed to create account" });
            }
            return;
          }

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
        setErrors({ general: "Network error. Please try again." });
      } finally {
        setIsLoading(false);
      }
    },
    [authMode, formData, validateForm, router]
  );

  // Toggle between signin and signup
  const toggleAuthMode = useCallback(() => {
    setAuthMode(prev => (prev === "signin" ? "signup" : "signin"));
    setErrors({});
    setMessage(null);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  }, []);

  const handleRememberMeChange = useCallback((checked: boolean) => {
    setRememberMe(checked);
  }, []);

  return {
    authMode,
    formData,
    errors,
    isLoading,
    rememberMe,
    message,
    handleInputChange,
    handleSubmit,
    toggleAuthMode,
    handleRememberMeChange,
  };
};
