import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AppLayout } from "./app-layout";
import { InteractiveStory } from "./interactive-story";
import {
  SampleContent,
  SampleFooter,
  SampleHeader,
  SampleSidebar,
} from "./sample-components";

const meta: Meta<typeof AppLayout> = {
  title: "Components/Layout/AppLayout",
  component: AppLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# AppLayout

A flexible application layout component that provides a consistent structure for web applications with header, sidebar, main content, and footer areas.

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Collapsible Sidebar**: Optional sidebar that can be collapsed
- **Sticky Header**: Header stays at the top when scrolling
- **Flexible Content Areas**: All sections are optional and customizable
- **Backdrop Blur**: Modern glass-morphism effect on header

## Usage

\`\`\`tsx
import { AppLayout } from "@skills-eval/design-system";

export function App() {
  return (
    <AppLayout
      header={<Header />}
      sidebar={<Sidebar />}
      footer={<Footer />}
    >
      <MainContent />
    </AppLayout>
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    sidebarCollapsed: {
      control: { type: "boolean" },
      description: "Whether the sidebar should be collapsed",
    },
    header: {
      control: false,
      description: "Header content to display at the top",
    },
    sidebar: {
      control: false,
      description: "Sidebar content to display on the left",
    },
    footer: {
      control: false,
      description: "Footer content to display at the bottom",
    },
    children: {
      control: false,
      description: "Main content area",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories
export const Default: Story = {
  args: {
    header: <SampleHeader />,
    sidebar: <SampleSidebar />,
    footer: <SampleFooter />,
    children: <SampleContent />,
  },
};

export const WithCollapsedSidebar: Story = {
  args: {
    header: <SampleHeader />,
    sidebar: <SampleSidebar collapsed={true} />,
    footer: <SampleFooter />,
    children: <SampleContent />,
    sidebarCollapsed: true,
  },
};

export const HeaderOnly: Story = {
  args: {
    header: <SampleHeader />,
    children: <SampleContent />,
  },
};

export const SidebarOnly: Story = {
  args: {
    sidebar: <SampleSidebar />,
    children: <SampleContent />,
  },
};

export const ContentOnly: Story = {
  args: {
    children: <SampleContent />,
  },
};

export const FullLayout: Story = {
  args: {
    header: <SampleHeader />,
    sidebar: <SampleSidebar />,
    footer: <SampleFooter />,
    children: <SampleContent />,
  },
};

export const Interactive: Story = {
  render: () => <InteractiveStory />,
};
