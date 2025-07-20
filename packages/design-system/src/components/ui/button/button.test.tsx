import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<Button>Test button</Button>);
      expect(screen.getByText("Test button")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Button className="custom-class">Test</Button>);
      expect(screen.getByText("Test")).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("renders default variant correctly", () => {
      render(<Button variant="default">Default</Button>);
      expect(screen.getByText("Default")).toHaveClass("bg-primary");
    });

    it("renders secondary variant correctly", () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByText("Secondary")).toHaveClass("bg-secondary");
    });

    it("renders destructive variant correctly", () => {
      render(<Button variant="destructive">Destructive</Button>);
      expect(screen.getByText("Destructive")).toHaveClass("bg-destructive");
    });

    it("renders outline variant correctly", () => {
      render(<Button variant="outline">Outline</Button>);
      expect(screen.getByText("Outline")).toHaveClass("border");
    });

    it("renders ghost variant correctly", () => {
      render(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByText("Ghost")).toHaveClass("hover:bg-accent");
    });

    it("renders link variant correctly", () => {
      render(<Button variant="link">Link</Button>);
      expect(screen.getByText("Link")).toHaveClass("underline-offset-4");
    });
  });

  describe("Sizes", () => {
    it("renders default size correctly", () => {
      render(<Button size="default">Default size</Button>);
      expect(screen.getByText("Default size")).toHaveClass("h-10");
    });

    it("renders small size correctly", () => {
      render(<Button size="sm">Small</Button>);
      expect(screen.getByText("Small")).toHaveClass("h-9");
    });

    it("renders large size correctly", () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByText("Large")).toHaveClass("h-11");
    });

    it("renders icon size correctly", () => {
      render(<Button size="icon">🚀</Button>);
      expect(screen.getByText("🚀")).toHaveClass("h-10", "w-10");
    });
  });

  describe("States", () => {
    it("handles disabled state", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByText("Disabled");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("disabled:pointer-events-none");
    });
  });

  describe("Interactions", () => {
    it("calls onClick when clicked", async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Clickable</Button>);

      await userEvent.click(screen.getByText("Clickable"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      await userEvent.click(screen.getByText("Disabled"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Composition", () => {
    it("supports asChild prop", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = screen.getByText("Link Button");
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/test");
    });
  });

  describe("Accessibility", () => {
    it("has proper button role", () => {
      render(<Button>Accessible button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("supports ARIA attributes", () => {
      render(<Button aria-label="Custom label">Button</Button>);
      expect(screen.getByLabelText("Custom label")).toBeInTheDocument();
    });

    it("supports keyboard navigation", async () => {
      render(<Button>Focusable</Button>);

      await userEvent.tab();
      expect(screen.getByText("Focusable")).toHaveFocus();
    });
  });
});
