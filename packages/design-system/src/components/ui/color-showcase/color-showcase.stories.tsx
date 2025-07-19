import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ColorShowcase } from "./color-showcase";

const meta: Meta<typeof ColorShowcase> = {
  title: "Design System/Color Showcase",
  component: ColorShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Professional Blue Color Palette

A comprehensive showcase of the Professional Blue color system designed for the Skills Evaluation App. 
This palette conveys trust, expertise, and professionalism through carefully selected blue, slate, and emerald colors.

## Features

- **Primary Blue Scale**: 11 shades from light to dark for primary actions and branding
- **Secondary Slate Scale**: 10 neutral shades for text, backgrounds, and subtle elements  
- **Accent Emerald**: 3 shades for success states and positive feedback
- **Design System Integration**: Semantic tokens mapped to specific use cases
- **Dark Mode Support**: Automatic color adjustments for dark themes
- **Accessibility Compliant**: All combinations meet WCAG AA contrast requirements

## Usage

The color system is available through both Tailwind classes and CSS variables:

\`\`\`tsx
// Tailwind classes
<div className="bg-primary-100 text-primary-900">Light primary background</div>
<button className="bg-primary hover:bg-primary-700">Primary button</button>

// CSS variables  
<div style={{ backgroundColor: 'hsl(var(--primary-100))' }}>Custom styling</div>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LightMode: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      theme: "dark",
    },
  },
  decorators: [
    Story => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
