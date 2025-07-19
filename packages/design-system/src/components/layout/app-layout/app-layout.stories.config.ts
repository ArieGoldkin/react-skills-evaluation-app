import type { Meta } from "@storybook/react";
import { AppLayout } from "./app-layout";

export const meta: Meta<typeof AppLayout> = {
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
