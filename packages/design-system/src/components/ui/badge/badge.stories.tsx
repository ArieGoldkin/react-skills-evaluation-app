import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  Star,
  Tag,
  User,
} from "lucide-react";
import * as React from "react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A badge is a small status descriptor for UI elements. Supports multiple variants, sizes, interactive features, icons, and removal functionality.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "success",
        "warning",
        "info",
      ],
      description: "Visual variant of the badge",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Size of the badge",
    },
    shape: {
      control: "select",
      options: ["default", "square"],
      description: "Shape of the badge",
    },
    removable: {
      control: "boolean",
      description: "Whether the badge can be removed",
    },
    dot: {
      control: "boolean",
      description: "Whether to show a dot indicator",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the icon",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic Examples
export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

// Status Variants
export const StatusVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="destructive">Error</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badge supports status variants for different states and conditions.",
      },
    },
  },
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badge comes in three sizes: small, default, and large.",
      },
    },
  },
};

// Shape Variants
export const ShapeVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge shape="default">Rounded</Badge>
      <Badge shape="square">Square</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badge supports both rounded (default) and square shapes.",
      },
    },
  },
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge icon={<Star className="h-3 w-3" />}>Starred</Badge>
      <Badge variant="success" icon={<CheckCircle className="h-3 w-3" />}>
        Completed
      </Badge>
      <Badge variant="warning" icon={<AlertCircle className="h-3 w-3" />}>
        Warning
      </Badge>
      <Badge
        variant="info"
        icon={<Clock className="h-3 w-3" />}
        iconPosition="right"
      >
        Pending
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badge can include icons on either the left or right side.",
      },
    },
  },
};

// With Dot Indicators
export const WithDotIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge dot>Online</Badge>
      <Badge variant="warning" dot>
        Away
      </Badge>
      <Badge variant="destructive" dot>
        Busy
      </Badge>
      <Badge variant="secondary" dot>
        Offline
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badge can include a small dot indicator for status representation.",
      },
    },
  },
};

// Removable Badges
export const RemovableBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge removable onRemove={() => console.log("Removed default badge")}>
        Removable
      </Badge>
      <Badge
        variant="secondary"
        removable
        onRemove={() => console.log("Removed secondary badge")}
      >
        Tag
      </Badge>
      <Badge
        variant="success"
        removable
        icon={<Tag className="h-3 w-3" />}
        onRemove={() => console.log("Removed success badge")}
      >
        Category
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badge can be made removable with an X button. Click the X to remove.",
      },
    },
  },
};

// Interactive Badges
export const InteractiveBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge onClick={() => console.log("Clicked default badge")}>
        Clickable
      </Badge>
      <Badge
        variant="outline"
        onClick={() => console.log("Clicked outline badge")}
        icon={<User className="h-3 w-3" />}
      >
        Profile
      </Badge>
      <Badge
        variant="secondary"
        onClick={() => console.log("Clicked secondary badge")}
        removable
        onRemove={() => console.log("Removed clickable badge")}
      >
        Interactive & Removable
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badge can be made interactive with onClick handlers. They support keyboard navigation.",
      },
    },
  },
};

// Complex Examples
export const ComplexExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Notification Badge</h4>
        <Badge variant="destructive" size="sm" shape="default">
          3
        </Badge>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Status with Icon and Dot</h4>
        <Badge variant="success" icon={<CheckCircle className="h-3 w-3" />} dot>
          Verified
        </Badge>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Large Interactive Badge</h4>
        <Badge
          size="lg"
          variant="outline"
          onClick={() => console.log("Large badge clicked")}
          icon={<Mail className="h-4 w-4" />}
        >
          Contact Support
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples of badges in various complex configurations.",
      },
    },
  },
};

// Real-world Examples
export const TagsExample: Story = {
  render: () => (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Article Tags</h4>
      <div className="flex flex-wrap gap-2">
        {[
          "React",
          "TypeScript",
          "Design System",
          "UI Components",
          "Storybook",
        ].map(tag => (
          <Badge
            key={tag}
            variant="secondary"
            removable
            onRemove={() => console.log(`Removed tag: ${tag}`)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of badges used as removable tags for content categorization.",
      },
    },
  },
};

export const StatusIndicatorsExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Server Status</h4>
        <div className="flex gap-2">
          <Badge variant="success" dot>
            Online
          </Badge>
          <Badge variant="warning" dot>
            Maintenance
          </Badge>
          <Badge variant="destructive" dot>
            Offline
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Task Status</h4>
        <div className="flex gap-2">
          <Badge variant="info" icon={<Clock className="h-3 w-3" />}>
            Pending
          </Badge>
          <Badge variant="warning" icon={<AlertCircle className="h-3 w-3" />}>
            In Review
          </Badge>
          <Badge variant="success" icon={<CheckCircle className="h-3 w-3" />}>
            Completed
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples of badges used for status indicators in different contexts.",
      },
    },
  },
};

export const NotificationExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Notification Counts</h4>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Messages</span>
            <Badge variant="destructive" size="sm" shape="default">
              12
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Comments</span>
            <Badge variant="warning" size="sm" shape="default">
              3
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Updates</span>
            <Badge variant="info" size="sm" shape="default">
              7
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of badges used for notification counts and indicators.",
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  args: {
    children: "Interactive Badge",
    variant: "default",
    size: "default",
    shape: "default",
    removable: false,
    dot: false,
    iconPosition: "left",
  },
  render: args => <Badge {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example where you can modify the props using the controls panel.",
      },
    },
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Basic Variants</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Status Variants</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Sizes</h4>
        <div className="flex items-center gap-2">
          <Badge size="sm">Small</Badge>
          <Badge size="default">Default</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Shapes</h4>
        <div className="flex gap-2">
          <Badge shape="default">Rounded</Badge>
          <Badge shape="square">Square</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete showcase of all badge variants, sizes, and shapes.",
      },
    },
  },
};
