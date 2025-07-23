"use client";

import { Toaster } from "sonner";

export interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster richColors position="bottom-right" closeButton />
    </>
  );
}
