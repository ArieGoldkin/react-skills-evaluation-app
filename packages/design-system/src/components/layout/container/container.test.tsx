import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Container } from "./container";

describe("Container", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<Container>Test content</Container>);
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Container className="custom-class">Test</Container>);
      expect(screen.getByText("Test")).toHaveClass("custom-class");
    });

    it("renders as different HTML elements", () => {
      const { rerender } = render(
        <Container as="main">Main content</Container>
      );
      expect(screen.getByRole("main")).toBeInTheDocument();

      rerender(<Container as="section">Section content</Container>);
      expect(screen.getByText("Section content").tagName).toBe("SECTION");

      rerender(<Container as="article">Article content</Container>);
      expect(screen.getByText("Article content").tagName).toBe("ARTICLE");
    });
  });

  describe("Size Variants", () => {
    it("renders small size correctly", () => {
      render(<Container size="sm">Small container</Container>);
      expect(screen.getByText("Small container")).toHaveClass("max-w-2xl");
    });

    it("renders medium size correctly", () => {
      render(<Container size="md">Medium container</Container>);
      expect(screen.getByText("Medium container")).toHaveClass("max-w-4xl");
    });

    it("renders large size correctly", () => {
      render(<Container size="lg">Large container</Container>);
      expect(screen.getByText("Large container")).toHaveClass("max-w-6xl");
    });

    it("renders extra large size correctly", () => {
      render(<Container size="xl">XL container</Container>);
      expect(screen.getByText("XL container")).toHaveClass("max-w-7xl");
    });

    it("renders full size correctly", () => {
      render(<Container size="full">Full container</Container>);
      expect(screen.getByText("Full container")).toHaveClass("max-w-full");
    });
  });

  describe("Padding Variants", () => {
    it("renders no padding correctly", () => {
      render(<Container padding="none">No padding</Container>);
      expect(screen.getByText("No padding")).toHaveClass("px-0");
    });

    it("renders small padding correctly", () => {
      render(<Container padding="sm">Small padding</Container>);
      expect(screen.getByText("Small padding")).toHaveClass("px-4");
    });

    it("renders medium padding correctly", () => {
      render(<Container padding="md">Medium padding</Container>);
      expect(screen.getByText("Medium padding")).toHaveClass("px-6");
    });

    it("renders large padding correctly", () => {
      render(<Container padding="lg">Large padding</Container>);
      expect(screen.getByText("Large padding")).toHaveClass("px-8");
    });
  });

  describe("Default Variants", () => {
    it("applies default size and padding", () => {
      render(<Container>Default container</Container>);
      const container = screen.getByText("Default container");
      expect(container).toHaveClass("max-w-6xl"); // lg size
      expect(container).toHaveClass("px-6"); // md padding
    });
  });

  describe("Accessibility", () => {
    it("forwards HTML attributes", () => {
      render(
        <Container data-testid="container" aria-label="Main container">
          Content
        </Container>
      );
      const container = screen.getByTestId("container");
      expect(container).toHaveAttribute("aria-label", "Main container");
    });

    it("supports ref forwarding", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
