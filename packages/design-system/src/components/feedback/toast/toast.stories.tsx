import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertCircle,
  Clock,
  Download,
  Heart,
  Mail,
  Star,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import * as React from "react";
import { Toaster, toast, toastUtils } from "./toast";

const meta: Meta<typeof Toaster> = {
  title: "Feedback/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toast component built on top of Sonner that provides user feedback through temporary messages. Supports multiple variants, positions, actions, and accessibility features.",
      },
    },
  },
  argTypes: {
    theme: {
      control: "select",
      options: ["light", "dark", "system"],
      description: "Theme for the toast",
    },
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "Position of the toast",
    },
    expand: {
      control: "boolean",
      description: "Whether toasts expand on hover",
    },
    richColors: {
      control: "boolean",
      description: "Whether to use rich colors for toast variants",
    },
    closeButton: {
      control: "boolean",
      description: "Whether to show close button",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

// Wrapper component for consistent setup
const ToastDemo = ({ children }: { children: React.ReactNode }) => (
  <div>
    {children}
    <Toaster />
  </div>
);

// Basic Examples
export const Default: Story = {
  render: args => (
    <ToastDemo>
      <button
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        onClick={() => toast("Hello World! This is a basic toast message.")}
      >
        Show Default Toast
      </button>
      <Toaster {...args} />
    </ToastDemo>
  ),
  args: {
    position: "bottom-right",
    theme: "system",
  },
};

// Toast Variants
export const Variants: Story = {
  render: () => (
    <ToastDemo>
      <div className="flex flex-wrap gap-2">
        <button
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
          onClick={() => toast.success("Operation completed successfully!")}
        >
          Success
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          onClick={() => toast.error("An error occurred while processing.")}
        >
          Error
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-700"
          onClick={() => toast.warning("Please review your settings.")}
        >
          Warning
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() => toast.info("New features are available.")}
        >
          Info
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
          onClick={() => toast.loading("Processing your request...")}
        >
          Loading
        </button>
      </div>
    </ToastDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Toast supports multiple variants: success, error, warning, info, and loading. Each variant has its own icon and color scheme.",
      },
    },
  },
};

// With Descriptions
export const WithDescriptions: Story = {
  render: () => (
    <ToastDemo>
      <div className="flex flex-wrap gap-2">
        <button
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          onClick={() =>
            toast.success("Email sent successfully", {
              description:
                "Your message has been delivered to john@example.com",
            })
          }
        >
          Success with Description
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          onClick={() =>
            toast.error("Failed to save changes", {
              description:
                "Please check your internet connection and try again.",
            })
          }
        >
          Error with Description
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() =>
            toast.info("System maintenance scheduled", {
              description:
                "The system will be down for maintenance on Sunday at 2 AM UTC.",
            })
          }
        >
          Info with Description
        </button>
      </div>
    </ToastDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Toasts can include additional description text to provide more context to users.",
      },
    },
  },
};

// With Actions
export const WithActions: Story = {
  render: () => (
    <ToastDemo>
      <div className="flex flex-wrap gap-2">
        <button
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          onClick={() =>
            toast("Item deleted successfully", {
              description: "The item has been moved to trash.",
              action: {
                label: "Undo",
                onClick: () => toast.success("Item restored!"),
              },
            })
          }
        >
          With Action
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          onClick={() =>
            toast.error("Connection failed", {
              description: "Unable to connect to the server.",
              action: {
                label: "Retry",
                onClick: () => toast.loading("Reconnecting..."),
              },
            })
          }
        >
          With Retry Action
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() =>
            toast("Update available", {
              description: "A new version of the app is ready to install.",
              action: {
                label: "Update",
                onClick: () => toast.info("Starting update..."),
              },
              cancel: {
                label: "Later",
                onClick: () => console.log("Update postponed"),
              },
            })
          }
        >
          With Action & Cancel
        </button>
      </div>
    </ToastDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Toasts can include action buttons to allow users to take immediate action or undo operations.",
      },
    },
  },
};

// Position Examples
export const Positions: Story = {
  render: () => (
    <ToastDemo>
      <div className="grid grid-cols-3 gap-2">
        <button
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          onClick={() =>
            toast("Top Left", { position: "top-left", duration: 3000 })
          }
        >
          Top Left
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          onClick={() =>
            toast("Top Center", { position: "top-center", duration: 3000 })
          }
        >
          Top Center
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          onClick={() =>
            toast("Top Right", { position: "top-right", duration: 3000 })
          }
        >
          Top Right
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
          onClick={() =>
            toast("Bottom Left", { position: "bottom-left", duration: 3000 })
          }
        >
          Bottom Left
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
          onClick={() =>
            toast("Bottom Center", {
              position: "bottom-center",
              duration: 3000,
            })
          }
        >
          Bottom Center
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
          onClick={() =>
            toast("Bottom Right", { position: "bottom-right", duration: 3000 })
          }
        >
          Bottom Right
        </button>
      </div>
    </ToastDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Toasts can be positioned in any corner or edge of the screen. Choose the position that best fits your application layout.",
      },
    },
  },
};

// Promise Handling
export const PromiseHandling: Story = {
  render: () => (
    <ToastDemo>
      <div className="flex flex-wrap gap-2">
        <button
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
          onClick={() => {
            const promise = new Promise<{ name: string }>(resolve =>
              setTimeout(() => resolve({ name: "John Doe" }), 2000)
            );
            toast.promise(promise, {
              loading: "Saving user data...",
              success: data => `User ${data.name} saved successfully!`,
              error: "Failed to save user data",
            });
          }}
        >
          Successful Promise
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          onClick={() => {
            const promise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Network error")), 2000)
            );
            toast.promise(promise, {
              loading: "Uploading file...",
              success: "File uploaded successfully!",
              error: "Failed to upload file",
            });
          }}
        >
          Failed Promise
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() => {
            const promise = fetch("https://api.github.com/users/octocat").then(
              res => res.json()
            );
            toast.promise(promise, {
              loading: "Fetching user data...",
              success: data => `Welcome ${data.login}!`,
              error: "Failed to fetch user data",
            });
          }}
        >
          API Request
        </button>
      </div>
    </ToastDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Toast provides excellent support for promise handling, automatically showing loading, success, and error states.",
      },
    },
  },
};

// Custom Content
export const CustomContent: Story = {
  render: () => (
    <ToastDemo>
      <div className="flex flex-wrap gap-2">
        <button
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          onClick={() =>
            toast.custom(
              <div className="flex items-center gap-3 p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    New message received
                  </p>
                  <p className="text-xs text-muted-foreground">
                    From: alice@example.com
                  </p>
                </div>
                <button className="text-xs text-primary hover:underline">
                  View
                </button>
              </div>
            )
          }
        >
          Custom Message
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
          onClick={() =>
            toast.custom(
              <div className="flex items-center gap-3 p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Download className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Download complete
                  </p>
                  <div className="mt-1 h-1 w-full rounded-full bg-muted">
                    <div className="h-1 w-full rounded-full bg-purple-600"></div>
                  </div>
                </div>
              </div>
            )
          }
        >
          Custom Progress
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700"
          onClick={() =>
            toast.custom(
              <div className="flex items-center gap-3 p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                  <Star className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Feature unlocked!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    You can now access premium features
                  </p>
                </div>
                <div className="text-right">
                  <Heart className="h-4 w-4 text-red-500" />
                </div>
              </div>,
              { duration: 4000 }
            )
          }
        >
          Custom Achievement
        </button>
      </div>
    </ToastDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Create fully custom toast content with your own JSX for complex layouts and interactions.",
      },
    },
  },
};

// Utility Functions
export const UtilityFunctions: Story = {
  render: () => (
    <ToastDemo>
      <div className="flex flex-wrap gap-2">
        <button
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
          onClick={() =>
            toastUtils.successWithAction(
              "Changes saved successfully!",
              "View",
              () => toast.info("Opening preview...")
            )
          }
        >
          Success with Action
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          onClick={() =>
            toastUtils.errorWithRetry("Failed to sync data", () =>
              toast.loading("Retrying sync...")
            )
          }
        >
          Error with Retry
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() => {
            const asyncOperation = () =>
              new Promise(resolve =>
                setTimeout(() => resolve("Data processed"), 3000)
              );
            toastUtils.asyncOperation(asyncOperation(), {
              loading: "Processing data...",
              success: "Data processed successfully!",
              error: "Processing failed",
            });
          }}
        >
          Async Operation
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
          onClick={() =>
            toastUtils.positioned(
              "Positioned notification",
              "top-center",
              "info"
            )
          }
        >
          Positioned Toast
        </button>
      </div>
    </ToastDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Utility functions provide convenient methods for common toast patterns like success with action, error with retry, and async operations.",
      },
    },
  },
};

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <ToastDemo>
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">File Operations</h4>
          <div className="flex gap-2">
            <button
              className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                const uploadPromise = new Promise(resolve =>
                  setTimeout(() => resolve("success"), 2000)
                );
                toast.promise(uploadPromise, {
                  loading: (
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4 animate-pulse" />
                      Uploading file...
                    </div>
                  ),
                  success: "File uploaded successfully!",
                  error: "Upload failed",
                });
              }}
            >
              Upload File
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              onClick={() =>
                toast("File deleted", {
                  description: "The file has been moved to trash.",
                  action: {
                    label: "Undo",
                    onClick: () => toast.success("File restored!"),
                  },
                  icon: <Trash2 className="h-4 w-4" />,
                })
              }
            >
              Delete File
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">User Actions</h4>
          <div className="flex gap-2">
            <button
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={() =>
                toast.success("Welcome to the app!", {
                  description: "Thanks for signing up. Let's get started!",
                  action: {
                    label: "Get Started",
                    onClick: () => toast.info("Opening tutorial..."),
                  },
                  icon: <User className="h-4 w-4" />,
                })
              }
            >
              User Signup
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-700"
              onClick={() =>
                toast.warning("Session expiring soon", {
                  description: "Your session will expire in 5 minutes.",
                  action: {
                    label: "Extend",
                    onClick: () => toast.success("Session extended!"),
                  },
                  icon: <Clock className="h-4 w-4" />,
                })
              }
            >
              Session Warning
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">System Notifications</h4>
          <div className="flex gap-2">
            <button
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
              onClick={() =>
                toast.info("System update available", {
                  description: "Version 2.1.0 is ready for installation.",
                  action: {
                    label: "Update Now",
                    onClick: () => {
                      const updatePromise = new Promise(resolve =>
                        setTimeout(() => resolve("success"), 3000)
                      );
                      toast.promise(updatePromise, {
                        loading: "Installing update...",
                        success: "Update installed successfully!",
                        error: "Update failed",
                      });
                    },
                  },
                  cancel: {
                    label: "Later",
                    onClick: () => toast("Update postponed"),
                  },
                  duration: 10000,
                })
              }
            >
              System Update
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700"
              onClick={() =>
                toast.error("Connection lost", {
                  description: "Attempting to reconnect...",
                  action: {
                    label: "Retry",
                    onClick: () =>
                      toast.loading("Reconnecting...", { duration: 2000 }),
                  },
                  icon: <AlertCircle className="h-4 w-4" />,
                  duration: Infinity, // Keep until manually dismissed
                })
              }
            >
              Connection Error
            </button>
          </div>
        </div>
      </div>
    </ToastDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world examples showing how to use toasts for common application scenarios like file operations, user actions, and system notifications.",
      },
    },
  },
};

// Multiple Toasts Management
export const MultipleToasts: Story = {
  render: () => (
    <ToastDemo>
      <div className="flex flex-wrap gap-2">
        <button
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          onClick={() => {
            toast.success("First notification");
            toast.error("Second notification");
            toast.warning("Third notification");
            toast.info("Fourth notification");
          }}
        >
          Show Multiple
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
          onClick={() => toast.dismiss()}
        >
          Dismiss All
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
          onClick={() => {
            for (let i = 0; i < 5; i++) {
              setTimeout(() => {
                toast(`Notification ${i + 1}`, {
                  duration: 2000 + i * 1000,
                });
              }, i * 500);
            }
          }}
        >
          Staggered Toasts
        </button>
      </div>
    </ToastDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples of managing multiple toasts, including showing multiple toasts at once and dismissing all toasts.",
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  args: {
    position: "bottom-right",
    theme: "system",
    expand: true,
    richColors: true,
    closeButton: false,
  },
  render: args => (
    <ToastDemo>
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <h4 className="text-sm font-medium mb-2">Toast Settings</h4>
          <p className="text-xs text-muted-foreground mb-4">
            Adjust the settings using the controls panel and test different
            toast types.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              onClick={() => toast("Test message with current settings")}
            >
              Test Toast
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
              onClick={() => toast.success("Success with current settings")}
            >
              Success
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              onClick={() => toast.error("Error with current settings")}
            >
              Error
            </button>
          </div>
        </div>
      </div>
      <Toaster {...args} />
    </ToastDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example where you can modify the toast settings using the controls panel and see the changes in real-time.",
      },
    },
  },
};
