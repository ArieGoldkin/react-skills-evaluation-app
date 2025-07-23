import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { vi } from "vitest";
import { MultiSelect, type MultiSelectOption } from "./multi-select";

describe("MultiSelect", () => {
  const user = userEvent.setup();

  const sampleOptions: MultiSelectOption[] = [
    { value: "option1", label: "Option 1", description: "First option" },
    { value: "option2", label: "Option 2", description: "Second option" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4", disabled: true },
  ];

  describe("Basic Functionality", () => {
    it("renders with placeholder when no selection", () => {
      render(
        <MultiSelect options={sampleOptions} placeholder="Select items" />
      );
      expect(screen.getByText("Select items")).toBeInTheDocument();
    });

    it("opens dropdown when clicked", async () => {
      render(<MultiSelect options={sampleOptions} />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
      });
    });

    it("selects options when clicked", async () => {
      const onChange = vi.fn();
      render(<MultiSelect options={sampleOptions} onChange={onChange} />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Option 1"));

      expect(onChange).toHaveBeenCalledWith(["option1"]);
    });

    it("displays selected items as badges", async () => {
      render(
        <MultiSelect
          options={sampleOptions}
          defaultValue={["option1", "option2"]}
        />
      );

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("removes items when badge X is clicked", async () => {
      const onChange = vi.fn();
      render(
        <MultiSelect
          options={sampleOptions}
          defaultValue={["option1"]}
          onChange={onChange}
        />
      );

      const removeButton = document.querySelector('svg[class*="ml-1 h-3 w-3"]');
      expect(removeButton).toBeInTheDocument();

      if (removeButton) {
        await user.click(removeButton);
      }

      expect(onChange).toHaveBeenCalledWith([]);
    });
  });

  describe("Search Functionality", () => {
    it("shows search input when searchable", async () => {
      render(<MultiSelect options={sampleOptions} searchable />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search items...")
        ).toBeInTheDocument();
      });
    });

    it("filters options based on search", async () => {
      render(<MultiSelect options={sampleOptions} searchable />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search items...")
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText("Search items...");
      await user.clear(searchInput);
      await user.type(searchInput, "1");

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });

      // Option 2 should be filtered out
      expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    });

    it("shows empty message when no matches", async () => {
      render(
        <MultiSelect
          options={sampleOptions}
          searchable
          emptyMessage="Nothing found"
        />
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search items...")
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText("Search items...");
      await user.type(searchInput, "nonexistent");

      await waitFor(() => {
        expect(screen.getByText("Nothing found")).toBeInTheDocument();
      });
    });

    it("searches in descriptions", async () => {
      render(<MultiSelect options={sampleOptions} searchable />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search items...")
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText("Search items...");
      await user.type(searchInput, "First");

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
      });
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works as uncontrolled component", async () => {
      const onChange = vi.fn();
      render(
        <MultiSelect
          options={sampleOptions}
          defaultValue={["option1"]}
          onChange={onChange}
        />
      );

      expect(screen.getByText("Option 1")).toBeInTheDocument();

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Option 2")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Option 2"));

      expect(onChange).toHaveBeenCalledWith(["option1", "option2"]);
    });

    it("works as controlled component", async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState<string[]>(["option1"]);
        return (
          <MultiSelect
            options={sampleOptions}
            value={value}
            onChange={setValue}
          />
        );
      };

      render(<TestComponent />);

      expect(screen.getByText("Option 1")).toBeInTheDocument();

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Option 2")).toBeInTheDocument();
      });

      // Click Option 2 in the dropdown (not the badge if it exists)
      const option2Elements = screen.getAllByText("Option 2");
      const option2InDropdown = option2Elements.find(
        el => el.closest('[role="menu"]') !== null
      );
      await user.click(option2InDropdown!);

      await waitFor(() => {
        // Check that Option 2 is now selected (appears as a badge)
        const badges = screen.getAllByText("Option 2");
        expect(
          badges.some(badge =>
            badge.closest(".inline-flex.items-center.border")
          )
        ).toBe(true);
      });
    });
  });

  describe("Clear Functionality", () => {
    it("shows clear button when items are selected", () => {
      render(
        <MultiSelect
          options={sampleOptions}
          defaultValue={["option1"]}
          clearable
        />
      );

      const clearButton = document.querySelector(
        'svg[class*="h-4 w-4 text-muted-foreground hover:text-foreground"]'
      );
      expect(clearButton).toBeInTheDocument();
    });

    it("clears all selections when clear button clicked", async () => {
      const onChange = vi.fn();
      render(
        <MultiSelect
          options={sampleOptions}
          defaultValue={["option1", "option2"]}
          onChange={onChange}
          clearable
        />
      );

      const clearButton = document.querySelector(
        'svg[class*="h-4 w-4 text-muted-foreground hover:text-foreground"]'
      );
      expect(clearButton).toBeInTheDocument();

      if (clearButton) {
        await user.click(clearButton);
      }

      expect(onChange).toHaveBeenCalledWith([]);
    });

    it("shows clear all option in dropdown", async () => {
      render(
        <MultiSelect
          options={sampleOptions}
          defaultValue={["option1"]}
          clearable
        />
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Clear all (1)")).toBeInTheDocument();
      });
    });

    it("clears all from dropdown menu", async () => {
      const onChange = vi.fn();
      render(
        <MultiSelect
          options={sampleOptions}
          defaultValue={["option1"]}
          onChange={onChange}
          clearable
        />
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Clear all (1)")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Clear all (1)"));

      expect(onChange).toHaveBeenCalledWith([]);
    });
  });

  describe("Display Options", () => {
    it("shows '+X more' when maxSelectedDisplay is exceeded", () => {
      render(
        <MultiSelect
          options={sampleOptions}
          defaultValue={["option1", "option2", "option3"]}
          maxSelectedDisplay={2}
        />
      );

      expect(screen.getByText("+2 more")).toBeInTheDocument();
    });

    it("shows individual badges when under maxSelectedDisplay", () => {
      render(
        <MultiSelect
          options={sampleOptions}
          defaultValue={["option1", "option2"]}
          maxSelectedDisplay={3}
        />
      );

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.queryByText("+")).not.toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("disables the trigger when disabled", () => {
      render(<MultiSelect options={sampleOptions} disabled />);

      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeDisabled();
    });

    it("does not show remove buttons when disabled", () => {
      render(
        <MultiSelect
          options={sampleOptions}
          defaultValue={["option1"]}
          disabled
        />
      );

      const removeButton = document.querySelector('svg[class*="ml-1 h-3 w-3"]');
      expect(removeButton).not.toBeInTheDocument();
    });

    it("skips disabled options", async () => {
      render(<MultiSelect options={sampleOptions} />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Option 4")).toBeInTheDocument();
      });

      // Option 4 should be visually disabled but still rendered
      const option4 = screen.getByText("Option 4").closest('[role="menuitem"]');
      expect(option4).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Close on Select", () => {
    it("closes dropdown after selection when closeOnSelect is true", async () => {
      render(<MultiSelect options={sampleOptions} closeOnSelect />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Option 1"));

      // Wait for dropdown to close - check if the dropdown menu content is not visible
      await waitFor(
        () => {
          expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });

    it("keeps dropdown open when closeOnSelect is false", async () => {
      render(<MultiSelect options={sampleOptions} closeOnSelect={false} />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Option 1"));

      // Dropdown menu should still be open
      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      // Option 2 should still be visible
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("applies custom className", () => {
      render(<MultiSelect options={sampleOptions} className="custom-class" />);

      expect(document.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("applies custom triggerClassName", () => {
      render(
        <MultiSelect
          options={sampleOptions}
          triggerClassName="custom-trigger"
        />
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("custom-trigger");
    });

    it("uses custom placeholder", () => {
      render(
        <MultiSelect options={sampleOptions} placeholder="Custom placeholder" />
      );

      expect(screen.getByText("Custom placeholder")).toBeInTheDocument();
    });

    it("uses custom search placeholder", async () => {
      render(
        <MultiSelect
          options={sampleOptions}
          searchable
          searchPlaceholder="Custom search"
        />
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Custom search")
        ).toBeInTheDocument();
      });
    });

    it("uses custom empty message", async () => {
      render(<MultiSelect options={[]} emptyMessage="Custom empty message" />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Custom empty message")).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<MultiSelect options={sampleOptions} />);

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("updates aria-expanded when opened", async () => {
      render(<MultiSelect options={sampleOptions} />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("provides proper option roles", async () => {
      render(<MultiSelect options={sampleOptions} />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getAllByRole("menuitem")).toHaveLength(4);
      });
    });
  });
});
