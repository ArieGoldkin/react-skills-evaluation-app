import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "./breadcrumb";
import { vi } from "vitest";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/skills/new",
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("Breadcrumb", () => {
  describe("Basic Functionality", () => {
    it("renders with provided items", () => {
      const items = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Skills", href: "/dashboard/skills" },
        { label: "New" },
      ];

      render(<Breadcrumb items={items} />);

      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Skills")).toBeInTheDocument();
      expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("renders home link when showHome is true", () => {
      render(<Breadcrumb showHome={true} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("does not render home link when showHome is false", () => {
      render(<Breadcrumb showHome={false} />);
      expect(screen.queryByText("Home")).not.toBeInTheDocument();
    });

    it("auto-generates breadcrumbs from pathname", () => {
      render(<Breadcrumb />);

      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Skills")).toBeInTheDocument();
      expect(screen.getByText("New")).toBeInTheDocument();
    });
  });

  describe("Links", () => {
    it("renders links for all items except the last", () => {
      const items = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Skills", href: "/dashboard/skills" },
        { label: "New" },
      ];

      render(<Breadcrumb items={items} />);

      const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
      expect(dashboardLink).toHaveAttribute("href", "/dashboard");

      const skillsLink = screen.getByRole("link", { name: "Skills" });
      expect(skillsLink).toHaveAttribute("href", "/dashboard/skills");

      // Last item should not be a link
      expect(screen.getByText("New").closest("a")).not.toBeInTheDocument();
    });

    it("marks the last item with aria-current", () => {
      const items = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Skills" },
      ];

      render(<Breadcrumb items={items} />);

      const lastItem = screen.getByText("Skills").parentElement;
      expect(lastItem).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Max Items", () => {
    it("shows ellipsis when items exceed maxItems", () => {
      const items = [
        { label: "Home", href: "/" },
        { label: "Category", href: "/category" },
        { label: "Subcategory", href: "/category/subcategory" },
        { label: "Product", href: "/category/subcategory/product" },
        { label: "Details" },
      ];

      render(<Breadcrumb items={items} maxItems={3} showHome={false} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("...")).toBeInTheDocument();
      expect(screen.getByText("Product")).toBeInTheDocument();
      expect(screen.getByText("Details")).toBeInTheDocument();
      expect(screen.queryByText("Category")).not.toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("applies custom className", () => {
      render(<Breadcrumb className="custom-breadcrumb" />);

      const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
      expect(nav).toHaveClass("custom-breadcrumb");
    });

    it("uses custom separator", () => {
      render(
        <Breadcrumb
          items={[{ label: "First", href: "/" }, { label: "Second" }]}
          separator="/"
          showHome={false}
        />
      );

      expect(screen.getByText("/")).toBeInTheDocument();
    });

    it("uses custom home label and href", () => {
      render(
        <Breadcrumb
          homeLabel="Dashboard"
          homeHref="/dashboard"
          showHome={true}
        />
      );

      const homeLink = screen.getByRole("link", { name: /Dashboard/ });
      expect(homeLink).toHaveAttribute("href", "/dashboard");
    });

    it("renders with custom icons", () => {
      const items = [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: <span data-testid="custom-icon">📊</span>,
        },
      ];

      render(<Breadcrumb items={items} showHome={false} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper navigation landmark", () => {
      render(<Breadcrumb />);
      expect(
        screen.getByRole("navigation", { name: "Breadcrumb" })
      ).toBeInTheDocument();
    });

    it("uses ordered list for semantic structure", () => {
      render(
        <Breadcrumb
          items={[{ label: "First", href: "/" }, { label: "Second" }]}
        />
      );

      const list = screen.getByRole("list");
      expect(list.tagName).toBe("OL");
    });

    it("hides separator from screen readers", () => {
      render(
        <Breadcrumb
          items={[{ label: "First", href: "/" }, { label: "Second" }]}
          showHome={false}
        />
      );

      const separators = document.querySelectorAll('[aria-hidden="true"]');
      expect(separators).toHaveLength(1);
    });
  });
});
