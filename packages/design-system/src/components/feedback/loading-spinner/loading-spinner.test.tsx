import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { LoadingSpinner } from "./loading-spinner";

describe("LoadingSpinner", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<LoadingSpinner data-testid="spinner" />);
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<LoadingSpinner className="custom-class" data-testid="spinner" />);
      expect(screen.getByTestId("spinner")).toHaveClass("custom-class");
    });

    it("has correct default role and ARIA attributes", () => {
      render(<LoadingSpinner data-testid="spinner" />);
      const spinner = screen.getByTestId("spinner");
      expect(spinner).toHaveAttribute("role", "status");
      expect(spinner).toHaveAttribute("aria-live", "polite");
      expect(spinner).toHaveAttribute("aria-label", "Loading");
    });

    it("renders with custom aria-label", () => {
      render(
        <LoadingSpinner aria-label="Processing data" data-testid="spinner" />
      );
      expect(screen.getByTestId("spinner")).toHaveAttribute(
        "aria-label",
        "Processing data"
      );
    });

    it("renders Loader2 icon with aria-hidden", () => {
      render(<LoadingSpinner />);
      const icon = screen.getByRole("status").querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Show/Hide functionality", () => {
    it("renders when show is true", () => {
      render(<LoadingSpinner show={true} data-testid="spinner" />);
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    it("does not render when show is false", () => {
      render(<LoadingSpinner show={false} data-testid="spinner" />);
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    it("renders by default (show defaults to true)", () => {
      render(<LoadingSpinner data-testid="spinner" />);
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });
  });

  describe("Size variants", () => {
    it("renders default size correctly", () => {
      render(<LoadingSpinner data-testid="spinner" />);
      const icon = screen.getByTestId("spinner").querySelector("svg");
      expect(icon).toHaveClass("w-6", "h-6");
    });

    it("renders small size correctly", () => {
      render(<LoadingSpinner size="sm" data-testid="spinner" />);
      const icon = screen.getByTestId("spinner").querySelector("svg");
      expect(icon).toHaveClass("w-4", "h-4");
    });

    it("renders large size correctly", () => {
      render(<LoadingSpinner size="lg" data-testid="spinner" />);
      const icon = screen.getByTestId("spinner").querySelector("svg");
      expect(icon).toHaveClass("w-8", "h-8");
    });
  });

  describe("Speed variants", () => {
    it("renders default speed correctly", () => {
      render(<LoadingSpinner data-testid="spinner" />);
      const icon = screen.getByTestId("spinner").querySelector("svg");
      expect(icon).toHaveClass("animate-spin", "[animation-duration:1s]");
    });

    it("renders slow speed correctly", () => {
      render(<LoadingSpinner speed="slow" data-testid="spinner" />);
      const icon = screen.getByTestId("spinner").querySelector("svg");
      expect(icon).toHaveClass("animate-spin", "[animation-duration:2s]");
    });

    it("renders fast speed correctly", () => {
      render(<LoadingSpinner speed="fast" data-testid="spinner" />);
      const icon = screen.getByTestId("spinner").querySelector("svg");
      expect(icon).toHaveClass("animate-spin", "[animation-duration:0.5s]");
    });
  });

  describe("Text content", () => {
    it("renders without text by default", () => {
      render(<LoadingSpinner data-testid="spinner" />);
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    it("renders with text prop", () => {
      render(<LoadingSpinner text="Loading data..." data-testid="spinner" />);
      expect(screen.getByText("Loading data...")).toBeInTheDocument();
    });

    it("renders with children text", () => {
      render(
        <LoadingSpinner data-testid="spinner">
          Processing request...
        </LoadingSpinner>
      );
      expect(screen.getByText("Processing request...")).toBeInTheDocument();
    });

    it("prioritizes text prop over children", () => {
      render(
        <LoadingSpinner text="Text prop" data-testid="spinner">
          Children content
        </LoadingSpinner>
      );
      expect(screen.getByText("Text prop")).toBeInTheDocument();
      expect(screen.queryByText("Children content")).not.toBeInTheDocument();
    });

    it("applies text styling", () => {
      render(<LoadingSpinner text="Loading..." />);
      const text = screen.getByText("Loading...");
      expect(text).toHaveClass("text-sm", "text-muted-foreground");
    });
  });

  describe("Direction variants", () => {
    it("renders horizontal direction by default", () => {
      render(<LoadingSpinner text="Loading..." data-testid="container" />);
      expect(screen.getByTestId("container")).toHaveClass("flex-row");
    });

    it("renders horizontal direction explicitly", () => {
      render(
        <LoadingSpinner
          text="Loading..."
          direction="horizontal"
          data-testid="container"
        />
      );
      expect(screen.getByTestId("container")).toHaveClass("flex-row");
    });

    it("renders vertical direction correctly", () => {
      render(
        <LoadingSpinner
          text="Loading..."
          direction="vertical"
          data-testid="container"
        />
      );
      expect(screen.getByTestId("container")).toHaveClass(
        "flex-col",
        "text-center"
      );
    });

    it("applies gap spacing with text", () => {
      render(<LoadingSpinner text="Loading..." data-testid="container" />);
      expect(screen.getByTestId("container")).toHaveClass("gap-2");
    });
  });

  describe("Styling", () => {
    it("applies default flex and alignment classes", () => {
      render(<LoadingSpinner data-testid="spinner" />);
      expect(screen.getByTestId("spinner")).toHaveClass(
        "inline-flex",
        "items-center",
        "justify-center"
      );
    });

    it("applies container classes when text is present", () => {
      render(<LoadingSpinner text="Loading..." data-testid="container" />);
      expect(screen.getByTestId("container")).toHaveClass(
        "inline-flex",
        "items-center"
      );
    });

    it("applies text-current class to icon", () => {
      render(<LoadingSpinner />);
      const icon = screen.getByRole("status").querySelector("svg");
      expect(icon).toHaveClass("text-current");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA live region", () => {
      render(<LoadingSpinner />);
      expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    });

    it("provides screen reader content via aria-label", () => {
      render(<LoadingSpinner aria-label="Loading user data" />);
      expect(screen.getByLabelText("Loading user data")).toBeInTheDocument();
    });

    it("hides decorative icon from screen readers", () => {
      render(<LoadingSpinner />);
      const icon = screen.getByRole("status").querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("maintains proper role when text is present", () => {
      render(<LoadingSpinner text="Loading..." />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("supports additional ARIA attributes", () => {
      render(
        <LoadingSpinner
          aria-describedby="loading-description"
          data-testid="spinner"
        />
      );
      expect(screen.getByTestId("spinner")).toHaveAttribute(
        "aria-describedby",
        "loading-description"
      );
    });
  });

  describe("HTML attributes", () => {
    it("forwards HTML attributes", () => {
      render(<LoadingSpinner id="loading-spinner" data-testid="spinner" />);
      expect(screen.getByTestId("spinner")).toHaveAttribute(
        "id",
        "loading-spinner"
      );
    });

    it("merges event handlers", () => {
      const handleClick = vi.fn();
      render(<LoadingSpinner onClick={handleClick} data-testid="spinner" />);

      screen.getByTestId("spinner").click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("applies data attributes", () => {
      render(<LoadingSpinner data-loading="true" data-testid="spinner" />);
      expect(screen.getByTestId("spinner")).toHaveAttribute(
        "data-loading",
        "true"
      );
    });
  });

  describe("Edge cases", () => {
    it("handles empty text gracefully", () => {
      render(<LoadingSpinner text="" data-testid="spinner" />);
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
      // Empty text should not render as visible text span
      expect(screen.queryByRole("status")).toBeInTheDocument();
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    it("handles undefined text", () => {
      render(<LoadingSpinner text={undefined} data-testid="spinner" />);
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    it("handles null children", () => {
      render(<LoadingSpinner data-testid="spinner">{null}</LoadingSpinner>);
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    it("combines size and speed variants", () => {
      render(<LoadingSpinner size="lg" speed="fast" data-testid="spinner" />);
      const icon = screen.getByTestId("spinner").querySelector("svg");
      expect(icon).toHaveClass(
        "w-8",
        "h-8",
        "animate-spin",
        "[animation-duration:0.5s]"
      );
    });

    it("works with all variant combinations", () => {
      render(
        <LoadingSpinner
          size="sm"
          speed="slow"
          direction="vertical"
          text="Loading slowly..."
          data-testid="container"
        />
      );
      const container = screen.getByTestId("container");
      const icon = container.querySelector("svg");

      expect(container).toHaveClass("flex-col", "text-center");
      expect(icon).toHaveClass(
        "w-4",
        "h-4",
        "animate-spin",
        "[animation-duration:2s]"
      );
      expect(screen.getByText("Loading slowly...")).toBeInTheDocument();
    });
  });

  describe("Component composition", () => {
    it("works within other components", () => {
      render(
        <div data-testid="parent">
          <LoadingSpinner text="Loading..." />
        </div>
      );
      expect(screen.getByTestId("parent")).toContainElement(
        screen.getByRole("status")
      );
    });

    it("maintains accessibility when nested", () => {
      render(
        <div role="main">
          <LoadingSpinner aria-label="Loading main content" />
        </div>
      );
      expect(screen.getByLabelText("Loading main content")).toBeInTheDocument();
    });

    it("supports conditional rendering patterns", () => {
      const { rerender } = render(
        <LoadingSpinner show={false} data-testid="spinner" />
      );
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();

      rerender(<LoadingSpinner show={true} data-testid="spinner" />);
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });
  });
});
