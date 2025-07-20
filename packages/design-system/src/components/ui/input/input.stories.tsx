import type { Meta, StoryObj } from "@storybook/react";
import {
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Search,
  User,
} from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible input component with support for labels, validation states, icons, and multiple sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Controls the size of the input",
    },
    state: {
      control: "select",
      options: ["default", "error", "success"],
      description: "Visual state of the input",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
      description: "HTML input type",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input size="sm" placeholder="Small input" label="Small" />
      <Input size="default" placeholder="Default input" label="Default" />
      <Input size="lg" placeholder="Large input" label="Large" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input type="text" placeholder="Text input" label="Text" />
      <Input type="email" placeholder="email@example.com" label="Email" />
      <Input type="password" placeholder="Password" label="Password" />
      <Input type="number" placeholder="123" label="Number" />
      <Input type="search" placeholder="Search..." label="Search" />
      <Input type="tel" placeholder="+1 (555) 123-4567" label="Phone" />
      <Input type="url" placeholder="https://example.com" label="URL" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Email"
        type="email"
        placeholder="email@example.com"
        leftIcon={<Mail className="h-4 w-4" />}
      />
      <Input
        label="Search"
        type="search"
        placeholder="Search..."
        leftIcon={<Search className="h-4 w-4" />}
      />
      <Input
        label="Username"
        placeholder="Username"
        leftIcon={<User className="h-4 w-4" />}
      />
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Valid Input"
        placeholder="This looks good!"
        success={true}
        value="john@example.com"
      />
      <Input
        label="Invalid Input"
        placeholder="email@example.com"
        error="Please enter a valid email address"
        value="invalid-email"
      />
      <Input
        label="With Hint"
        placeholder="Enter your password"
        hint="Must be at least 8 characters long"
        type="password"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Disabled Input"
        placeholder="Cannot edit this"
        disabled
        value="Disabled value"
      />
      <Input
        label="Disabled with Icon"
        placeholder="Cannot edit this"
        disabled
        leftIcon={<Mail className="h-4 w-4" />}
        value="disabled@example.com"
      />
    </div>
  ),
};

export const PasswordToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-80">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="First Name" placeholder="John" required />
      <Input label="Last Name" placeholder="Doe" required />
      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
        leftIcon={<Mail className="h-4 w-4" />}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        leftIcon={<Lock className="h-4 w-4" />}
        hint="Must be at least 8 characters"
        required
      />
      <Input
        label="Credit Card"
        placeholder="1234 5678 9012 3456"
        leftIcon={<CreditCard className="h-4 w-4" />}
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      // Simple email validation
      if (newValue && !newValue.includes("@")) {
        setError("Please enter a valid email address");
      } else {
        setError("");
      }
    };

    return (
      <div className="w-80">
        <Input
          label="Email Validation"
          type="email"
          placeholder="Enter your email"
          value={value}
          onChange={handleChange}
          error={error}
          success={value.includes("@") && !error}
          leftIcon={<Mail className="h-4 w-4" />}
          required
        />
      </div>
    );
  },
};
