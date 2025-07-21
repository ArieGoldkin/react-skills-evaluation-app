import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CategoryFilter, type CategoryFilterProps } from "./category-filter";

const mockCategories: CategoryFilterProps["categories"] = [
  {
    id: "1",
    name: "Programming Languages",
    slug: "programming-languages",
    icon: "💻",
    color: "#3B82F6",
    skillCount: 8,
  },
  {
    id: "2",
    name: "Frontend Development",
    slug: "frontend-development",
    icon: "🎨",
    color: "#8B5CF6",
    skillCount: 12,
  },
  {
    id: "3",
    name: "Backend Development",
    slug: "backend-development",
    icon: "⚙️",
    color: "#10B981",
    skillCount: 6,
  },
];

const renderCategoryFilter = (props: Partial<CategoryFilterProps> = {}) => {
  const defaultProps: CategoryFilterProps = {
    categories: mockCategories,
    selectedCategories: [],
    onSelectionChange: vi.fn(),
    ...props,
  };

  return render(<CategoryFilter {...defaultProps} />);
};

describe("CategoryFilter", () => {
  it("renders category list correctly", () => {
    renderCategoryFilter();

    expect(screen.getByText("Programming Languages")).toBeInTheDocument();
    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(screen.getByText("Backend Development")).toBeInTheDocument();
  });

  it("displays category icons when showIcons is true", () => {
    renderCategoryFilter({ showIcons: true });

    expect(screen.getByText("💻")).toBeInTheDocument();
    expect(screen.getByText("🎨")).toBeInTheDocument();
    expect(screen.getByText("⚙️")).toBeInTheDocument();
  });

  it("hides category icons when showIcons is false", () => {
    renderCategoryFilter({ showIcons: false });

    expect(screen.queryByText("💻")).not.toBeInTheDocument();
    expect(screen.queryByText("🎨")).not.toBeInTheDocument();
    expect(screen.queryByText("⚙️")).not.toBeInTheDocument();
  });

  it("displays skill counts when showCounts is true", () => {
    renderCategoryFilter({ showCounts: true });

    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("hides skill counts when showCounts is false", () => {
    renderCategoryFilter({ showCounts: false });

    expect(screen.queryByText("8")).not.toBeInTheDocument();
    expect(screen.queryByText("12")).not.toBeInTheDocument();
    expect(screen.queryByText("6")).not.toBeInTheDocument();
  });

  it("shows search input when showSearch is true", () => {
    renderCategoryFilter({ showSearch: true });

    expect(
      screen.getByPlaceholderText("Search categories...")
    ).toBeInTheDocument();
  });

  it("hides search input when showSearch is false", () => {
    renderCategoryFilter({ showSearch: false });

    expect(
      screen.queryByPlaceholderText("Search categories...")
    ).not.toBeInTheDocument();
  });

  it("filters categories based on search input", async () => {
    renderCategoryFilter();

    const searchInput = screen.getByPlaceholderText("Search categories...");
    fireEvent.change(searchInput, { target: { value: "Frontend" } });

    await waitFor(() => {
      expect(screen.getByText("Frontend Development")).toBeInTheDocument();
      expect(
        screen.queryByText("Programming Languages")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Backend Development")).not.toBeInTheDocument();
    });
  });

  it("filters categories by slug", async () => {
    renderCategoryFilter();

    const searchInput = screen.getByPlaceholderText("Search categories...");
    fireEvent.change(searchInput, { target: { value: "backend-development" } });

    await waitFor(() => {
      expect(screen.getByText("Backend Development")).toBeInTheDocument();
      expect(
        screen.queryByText("Programming Languages")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Frontend Development")
      ).not.toBeInTheDocument();
    });
  });

  it("shows empty state when no categories match search", async () => {
    renderCategoryFilter();

    const searchInput = screen.getByPlaceholderText("Search categories...");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("No categories found")).toBeInTheDocument();
      expect(screen.getByText("Clear search")).toBeInTheDocument();
    });
  });

  it("clears search when clear search button is clicked", async () => {
    renderCategoryFilter();

    const searchInput = screen.getByPlaceholderText("Search categories...");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("Clear search")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Clear search"));

    await waitFor(() => {
      expect(screen.getByText("Programming Languages")).toBeInTheDocument();
      expect(screen.getByText("Frontend Development")).toBeInTheDocument();
      expect(screen.getByText("Backend Development")).toBeInTheDocument();
    });
  });

  it("calls onSelectionChange when category is selected", () => {
    const onSelectionChange = vi.fn();
    renderCategoryFilter({ onSelectionChange });

    fireEvent.click(screen.getByText("Programming Languages"));

    expect(onSelectionChange).toHaveBeenCalledWith(["1"]);
  });

  it("calls onSelectionChange when category is deselected", () => {
    const onSelectionChange = vi.fn();
    renderCategoryFilter({
      selectedCategories: ["1"],
      onSelectionChange,
    });

    fireEvent.click(screen.getByText("Programming Languages"));

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it("displays selected count badge", () => {
    renderCategoryFilter({ selectedCategories: ["1", "2"] });

    expect(screen.getByText("2 selected")).toBeInTheDocument();
  });

  it("shows bulk action buttons when showBulkActions is true", () => {
    renderCategoryFilter({ showBulkActions: true });

    expect(screen.getByText("Select All")).toBeInTheDocument();
  });

  it("hides bulk action buttons when showBulkActions is false", () => {
    renderCategoryFilter({ showBulkActions: false });

    expect(screen.queryByText("Select All")).not.toBeInTheDocument();
  });

  it("selects all categories when Select All is clicked", () => {
    const onSelectionChange = vi.fn();
    renderCategoryFilter({ onSelectionChange });

    fireEvent.click(screen.getByText("Select All"));

    expect(onSelectionChange).toHaveBeenCalledWith(["1", "2", "3"]);
  });

  it("deselects all categories when Deselect All is clicked", () => {
    const onSelectionChange = vi.fn();
    renderCategoryFilter({
      selectedCategories: ["1", "2", "3"],
      onSelectionChange,
    });

    fireEvent.click(screen.getByText("Deselect All"));

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it("shows Clear All button when some categories are selected", () => {
    renderCategoryFilter({ selectedCategories: ["1"] });

    expect(screen.getByText("Clear All")).toBeInTheDocument();
  });

  it("clears all selections when Clear All is clicked", () => {
    const onSelectionChange = vi.fn();
    renderCategoryFilter({
      selectedCategories: ["1", "2"],
      onSelectionChange,
    });

    fireEvent.click(screen.getByText("Clear All"));

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it("displays loading state", () => {
    renderCategoryFilter({ loading: true });

    expect(screen.getByText("Loading categories...")).toBeInTheDocument();
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("displays empty state with custom message", () => {
    renderCategoryFilter({
      categories: [],
      emptyMessage: "Custom empty message",
    });

    expect(screen.getByText("Custom empty message")).toBeInTheDocument();
  });

  it("disables interactions when disabled prop is true", () => {
    renderCategoryFilter({ disabled: true });

    const categoryButton = screen
      .getByText("Programming Languages")
      .closest("button");
    expect(categoryButton).toBeDisabled();
  });

  it("displays footer summary with selection count", () => {
    renderCategoryFilter({ selectedCategories: ["1", "2"] });

    expect(screen.getByText("2 of 3 categories selected")).toBeInTheDocument();
  });

  it("handles custom placeholder text", () => {
    renderCategoryFilter({ searchPlaceholder: "Custom placeholder" });

    expect(
      screen.getByPlaceholderText("Custom placeholder")
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = renderCategoryFilter({ className: "custom-class" });

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("shows selected indicator for selected categories", () => {
    renderCategoryFilter({ selectedCategories: ["1"] });

    const selectedIcon = screen.getByLabelText("Selected");
    expect(selectedIcon).toBeInTheDocument();
  });

  it("applies correct variant styles", () => {
    const { container } = renderCategoryFilter({ variant: "compact" });

    expect(container.firstChild).toHaveClass("border-gray-200", "shadow-sm");
  });

  it("applies correct size styles", () => {
    const { container } = renderCategoryFilter({ size: "lg" });

    expect(container.firstChild).toHaveClass("p-6");
  });

  it("handles edge case with no categories", () => {
    renderCategoryFilter({ categories: [] });

    expect(screen.getByText("No categories found")).toBeInTheDocument();
  });

  it("preserves existing selections when filtering", async () => {
    const onSelectionChange = vi.fn();
    renderCategoryFilter({
      selectedCategories: ["1", "2"],
      onSelectionChange,
    });

    const searchInput = screen.getByPlaceholderText("Search categories...");
    fireEvent.change(searchInput, { target: { value: "Frontend" } });

    await waitFor(() => {
      expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    });

    // When items are selected, the button text changes to "Deselect All"
    fireEvent.click(screen.getByText("Deselect All"));

    // The component behavior shows it only calls with the filtered item
    expect(onSelectionChange).toHaveBeenCalledWith(["1"]);
  });
});
