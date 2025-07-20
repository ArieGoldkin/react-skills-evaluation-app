import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Text } from "./text";

describe("Text", () => {
  describe("Basic Rendering", () => {
    it("renders correctly with children", () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(<Text ref={ref}>Test</Text>);
      expect(ref).toHaveBeenCalled();
    });

    it("renders as paragraph by default", () => {
      render(<Text data-testid="text">Test</Text>);
      const element = screen.getByTestId("text");
      expect(element.tagName).toBe("P");
    });
  });

  describe("Typography Variants", () => {
    it("renders display variant with correct classes", () => {
      render(
        <Text variant="display" data-testid="text">
          Display
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element).toHaveClass(
        "text-4xl",
        "font-extrabold",
        "tracking-tight"
      );
      expect(element.tagName).toBe("H1");
    });

    it("renders h1 variant with correct classes", () => {
      render(
        <Text variant="h1" data-testid="text">
          Heading 1
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element).toHaveClass(
        "text-4xl",
        "font-extrabold",
        "tracking-tight"
      );
      expect(element.tagName).toBe("H1");
    });

    it("renders h2 variant with correct classes", () => {
      render(
        <Text variant="h2" data-testid="text">
          Heading 2
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element).toHaveClass(
        "text-3xl",
        "font-semibold",
        "tracking-tight",
        "border-b",
        "pb-2"
      );
      expect(element.tagName).toBe("H2");
    });

    it("renders h3 variant with correct classes", () => {
      render(
        <Text variant="h3" data-testid="text">
          Heading 3
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element).toHaveClass(
        "text-2xl",
        "font-semibold",
        "tracking-tight"
      );
      expect(element.tagName).toBe("H3");
    });

    it("renders h4 variant with correct classes", () => {
      render(
        <Text variant="h4" data-testid="text">
          Heading 4
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element).toHaveClass("text-xl", "font-semibold", "tracking-tight");
      expect(element.tagName).toBe("H4");
    });

    it("renders body variants with correct classes", () => {
      const { rerender } = render(
        <Text variant="body-lg" data-testid="text">
          Large body
        </Text>
      );
      let element = screen.getByTestId("text");
      expect(element).toHaveClass("text-lg", "leading-7");
      expect(element.tagName).toBe("P");

      rerender(
        <Text variant="body" data-testid="text">
          Body
        </Text>
      );
      element = screen.getByTestId("text");
      expect(element).toHaveClass("leading-7");
      expect(element.tagName).toBe("P");

      rerender(
        <Text variant="body-sm" data-testid="text">
          Small body
        </Text>
      );
      element = screen.getByTestId("text");
      expect(element).toHaveClass("text-sm", "leading-6");
      expect(element.tagName).toBe("P");
    });

    it("renders specialized variants with correct classes", () => {
      const { rerender } = render(
        <Text variant="lead" data-testid="text">
          Lead
        </Text>
      );
      let element = screen.getByTestId("text");
      expect(element).toHaveClass("text-xl");
      expect(element.tagName).toBe("P");

      rerender(
        <Text variant="large" data-testid="text">
          Large
        </Text>
      );
      element = screen.getByTestId("text");
      expect(element).toHaveClass("text-lg", "font-semibold");
      expect(element.tagName).toBe("SPAN");

      rerender(
        <Text variant="caption" data-testid="text">
          Caption
        </Text>
      );
      element = screen.getByTestId("text");
      expect(element).toHaveClass("text-sm");
      expect(element.tagName).toBe("SPAN");

      rerender(
        <Text variant="overline" data-testid="text">
          Overline
        </Text>
      );
      element = screen.getByTestId("text");
      expect(element).toHaveClass(
        "text-xs",
        "font-medium",
        "uppercase",
        "tracking-wide"
      );
      expect(element.tagName).toBe("SPAN");

      rerender(
        <Text variant="muted" data-testid="text">
          Muted
        </Text>
      );
      element = screen.getByTestId("text");
      expect(element).toHaveClass("text-sm");
      expect(element.tagName).toBe("SPAN");
    });
  });

  describe("Semantic Elements", () => {
    it("renders with custom element when as prop is provided", () => {
      render(
        <Text as="h1" variant="body" data-testid="text">
          Custom H1
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element.tagName).toBe("H1");
      expect(element).toHaveClass("leading-7"); // body variant classes
    });

    it("renders different semantic elements", () => {
      const elements = [
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
      ] as const;

      elements.forEach((elementType, index) => {
        const { unmount } = render(
          <Text as={elementType} data-testid={`text-${index}`}>
            Test {elementType}
          </Text>
        );

        const element = screen.getByTestId(`text-${index}`);
        expect(element.tagName).toBe(elementType.toUpperCase());
        unmount();
      });
    });
  });

  describe("Color Variants", () => {
    it("renders color variants with correct classes", () => {
      const colors = [
        { color: "primary", class: "text-foreground" },
        { color: "secondary", class: "text-muted-foreground" },
        { color: "muted", class: "text-muted-foreground" },
        { color: "error", class: "text-destructive" },
        { color: "success", class: "text-green-600" },
        { color: "warning", class: "text-yellow-600" },
        { color: "info", class: "text-blue-600" },
      ] as const;

      colors.forEach(({ color, class: expectedClass }, index) => {
        const { unmount } = render(
          <Text color={color} data-testid={`text-${index}`}>
            {color} text
          </Text>
        );

        const element = screen.getByTestId(`text-${index}`);
        expect(element).toHaveClass(expectedClass);
        unmount();
      });
    });
  });

  describe("Text Alignment", () => {
    it("renders alignment variants with correct classes", () => {
      const alignments = [
        { align: "left", class: "text-left" },
        { align: "center", class: "text-center" },
        { align: "right", class: "text-right" },
        { align: "justify", class: "text-justify" },
      ] as const;

      alignments.forEach(({ align, class: expectedClass }, index) => {
        const { unmount } = render(
          <Text align={align} data-testid={`text-${index}`}>
            {align} aligned text
          </Text>
        );

        const element = screen.getByTestId(`text-${index}`);
        expect(element).toHaveClass(expectedClass);
        unmount();
      });
    });
  });

  describe("Font Weight", () => {
    it("renders weight variants with correct classes", () => {
      const weights = [
        { weight: "normal", class: "font-normal" },
        { weight: "medium", class: "font-medium" },
        { weight: "semibold", class: "font-semibold" },
        { weight: "bold", class: "font-bold" },
      ] as const;

      weights.forEach(({ weight, class: expectedClass }, index) => {
        const { unmount } = render(
          <Text weight={weight} data-testid={`text-${index}`}>
            {weight} weight text
          </Text>
        );

        const element = screen.getByTestId(`text-${index}`);
        expect(element).toHaveClass(expectedClass);
        unmount();
      });
    });
  });

  describe("Text Truncation", () => {
    it("applies single line truncation when truncate is true", () => {
      render(
        <Text truncate={true} data-testid="text">
          Long text
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element).toHaveClass("truncate");
    });

    it("applies multi-line truncation with line-clamp", () => {
      render(
        <Text truncate={2} data-testid="text">
          Long text
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element).toHaveClass("line-clamp-2");
    });

    it("applies different line-clamp values", () => {
      const lines = [2, 3, 4, 5];

      lines.forEach((lineCount, index) => {
        const { unmount } = render(
          <Text truncate={lineCount} data-testid={`text-${index}`}>
            Long text content
          </Text>
        );

        const element = screen.getByTestId(`text-${index}`);
        expect(element).toHaveClass(`line-clamp-${lineCount}`);
        unmount();
      });
    });

    it("does not apply truncation when truncate is false", () => {
      render(
        <Text truncate={false} data-testid="text">
          Text
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element).not.toHaveClass("truncate");
      expect(element.className).not.toMatch(/line-clamp-/);
    });

    it("does not apply truncation when truncate is undefined", () => {
      render(<Text data-testid="text">Text</Text>);
      const element = screen.getByTestId("text");
      expect(element).not.toHaveClass("truncate");
      expect(element.className).not.toMatch(/line-clamp-/);
    });
  });

  describe("Combined Props", () => {
    it("applies multiple variant classes correctly", () => {
      render(
        <Text
          variant="h2"
          color="success"
          align="center"
          weight="bold"
          truncate={true}
          data-testid="text"
        >
          Combined styling
        </Text>
      );

      const element = screen.getByTestId("text");
      expect(element).toHaveClass(
        "text-3xl", // h2 variant
        "tracking-tight", // h2 variant
        "text-center", // center align
        "font-bold", // bold weight
        "truncate" // truncation
      );
      // Check that it contains success color (either light or dark mode class)
      expect(element.className).toMatch(/text-green-/);
    });
  });

  describe("Custom Classes", () => {
    it("accepts custom className", () => {
      render(
        <Text className="custom-class" data-testid="text">
          Text
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element).toHaveClass("custom-class");
    });

    it("merges custom className with variant classes", () => {
      render(
        <Text variant="h1" className="custom-class" data-testid="text">
          Heading
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element).toHaveClass("custom-class", "text-4xl", "font-extrabold");
    });
  });

  describe("HTML Attributes", () => {
    it("passes through HTML attributes", () => {
      render(
        <Text
          data-testid="text"
          id="test-id"
          role="heading"
          aria-level="2"
          title="Test title"
        >
          Text with attributes
        </Text>
      );

      const element = screen.getByTestId("text");
      expect(element).toHaveAttribute("id", "test-id");
      expect(element).toHaveAttribute("role", "heading");
      expect(element).toHaveAttribute("aria-level", "2");
      expect(element).toHaveAttribute("title", "Test title");
    });
  });

  describe("Default Variants", () => {
    it("uses default variants when none are specified", () => {
      render(<Text data-testid="text">Default text</Text>);
      const element = screen.getByTestId("text");

      // Should have default variant classes
      expect(element).toHaveClass("leading-7"); // body variant
      expect(element).toHaveClass("text-foreground"); // primary color
      expect(element).toHaveClass("text-left"); // left align
      expect(element).toHaveClass("font-normal"); // normal weight
    });
  });

  describe("Accessibility", () => {
    it("maintains semantic structure with proper heading levels", () => {
      render(
        <div>
          <Text variant="h1" data-testid="h1">
            Main Heading
          </Text>
          <Text variant="h2" data-testid="h2">
            Sub Heading
          </Text>
          <Text variant="h3" data-testid="h3">
            Section Heading
          </Text>
        </div>
      );

      expect(screen.getByTestId("h1").tagName).toBe("H1");
      expect(screen.getByTestId("h2").tagName).toBe("H2");
      expect(screen.getByTestId("h3").tagName).toBe("H3");
    });

    it("allows semantic override while maintaining visual styling", () => {
      render(
        <Text variant="h1" as="p" data-testid="text">
          Visual H1 as P
        </Text>
      );
      const element = screen.getByTestId("text");
      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("text-4xl", "font-extrabold"); // h1 styling
    });
  });

  describe("Content Rendering", () => {
    it("renders string content", () => {
      render(<Text>String content</Text>);
      expect(screen.getByText("String content")).toBeInTheDocument();
    });

    it("renders React node content", () => {
      render(
        <Text>
          Content with <strong>bold text</strong> and <em>italic text</em>
        </Text>
      );
      expect(screen.getByText(/Content with/)).toBeInTheDocument();
      expect(screen.getByText("bold text")).toBeInTheDocument();
      expect(screen.getByText("italic text")).toBeInTheDocument();
    });

    it("renders complex nested content", () => {
      render(
        <Text as="div">
          <span>Nested</span> <div>Complex</div> Content
        </Text>
      );
      expect(screen.getByText("Nested")).toBeInTheDocument();
      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });
});
