import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Container } from "./container";

const meta: Meta<typeof Container> = {
  title: "Components/Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "full"],
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
    },
    as: {
      control: { type: "select" },
      options: ["div", "section", "main", "article"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Container Content</h2>
        <p>
          This content is wrapped in a Container component with default
          settings.
        </p>
      </div>
    ),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      {(["sm", "md", "lg", "xl", "full"] as const).map(size => (
        <Container key={size} size={size}>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold">Size: {size}</h3>
            <p>Container with {size} max-width constraint</p>
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const PaddingVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {(["none", "sm", "md", "lg"] as const).map(padding => (
        <Container key={padding} padding={padding} className="border">
          <div className="bg-green-100 rounded-lg">
            <h3 className="font-semibold">Padding: {padding}</h3>
            <p>Container with {padding} padding</p>
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-8">
      <Container as="main">
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold">Main Element</h3>
          <p>Container rendered as &lt;main&gt; element</p>
        </div>
      </Container>
      <Container as="section">
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="font-semibold">Section Element</h3>
          <p>Container rendered as &lt;section&gt; element</p>
        </div>
      </Container>
      <Container as="article">
        <div className="bg-pink-100 p-4 rounded-lg">
          <h3 className="font-semibold">Article Element</h3>
          <p>Container rendered as &lt;article&gt; element</p>
        </div>
      </Container>
    </div>
  ),
};
