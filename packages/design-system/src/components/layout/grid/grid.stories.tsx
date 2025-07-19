import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
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

// Sample grid item component
const GridItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`p-4 bg-card border rounded-lg text-center ${className}`}>
    <div className="text-card-foreground font-medium">{children}</div>
  </div>
);

// Sample card component
const SampleCard = ({ title, content }: { title: string; content: string }) => (
  <div className="p-4 bg-card border rounded-lg">
    <h3 className="font-semibold text-card-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{content}</p>
    <div className="mt-3">
      <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90">
        Learn More
      </button>
    </div>
  </div>
);

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

export const SingleColumn: Story = {
  args: {
    cols: 1,
    gap: "md",
    children: (
      <>
        <GridItem>Full Width Item 1</GridItem>
        <GridItem>Full Width Item 2</GridItem>
        <GridItem>Full Width Item 3</GridItem>
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    cols: 2,
    gap: "lg",
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    gap: "sm",
    children: (
      <>
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
        <GridItem>5</GridItem>
        <GridItem>6</GridItem>
        <GridItem>7</GridItem>
        <GridItem>8</GridItem>
      </>
    ),
  },
};

export const TwelveColumns: Story = {
  args: {
    cols: 12,
    gap: "sm",
    children: (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <GridItem key={i}>{i + 1}</GridItem>
        ))}
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
        <SampleCard
          title="Responsive Card 4"
          content="The responsive prop overrides the cols setting for automatic breakpoints."
        />
        <SampleCard
          title="Responsive Card 5"
          content="Great for creating flexible layouts that work on all devices."
        />
        <SampleCard
          title="Responsive Card 6"
          content="Built with Tailwind CSS responsive utilities for optimal performance."
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

export const LargeGap: Story = {
  args: {
    cols: 2,
    gap: "xl",
    children: (
      <>
        <GridItem>Large Gap 1</GridItem>
        <GridItem>Large Gap 2</GridItem>
        <GridItem>Large Gap 3</GridItem>
        <GridItem>Large Gap 4</GridItem>
      </>
    ),
  },
};

export const AllGapSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Gap: None
        </h3>
        <Grid cols={4} gap="none">
          <GridItem className="border">None</GridItem>
          <GridItem className="border">None</GridItem>
          <GridItem className="border">None</GridItem>
          <GridItem className="border">None</GridItem>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Gap: Small
        </h3>
        <Grid cols={4} gap="sm">
          <GridItem>Small</GridItem>
          <GridItem>Small</GridItem>
          <GridItem>Small</GridItem>
          <GridItem>Small</GridItem>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Gap: Medium
        </h3>
        <Grid cols={4} gap="md">
          <GridItem>Medium</GridItem>
          <GridItem>Medium</GridItem>
          <GridItem>Medium</GridItem>
          <GridItem>Medium</GridItem>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Gap: Large
        </h3>
        <Grid cols={4} gap="lg">
          <GridItem>Large</GridItem>
          <GridItem>Large</GridItem>
          <GridItem>Large</GridItem>
          <GridItem>Large</GridItem>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Gap: Extra Large
        </h3>
        <Grid cols={4} gap="xl">
          <GridItem>XL</GridItem>
          <GridItem>XL</GridItem>
          <GridItem>XL</GridItem>
          <GridItem>XL</GridItem>
        </Grid>
      </div>
    </div>
  ),
};

export const AsSection: Story = {
  args: {
    as: "section",
    cols: 2,
    gap: "lg",
    children: (
      <>
        <GridItem>Rendered as &lt;section&gt;</GridItem>
        <GridItem>Instead of &lt;div&gt;</GridItem>
      </>
    ),
  },
};

export const ProductShowcase: Story = {
  render: () => (
    <Grid cols={3} gap="lg" responsive>
      {[
        {
          title: "JavaScript Fundamentals",
          level: "Beginner",
          duration: "2 hours",
        },
        {
          title: "React Development",
          level: "Intermediate",
          duration: "4 hours",
        },
        { title: "Node.js Backend", level: "Advanced", duration: "6 hours" },
        {
          title: "Database Design",
          level: "Intermediate",
          duration: "3 hours",
        },
        { title: "API Development", level: "Advanced", duration: "5 hours" },
        {
          title: "Testing Strategies",
          level: "Intermediate",
          duration: "3 hours",
        },
      ].map((course, i) => (
        <div key={i} className="p-6 bg-card border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                course.level === "Beginner"
                  ? "bg-accent-50 text-accent-900"
                  : course.level === "Intermediate"
                    ? "bg-primary-50 text-primary-900"
                    : "bg-secondary-100 text-secondary-900"
              }`}
            >
              {course.level}
            </span>
            <span className="text-xs text-muted-foreground">
              {course.duration}
            </span>
          </div>
          <h3 className="font-semibold text-card-foreground mb-2">
            {course.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Master the skills needed for {course.title.toLowerCase()} with
            hands-on exercises and real-world projects.
          </p>
          <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Start Course
          </button>
        </div>
      ))}
    </Grid>
  ),
};
