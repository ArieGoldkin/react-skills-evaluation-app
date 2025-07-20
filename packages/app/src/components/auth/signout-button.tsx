"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

interface SignOutButtonProps {
  className?: string;
  callbackUrl?: string;
  children?: React.ReactNode;
}

export function SignOutButton({
  className = "",
  callbackUrl = "/",
  children,
}: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut({
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      console.error("Sign-out error:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={`
        inline-flex items-center justify-center gap-2 px-4 py-2 
        bg-red-600 hover:bg-red-700 
        text-white font-medium
        rounded-md shadow-sm hover:shadow-md
        transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        ${className}
      `}
      aria-label={isLoading ? "Signing out..." : "Sign out"}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Signing out...</span>
        </>
      ) : (
        children || "Sign Out"
      )}
    </button>
  );
}
