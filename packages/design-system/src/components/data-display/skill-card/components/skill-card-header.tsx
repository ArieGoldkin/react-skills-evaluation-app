import React from "react";
import { Badge } from "../../../ui/badge";

export interface SkillCardHeaderProps {
  skill: {
    id: string;
    name: string;
    category?: {
      name: string;
      color?: string;
    };
    verified?: boolean;
  };
  onEdit?: (skillId: string) => void;
  onDelete?: (skillId: string) => void;
  showActions?: boolean;
}

export const SkillCardHeader: React.FC<SkillCardHeaderProps> = ({
  skill,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(skill.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(skill.id);
  };

  return (
    <div className="mb-3 flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {skill.name}
          </h3>
          {skill.verified && (
            <div className="flex-shrink-0">
              <svg
                className="h-4 w-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-label="Verified skill"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        {skill.category && (
          <Badge
            variant="secondary"
            className="text-xs"
            style={{
              backgroundColor: skill.category.color + "20",
              color: skill.category.color,
            }}
          >
            {skill.category.name}
          </Badge>
        )}
      </div>

      {showActions && (onEdit || onDelete) && (
        <div className="flex items-center gap-1 ml-2">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="rounded p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Edit skill"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="rounded p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              aria-label="Delete skill"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
