import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../../ui";
import { Header } from "./header";

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    showThemeToggle: {
      control: { type: "boolean" },
    },
    fixed: {
      control: { type: "boolean" },
    },
    transparent: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: <h1 className="text-xl font-bold">Skills Evaluation</h1>,
    showThemeToggle: true,
  },
};

export const WithNavigation: Story = {
  args: {
    logo: <h1 className="text-xl font-bold">Skills Evaluation</h1>,
    navigation: (
      <>
        <a href="#" className="text-sm font-medium hover:text-primary">
          Dashboard
        </a>
        <a href="#" className="text-sm font-medium hover:text-primary">
          Skills
        </a>
        <a href="#" className="text-sm font-medium hover:text-primary">
          Analytics
        </a>
      </>
    ),
    showThemeToggle: true,
  },
};

export const WithActions: Story = {
  args: {
    logo: <h1 className="text-xl font-bold">Skills Evaluation</h1>,
    navigation: (
      <>
        <a href="#" className="text-sm font-medium hover:text-primary">
          Dashboard
        </a>
        <a href="#" className="text-sm font-medium hover:text-primary">
          Skills
        </a>
      </>
    ),
    actions: (
      <>
        <Button variant="ghost" size="sm">
          Profile
        </Button>
        <Button size="sm">Sign Out</Button>
      </>
    ),
    showThemeToggle: true,
  },
};

export const Fixed: Story = {
  args: {
    logo: <h1 className="text-xl font-bold">Skills Evaluation</h1>,
    showThemeToggle: true,
    fixed: true,
  },
  render: args => (
    <div className="h-screen">
      <Header {...args} />
      <div className="pt-16 p-8">
        <p className="text-muted-foreground">
          Scroll down to see the fixed header behavior
        </p>
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i} className="my-4">
            Content line {i + 1}
          </p>
        ))}
      </div>
    </div>
  ),
};

export const Transparent: Story = {
  args: {
    logo: <h1 className="text-xl font-bold text-white">Skills Evaluation</h1>,
    showThemeToggle: true,
    transparent: true,
  },
  render: args => (
    <div
      className="h-screen bg-gradient-to-br from-blue-600 to-purple-600"
      style={{
        backgroundImage:
          'url("https://source.unsplash.com/1600x900/?abstract")',
      }}
    >
      <Header {...args} />
      <div className="p-8">
        <p className="text-white">Transparent header over background</p>
      </div>
    </div>
  ),
};

export const NoThemeToggle: Story = {
  args: {
    logo: <h1 className="text-xl font-bold">Skills Evaluation</h1>,
    showThemeToggle: false,
    actions: <Button size="sm">Sign In</Button>,
  },
};
