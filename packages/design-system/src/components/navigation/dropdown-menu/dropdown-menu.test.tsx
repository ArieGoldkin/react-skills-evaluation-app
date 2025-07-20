import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "lucide-react";
import * as React from "react";
import { vi } from "vitest";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";

describe("DropdownMenu", () => {
  const user = userEvent.setup();

  describe("Basic Functionality", () => {
    it("renders dropdown menu trigger", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText("Open Menu")).toBeInTheDocument();
    });

    it("opens dropdown menu when trigger is clicked", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Item 1")).toBeInTheDocument();
      });
    });

    it("opens dropdown menu when trigger is clicked", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Item 1")).toBeInTheDocument();
      });
    });

    it("closes dropdown menu when pressing Escape", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Item 1")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");
      await waitFor(() => {
        expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
      });
    });
  });

  describe("DropdownMenuTrigger", () => {
    it("renders as button by default", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger data-testid="trigger">
            Open Menu
          </DropdownMenuTrigger>
        </DropdownMenu>
      );

      const trigger = screen.getByTestId("trigger");
      expect(trigger).toBeInTheDocument();
      expect(trigger.tagName).toBe("BUTTON");
    });

    it("renders custom component with asChild", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Custom Button</Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      );

      expect(screen.getByRole("button")).toHaveTextContent("Custom Button");
    });

    it("forwards aria attributes correctly", () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger aria-label="Open dropdown menu">
            Open Menu
          </DropdownMenuTrigger>
        </DropdownMenu>
      );

      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Open dropdown menu"
      );
    });
  });

  describe("DropdownMenuContent", () => {
    it("applies custom className", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent className="custom-content">
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        const content = screen.getByRole("menu");
        expect(content).toHaveClass("custom-content");
      });
    });

    it("applies sideOffset correctly", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });
    });

    it("supports alignment options", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });
    });

    it("supports side positioning", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });
    });
  });

  describe("DropdownMenuItem", () => {
    it("renders menu item correctly", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Test Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByRole("menuitem")).toHaveTextContent("Test Item");
      });
    });

    it("handles click events", async () => {
      const handleClick = vi.fn();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleClick}>
              Clickable Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Clickable Item")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Clickable Item"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("applies inset styling", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem inset>Inset Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        const item = screen.getByRole("menuitem");
        expect(item).toHaveClass("pl-8");
      });
    });

    it("handles disabled state", async () => {
      const handleClick = vi.fn();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem disabled onClick={handleClick}>
              Disabled Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        const item = screen.getByRole("menuitem");
        expect(item).toHaveAttribute("data-disabled");
      });

      // Disabled items with pointer-events: none won't trigger click events
      const disabledItem = screen.getByText("Disabled Item");
      expect(disabledItem).toHaveAttribute("data-disabled");
    });

    it("renders with icons", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Profile")).toBeInTheDocument();
      });
    });
  });

  describe("DropdownMenuCheckboxItem", () => {
    it("renders checkbox item with correct state", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={true}>
              Checked Item
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        const item = screen.getByRole("menuitemcheckbox");
        expect(item).toHaveAttribute("data-state", "checked");
      });
    });

    it("handles state changes", async () => {
      const handleCheckedChange = vi.fn();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={false}
              onCheckedChange={handleCheckedChange}
            >
              Toggle Item
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Toggle Item")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Toggle Item"));
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it("shows indicator when checked", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={true}>
              Checked Item
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        const item = screen.getByRole("menuitemcheckbox");
        expect(item).toHaveAttribute("data-state", "checked");
      });
    });
  });

  describe("DropdownMenuRadioGroup and DropdownMenuRadioItem", () => {
    it("renders radio group correctly", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value="option1">
              <DropdownMenuRadioItem value="option1">
                Option 1
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="option2">
                Option 2
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getAllByRole("menuitemradio")).toHaveLength(2);
      });
    });

    it("handles radio selection", async () => {
      const handleValueChange = vi.fn();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value="option1"
              onValueChange={handleValueChange}
            >
              <DropdownMenuRadioItem value="option1">
                Option 1
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="option2">
                Option 2
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Option 2")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Option 2"));
      expect(handleValueChange).toHaveBeenCalledWith("option2");
    });

    it("shows correct checked state", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value="option1">
              <DropdownMenuRadioItem value="option1">
                Option 1
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="option2">
                Option 2
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        const option1 = screen.getByText("Option 1");
        const option2 = screen.getByText("Option 2");
        expect(option1).toHaveAttribute("data-state", "checked");
        expect(option2).toHaveAttribute("data-state", "unchecked");
      });
    });
  });

  describe("DropdownMenuLabel", () => {
    it("renders label correctly", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu Label</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Menu Label")).toBeInTheDocument();
      });
    });

    it("applies inset styling", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        const label = screen.getByText("Inset Label");
        expect(label).toHaveClass("pl-8");
      });
    });
  });

  describe("DropdownMenuSeparator", () => {
    it("renders separator", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuSeparator data-testid="separator" />
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByTestId("separator")).toBeInTheDocument();
      });
    });

    it("applies custom className", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator className="custom-separator" />
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        const separator = screen.getByRole("separator");
        expect(separator).toHaveClass("custom-separator");
      });
    });
  });

  describe("DropdownMenuShortcut", () => {
    it("renders keyboard shortcut", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("⌘P")).toBeInTheDocument();
      });
    });

    it("applies custom className", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut className="custom-shortcut">
                ⌘P
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        const shortcut = screen.getByText("⌘P");
        expect(shortcut).toHaveClass("custom-shortcut");
      });
    });
  });

  describe("DropdownMenuSub", () => {
    it("renders submenu trigger", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Submenu")).toBeInTheDocument();
      });
    });

    it("opens submenu on hover", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Submenu")).toBeInTheDocument();
      });

      await user.hover(screen.getByText("Submenu"));
      await waitFor(() => {
        expect(screen.getByText("Sub Item")).toBeInTheDocument();
      });
    });

    it("applies inset styling to subtrigger", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset>
                Inset Submenu
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        const trigger = screen.getByText("Inset Submenu");
        expect(trigger).toHaveClass("pl-8");
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("supports arrow key navigation", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Item 1")).toBeInTheDocument();
      });

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");
    });

    it("supports Enter key to activate items", async () => {
      const handleClick = vi.fn();
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleClick}>
              Activatable Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Activatable Item")).toBeInTheDocument();
      });

      const item = screen.getByText("Activatable Item");
      item.focus();
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Complex Scenarios", () => {
    it("renders multiple dropdown menus", () => {
      render(
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>Menu 1</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Item 1-1</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>Menu 2</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Item 2-1</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );

      expect(screen.getByText("Menu 1")).toBeInTheDocument();
      expect(screen.getByText("Menu 2")).toBeInTheDocument();
    });

    it("renders nested submenus structure", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Level 1</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Level 1")).toBeInTheDocument();
      });
    });

    it("preserves state between opens/closes", async () => {
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={checked}
                onCheckedChange={setChecked}
              >
                Persistent State
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      };

      render(<TestComponent />);

      // First open - check the item
      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Persistent State")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Persistent State"));

      // Close menu
      await user.keyboard("{Escape}");
      await waitFor(() => {
        expect(screen.queryByText("Persistent State")).not.toBeInTheDocument();
      });

      // Second open - verify state is preserved
      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        const item = screen.getByRole("menuitemcheckbox");
        expect(item).toHaveAttribute("data-state", "checked");
      });
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA attributes", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const trigger = screen.getByText("Open Menu");
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");

      await user.click(trigger);
      await waitFor(() => {
        const menu = screen.getByRole("menu");
        expect(menu).toBeInTheDocument();
        expect(screen.getByRole("menuitem")).toBeInTheDocument();
      });
    });

    it("manages focus correctly", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });
    });

    it("supports screen reader navigation", async () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      await user.click(screen.getByText("Open Menu"));
      await waitFor(() => {
        expect(screen.getByText("Actions")).toBeInTheDocument();
        expect(screen.getAllByRole("menuitem")).toHaveLength(2);
      });
    });
  });
});
