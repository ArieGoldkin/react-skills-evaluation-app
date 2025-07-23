import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  SimpleTooltip,
} from "./tooltip";
import { Button } from "../button";
import { Info, HelpCircle, AlertCircle, Copy } from "lucide-react";

const meta = {
  title: "UI/Tooltip",
  component: SimpleTooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
      description: "The preferred side of the trigger to render against",
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
      description: "The preferred alignment against the trigger",
    },
    delayDuration: {
      control: { type: "number", min: 0, max: 2000, step: 100 },
      description:
        "Duration from when the trigger is hovered until the tooltip opens",
    },
    skipDelayDuration: {
      control: { type: "number", min: 0, max: 1000, step: 100 },
      description: "How much time to skip before showing the next tooltip",
    },
    disableHoverableContent: {
      control: "boolean",
      description: "Prevent the tooltip from remaining open when hovering",
    },
  },
} satisfies Meta<typeof SimpleTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button variant="outline">Hover me</Button>,
  },
};

export const Sides: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <SimpleTooltip content="Top tooltip" side="top">
        <Button variant="outline" size="sm">
          Top
        </Button>
      </SimpleTooltip>
      <SimpleTooltip content="Right tooltip" side="right">
        <Button variant="outline" size="sm">
          Right
        </Button>
      </SimpleTooltip>
      <SimpleTooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline" size="sm">
          Bottom
        </Button>
      </SimpleTooltip>
      <SimpleTooltip content="Left tooltip" side="left">
        <Button variant="outline" size="sm">
          Left
        </Button>
      </SimpleTooltip>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <SimpleTooltip content="Start aligned tooltip" side="top" align="start">
          <Button variant="outline" className="w-32">
            Start
          </Button>
        </SimpleTooltip>
        <SimpleTooltip
          content="Center aligned tooltip"
          side="top"
          align="center"
        >
          <Button variant="outline" className="w-32">
            Center
          </Button>
        </SimpleTooltip>
        <SimpleTooltip content="End aligned tooltip" side="top" align="end">
          <Button variant="outline" className="w-32">
            End
          </Button>
        </SimpleTooltip>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SimpleTooltip content="Information">
        <Button variant="ghost" size="icon">
          <Info className="h-4 w-4" />
        </Button>
      </SimpleTooltip>
      <SimpleTooltip content="Get help">
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </SimpleTooltip>
      <SimpleTooltip content="Warning">
        <Button variant="ghost" size="icon">
          <AlertCircle className="h-4 w-4" />
        </Button>
      </SimpleTooltip>
      <SimpleTooltip content="Copy to clipboard">
        <Button variant="ghost" size="icon">
          <Copy className="h-4 w-4" />
        </Button>
      </SimpleTooltip>
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <SimpleTooltip
      content={
        <div className="space-y-2">
          <p className="font-semibold">Keyboard shortcut</p>
          <p className="text-xs">
            Press <kbd className="rounded bg-muted px-1 py-0.5">⌘</kbd> +
            <kbd className="rounded bg-muted px-1 py-0.5 ml-1">K</kbd>
          </p>
        </div>
      }
    >
      <Button variant="outline">Complex tooltip</Button>
    </SimpleTooltip>
  ),
};

export const DelayedTooltip: Story = {
  args: {
    content: "This tooltip has a 1 second delay",
    delayDuration: 1000,
    children: <Button variant="outline">Hover and wait</Button>,
  },
};

export const InstantTooltip: Story = {
  args: {
    content: "This tooltip appears instantly",
    delayDuration: 0,
    children: <Button variant="outline">Instant tooltip</Button>,
  },
};

export const DisabledElement: Story = {
  render: () => (
    <SimpleTooltip content="This button is disabled" asChild>
      <span className="inline-block" tabIndex={0}>
        <Button disabled>Disabled button</Button>
      </span>
    </SimpleTooltip>
  ),
};

export const LongContent: Story = {
  args: {
    content:
      "This is a very long tooltip content that demonstrates how the tooltip handles longer text. It will wrap to multiple lines as needed.",
    contentClassName: "max-w-xs",
    children: <Button variant="outline">Long tooltip</Button>,
  },
};

export const CustomStyling: Story = {
  args: {
    content: "Custom styled tooltip",
    contentClassName: "bg-blue-600 text-white border-blue-600",
    children: <Button variant="outline">Custom style</Button>,
  },
};

export const FormFieldHelp: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        className="rounded-md border px-3 py-2"
      />
      <SimpleTooltip content="We'll never share your email with anyone else">
        <Info className="h-4 w-4 text-muted-foreground" />
      </SimpleTooltip>
    </div>
  ),
};

export const AdvancedUsage: Story = {
  render: () => (
    <TooltipProvider delayDuration={300} skipDelayDuration={100}>
      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">First tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Hover over the next button quickly!</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Second tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This appeared faster due to skipDelayDuration</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When moving between tooltips quickly, the skipDelayDuration is used instead of delayDuration.",
      },
    },
  },
};

export const TableActions: Story = {
  render: () => (
    <div className="rounded-md border p-4">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">Item 1</td>
            <td>Active</td>
            <td className="text-right">
              <div className="inline-flex gap-1">
                <SimpleTooltip content="Edit item">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </SimpleTooltip>
                <SimpleTooltip content="Delete item">
                  <Button variant="ghost" size="sm">
                    Delete
                  </Button>
                </SimpleTooltip>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
