import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination, SimplePagination } from "./pagination";
import { vi } from "vitest";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("renders pagination controls", () => {
      render(<Pagination {...defaultProps} />);

      expect(
        screen.getByRole("navigation", { name: "Pagination Navigation" })
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 1")).toBeInTheDocument();
    });

    it("shows correct page numbers for small total pages", () => {
      render(<Pagination {...defaultProps} totalPages={5} />);

      for (let i = 1; i <= 5; i++) {
        expect(screen.getByLabelText(`Go to page ${i}`)).toBeInTheDocument();
      }
    });

    it("shows dots for large page counts", () => {
      render(<Pagination {...defaultProps} currentPage={5} totalPages={20} />);

      expect(screen.getByLabelText("Go to page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 5")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 20")).toBeInTheDocument();

      // Check for ellipsis icons
      const ellipsisIcons = document.querySelectorAll(".lucide-ellipsis");
      expect(ellipsisIcons).toHaveLength(2);
    });

    it("highlights current page", () => {
      render(<Pagination {...defaultProps} currentPage={3} />);

      const currentPageButton = screen.getByLabelText("Go to page 3");
      expect(currentPageButton).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Navigation Controls", () => {
    it("calls onPageChange when clicking page number", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();

      render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

      await user.click(screen.getByLabelText("Go to page 3"));
      expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it("navigates to previous page", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();

      render(
        <Pagination
          {...defaultProps}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );

      await user.click(screen.getByLabelText("Go to previous page"));
      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it("navigates to next page", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();

      render(
        <Pagination
          {...defaultProps}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );

      await user.click(screen.getByLabelText("Go to next page"));
      expect(onPageChange).toHaveBeenCalledWith(6);
    });

    it("navigates to first page", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();

      render(
        <Pagination
          {...defaultProps}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );

      await user.click(screen.getByLabelText("Go to first page"));
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it("navigates to last page", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();

      render(
        <Pagination
          {...defaultProps}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );

      await user.click(screen.getByLabelText("Go to last page"));
      expect(onPageChange).toHaveBeenCalledWith(10);
    });
  });

  describe("Disabled States", () => {
    it("disables previous/first buttons on first page", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);

      expect(screen.getByLabelText("Go to previous page")).toBeDisabled();
      expect(screen.getByLabelText("Go to first page")).toBeDisabled();
    });

    it("disables next/last buttons on last page", () => {
      render(<Pagination {...defaultProps} currentPage={10} />);

      expect(screen.getByLabelText("Go to next page")).toBeDisabled();
      expect(screen.getByLabelText("Go to last page")).toBeDisabled();
    });

    it("disables all controls when disabled prop is true", () => {
      render(<Pagination {...defaultProps} disabled />);

      const buttons = screen.getAllByRole("button");
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });

    it("does not call onPageChange when disabled", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();

      render(
        <Pagination {...defaultProps} disabled onPageChange={onPageChange} />
      );

      await user.click(screen.getByLabelText("Go to page 2"));
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });

  describe("Custom Props", () => {
    it("hides first/last buttons when showFirstLast is false", () => {
      render(<Pagination {...defaultProps} showFirstLast={false} />);

      expect(
        screen.queryByLabelText("Go to first page")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByLabelText("Go to last page")
      ).not.toBeInTheDocument();
    });

    it("hides prev/next buttons when showPrevNext is false", () => {
      render(<Pagination {...defaultProps} showPrevNext={false} />);

      expect(
        screen.queryByLabelText("Go to previous page")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByLabelText("Go to next page")
      ).not.toBeInTheDocument();
    });

    it("shows page info when enabled", () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={2}
          pageSize={10}
          totalItems={95}
          showPageInfo
        />
      );

      expect(
        screen.getByText("Showing 11 to 20 of 95 results")
      ).toBeInTheDocument();
    });

    it("respects siblingCount prop", () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={5}
          totalPages={20}
          siblingCount={2}
        />
      );

      expect(screen.getByLabelText("Go to page 3")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 4")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 5")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 6")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 7")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Pagination {...defaultProps} className="custom-pagination" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("custom-pagination");
    });
  });

  describe("Edge Cases", () => {
    it("returns null when totalPages is 0", () => {
      const { container } = render(
        <Pagination {...defaultProps} totalPages={0} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not navigate beyond boundaries", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();

      render(
        <Pagination
          {...defaultProps}
          currentPage={1}
          onPageChange={onPageChange}
        />
      );

      // Try to go to page 0
      await user.click(screen.getByLabelText("Go to previous page"));
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it("handles single page correctly", () => {
      render(<Pagination {...defaultProps} totalPages={1} />);

      expect(screen.getByLabelText("Go to page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to previous page")).toBeDisabled();
      expect(screen.getByLabelText("Go to next page")).toBeDisabled();
    });
  });
});

describe("SimplePagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders simple pagination controls", () => {
    render(<SimplePagination {...defaultProps} />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
  });

  it("calls onPageChange for previous", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <SimplePagination
        {...defaultProps}
        currentPage={3}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByText("Previous"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange for next", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <SimplePagination
        {...defaultProps}
        currentPage={3}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByText("Next"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("disables previous on first page", () => {
    render(<SimplePagination {...defaultProps} currentPage={1} />);
    expect(screen.getByText("Previous")).toBeDisabled();
  });

  it("disables next on last page", () => {
    render(<SimplePagination {...defaultProps} currentPage={5} />);
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("disables all controls when disabled", () => {
    render(<SimplePagination {...defaultProps} disabled />);

    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });
});
