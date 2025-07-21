import React from "react";

const proficiencyColors = {
  0: "bg-gray-200 dark:bg-gray-700",
  1: "bg-red-200 dark:bg-red-900",
  2: "bg-red-300 dark:bg-red-800",
  3: "bg-orange-200 dark:bg-orange-900",
  4: "bg-orange-300 dark:bg-orange-800",
  5: "bg-yellow-200 dark:bg-yellow-900",
  6: "bg-yellow-300 dark:bg-yellow-800",
  7: "bg-lime-200 dark:bg-lime-900",
  8: "bg-green-200 dark:bg-green-900",
  9: "bg-green-300 dark:bg-green-800",
  10: "bg-emerald-300 dark:bg-emerald-800",
};

const proficiencyLabels = {
  0: "Not Started",
  1: "Beginner",
  2: "Beginner+",
  3: "Basic",
  4: "Basic+",
  5: "Intermediate",
  6: "Intermediate+",
  7: "Advanced",
  8: "Advanced+",
  9: "Expert",
  10: "Master",
};

export interface ProficiencyIndicatorProps {
  proficiency: number;
  size?: "sm" | "md" | "lg";
}

export const ProficiencyIndicator: React.FC<ProficiencyIndicatorProps> = ({
  proficiency,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-2 w-16",
    md: "h-3 w-20",
    lg: "h-4 w-24",
  };

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const progress = (proficiency / 10) * 100;
  const colorClass =
    proficiencyColors[proficiency as keyof typeof proficiencyColors];
  const label =
    proficiencyLabels[proficiency as keyof typeof proficiencyLabels];

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span
          className={`font-medium text-gray-700 dark:text-gray-300 ${labelSizeClasses[size]}`}
        >
          {label}
        </span>
        <span
          className={`text-gray-500 dark:text-gray-400 ${labelSizeClasses[size]}`}
        >
          {proficiency}/10
        </span>
      </div>
      <div
        className={`relative ${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}
      >
        <div
          className={`h-full ${colorClass} transition-all duration-300 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
