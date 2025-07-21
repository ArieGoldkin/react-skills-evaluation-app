import type { Meta, StoryObj } from "@storybook/react";
import { PositionedThemeToggle } from "./positioned-theme-toggle";

const meta = {
  title: "Theme/PositionedThemeToggle",
  component: PositionedThemeToggle,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["button", "switch"],
    },
    showLabel: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof PositionedThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: "top-right",
    size: "md",
    variant: "button",
    showLabel: false,
  },
};

export const TopLeft: Story = {
  args: {
    position: "top-left",
    size: "md",
    variant: "button",
  },
};

export const BottomRight: Story = {
  args: {
    position: "bottom-right",
    size: "md",
    variant: "button",
  },
};

export const WithLabel: Story = {
  args: {
    position: "top-right",
    size: "md",
    variant: "button",
    showLabel: true,
  },
};

export const SwitchVariant: Story = {
  args: {
    position: "top-right",
    size: "md",
    variant: "switch",
    showLabel: true,
  },
};

export const CustomOffset: Story = {
  args: {
    position: "top-right",
    offset: {
      top: "3rem",
      right: "3rem",
    },
    size: "lg",
    variant: "button",
  },
};
