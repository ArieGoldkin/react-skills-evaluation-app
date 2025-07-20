# Testing Templates

## Basic Test Structure

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Component } from "./component";

describe("Component", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<Component>Test content</Component>);
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Component className="custom-class">Test</Component>);
      expect(screen.getByText("Test")).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("renders default variant correctly", () => {
      render(<Component variant="default">Default</Component>);
      // Test variant-specific classes
    });

    it("renders all size variants", () => {
      render(
        <div>
          <Component size="sm">Small</Component>
          <Component size="md">Medium</Component>
          <Component size="lg">Large</Component>
        </div>
      );
      // Test size-specific classes
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<Component aria-label="Test component">Content</Component>);
      expect(screen.getByLabelText("Test component")).toBeInTheDocument();
    });

    it("supports keyboard navigation", async () => {
      render(<Component>Focusable</Component>);
      await userEvent.tab();
      expect(screen.getByText("Focusable")).toHaveFocus();
    });
  });

  describe("Interactions", () => {
    it("handles click events", async () => {
      const handleClick = jest.fn();
      render(<Component onClick={handleClick}>Clickable</Component>);
      
      await userEvent.click(screen.getByText("Clickable"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

## Testing Requirements
- Minimum 90% test coverage
- Test all variants and props
- Include accessibility testing
- Test user interactions
- Cover error states and edge cases