import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./text";

const meta = {
  title: "UI/Text",
  component: Text,
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
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is default body text with normal styling.",
  },
};

export const TypographyScale: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Text variant="display">Display Text</Text>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="body-lg">
        Large body text for emphasis and readability
      </Text>
      <Text variant="body">Regular body text for general content</Text>
      <Text variant="body-sm">Small body text for secondary information</Text>
      <Text variant="lead">Lead text that introduces a section</Text>
      <Text variant="large">Large text for emphasis</Text>
      <Text variant="caption">Caption text for images and descriptions</Text>
      <Text variant="overline">Overline Text</Text>
      <Text variant="muted">Muted text for less important information</Text>
    </div>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Text variant="h1" as="h1">
        Semantic H1 with h1 styling
      </Text>
      <Text variant="h2" as="h2">
        Semantic H2 with h2 styling
      </Text>
      <Text variant="body" as="p">
        Paragraph text with semantic meaning
      </Text>
      <Text variant="caption" as="span">
        Inline span with caption styling
      </Text>
      <Text variant="body" as="div">
        Div element with body styling
      </Text>
      <Text variant="body-sm" as="label">
        Label element with small body styling
      </Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Text color="primary">Primary text color (default)</Text>
      <Text color="secondary">Secondary text color</Text>
      <Text color="muted">Muted text color</Text>
      <Text color="error">Error text color</Text>
      <Text color="success">Success text color</Text>
      <Text color="warning">Warning text color</Text>
      <Text color="info">Info text color</Text>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Text align="left">Left-aligned text (default)</Text>
      <Text align="center">Center-aligned text</Text>
      <Text align="right">Right-aligned text</Text>
      <Text align="justify">
        Justified text that spreads out evenly across the full width of the
        container, creating clean edges on both sides.
      </Text>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Text weight="normal">Normal font weight (default)</Text>
      <Text weight="medium">Medium font weight</Text>
      <Text weight="semibold">Semibold font weight</Text>
      <Text weight="bold">Bold font weight</Text>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Text variant="body-sm" color="muted">
          Single line truncation:
        </Text>
        <Text truncate={true}>
          This is a very long text that will be truncated to a single line when
          it exceeds the container width
        </Text>
      </div>

      <div className="space-y-2">
        <Text variant="body-sm" color="muted">
          Multi-line truncation (2 lines):
        </Text>
        <Text truncate={2}>
          This is a longer text that will be truncated to exactly two lines when
          it exceeds that limit, providing a clean way to limit content display
          while maintaining readability
        </Text>
      </div>

      <div className="space-y-2">
        <Text variant="body-sm" color="muted">
          Multi-line truncation (3 lines):
        </Text>
        <Text truncate={3}>
          This is an even longer text that will be truncated to exactly three
          lines when it exceeds that limit. This is useful for previews, cards,
          and other components where you want to show more content but still
          maintain a consistent layout and prevent excessive text overflow.
        </Text>
      </div>

      <div className="space-y-2">
        <Text variant="body-sm" color="muted">
          No truncation:
        </Text>
        <Text>
          This text has no truncation applied, so it will wrap naturally to as
          many lines as needed based on the content length and container width.
        </Text>
      </div>
    </div>
  ),
};

export const ResponsiveTypography: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <Text variant="display">Responsive Display Text</Text>
      <Text variant="body">
        The display variant automatically scales from text-4xl on mobile to
        text-5xl on large screens, providing optimal readability across all
        device sizes.
      </Text>
      <Text variant="h1">
        Heading 1 maintains consistent sizing but benefits from the responsive
        line heights and spacing.
      </Text>
      <Text variant="body-lg">
        Large body text provides better readability on larger screens while
        remaining accessible on mobile devices.
      </Text>
    </div>
  ),
};

export const ContentExamples: Story = {
  render: () => (
    <div className="space-y-8 max-w-3xl">
      {/* Article Header */}
      <header className="space-y-4">
        <Text variant="overline" color="muted">
          Technology
        </Text>
        <Text variant="h1">The Future of Design Systems</Text>
        <Text variant="lead">
          How component libraries are evolving to meet the demands of modern web
          development
        </Text>
      </header>

      {/* Article Content */}
      <article className="space-y-4">
        <Text variant="body">
          Design systems have become an essential part of modern web
          development, providing consistency and efficiency across large-scale
          applications. They serve as the single source of truth for design
          decisions and component implementations.
        </Text>

        <Text variant="h3">Key Benefits</Text>
        <Text variant="body">
          The primary advantages include improved consistency, faster
          development cycles, and better collaboration between design and
          development teams.
        </Text>

        <Text variant="body-sm" color="muted">
          Last updated: March 2024
        </Text>
      </article>

      {/* Status Messages */}
      <div className="space-y-2">
        <Text color="success" weight="medium">
          ✓ All components are accessible
        </Text>
        <Text color="warning" weight="medium">
          ⚠ Some components need testing
        </Text>
        <Text color="error" weight="medium">
          ✗ Build failed - check configuration
        </Text>
        <Text color="info" weight="medium">
          ℹ New version available
        </Text>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    return (
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Text variant="h3">Interactive Typography Example</Text>
          <Text variant="body">
            Use the controls panel to experiment with different typography
            variants, colors, alignments, and other properties.
          </Text>
        </div>

        <div className="p-4 border rounded-lg">
          <Text
            variant="body-lg"
            color="primary"
            align="center"
            weight="medium"
          >
            Customizable text - modify using the controls below
          </Text>
        </div>

        <Text variant="caption" color="muted">
          Try changing the variant, color, alignment, and weight using the story
          controls.
        </Text>
      </div>
    );
  },
};

export const CombinedVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Text variant="h2" color="primary" weight="bold" align="center">
        Bold Centered Heading
      </Text>
      <Text variant="lead" color="muted" align="center">
        Muted lead text with center alignment
      </Text>
      <Text variant="body" color="success" weight="medium" truncate={2}>
        Success colored body text with medium weight that will truncate after
        two lines if the content is longer than the available space allows for
        proper display.
      </Text>
      <Text variant="caption" color="warning" weight="semibold" align="right">
        Right-aligned warning caption
      </Text>
    </div>
  ),
};
