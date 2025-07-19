import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AppLayout } from "./layout/app-layout/app-layout";
import {
  ComponentShowcase,
  OverviewFooter,
  OverviewHeader,
  OverviewSidebar,
} from "./overview/components";

const meta: Meta = {
  title: "Design System/Overview",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Design System Overview

This story showcases all the available components in the Skills Evaluation App design system working together in a realistic application layout.

## Available Components

### Layout Components
- **AppLayout**: Main application layout with header, sidebar, and footer
- **Container**: Responsive container with max-width constraints
- **Grid**: Flexible CSS Grid layout with responsive capabilities

### UI Components  
- **Button**: Primary action component with multiple variants
- **ColorShowcase**: Professional Blue color palette demonstration

## Component Integration

All components are designed to work seamlessly together using the Professional Blue color system and consistent spacing/typography scales.
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DesignSystemOverview: Story = {
  render: () => (
    <AppLayout
      header={<OverviewHeader />}
      sidebar={<OverviewSidebar />}
      footer={<OverviewFooter />}
    >
      <ComponentShowcase />
    </AppLayout>
  ),
};

export const ComponentsOnly: Story = {
  render: () => <ComponentShowcase />,
};
