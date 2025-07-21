import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { SkillCard } from "./skill-card";

const meta: Meta<typeof SkillCard> = {
  title: "Data Display/SkillCard",
  component: SkillCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A versatile card component for displaying individual skills with proficiency levels, categories, and metadata.

## Features
- Visual proficiency indicator (0-10 scale)
- Category badges with custom colors
- Verification status indicator
- Editable actions (edit/delete)
- Multiple size variants
- Source attribution (manual, GitHub, AI, etc.)
- Last assessed timestamp
- Tags and descriptions
- Interactive and non-interactive modes
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "verified"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["compact", "default", "detailed"],
      description: "Card size",
    },
    interactive: {
      control: "boolean",
      description: "Whether the card is clickable",
    },
    showActions: {
      control: "boolean",
      description: "Show edit/delete buttons",
    },
    showDescription: {
      control: "boolean",
      description: "Show skill description",
    },
    showTags: {
      control: "boolean",
      description: "Show skill tags",
    },
    showLastAssessed: {
      control: "boolean",
      description: "Show last assessed date",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkillCard>;

// Sample skill data
const basicSkill = {
  id: "1",
  name: "React",
  proficiency: 8,
  category: {
    name: "Frontend Development",
    color: "#3B82F6",
  },
  description:
    "Component-based JavaScript library for building user interfaces",
  tags: ["JavaScript", "UI", "Components", "Hooks"],
  verified: false,
  lastAssessed: "2024-01-15",
  source: "MANUAL" as const,
};

const verifiedSkill = {
  id: "2",
  name: "TypeScript",
  proficiency: 9,
  category: {
    name: "Programming Languages",
    color: "#8B5CF6",
  },
  description: "Strongly typed programming language that builds on JavaScript",
  tags: ["Types", "JavaScript", "Static Analysis"],
  verified: true,
  lastAssessed: "2024-01-20",
  source: "ASSESSMENT" as const,
};

const githubSkill = {
  id: "3",
  name: "Node.js",
  proficiency: 6,
  category: {
    name: "Backend Development",
    color: "#10B981",
  },
  description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
  tags: ["JavaScript", "Server", "Runtime", "NPM"],
  verified: false,
  lastAssessed: "2023-12-10",
  source: "GITHUB" as const,
};

export const Default: Story = {
  args: {
    skill: basicSkill,
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
  },
};

export const Verified: Story = {
  args: {
    skill: verifiedSkill,
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
  },
};

export const FromGitHub: Story = {
  args: {
    skill: githubSkill,
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
  },
};

export const Compact: Story = {
  args: {
    skill: basicSkill,
    size: "compact",
    showDescription: false,
    showTags: false,
    showLastAssessed: false,
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
  },
};

export const Detailed: Story = {
  args: {
    skill: {
      ...basicSkill,
      description:
        "A comprehensive JavaScript library for building user interfaces with component-based architecture, hooks for state management, and a rich ecosystem of tools and libraries.",
      tags: [
        "JavaScript",
        "UI",
        "Components",
        "Hooks",
        "JSX",
        "Virtual DOM",
        "State Management",
      ],
    },
    size: "detailed",
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
  },
};

export const Interactive: Story = {
  args: {
    skill: basicSkill,
    interactive: true,
    onClick: action("onClick"),
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
  },
};

export const NoActions: Story = {
  args: {
    skill: basicSkill,
    showActions: false,
  },
};

export const PrimaryVariant: Story = {
  args: {
    skill: basicSkill,
    variant: "primary",
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
  },
};

export const ProficiencyLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Proficiency Levels (0-10)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[0, 2, 4, 6, 8, 10].map(proficiency => (
          <SkillCard
            key={proficiency}
            skill={{
              ...basicSkill,
              id: `skill-${proficiency}`,
              name: `Skill Level ${proficiency}`,
              proficiency,
            }}
            showActions={false}
            showDescription={false}
            showTags={false}
            showLastAssessed={false}
          />
        ))}
      </div>
    </div>
  ),
};

export const SkillSources: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Different Skill Sources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkillCard
          skill={{
            ...basicSkill,
            name: "Manual Entry",
            source: "MANUAL",
          }}
          showActions={false}
        />
        <SkillCard
          skill={{
            ...basicSkill,
            name: "From Assessment",
            source: "ASSESSMENT",
            verified: true,
          }}
          showActions={false}
        />
        <SkillCard
          skill={{
            ...basicSkill,
            name: "GitHub Analysis",
            source: "GITHUB",
          }}
          showActions={false}
        />
        <SkillCard
          skill={{
            ...basicSkill,
            name: "AI Suggested",
            source: "AI_SUGGESTED",
          }}
          showActions={false}
        />
      </div>
    </div>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { ...basicSkill, name: "React", proficiency: 8 },
        { ...verifiedSkill, name: "TypeScript", proficiency: 9 },
        { ...githubSkill, name: "Node.js", proficiency: 6 },
        { ...basicSkill, name: "CSS", proficiency: 7, id: "4" },
        { ...basicSkill, name: "JavaScript", proficiency: 9, id: "5" },
        { ...basicSkill, name: "HTML", proficiency: 10, id: "6" },
      ].map(skill => (
        <SkillCard
          key={skill.id}
          skill={skill}
          interactive
          onClick={action(`onClick-${skill.name}`)}
          onEdit={action(`onEdit-${skill.name}`)}
          onDelete={action(`onDelete-${skill.name}`)}
        />
      ))}
    </div>
  ),
};
