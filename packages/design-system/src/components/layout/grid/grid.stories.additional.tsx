import type { StoryObj } from "@storybook/react";
import { CourseCard, GridItem } from "./components";
import { Grid } from "./grid";

type Story = StoryObj<typeof Grid>;

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

export const ProductShowcase: Story = {
  render: () => (
    <Grid cols={3} gap="lg" responsive>
      {[
        {
          title: "JavaScript Fundamentals",
          level: "Beginner" as const,
          duration: "2 hours",
        },
        {
          title: "React Development",
          level: "Intermediate" as const,
          duration: "4 hours",
        },
        {
          title: "Node.js Backend",
          level: "Advanced" as const,
          duration: "6 hours",
        },
        {
          title: "Database Design",
          level: "Intermediate" as const,
          duration: "3 hours",
        },
        {
          title: "API Development",
          level: "Advanced" as const,
          duration: "5 hours",
        },
        {
          title: "Testing Strategies",
          level: "Intermediate" as const,
          duration: "3 hours",
        },
      ].map((course, i) => (
        <CourseCard key={i} {...course} />
      ))}
    </Grid>
  ),
};
