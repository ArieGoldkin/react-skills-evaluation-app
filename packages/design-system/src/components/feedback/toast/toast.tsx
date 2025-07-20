"use client";

import { cn } from "@/lib/cn";
import { AlertCircle, CheckCircle, Info, Loader2, XCircle } from "lucide-react";
import * as React from "react";
import type {
  ExternalToast,
  ToasterProps as SonnerToasterProps,
  ToastT,
} from "sonner";
import { Toaster as Sonner, toast as sonnerToast } from "sonner";

// Define toast variant types
type ToastVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

export interface ToasterProps extends Omit<SonnerToasterProps, "theme"> {
  theme?: SonnerToasterProps["theme"] | "system";
  variant?: ToastVariant;
}

export interface ToastOptions extends ExternalToast {
  variant?: ToastVariant;
}

// Promise options interface
export interface PromiseOptions<T> {
  loading: string | React.ReactNode;
  success: string | React.ReactNode | ((data: T) => string | React.ReactNode);
  error:
    | string
    | React.ReactNode
    | ((error: unknown) => string | React.ReactNode);
  duration?: number;
}

// Enhanced toast function with design system integration
export interface Toast {
  (message: string | React.ReactNode, options?: ToastOptions): string | number;
  success: (
    message: string | React.ReactNode,
    options?: ToastOptions
  ) => string | number;
  error: (
    message: string | React.ReactNode,
    options?: ToastOptions
  ) => string | number;
  warning: (
    message: string | React.ReactNode,
    options?: ToastOptions
  ) => string | number;
  info: (
    message: string | React.ReactNode,
    options?: ToastOptions
  ) => string | number;
  loading: (
    message: string | React.ReactNode,
    options?: ToastOptions
  ) => string | number;
  promise: <T>(
    promise: Promise<T>,
    options: PromiseOptions<T>
  ) => string | number;
  custom: (jsx: React.ReactNode, options?: ToastOptions) => string | number;
  dismiss: (id?: string | number) => void;
  message: (
    message: string | React.ReactNode,
    options?: ToastOptions
  ) => string | number;
}

// Default configuration for our design system
const defaultToastOptions: ToastOptions = {
  duration: 5000,
  position: "bottom-right",
  dismissible: true,
  closeButton: false, // We'll use custom close button
};

// Icon mapping for different toast types
const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
  loading: Loader2,
} as const;

// Custom toast function that integrates with our design system
const createToast = (
  type: keyof typeof iconMap | "default" | "message",
  message: string | React.ReactNode,
  options: ToastOptions = {}
): string | number => {
  const Icon =
    type !== "default" && type !== "message"
      ? iconMap[type as keyof typeof iconMap]
      : null;

  const toastOptions: ExternalToast = {
    ...defaultToastOptions,
    ...options,
    icon: Icon ? (
      <Icon
        className={cn(
          "h-4 w-4 shrink-0",
          type === "loading" && "animate-spin",
          type === "success" && "text-green-600",
          type === "error" && "text-red-600",
          type === "warning" && "text-yellow-600",
          type === "info" && "text-blue-600"
        )}
      />
    ) : (
      options.icon
    ),
    className: cn(
      "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
      options.className
    ),
    descriptionClassName: cn(
      "group-[.toast]:text-muted-foreground",
      options.descriptionClassName
    ),
    // Note: actionButtonClassName and cancelButtonClassName are handled via toastOptions.classNames
  };

  switch (type) {
    case "success":
      return sonnerToast.success(message, toastOptions);
    case "error":
      return sonnerToast.error(message, toastOptions);
    case "warning":
      return sonnerToast.warning(message, toastOptions);
    case "info":
      return sonnerToast.info(message, toastOptions);
    case "loading":
      return sonnerToast.loading(message, toastOptions);
    case "message":
      return sonnerToast.message(message, toastOptions);
    default:
      return sonnerToast(message, toastOptions);
  }
};

// Enhanced toast function
const toastFunction = (
  message: string | React.ReactNode,
  options?: ToastOptions
) => createToast("default", message, options);

// Add methods to the toast function
toastFunction.success = (
  message: string | React.ReactNode,
  options?: ToastOptions
) => createToast("success", message, options);

toastFunction.error = (
  message: string | React.ReactNode,
  options?: ToastOptions
) => createToast("error", message, options);

toastFunction.warning = (
  message: string | React.ReactNode,
  options?: ToastOptions
) => createToast("warning", message, options);

toastFunction.info = (
  message: string | React.ReactNode,
  options?: ToastOptions
) => createToast("info", message, options);

toastFunction.loading = (
  message: string | React.ReactNode,
  options?: ToastOptions
) => createToast("loading", message, options);

toastFunction.promise = function <T>(
  promise: Promise<T>,
  options: PromiseOptions<T>
) {
  return sonnerToast.promise(promise, {
    loading: options.loading,
    success: options.success,
    error: options.error,
    duration: options.duration,
    ...defaultToastOptions,
  });
};

toastFunction.custom = (jsx: React.ReactNode, options?: ToastOptions) =>
  sonnerToast.custom(() => jsx as React.ReactElement, {
    ...defaultToastOptions,
    ...options,
  });

toastFunction.dismiss = sonnerToast.dismiss;

toastFunction.message = (
  message: string | React.ReactNode,
  options?: ToastOptions
) => createToast("message", message, options);

// Export as Toast interface
export const toast = toastFunction as Toast;

// Main Toaster component
const Toaster = React.forwardRef<React.ElementRef<typeof Sonner>, ToasterProps>(
  ({ theme = "system", className, ...props }, ref) => {
    return (
      <Sonner
        ref={ref}
        theme={theme as SonnerToasterProps["theme"]}
        className={cn("toaster group", className)}
        toastOptions={{
          classNames: {
            toast: cn(
              "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg"
            ),
            description: "group-[.toast]:text-muted-foreground",
            actionButton: cn(
              "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground"
            ),
            cancelButton: cn(
              "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
            ),
            closeButton: cn(
              "group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:border-border"
            ),
            success:
              "group-[.toast]:bg-green-50 group-[.toast]:text-green-900 group-[.toast]:border-green-200 dark:group-[.toast]:bg-green-950 dark:group-[.toast]:text-green-50 dark:group-[.toast]:border-green-800",
            error:
              "group-[.toast]:bg-red-50 group-[.toast]:text-red-900 group-[.toast]:border-red-200 dark:group-[.toast]:bg-red-950 dark:group-[.toast]:text-red-50 dark:group-[.toast]:border-red-800",
            warning:
              "group-[.toast]:bg-yellow-50 group-[.toast]:text-yellow-900 group-[.toast]:border-yellow-200 dark:group-[.toast]:bg-yellow-950 dark:group-[.toast]:text-yellow-50 dark:group-[.toast]:border-yellow-800",
            info: "group-[.toast]:bg-blue-50 group-[.toast]:text-blue-900 group-[.toast]:border-blue-200 dark:group-[.toast]:bg-blue-950 dark:group-[.toast]:text-blue-50 dark:group-[.toast]:border-blue-800",
          },
        }}
        {...props}
      />
    );
  }
);
Toaster.displayName = "Toaster";

// Utility functions for common toast patterns
export const toastUtils = {
  // Quick success with action
  successWithAction: (
    message: string,
    actionLabel: string,
    actionFn: () => void,
    options?: ToastOptions
  ) => {
    return toast.success(message, {
      action: {
        label: actionLabel,
        onClick: actionFn,
      },
      ...options,
    });
  },

  // Error with retry action
  errorWithRetry: (
    message: string,
    retryFn: () => void,
    options?: ToastOptions
  ) => {
    return toast.error(message, {
      action: {
        label: "Retry",
        onClick: retryFn,
      },
      ...options,
    });
  },

  // Loading with promise handling
  asyncOperation: function <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    },
    options?: { duration?: number }
  ) {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      duration: options?.duration,
    });
  },

  // Custom positioned toast
  positioned: (
    message: string | React.ReactNode,
    position: ToastOptions["position"] = "bottom-right",
    type: "success" | "error" | "warning" | "info" | "default" = "default",
    options?: ToastOptions
  ) => {
    const toastFn = type === "default" ? toast : toast[type];
    return toastFn(message, {
      position,
      ...options,
    });
  },
};

export { Toaster, type ExternalToast, type ToastT };
export default toast;
