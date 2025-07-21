import React from "react";

export interface UseBadgeInteractionsProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  removable?: boolean;
  asChild?: boolean;
}

export const useBadgeInteractions = ({
  onClick,
  removable,
  asChild,
}: UseBadgeInteractionsProps) => {
  const isClickable = onClick || removable || asChild;
  const isInteractive = isClickable && !removable;

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick(event);
      }
    },
    [onClick]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isInteractive && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        // Call onClick directly for keyboard interactions
        if (onClick) {
          onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }
    },
    [isInteractive, onClick]
  );

  return {
    isClickable,
    isInteractive,
    handleClick,
    handleKeyDown,
  };
};
