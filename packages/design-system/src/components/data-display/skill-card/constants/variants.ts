import { cva } from "class-variance-authority";

export const skillCardVariants = cva(
  [
    "relative rounded-lg border bg-white p-4 shadow-sm transition-all",
    "hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
    "dark:bg-gray-900 dark:border-gray-800",
  ],
  {
    variants: {
      variant: {
        default: "border-gray-200",
        primary:
          "border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800",
        verified:
          "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800",
      },
      size: {
        compact: "p-3",
        default: "p-4",
        detailed: "p-6",
      },
      interactive: {
        true: "cursor-pointer hover:border-blue-300 hover:bg-blue-50/50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
);
