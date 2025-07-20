import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "../button";

const meta: Meta<typeof Card> = {
  title: "Components/UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outlined", "elevated", "ghost"],
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "default", "lg"],
    },
    clickable: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description text goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content area where you can place any content.</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Simple: Story = {
  args: {
    children: (
      <CardContent>
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    ),
  },
};

export const WithoutFooter: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Article Title</CardTitle>
          <CardDescription>Published on March 15, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This is an article preview card without a footer. The content can be
            any length and will flow naturally within the card boundaries.
          </p>
        </CardContent>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: (
      <>
        <CardHeader>
          <CardTitle>Outlined Card</CardTitle>
          <CardDescription>
            This card has a more prominent border
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content in an outlined card variant.</p>
        </CardContent>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>
            This card appears to float with a shadow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content in an elevated card with enhanced shadow.</p>
        </CardContent>
      </>
    ),
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: (
      <>
        <CardHeader>
          <CardTitle>Ghost Card</CardTitle>
          <CardDescription>This card has no border or shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content in a ghost card variant with transparent background.</p>
        </CardContent>
      </>
    ),
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    onClick: () => alert("Card clicked!"),
    children: (
      <>
        <CardHeader>
          <CardTitle>Clickable Card</CardTitle>
          <CardDescription>
            Click anywhere on this card to trigger an action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This entire card is clickable and focusable.</p>
        </CardContent>
      </>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: "sm",
    children: (
      <>
        <CardHeader padding="sm">
          <CardTitle size="sm">Compact Card</CardTitle>
          <CardDescription size="sm">
            Smaller padding for dense layouts
          </CardDescription>
        </CardHeader>
        <CardContent padding="sm">
          <p>This card uses small padding throughout.</p>
        </CardContent>
        <CardFooter padding="sm">
          <Button size="sm">Small Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: "lg",
    children: (
      <>
        <CardHeader padding="lg">
          <CardTitle size="lg">Spacious Card</CardTitle>
          <CardDescription size="lg">
            Large padding for important content
          </CardDescription>
        </CardHeader>
        <CardContent padding="lg">
          <p>This card uses large padding for a more spacious feel.</p>
        </CardContent>
        <CardFooter padding="lg">
          <Button size="lg">Large Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: "none",
    children: (
      <>
        <div className="p-6 border-b">
          <CardTitle>Custom Padding</CardTitle>
          <CardDescription>
            When you need full control over spacing
          </CardDescription>
        </div>
        <div className="p-6">
          <p>This card has no built-in padding, allowing custom spacing.</p>
        </div>
      </>
    ),
  },
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="w-full h-48 bg-muted rounded-md mb-4"></div>
        <CardTitle>Premium Headphones</CardTitle>
        <CardDescription>
          High-quality wireless headphones with noise cancellation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">$299.99</span>
          <span className="text-sm text-muted-foreground line-through">
            $399.99
          </span>
        </div>
        <div className="mt-2">
          <span className="text-sm text-green-600">✓ Free shipping</span>
        </div>
      </CardContent>
      <CardFooter justify="between">
        <Button variant="outline">Add to Cart</Button>
        <Button>Buy Now</Button>
      </CardFooter>
    </Card>
  ),
};

export const UserProfileCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-muted rounded-full"></div>
          <div>
            <CardTitle size="sm">Sarah Johnson</CardTitle>
            <CardDescription>UX Designer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Passionate about creating intuitive user experiences and bridging the
          gap between design and development.
        </p>
        <div className="flex space-x-4 mt-4 text-sm text-muted-foreground">
          <span>🏢 Design Corp</span>
          <span>📍 San Francisco</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const StatisticsCard: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle size="sm">Total Revenue</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">$45,231.89</div>
        <div className="text-sm text-green-600 mt-1">
          +20.1% from last month
        </div>
      </CardContent>
    </Card>
  ),
};

export const NotificationCard: Story = {
  render: () => (
    <Card variant="outlined" className="w-[400px]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle size="sm">New Message</CardTitle>
            <CardDescription>2 minutes ago</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p>
          You have received a new message from John Doe regarding the project
          proposal.
        </p>
      </CardContent>
      <CardFooter justify="end">
        <Button variant="outline" size="sm">
          Dismiss
        </Button>
        <Button size="sm">View Message</Button>
      </CardFooter>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle size="sm">Default</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Standard card with border and shadow</p>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle size="sm">Outlined</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Prominent border emphasis</p>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle size="sm">Elevated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Enhanced shadow, no border</p>
        </CardContent>
      </Card>

      <Card variant="ghost">
        <CardHeader>
          <CardTitle size="sm">Ghost</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Transparent, minimal styling</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const AllPadding: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
      <Card padding="sm">
        <CardHeader padding="sm">
          <CardTitle size="sm">Small Padding</CardTitle>
        </CardHeader>
        <CardContent padding="sm">
          <p className="text-sm">Compact spacing</p>
        </CardContent>
      </Card>

      <Card padding="default">
        <CardHeader padding="default">
          <CardTitle size="sm">Default Padding</CardTitle>
        </CardHeader>
        <CardContent padding="default">
          <p className="text-sm">Standard spacing</p>
        </CardContent>
      </Card>

      <Card padding="lg">
        <CardHeader padding="lg">
          <CardTitle size="sm">Large Padding</CardTitle>
        </CardHeader>
        <CardContent padding="lg">
          <p className="text-sm">Spacious layout</p>
        </CardContent>
      </Card>

      <Card padding="none">
        <div className="p-4">
          <CardTitle size="sm">No Padding</CardTitle>
          <p className="text-sm mt-2">Custom spacing control</p>
        </div>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="grid gap-4 w-full max-w-md">
      <Card
        clickable
        onClick={() => alert("Navigation card clicked!")}
        className="transition-all hover:scale-105"
      >
        <CardHeader>
          <CardTitle size="sm">Navigation Card</CardTitle>
          <CardDescription>Click to navigate</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">This card acts as a navigation element</p>
        </CardContent>
      </Card>

      <Card clickable onClick={() => alert("Action card clicked!")}>
        <CardHeader>
          <CardTitle size="sm">Action Card</CardTitle>
          <CardDescription>Keyboard accessible</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Try clicking or using Enter/Space keys</p>
        </CardContent>
      </Card>
    </div>
  ),
};
