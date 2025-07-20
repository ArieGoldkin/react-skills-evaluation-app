import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Data Display/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An image element with a fallback for representing the user. Supports size variants, status indicators, and multiple shapes.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Size of the avatar",
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
      description: "Shape of the avatar",
    },
    status: {
      control: "select",
      options: ["online", "offline", "busy", "away"],
      description: "Status indicator for the avatar",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Basic Examples
export const Default: Story = {
  args: {
    size: "md",
    shape: "circle",
  },
  render: args => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback name="John Doe" />
    </Avatar>
  ),
};

export const WithFallback: Story = {
  args: {
    size: "md",
    shape: "circle",
  },
  render: args => (
    <Avatar {...args}>
      <AvatarImage src="/broken-image.jpg" alt="Broken image" />
      <AvatarFallback name="John Doe" />
    </Avatar>
  ),
};

export const CustomFallback: Story = {
  args: {
    size: "md",
    shape: "circle",
  },
  render: args => (
    <Avatar {...args}>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="John Doe" />
      </Avatar>
      <Avatar size="sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="John Doe" />
      </Avatar>
      <Avatar size="md">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="John Doe" />
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="John Doe" />
      </Avatar>
      <Avatar size="xl">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="John Doe" />
      </Avatar>
      <Avatar size="2xl">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="John Doe" />
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatar supports 6 different sizes: xs (24px), sm (32px), md (40px), lg (48px), xl (64px), and 2xl (80px).",
      },
    },
  },
};

// Shape Variants
export const ShapeVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="circle" size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="John Doe" />
      </Avatar>
      <Avatar shape="square" size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="John Doe" />
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatar supports both circle (default) and square shapes.",
      },
    },
  },
};

// Status Indicators
export const WithStatusIndicators: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar status="online" size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="John Doe" />
      </Avatar>
      <Avatar status="offline" size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="Jane Smith" />
      </Avatar>
      <Avatar status="busy" size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="Bob Wilson" />
      </Avatar>
      <Avatar status="away" size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="Alice Johnson" />
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatar supports status indicators: online (green), offline (gray), busy (red), and away (yellow).",
      },
    },
  },
};

// Fallback Examples
export const FallbackExamples: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarFallback name="John Doe" />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback name="Jane Smith" />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback name="Bob" />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback name="Alice Johnson Wilson" />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>+5</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatar automatically generates initials from names. For single names, it uses the first letter. For multiple names, it uses the first and last letters. You can also provide custom fallback content.",
      },
    },
  },
};

// Combined Features
export const AllFeaturesCombined: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {/* Circle with status */}
      <Avatar size="xl" status="online" shape="circle">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="John Doe" />
      </Avatar>

      {/* Square with status */}
      <Avatar size="xl" status="busy" shape="square">
        <AvatarFallback name="Jane Smith" />
      </Avatar>

      {/* Different sizes with status */}
      <Avatar size="lg" status="away">
        <AvatarFallback name="Bob Wilson" />
      </Avatar>

      <Avatar size="md" status="offline">
        <AvatarFallback name="Alice Johnson" />
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples combining different sizes, shapes, and status indicators.",
      },
    },
  },
};

// Real-world Examples
export const UserProfileExample: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 border rounded-lg">
      <Avatar size="lg" status="online">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback name="John Doe" />
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium text-foreground">John Doe</span>
        <span className="text-sm text-muted-foreground">Online</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of avatar used in a user profile context with status information.",
      },
    },
  },
};

export const TeamMembersExample: Story = {
  render: () => (
    <div className="space-y-3">
      <h3 className="font-medium">Team Members</h3>
      <div className="space-y-2">
        {[
          {
            name: "John Doe",
            status: "online" as const,
            role: "Product Manager",
          },
          {
            name: "Jane Smith",
            status: "busy" as const,
            role: "Lead Developer",
          },
          { name: "Bob Wilson", status: "away" as const, role: "Designer" },
          {
            name: "Alice Johnson",
            status: "offline" as const,
            role: "QA Engineer",
          },
        ].map(member => (
          <div
            key={member.name}
            className="flex items-center gap-3 p-2 hover:bg-muted rounded-md"
          >
            <Avatar size="md" status={member.status}>
              <AvatarFallback name={member.name} />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{member.name}</span>
              <span className="text-xs text-muted-foreground">
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of avatars used in a team members list with status indicators.",
      },
    },
  },
};

export const AvatarGroupExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="font-medium">Project Collaborators</h3>
      <div className="flex -space-x-2">
        <Avatar size="md" className="border-2 border-background">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback name="John Doe" />
        </Avatar>
        <Avatar size="md" className="border-2 border-background">
          <AvatarFallback name="Jane Smith" />
        </Avatar>
        <Avatar size="md" className="border-2 border-background">
          <AvatarFallback name="Bob Wilson" />
        </Avatar>
        <Avatar size="md" className="border-2 border-background">
          <AvatarFallback name="Alice Johnson" />
        </Avatar>
        <Avatar size="md" className="border-2 border-background">
          <AvatarFallback>+3</AvatarFallback>
        </Avatar>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of overlapping avatars in a group formation, commonly used to show multiple collaborators.",
      },
    },
  },
};

// Interactive Examples
export const Interactive: Story = {
  args: {
    size: "lg",
    shape: "circle",
    status: "online",
  },
  render: args => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback name="John Doe" />
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example where you can modify the props using the controls panel.",
      },
    },
  },
};
