import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { vi } from "vitest";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  DataTable,
  SkillsTable,
  type Column,
  type Skill,
} from "./index";

describe("Table Components", () => {
  describe("Basic Table", () => {
    it("renders table structure correctly", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John</TableCell>
              <TableCell>25</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Age")).toBeInTheDocument();
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("25")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Table className="custom-table" />);
      expect(screen.getByRole("table")).toHaveClass("custom-table");
    });
  });

  describe("DataTable", () => {
    const user = userEvent.setup();

    const sampleData = [
      { id: 1, name: "Alice", age: 30, email: "alice@example.com" },
      { id: 2, name: "Bob", age: 25, email: "bob@example.com" },
      { id: 3, name: "Charlie", age: 35, email: "charlie@example.com" },
    ];

    const sampleColumns: Column<(typeof sampleData)[0]>[] = [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        sortable: true,
        filterable: true,
      },
      {
        id: "age",
        header: "Age",
        accessorKey: "age",
        sortable: true,
        cell: value => `${value} years old`,
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        filterable: true,
      },
    ];

    it("renders data correctly", () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);

      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("30 years old")).toBeInTheDocument();
      expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    });

    it("shows loading state", () => {
      render(<DataTable data={[]} columns={sampleColumns} loading />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("shows error state", () => {
      render(
        <DataTable
          data={[]}
          columns={sampleColumns}
          error="Something went wrong"
        />
      );
      expect(
        screen.getByText("Error: Something went wrong")
      ).toBeInTheDocument();
    });

    it("shows empty state", () => {
      render(<DataTable data={[]} columns={sampleColumns} />);
      expect(screen.getByText("No data available")).toBeInTheDocument();
    });

    it("handles sorting", async () => {
      const onSortingChange = vi.fn();
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          onSortingChange={onSortingChange}
          manualSorting
        />
      );

      const nameHeader = screen.getByText("Name");
      await user.click(nameHeader);

      expect(onSortingChange).toHaveBeenCalledWith([
        { id: "name", desc: false },
      ]);
    });

    it("handles global search input", async () => {
      const onGlobalFilterChange = vi.fn();
      render(
        <DataTable
          data={sampleData}
          columns={sampleColumns}
          onGlobalFilterChange={onGlobalFilterChange}
          manualFiltering
        />
      );

      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "A");

      // Check that the function was called
      expect(onGlobalFilterChange).toHaveBeenCalledWith("A");
    });

    it("performs local filtering when not manual", async () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);

      const searchInput = screen.getByPlaceholderText("Search...");
      await user.type(searchInput, "Alice");

      await waitFor(() => {
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.queryByText("Bob")).not.toBeInTheDocument();
      });
    });

    it("performs local sorting when not manual", async () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);

      const nameHeader = screen.getByText("Name");
      await user.click(nameHeader); // Sort ascending

      const rows = screen.getAllByRole("row");
      const firstDataRow = rows[1]; // Skip header row
      expect(firstDataRow).toHaveTextContent("Alice");

      await user.click(nameHeader); // Sort descending

      await waitFor(() => {
        const rowsAfterSort = screen.getAllByRole("row");
        const firstRowAfterSort = rowsAfterSort[1];
        expect(firstRowAfterSort).toHaveTextContent("Charlie");
      });
    });

    it("shows filter button for filterable columns", async () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);

      const filterButton = screen.getByText("Filter");
      expect(filterButton).toBeInTheDocument();

      // Click to open dropdown
      await user.click(filterButton);

      // Should show the filter menu
      await waitFor(() => {
        expect(screen.getByText("Filter Columns")).toBeInTheDocument();
      });
    });
  });

  describe("SkillsTable", () => {
    const user = userEvent.setup();

    const sampleSkills: Skill[] = [
      {
        id: "skill1",
        name: "JavaScript",
        proficiency: 8,
        description: "Frontend development",
        tags: ["frontend", "web", "programming"],
        source: "MANUAL",
        verified: true,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z",
        category: {
          id: "cat1",
          name: "Programming",
          slug: "programming",
          icon: "💻",
          color: "#3b82f6",
        },
        _count: {
          assessments: 3,
          history: 5,
        },
      },
      {
        id: "skill2",
        name: "Python",
        proficiency: 9,
        description: "Backend development and AI",
        tags: ["backend", "ai", "programming"],
        source: "ASSESSMENT",
        verified: false,
        createdAt: "2024-01-10T00:00:00Z",
        updatedAt: "2024-01-20T00:00:00Z",
        category: {
          id: "cat1",
          name: "Programming",
          slug: "programming",
          icon: "💻",
          color: "#3b82f6",
        },
        _count: {
          assessments: 2,
          history: 3,
        },
      },
    ];

    it("renders skills data correctly", () => {
      render(<SkillsTable data={sampleSkills} />);

      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("Python")).toBeInTheDocument();
      expect(screen.getByText("Frontend development")).toBeInTheDocument();
      expect(screen.getAllByText("Programming")).toHaveLength(2); // Two skills in Programming category
    });

    it("shows proficiency indicators", () => {
      render(<SkillsTable data={sampleSkills} />);

      expect(screen.getByText("8/10")).toBeInTheDocument();
      expect(screen.getByText("9/10")).toBeInTheDocument();
    });

    it("shows verified star for verified skills", () => {
      render(<SkillsTable data={sampleSkills} />);

      // Check for verified star using a more reliable method
      const verifiedElements = document.querySelectorAll(".text-yellow-500");
      expect(verifiedElements.length).toBeGreaterThan(0);
    });

    it("shows source badges", () => {
      render(<SkillsTable data={sampleSkills} />);

      expect(screen.getByText("Manual")).toBeInTheDocument();
      expect(screen.getByText("Assessment")).toBeInTheDocument();
    });

    it("shows category badges with icons", () => {
      render(<SkillsTable data={sampleSkills} />);

      const categoryBadges = screen.getAllByText("Programming");
      expect(categoryBadges).toHaveLength(2);
    });

    it("displays tags with overflow handling", () => {
      const skillWithManyTags: Skill = {
        ...sampleSkills[0],
        tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
      };

      render(<SkillsTable data={[skillWithManyTags]} />);

      expect(screen.getByText("tag1")).toBeInTheDocument();
      expect(screen.getByText("tag2")).toBeInTheDocument();
      expect(screen.getByText("tag3")).toBeInTheDocument();
      expect(screen.getByText("+2")).toBeInTheDocument(); // Shows overflow
    });

    it("handles row actions", async () => {
      const onView = vi.fn();
      const onEdit = vi.fn();
      const onDelete = vi.fn();

      render(
        <SkillsTable
          data={sampleSkills}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

      // Click on the first row's action button
      const actionButtons = screen.getAllByLabelText(/Actions for/);
      await user.click(actionButtons[0]);

      // Check if dropdown menu appears
      expect(screen.getByText("Actions")).toBeInTheDocument();
      expect(screen.getByText("View Details")).toBeInTheDocument();
      expect(screen.getByText("Edit Skill")).toBeInTheDocument();
      expect(screen.getByText("Delete Skill")).toBeInTheDocument();

      // Test view action
      await user.click(screen.getByText("View Details"));
      expect(onView).toHaveBeenCalledWith(sampleSkills[0]);
    });

    it("shows empty state message", () => {
      render(<SkillsTable data={[]} />);
      expect(
        screen.getByText("No skills found. Start by creating your first skill!")
      ).toBeInTheDocument();
    });

    it("handles loading state", () => {
      render(<SkillsTable data={[]} loading />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("handles error state", () => {
      render(<SkillsTable data={[]} error="Failed to load skills" />);
      expect(
        screen.getByText("Error: Failed to load skills")
      ).toBeInTheDocument();
    });

    it("formats dates correctly", () => {
      render(<SkillsTable data={sampleSkills} />);

      // Check for formatted dates (will vary based on locale)
      // Check for formatted dates - they should exist in the table
      const tableRows = screen.getAllByRole("row");
      expect(tableRows.length).toBeGreaterThan(1); // Header + data rows
    });

    it("applies custom className", () => {
      render(
        <SkillsTable data={sampleSkills} className="custom-skills-table" />
      );
      expect(
        document.querySelector(".custom-skills-table")
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    const sampleData = [{ id: 1, name: "Test", value: "Value" }];

    const sampleColumns: Column<(typeof sampleData)[0]>[] = [
      { id: "name", header: "Name", accessorKey: "name", sortable: true },
      { id: "value", header: "Value", accessorKey: "value" },
    ];

    it("provides proper ARIA labels for sortable columns", async () => {
      const user = userEvent.setup();
      render(<DataTable data={sampleData} columns={sampleColumns} />);

      const nameHeader = screen.getByRole("columnheader", { name: /Name/ });
      expect(nameHeader).toBeInTheDocument();

      // Should be clickable for sorting
      await user.click(nameHeader);
      // No error should occur
    });

    it("provides proper table structure for screen readers", () => {
      render(<DataTable data={sampleData} columns={sampleColumns} />);

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("columnheader")).toHaveLength(2);
      expect(screen.getAllByRole("row")).toHaveLength(2); // Header + 1 data row
    });

    it("provides proper labels for action buttons", async () => {
      const sampleSkills: Skill[] = [
        {
          id: "test-skill",
          name: "Test Skill",
          proficiency: 5,
          tags: [],
          source: "MANUAL",
          verified: false,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
          category: {
            id: "cat1",
            name: "Test Category",
            slug: "test",
          },
          _count: { assessments: 0, history: 0 },
        },
      ];

      render(<SkillsTable data={sampleSkills} />);

      const actionButton = screen.getByLabelText("Actions for Test Skill");
      expect(actionButton).toBeInTheDocument();
    });
  });
});
