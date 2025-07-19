import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { GridItem, SampleCard } from "./components";
import { Grid } from "./grid";

const meta: Meta<typeof Grid> = {
  title: "Components/Layout/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Grid

A flexible grid layout component built on CSS Grid with responsive capabilities and customizable spacing.

## Features

- **Flexible Columns**: Support for 1, 2, 3, 4, 6, and 12 column layouts
- **Responsive Design**: Built-in responsive breakpoints
- **Customizable Gaps**: Multiple gap sizes from none to extra large
- **Polymorphic**: Can render as different HTML elements
- **Tailwind Integration**: Uses Tailwind CSS classes for styling

## Usage

\`\`\`tsx
import { Grid } from "@skills-eval/design-system";

export function ProductGrid() {
  return (
    <Grid cols={3} gap="lg">
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Grid>
  );
}
\`\`\`

## Responsive Usage

\`\`\`tsx
<Grid responsive gap="md">
  {/* Automatically adjusts: 1 col on mobile, 2 on tablet, 3 on desktop */}
  <Card />
  <Card />
  <Card />
</Grid>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 6, 12],
      description: "Number of columns in the grid",
    },
    gap: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Gap size between grid items",
    },
    responsive: {
      control: { type: "boolean" },
      description:
        "Enable responsive behavior (1 col mobile, 2 tablet, 3 desktop)",
    },
    as: {
      control: { type: "text" },
      description: "HTML element to render as",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories
export const Default: Story = {
  args: {
    cols: 3,
    gap: "md",
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </>
    ),
  },
};

export const ResponsiveGrid: Story = {
  args: {
    responsive: true,
    gap: "md",
    children: (
      <>
        <SampleCard
          title="Responsive Card 1"
          content="This grid automatically adjusts: 1 column on mobile, 2 on tablet, 3 on desktop."
        />
        <SampleCard
          title="Responsive Card 2"
          content="Resize your browser window to see the responsive behavior in action."
        />
        <SampleCard
          title="Responsive Card 3"
          content="Perfect for product grids, image galleries, and content layouts."
        />
      </>
    ),
  },
};

export const NoGap: Story = {
  args: {
    cols: 3,
    gap: "none",
    children: (
      <>
        <GridItem className="border-r border-b">No Gap 1</GridItem>
        <GridItem className="border-r border-b">No Gap 2</GridItem>
        <GridItem className="border-b">No Gap 3</GridItem>
        <GridItem className="border-r">No Gap 4</GridItem>
        <GridItem className="border-r">No Gap 5</GridItem>
        <GridItem>No Gap 6</GridItem>
      </>
    ),
  },
};
