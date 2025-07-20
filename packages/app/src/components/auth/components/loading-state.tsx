"use client";

import { ComponentType } from "react";

interface LoadingStateProps {
  loadingComponent?: ComponentType;
  isRedirecting?: boolean;
  isRetrying?: boolean;
}

export function LoadingState({
  loadingComponent: LoadingComponent,
  isRedirecting = false,
  isRetrying = false,
}: LoadingStateProps) {
  if (LoadingComponent) {
    return <LoadingComponent />;
  }

  const getLoadingMessage = () => {
    if (isRedirecting) return "Redirecting...";
    if (isRetrying) return "Retrying...";
    return "Loading...";
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-sm text-gray-600">{getLoadingMessage()}</p>
      </div>
    </div>
  );
}
