import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Typography } from "./typography";

const meta = {
  title: "UI/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible typography component with semantic variants, color options, and responsive behavior.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "display",
        "h1",
        "h2",
        "h3",
        "h4",
        "body-lg",
        "body",
        "body-sm",
        "lead",
        "large",
        "caption",
        "overline",
        "muted",
      ],
      description: "Typography variant that determines size and style",
    },
    as: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "div",
        "label",
      ],
      description: "HTML element to render (overrides default for variant)",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "muted",
        "error",
        "success",
        "warning",
        "info",
      ],
      description: "Text color variant",
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "Text alignment",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight",
    },
    truncate: {
      control: "select",
      options: [false, true, 2, 3, 4],
      description:
        "Text truncation (true for single line, number for multi-line)",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is default body text with normal styling.",
  },
};

export const TypographyScale: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Typography variant="display">Display Text</Typography>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="body-lg">
        Large body text for emphasis and readability
      </Typography>
      <Typography variant="body">
        Regular body text for general content
      </Typography>
      <Typography variant="body-sm">
        Small body text for secondary information
      </Typography>
      <Typography variant="lead">
        Lead text that introduces a section
      </Typography>
      <Typography variant="large">Large text for emphasis</Typography>
      <Typography variant="caption">
        Caption text for images and descriptions
      </Typography>
      <Typography variant="overline">Overline Text</Typography>
      <Typography variant="muted">
        Muted text for less important information
      </Typography>
    </div>
  ),
};

export const SemanticElements: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography variant="h1" as="h1">
        Semantic H1 with h1 styling
      </Typography>
      <Typography variant="h2" as="h2">
        Semantic H2 with h2 styling
      </Typography>
      <Typography variant="body" as="p">
        Paragraph text with semantic meaning
      </Typography>
      <Typography variant="caption" as="span">
        Inline span with caption styling
      </Typography>
      <Typography variant="body" as="div">
        Div element with body styling
      </Typography>
      <Typography variant="body-sm" as="label">
        Label element with small body styling
      </Typography>
    </div>
  ),
};

export const Colors: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Typography color="primary">Primary text color (default)</Typography>
      <Typography color="secondary">Secondary text color</Typography>
      <Typography color="muted">Muted text color</Typography>
      <Typography color="error">Error text color</Typography>
      <Typography color="success">Success text color</Typography>
      <Typography color="warning">Warning text color</Typography>
      <Typography color="info">Info text color</Typography>
    </div>
  ),
};

export const Alignment: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-4 w-96">
      <Typography align="left">Left-aligned text (default)</Typography>
      <Typography align="center">Center-aligned text</Typography>
      <Typography align="right">Right-aligned text</Typography>
      <Typography align="justify">
        Justified text that spreads out evenly across the full width of the
        container, creating clean edges on both sides.
      </Typography>
    </div>
  ),
};

export const FontWeights: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Typography weight="normal">Normal font weight (default)</Typography>
      <Typography weight="medium">Medium font weight</Typography>
      <Typography weight="semibold">Semibold font weight</Typography>
      <Typography weight="bold">Bold font weight</Typography>
    </div>
  ),
};

export const Truncation: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Typography variant="body-sm" color="muted">
          Single line truncation:
        </Typography>
        <Typography truncate={true}>
          This is a very long text that will be truncated to a single line when
          it exceeds the container width
        </Typography>
      </div>

      <div className="space-y-2">
        <Typography variant="body-sm" color="muted">
          Multi-line truncation (2 lines):
        </Typography>
        <Typography truncate={2}>
          This is a longer text that will be truncated to exactly two lines when
          it exceeds that limit, providing a clean way to limit content display
          while maintaining readability
        </Typography>
      </div>

      <div className="space-y-2">
        <Typography variant="body-sm" color="muted">
          Multi-line truncation (3 lines):
        </Typography>
        <Typography truncate={3}>
          This is an even longer text that will be truncated to exactly three
          lines when it exceeds that limit. This is useful for previews, cards,
          and other components where you want to show more content but still
          maintain a consistent layout and prevent excessive text overflow.
        </Typography>
      </div>

      <div className="space-y-2">
        <Typography variant="body-sm" color="muted">
          No truncation:
        </Typography>
        <Typography>
          This text has no truncation applied, so it will wrap naturally to as
          many lines as needed based on the content length and container width.
        </Typography>
      </div>
    </div>
  ),
};

export const ResponsiveTypography: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <Typography variant="display">Responsive Display Text</Typography>
      <Typography variant="body">
        The display variant automatically scales from text-4xl on mobile to
        text-5xl on large screens, providing optimal readability across all
        device sizes.
      </Typography>
      <Typography variant="h1">
        Heading 1 maintains consistent sizing but benefits from the responsive
        line heights and spacing.
      </Typography>
      <Typography variant="body-lg">
        Large body text provides better readability on larger screens while
        remaining accessible on mobile devices.
      </Typography>
    </div>
  ),
};

export const ContentExamples: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-8 max-w-3xl">
      {/* Article Header */}
      <header className="space-y-4">
        <Typography variant="overline" color="muted">
          Technology
        </Typography>
        <Typography variant="h1">The Future of Design Systems</Typography>
        <Typography variant="lead">
          How component libraries are evolving to meet the demands of modern web
          development
        </Typography>
      </header>

      {/* Article Content */}
      <article className="space-y-4">
        <Typography variant="body">
          Design systems have become an essential part of modern web
          development, providing consistency and efficiency across large-scale
          applications. They serve as the single source of truth for design
          decisions and component implementations.
        </Typography>

        <Typography variant="h3">Key Benefits</Typography>
        <Typography variant="body">
          The primary advantages include improved consistency, faster
          development cycles, and better collaboration between design and
          development teams.
        </Typography>

        <Typography variant="body-sm" color="muted">
          Last updated: March 2024
        </Typography>
      </article>

      {/* Status Messages */}
      <div className="space-y-2">
        <Typography color="success" weight="medium">
          ✓ All components are accessible
        </Typography>
        <Typography color="warning" weight="medium">
          ⚠ Some components need testing
        </Typography>
        <Typography color="error" weight="medium">
          ✗ Build failed - check configuration
        </Typography>
        <Typography color="info" weight="medium">
          ℹ New version available
        </Typography>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  args: { children: "" },
  render: () => {
    return (
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Typography variant="h3">Interactive Typography Example</Typography>
          <Typography variant="body">
            Use the controls panel to experiment with different typography
            variants, colors, alignments, and other properties.
          </Typography>
        </div>

        <div className="p-4 border rounded-lg">
          <Typography
            variant="body-lg"
            color="primary"
            align="center"
            weight="medium"
          >
            Customizable text - modify using the controls below
          </Typography>
        </div>

        <Typography variant="caption" color="muted">
          Try changing the variant, color, alignment, and weight using the story
          controls.
        </Typography>
      </div>
    );
  },
};

export const CombinedVariants: Story = {
  args: { children: "" },
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography variant="h2" color="primary" weight="bold" align="center">
        Bold Centered Heading
      </Typography>
      <Typography variant="lead" color="muted" align="center">
        Muted lead text with center alignment
      </Typography>
      <Typography variant="body" color="success" weight="medium" truncate={2}>
        Success colored body text with medium weight that will truncate after
        two lines if the content is longer than the available space allows for
        proper display.
      </Typography>
      <Typography
        variant="caption"
        color="warning"
        weight="semibold"
        align="right"
      >
        Right-aligned warning caption
      </Typography>
    </div>
  ),
};
