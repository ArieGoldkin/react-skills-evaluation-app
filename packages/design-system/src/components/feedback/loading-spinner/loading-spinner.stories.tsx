import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { LoadingSpinner } from "./loading-spinner";

const meta: Meta<typeof LoadingSpinner> = {
  title: "Feedback/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A loading spinner component for indicating loading states. Built with accessibility in mind and supports various sizes, speeds, and text display options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Controls the size of the spinner",
    },
    speed: {
      control: "select",
      options: ["slow", "default", "fast"],
      description: "Controls the animation speed of the spinner",
    },
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout direction when text is present",
    },
    show: {
      control: "boolean",
      description: "Controls visibility of the spinner",
    },
    text: {
      control: "text",
      description: "Optional loading text to display",
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for screen readers",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

// Basic Examples
export const Default: Story = {
  args: {},
};

export const WithText: Story = {
  args: {
    text: "Loading...",
  },
};

export const WithChildren: Story = {
  args: {
    children: "Processing your request...",
  },
};

// Size Variants
export const Small: Story = {
  args: {
    size: "sm",
    text: "Loading",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    text: "Loading data",
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <LoadingSpinner size="sm" />
        <p className="text-xs mt-2 text-muted-foreground">Small</p>
      </div>
      <div className="text-center">
        <LoadingSpinner />
        <p className="text-xs mt-2 text-muted-foreground">Default</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-xs mt-2 text-muted-foreground">Large</p>
      </div>
    </div>
  ),
};

// Speed Variants
export const SlowSpeed: Story = {
  args: {
    speed: "slow",
    text: "Loading slowly...",
  },
};

export const FastSpeed: Story = {
  args: {
    speed: "fast",
    text: "Loading quickly...",
  },
};

export const SpeedComparison: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <LoadingSpinner speed="slow" />
        <p className="text-xs mt-2 text-muted-foreground">Slow (2s)</p>
      </div>
      <div className="text-center">
        <LoadingSpinner speed="default" />
        <p className="text-xs mt-2 text-muted-foreground">Default (1s)</p>
      </div>
      <div className="text-center">
        <LoadingSpinner speed="fast" />
        <p className="text-xs mt-2 text-muted-foreground">Fast (0.5s)</p>
      </div>
    </div>
  ),
};

// Direction Variants
export const Horizontal: Story = {
  args: {
    text: "Loading horizontally",
    direction: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    text: "Loading vertically",
    direction: "vertical",
  },
};

export const DirectionComparison: Story = {
  render: () => (
    <div className="flex items-start gap-12">
      <div className="text-center">
        <LoadingSpinner text="Horizontal layout" direction="horizontal" />
        <p className="text-xs mt-4 text-muted-foreground">Horizontal</p>
      </div>
      <div className="text-center">
        <LoadingSpinner text="Vertical layout" direction="vertical" />
        <p className="text-xs mt-4 text-muted-foreground">Vertical</p>
      </div>
    </div>
  ),
};

// Interactive Examples
export const ConditionalRendering: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
      <div className="space-y-4">
        <Button
          onClick={() => setIsLoading(!isLoading)}
          variant={isLoading ? "secondary" : "default"}
        >
          {isLoading ? "Stop Loading" : "Start Loading"}
        </Button>
        <div className="h-8 flex items-center">
          <LoadingSpinner
            show={isLoading}
            text={isLoading ? "Loading data..." : undefined}
          />
          {!isLoading && (
            <span className="text-sm text-muted-foreground">
              Click the button to show loading spinner
            </span>
          )}
        </div>
      </div>
    );
  },
};

export const LoadingButton: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    };

    return (
      <Button onClick={handleClick} disabled={isLoading} className="w-32">
        {isLoading ? <LoadingSpinner size="sm" text="Loading..." /> : "Submit"}
      </Button>
    );
  },
};

// Real-world Use Cases
export const DataLoadingCard: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 2500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle>User Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="min-h-32 flex items-center justify-center">
          {isLoading ? (
            <LoadingSpinner text="Loading dashboard data..." />
          ) : (
            <div className="text-center">
              <h3 className="font-semibold">Welcome back!</h3>
              <p className="text-muted-foreground">
                Your dashboard is ready to use.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
};

export const FormSubmission: Story = {
  render: () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => setIsSubmitting(false), 2000);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your email"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            placeholder="Enter your message"
            disabled={isSubmitting}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <LoadingSpinner size="sm" text="Submitting..." />
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    );
  },
};

export const InlineContent: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm">
        Your data is being processed{" "}
        <LoadingSpinner size="sm" className="inline" />
      </p>
      <p className="text-sm flex items-center gap-2">
        <LoadingSpinner size="sm" />
        Syncing with server...
      </p>
      <div className="flex items-center gap-2 text-sm">
        <LoadingSpinner size="sm" speed="fast" />
        <span>Quick operation in progress</span>
      </div>
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 w-80">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span className="text-sm">Uploading files</span>
          <LoadingSpinner size="sm" speed="default" />
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span className="text-sm">Processing images</span>
          <LoadingSpinner size="sm" speed="slow" />
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span className="text-sm">Generating thumbnails</span>
          <LoadingSpinner size="sm" speed="fast" />
        </div>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <LoadingSpinner className="text-blue-500" text="Custom color" />
        <LoadingSpinner className="text-green-500" text="Success loading" />
        <LoadingSpinner className="text-orange-500" text="Warning state" />
      </div>
      <div className="bg-gray-900 p-4 rounded-lg">
        <LoadingSpinner
          className="text-white"
          text="Loading on dark background"
        />
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border">
        <LoadingSpinner
          size="lg"
          className="text-blue-600"
          text="Branded loading experience"
          direction="vertical"
        />
      </div>
    </div>
  ),
};

// Accessibility Examples
export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">With descriptive labels</h3>
        <LoadingSpinner
          aria-label="Loading user profile data"
          text="Loading profile..."
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">For long operations</h3>
        <LoadingSpinner
          aria-label="Processing large dataset, this may take several minutes"
          text="Processing data..."
          speed="slow"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Context-specific</h3>
        <LoadingSpinner
          aria-label="Saving changes to your document"
          text="Saving..."
          size="sm"
        />
      </div>
    </div>
  ),
};

// Hidden state
export const Hidden: Story = {
  args: {
    show: false,
    text: "This spinner is hidden",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When show is false, the component returns null and renders nothing.",
      },
    },
  },
};
