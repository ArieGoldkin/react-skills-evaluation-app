import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Mail } from "lucide-react";
import { Input } from "./input";

describe("Input", () => {
  describe("Basic Rendering", () => {
    it("renders correctly", () => {
      render(<Input placeholder="Test input" />);
      expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<Input label="Test Label" placeholder="Test input" />);
      expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("renders required indicator when required", () => {
      render(<Input label="Required Field" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(<Input ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Sizes", () => {
    it("applies small size classes", () => {
      render(<Input size="sm" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("h-8", "px-2", "py-1", "text-xs");
    });

    it("applies default size classes", () => {
      render(<Input size="default" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("h-10", "px-3", "py-2");
    });

    it("applies large size classes", () => {
      render(<Input size="lg" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("h-12", "px-4", "py-3", "text-base");
    });
  });

  describe("Types", () => {
    it("renders with text type by default", () => {
      render(<Input data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "text");
    });

    it("renders with specified type", () => {
      render(<Input type="email" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "email");
    });

    it("renders password type", () => {
      render(<Input type="password" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "password");
    });
  });

  describe("Validation States", () => {
    it("renders error state with error message", () => {
      render(<Input error="This field is required" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("border-destructive");
      expect(screen.getByText("This field is required")).toBeInTheDocument();
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("renders success state", () => {
      render(<Input success={true} data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("border-green-500");
    });

    it("renders hint text", () => {
      render(<Input hint="Enter your full name" />);
      expect(screen.getByText("Enter your full name")).toBeInTheDocument();
    });

    it("hides hint when error is present", () => {
      render(
        <Input hint="Enter your full name" error="This field is required" />
      );
      expect(
        screen.queryByText("Enter your full name")
      ).not.toBeInTheDocument();
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });
  });

  describe("Icons", () => {
    it("renders left icon", () => {
      render(
        <Input
          leftIcon={<Mail data-testid="mail-icon" />}
          data-testid="input"
        />
      );
      expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("pl-10");
    });

    it("renders right icon", () => {
      render(
        <Input
          rightIcon={<Mail data-testid="mail-icon" />}
          data-testid="input"
        />
      );
      expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("pr-10");
    });

    it("auto-renders error icon when error is present", () => {
      render(<Input error="Error message" data-testid="input" />);
      const input = screen.getByTestId("input");
      // Should have right padding for icon
      expect(input).toHaveClass("pr-10");
      // Should have error styling
      expect(input).toHaveClass("border-destructive");
    });

    it("auto-renders success icon when success is true", () => {
      render(<Input success={true} data-testid="input" />);
      const input = screen.getByTestId("input");
      // Should have right padding for icon
      expect(input).toHaveClass("pr-10");
      // Should have success styling
      expect(input).toHaveClass("border-green-500");
    });
  });

  describe("Accessibility", () => {
    it("associates label with input using htmlFor and id", () => {
      render(<Input label="Email" id="email-input" />);
      const label = screen.getByText("Email");
      const input = screen.getByLabelText("Email");
      expect(label).toHaveAttribute("for", "email-input");
      expect(input).toHaveAttribute("id", "email-input");
    });

    it("generates unique id when not provided", () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText("Email");
      expect(input).toHaveAttribute("id");
      expect(input.getAttribute("id")).toBeTruthy();
    });

    it("associates error message with input", () => {
      render(<Input error="Required field" id="test-input" />);
      const input = screen.getByRole("textbox");
      const errorMessage = screen.getByText("Required field");
      expect(input).toHaveAttribute("aria-describedby");
      expect(errorMessage).toHaveAttribute("id");
      expect(input.getAttribute("aria-describedby")).toContain(
        errorMessage.getAttribute("id")
      );
    });

    it("associates hint text with input", () => {
      render(<Input hint="Enter your full name" id="test-input" />);
      const input = screen.getByRole("textbox");
      const hint = screen.getByText("Enter your full name");
      expect(input).toHaveAttribute("aria-describedby");
      expect(hint).toHaveAttribute("id");
      expect(input.getAttribute("aria-describedby")).toContain(
        hint.getAttribute("id")
      );
    });
  });

  describe("Interactions", () => {
    it("calls onChange when user types", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input onChange={handleChange} />);
      const input = screen.getByRole("textbox");

      await user.type(input, "hello");
      expect(handleChange).toHaveBeenCalledTimes(5); // One for each character
    });

    it("calls onFocus when input is focused", async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();

      render(<Input onFocus={handleFocus} />);
      const input = screen.getByRole("textbox");

      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when input loses focus", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();

      render(
        <>
          <Input onBlur={handleBlur} />
          <button>Other element</button>
        </>
      );

      const input = screen.getByRole("textbox");
      const button = screen.getByRole("button");

      await user.click(input);
      await user.click(button);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("Disabled State", () => {
    it("renders disabled input", () => {
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toBeDisabled();
      expect(input).toHaveClass(
        "disabled:cursor-not-allowed",
        "disabled:opacity-50"
      );
    });

    it("prevents interaction when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input disabled onChange={handleChange} />);
      const input = screen.getByRole("textbox");

      await user.type(input, "hello");
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Custom Classes", () => {
    it("accepts custom className", () => {
      render(<Input className="custom-class" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveClass("custom-class");
    });

    it("accepts custom containerClassName", () => {
      render(
        <Input
          label="Test"
          containerClassName="custom-container"
          data-testid="container"
        />
      );
      // The container is the parent div that contains label and input
      const container = screen
        .getByTestId("container")
        .closest(".custom-container");
      expect(container).toBeInTheDocument();
    });
  });

  describe("HTML Attributes", () => {
    it("passes through HTML attributes", () => {
      render(
        <Input
          data-testid="input"
          autoComplete="email"
          maxLength={50}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
      );

      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("autocomplete", "email");
      expect(input).toHaveAttribute("maxlength", "50");
      expect(input).toHaveAttribute(
        "pattern",
        "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
      );
    });
  });
});
