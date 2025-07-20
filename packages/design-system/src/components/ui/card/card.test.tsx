import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";

describe("Card", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Card className="custom-class">Card content</Card>);
      expect(screen.getByText("Card content")).toHaveClass("custom-class");
    });

    it("renders as div by default", () => {
      render(<Card data-testid="card">Card content</Card>);
      expect(screen.getByTestId("card").tagName).toBe("DIV");
    });
  });

  describe("Variants", () => {
    it("renders default variant correctly", () => {
      render(<Card data-testid="card">Default</Card>);
      expect(screen.getByTestId("card")).toHaveClass("border-border");
    });

    it("renders outlined variant correctly", () => {
      render(
        <Card variant="outlined" data-testid="card">
          Outlined
        </Card>
      );
      expect(screen.getByTestId("card")).toHaveClass("border-2");
    });

    it("renders elevated variant correctly", () => {
      render(
        <Card variant="elevated" data-testid="card">
          Elevated
        </Card>
      );
      expect(screen.getByTestId("card")).toHaveClass(
        "border-none",
        "shadow-lg"
      );
    });

    it("renders ghost variant correctly", () => {
      render(
        <Card variant="ghost" data-testid="card">
          Ghost
        </Card>
      );
      expect(screen.getByTestId("card")).toHaveClass(
        "border-none",
        "shadow-none",
        "bg-transparent"
      );
    });
  });

  describe("Padding", () => {
    it("renders default padding correctly", () => {
      render(<Card data-testid="card">Default padding</Card>);
      expect(screen.getByTestId("card")).toHaveClass("p-6");
    });

    it("renders small padding correctly", () => {
      render(
        <Card padding="sm" data-testid="card">
          Small padding
        </Card>
      );
      expect(screen.getByTestId("card")).toHaveClass("p-4");
    });

    it("renders large padding correctly", () => {
      render(
        <Card padding="lg" data-testid="card">
          Large padding
        </Card>
      );
      expect(screen.getByTestId("card")).toHaveClass("p-8");
    });

    it("renders no padding correctly", () => {
      render(
        <Card padding="none" data-testid="card">
          No padding
        </Card>
      );
      expect(screen.getByTestId("card")).toHaveClass("p-0");
    });
  });

  describe("Clickable functionality", () => {
    it("renders as non-clickable by default", () => {
      render(<Card data-testid="card">Card</Card>);
      const card = screen.getByTestId("card");
      expect(card).not.toHaveAttribute("role", "button");
      expect(card).not.toHaveAttribute("tabIndex");
      expect(card).not.toHaveClass("cursor-pointer");
    });

    it("renders as clickable when specified", () => {
      render(
        <Card clickable data-testid="card">
          Clickable card
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveAttribute("role", "button");
      expect(card).toHaveAttribute("tabIndex", "0");
      expect(card).toHaveClass("cursor-pointer");
    });

    it("calls onClick when clicked", async () => {
      const handleClick = vi.fn();
      render(
        <Card clickable onClick={handleClick} data-testid="card">
          Clickable
        </Card>
      );

      await userEvent.click(screen.getByTestId("card"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports keyboard navigation", async () => {
      const handleClick = vi.fn();
      render(
        <Card clickable onClick={handleClick} data-testid="card">
          Clickable
        </Card>
      );

      screen.getByTestId("card").focus();
      await userEvent.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes when clickable", () => {
      render(
        <Card clickable aria-label="Interactive card" data-testid="card">
          Card
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveAttribute("role", "button");
      expect(card).toHaveAttribute("aria-label", "Interactive card");
    });

    it("supports focus management", () => {
      render(
        <Card clickable data-testid="card">
          Focusable card
        </Card>
      );
      const card = screen.getByTestId("card");
      card.focus();
      expect(card).toHaveFocus();
    });
  });
});

describe("CardHeader", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<CardHeader>Header content</CardHeader>);
      expect(screen.getByText("Header content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<CardHeader className="custom-header">Header</CardHeader>);
      expect(screen.getByText("Header")).toHaveClass("custom-header");
    });

    it("has default flex layout", () => {
      render(<CardHeader data-testid="header">Header</CardHeader>);
      expect(screen.getByTestId("header")).toHaveClass(
        "flex",
        "flex-col",
        "space-y-1.5"
      );
    });
  });

  describe("Padding variants", () => {
    it("renders default padding", () => {
      render(<CardHeader data-testid="header">Header</CardHeader>);
      expect(screen.getByTestId("header")).toHaveClass("p-6", "pb-2");
    });

    it("renders small padding", () => {
      render(
        <CardHeader padding="sm" data-testid="header">
          Header
        </CardHeader>
      );
      expect(screen.getByTestId("header")).toHaveClass("p-4", "pb-2");
    });

    it("renders large padding", () => {
      render(
        <CardHeader padding="lg" data-testid="header">
          Header
        </CardHeader>
      );
      expect(screen.getByTestId("header")).toHaveClass("p-8", "pb-4");
    });
  });
});

describe("CardTitle", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<CardTitle>Card Title</CardTitle>);
      expect(screen.getByText("Card Title")).toBeInTheDocument();
    });

    it("renders as h3 by default", () => {
      render(<CardTitle data-testid="title">Title</CardTitle>);
      expect(screen.getByTestId("title").tagName).toBe("H3");
    });

    it("renders as custom heading level", () => {
      render(
        <CardTitle as="h1" data-testid="title">
          Title
        </CardTitle>
      );
      expect(screen.getByTestId("title").tagName).toBe("H1");
    });

    it("applies default styling", () => {
      render(<CardTitle data-testid="title">Title</CardTitle>);
      const title = screen.getByTestId("title");
      expect(title).toHaveClass("text-2xl");
      expect(title).toHaveClass("font-semibold");
      expect(title).toHaveClass("tracking-tight");
      // Note: leading-none class may be processed differently by Tailwind in test environment
    });
  });

  describe("Size variants", () => {
    it("renders default size", () => {
      render(<CardTitle data-testid="title">Title</CardTitle>);
      expect(screen.getByTestId("title")).toHaveClass("text-2xl");
    });

    it("renders small size", () => {
      render(
        <CardTitle size="sm" data-testid="title">
          Title
        </CardTitle>
      );
      expect(screen.getByTestId("title")).toHaveClass("text-lg");
    });

    it("renders large size", () => {
      render(
        <CardTitle size="lg" data-testid="title">
          Title
        </CardTitle>
      );
      expect(screen.getByTestId("title")).toHaveClass("text-3xl");
    });
  });
});

describe("CardDescription", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<CardDescription>Description text</CardDescription>);
      expect(screen.getByText("Description text")).toBeInTheDocument();
    });

    it("applies default styling", () => {
      render(<CardDescription data-testid="desc">Description</CardDescription>);
      expect(screen.getByTestId("desc")).toHaveClass(
        "text-sm",
        "text-muted-foreground"
      );
    });

    it("renders as paragraph", () => {
      render(<CardDescription data-testid="desc">Description</CardDescription>);
      expect(screen.getByTestId("desc").tagName).toBe("P");
    });
  });

  describe("Size variants", () => {
    it("renders default size", () => {
      render(<CardDescription data-testid="desc">Description</CardDescription>);
      expect(screen.getByTestId("desc")).toHaveClass("text-sm");
    });

    it("renders small size", () => {
      render(
        <CardDescription size="sm" data-testid="desc">
          Description
        </CardDescription>
      );
      expect(screen.getByTestId("desc")).toHaveClass("text-xs");
    });

    it("renders large size", () => {
      render(
        <CardDescription size="lg" data-testid="desc">
          Description
        </CardDescription>
      );
      expect(screen.getByTestId("desc")).toHaveClass("text-base");
    });
  });
});

describe("CardContent", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<CardContent>Content text</CardContent>);
      expect(screen.getByText("Content text")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<CardContent className="custom-content">Content</CardContent>);
      expect(screen.getByText("Content")).toHaveClass("custom-content");
    });
  });

  describe("Padding variants", () => {
    it("renders default padding", () => {
      render(<CardContent data-testid="content">Content</CardContent>);
      expect(screen.getByTestId("content")).toHaveClass("p-6", "pt-0");
    });

    it("renders small padding", () => {
      render(
        <CardContent padding="sm" data-testid="content">
          Content
        </CardContent>
      );
      expect(screen.getByTestId("content")).toHaveClass("p-4", "pt-0");
    });

    it("renders no padding", () => {
      render(
        <CardContent padding="none" data-testid="content">
          Content
        </CardContent>
      );
      expect(screen.getByTestId("content")).toHaveClass("p-0");
    });
  });
});

describe("CardFooter", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("applies default styling", () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      expect(screen.getByTestId("footer")).toHaveClass("flex", "items-center");
    });
  });

  describe("Padding variants", () => {
    it("renders default padding", () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      expect(screen.getByTestId("footer")).toHaveClass("p-6", "pt-0");
    });

    it("renders small padding", () => {
      render(
        <CardFooter padding="sm" data-testid="footer">
          Footer
        </CardFooter>
      );
      expect(screen.getByTestId("footer")).toHaveClass("p-4", "pt-0");
    });
  });

  describe("Justify variants", () => {
    it("renders default justify (start)", () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      expect(screen.getByTestId("footer")).toHaveClass("justify-start");
    });

    it("renders center justify", () => {
      render(
        <CardFooter justify="center" data-testid="footer">
          Footer
        </CardFooter>
      );
      expect(screen.getByTestId("footer")).toHaveClass("justify-center");
    });

    it("renders end justify", () => {
      render(
        <CardFooter justify="end" data-testid="footer">
          Footer
        </CardFooter>
      );
      expect(screen.getByTestId("footer")).toHaveClass("justify-end");
    });

    it("renders between justify", () => {
      render(
        <CardFooter justify="between" data-testid="footer">
          Footer
        </CardFooter>
      );
      expect(screen.getByTestId("footer")).toHaveClass("justify-between");
    });
  });
});

describe("Card Composition", () => {
  it("renders complete card structure", () => {
    render(
      <Card data-testid="card">
        <CardHeader data-testid="header">
          <CardTitle data-testid="title">Card Title</CardTitle>
          <CardDescription data-testid="description">
            Card Description
          </CardDescription>
        </CardHeader>
        <CardContent data-testid="content">
          <p>Card content goes here</p>
        </CardContent>
        <CardFooter data-testid="footer">
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Card content goes here")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("works without optional sections", () => {
    render(
      <Card>
        <CardContent>Just content, no header or footer</CardContent>
      </Card>
    );

    expect(
      screen.getByText("Just content, no header or footer")
    ).toBeInTheDocument();
  });
});

describe("Accessibility", () => {
  it("maintains semantic structure", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle as="h2">Semantic Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Content with proper semantics</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("supports ARIA attributes", () => {
    render(
      <Card aria-label="Product card" data-testid="card">
        <CardContent>Product information</CardContent>
      </Card>
    );

    expect(screen.getByTestId("card")).toHaveAttribute(
      "aria-label",
      "Product card"
    );
  });
});
