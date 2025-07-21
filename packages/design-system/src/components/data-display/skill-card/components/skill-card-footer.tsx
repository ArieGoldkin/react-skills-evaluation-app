import React from "react";
import { Badge } from "../../../ui/badge";
import { formatLastAssessed } from "../utils/date-utils";

export interface SkillCardFooterProps {
  skill: {
    lastAssessed?: string | Date;
    source?: "MANUAL" | "ASSESSMENT" | "GITHUB" | "AI_SUGGESTED" | "IMPORTED";
  };
  showLastAssessed?: boolean;
}

export const SkillCardFooter: React.FC<SkillCardFooterProps> = ({
  skill,
  showLastAssessed = true,
}) => {
  return (
    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
      {showLastAssessed && (
        <span>Last assessed: {formatLastAssessed(skill.lastAssessed)}</span>
      )}
      {skill.source && skill.source !== "MANUAL" && (
        <Badge variant="outline" className="text-xs">
          {skill.source.toLowerCase().replace("_", " ")}
        </Badge>
      )}
    </div>
  );
};
