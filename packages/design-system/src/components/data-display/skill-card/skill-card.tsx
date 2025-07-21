import { cn } from "@/lib/cn";
import { type VariantProps } from "class-variance-authority";
import React from "react";
import { Badge } from "../../ui/badge";
import {
  ProficiencyIndicator,
  SkillCardFooter,
  SkillCardHeader,
} from "./components";
import { skillCardVariants } from "./constants/variants";

export interface SkillCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skillCardVariants> {
  skill: {
    id: string;
    name: string;
    proficiency: number;
    category?: {
      name: string;
      color?: string;
    };
    description?: string;
    tags?: string[];
    verified?: boolean;
    lastAssessed?: string | Date;
    source?: "MANUAL" | "ASSESSMENT" | "GITHUB" | "AI_SUGGESTED" | "IMPORTED";
  };
  onEdit?: (skillId: string) => void;
  onDelete?: (skillId: string) => void;
  showActions?: boolean;
  showDescription?: boolean;
  showTags?: boolean;
  showLastAssessed?: boolean;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  variant,
  size,
  interactive,
  onEdit,
  onDelete,
  showActions = true,
  showDescription = true,
  showTags = true,
  showLastAssessed = true,
  className,
  onClick,
  ...props
}) => {
  const cardVariant = skill.verified ? "verified" : variant;

  return (
    <div
      className={cn(
        skillCardVariants({ variant: cardVariant, size, interactive }),
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Header */}
      <SkillCardHeader
        skill={skill}
        onEdit={onEdit}
        onDelete={onDelete}
        showActions={showActions}
      />

      {/* Proficiency Indicator */}
      <div className="mb-3">
        <ProficiencyIndicator
          proficiency={skill.proficiency}
          size={size === "compact" ? "sm" : "md"}
        />
      </div>

      {/* Description */}
      {showDescription && skill.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {skill.description}
        </p>
      )}

      {/* Tags */}
      {showTags && skill.tags && skill.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {skill.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-0">
              {tag}
            </Badge>
          ))}
          {skill.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0">
              +{skill.tags.length - 3}
            </Badge>
          )}
        </div>
      )}

      {/* Footer */}
      <SkillCardFooter skill={skill} showLastAssessed={showLastAssessed} />
    </div>
  );
};

export default SkillCard;
