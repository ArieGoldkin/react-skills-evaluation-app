# Storybook Stories Template

## Basic Stories Structure

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Component } from "./component";

const meta: Meta<typeof Component> = {
  title: "Components/[Category]/Component",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Component content",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Component variant="default">Default</Component>
      <Component variant="secondary">Secondary</Component>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: "Interactive example",
  },
  play: async ({ canvasElement }) => {
    // Add interaction testing here
  },
};
```

## Story Categories
- `Components/UI/` - Base UI components
- `Components/Layout/` - Layout components
- `Components/Forms/` - Form components
- `Components/Data Display/` - Data visualization
- `Components/Feedback/` - User feedback
- `Components/Navigation/` - Navigation components