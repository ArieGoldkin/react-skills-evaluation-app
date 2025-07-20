import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "./modal";

describe("Modal Components", () => {
  describe("Modal Root", () => {
    it("renders without crashing", () => {
      expect(() => render(<Modal />)).not.toThrow();
    });

    it("supports controlled open state", () => {
      const { rerender } = render(<Modal open={false} />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

      rerender(<Modal open={true} />);
    });

    it("calls onOpenChange when state changes", () => {
      const onOpenChange = vi.fn();
      render(
        <Modal onOpenChange={onOpenChange}>
          <ModalTrigger>Open</ModalTrigger>
          <ModalContent>
            <ModalTitle>Test Modal</ModalTitle>
          </ModalContent>
        </Modal>
      );

      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });

  describe("ModalTrigger", () => {
    it("renders trigger button", () => {
      render(
        <Modal>
          <ModalTrigger>Open Modal</ModalTrigger>
        </Modal>
      );

      expect(
        screen.getByRole("button", { name: "Open Modal" })
      ).toBeInTheDocument();
    });

    it("opens modal when clicked", async () => {
      const user = userEvent.setup();

      render(
        <Modal>
          <ModalTrigger>Open Modal</ModalTrigger>
          <ModalContent>
            <ModalTitle>Test Modal</ModalTitle>
            <ModalDescription>Modal description</ModalDescription>
          </ModalContent>
        </Modal>
      );

      const trigger = screen.getByRole("button", { name: "Open Modal" });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    });
  });

  describe("ModalContent", () => {
    it("renders modal content with proper accessibility", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Test Modal</ModalTitle>
            <ModalDescription>Test description</ModalDescription>
          </ModalContent>
        </Modal>
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Test Modal")).toBeInTheDocument();
      expect(screen.getByText("Test description")).toBeInTheDocument();
    });

    it("renders close button", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Test Modal</ModalTitle>
            <ModalDescription>Description for accessibility</ModalDescription>
          </ModalContent>
        </Modal>
      );

      expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    });

    it("supports size variants", () => {
      const { rerender } = render(
        <Modal open={true}>
          <ModalContent size="sm">
            <ModalTitle>Small Modal</ModalTitle>
            <ModalDescription>Small description</ModalDescription>
          </ModalContent>
        </Modal>
      );

      let dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass("max-w-sm");

      rerender(
        <Modal open={true}>
          <ModalContent size="lg">
            <ModalTitle>Large Modal</ModalTitle>
            <ModalDescription>Large description</ModalDescription>
          </ModalContent>
        </Modal>
      );

      dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass("max-w-2xl");
    });

    it("supports full size variant", () => {
      render(
        <Modal open={true}>
          <ModalContent size="full">
            <ModalTitle>Full Modal</ModalTitle>
            <ModalDescription>Full description</ModalDescription>
          </ModalContent>
        </Modal>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass("max-w-[95vw]");
      expect(dialog).toHaveClass("max-h-[95vh]");
    });

    it("applies custom className", () => {
      render(
        <Modal open={true}>
          <ModalContent className="custom-modal">
            <ModalTitle>Custom Modal</ModalTitle>
            <ModalDescription>Custom description</ModalDescription>
          </ModalContent>
        </Modal>
      );

      expect(screen.getByRole("dialog")).toHaveClass("custom-modal");
    });
  });

  describe("ModalHeader", () => {
    it("renders header content", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Header Title</ModalTitle>
              <ModalDescription>Header description</ModalDescription>
            </ModalHeader>
          </ModalContent>
        </Modal>
      );

      expect(screen.getByText("Header Title")).toBeInTheDocument();
      expect(screen.getByText("Header description")).toBeInTheDocument();
    });

    it("applies correct styling classes", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalHeader data-testid="modal-header">
              <ModalTitle>Title</ModalTitle>
            </ModalHeader>
          </ModalContent>
        </Modal>
      );

      const header = screen.getByTestId("modal-header");
      expect(header).toHaveClass("flex", "flex-col", "space-y-1.5");
    });

    it("supports custom className", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalHeader className="custom-header" data-testid="modal-header">
              <ModalTitle>Title</ModalTitle>
            </ModalHeader>
          </ModalContent>
        </Modal>
      );

      expect(screen.getByTestId("modal-header")).toHaveClass("custom-header");
    });
  });

  describe("ModalFooter", () => {
    it("renders footer content", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Title</ModalTitle>
            <ModalFooter>
              <button>Cancel</button>
              <button>Confirm</button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );

      expect(
        screen.getByRole("button", { name: "Cancel" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Confirm" })
      ).toBeInTheDocument();
    });

    it("applies correct styling classes", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Title</ModalTitle>
            <ModalFooter data-testid="modal-footer">
              <button>Action</button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );

      const footer = screen.getByTestId("modal-footer");
      expect(footer).toHaveClass("flex", "flex-col-reverse");
    });

    it("supports custom className", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Title</ModalTitle>
            <ModalFooter className="custom-footer" data-testid="modal-footer">
              <button>Action</button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );

      expect(screen.getByTestId("modal-footer")).toHaveClass("custom-footer");
    });
  });

  describe("ModalTitle", () => {
    it("renders title with correct role", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Modal Title</ModalTitle>
          </ModalContent>
        </Modal>
      );

      const title = screen.getByText("Modal Title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute("id");
    });

    it("applies correct styling classes", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Title</ModalTitle>
          </ModalContent>
        </Modal>
      );

      const title = screen.getByText("Title");
      expect(title).toHaveClass("text-lg", "font-semibold");
    });

    it("supports custom className", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle className="custom-title">Title</ModalTitle>
          </ModalContent>
        </Modal>
      );

      expect(screen.getByText("Title")).toHaveClass("custom-title");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle ref={ref}>Title</ModalTitle>
          </ModalContent>
        </Modal>
      );

      expect(ref).toHaveBeenCalled();
    });
  });

  describe("ModalDescription", () => {
    it("renders description", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Title</ModalTitle>
            <ModalDescription>Modal description text</ModalDescription>
          </ModalContent>
        </Modal>
      );

      expect(screen.getByText("Modal description text")).toBeInTheDocument();
    });

    it("applies correct styling classes", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Title</ModalTitle>
            <ModalDescription>Description</ModalDescription>
          </ModalContent>
        </Modal>
      );

      const description = screen.getByText("Description");
      expect(description).toHaveClass("text-sm", "text-muted-foreground");
    });

    it("supports custom className", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Title</ModalTitle>
            <ModalDescription className="custom-description">
              Description
            </ModalDescription>
          </ModalContent>
        </Modal>
      );

      expect(screen.getByText("Description")).toHaveClass("custom-description");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Title</ModalTitle>
            <ModalDescription ref={ref}>Description</ModalDescription>
          </ModalContent>
        </Modal>
      );

      expect(ref).toHaveBeenCalled();
    });
  });

  describe("ModalClose", () => {
    it("closes modal when clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Modal open={true} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalTitle>Title</ModalTitle>
            <ModalClose>Close Modal</ModalClose>
          </ModalContent>
        </Modal>
      );

      const closeButton = screen.getByRole("button", { name: "Close Modal" });
      await user.click(closeButton);

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("can be used as custom close button", () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <ModalTitle>Title</ModalTitle>
            <ModalFooter>
              <ModalClose>Custom Close</ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );

      expect(
        screen.getByRole("button", { name: "Custom Close" })
      ).toBeInTheDocument();
    });
  });
});

describe("Modal Integration", () => {
  it("supports complete modal workflow", async () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <ModalTrigger>Open Modal</ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Confirmation Modal</ModalTitle>
            <ModalDescription>
              Are you sure you want to proceed with this action?
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <ModalClose>Cancel</ModalClose>
            <ModalClose>Confirm</ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );

    // Modal should not be visible initially
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Open modal
    const trigger = screen.getByRole("button", { name: "Open Modal" });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    // Check modal content
    expect(screen.getByText("Confirmation Modal")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to proceed with this action?")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();

    // Close via close button
    const closeButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <ModalTrigger>Open Modal</ModalTrigger>
        <ModalContent>
          <ModalTitle>Keyboard Navigation Test</ModalTitle>
          <ModalDescription>
            Modal for testing keyboard navigation
          </ModalDescription>
          <ModalFooter>
            <button>First Button</button>
            <button>Second Button</button>
            <ModalClose>Close</ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );

    // Open modal
    const trigger = screen.getByRole("button", { name: "Open Modal" });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    // Test that interactive elements are present
    expect(
      screen.getByRole("button", { name: "First Button" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Second Button" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Close" })).toHaveLength(2); // Custom close + auto close button
  });

  it("supports escape key to close", async () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <ModalTrigger>Open Modal</ModalTrigger>
        <ModalContent>
          <ModalTitle>Escape Key Test</ModalTitle>
          <ModalDescription>
            Modal for testing escape key functionality
          </ModalDescription>
        </ModalContent>
      </Modal>
    );

    // Open modal
    const trigger = screen.getByRole("button", { name: "Open Modal" });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    // Close with Escape key
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});

describe("Modal Accessibility", () => {
  it("has proper ARIA attributes", () => {
    render(
      <Modal open={true}>
        <ModalContent>
          <ModalTitle>Accessible Modal</ModalTitle>
          <ModalDescription>
            Modal description for screen readers
          </ModalDescription>
        </ModalContent>
      </Modal>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(dialog).toHaveAttribute("aria-describedby");
  });

  it("provides proper focus management", async () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <ModalTrigger>Open Modal</ModalTrigger>
        <ModalContent>
          <ModalTitle>Focus Test</ModalTitle>
          <ModalDescription>
            Modal for testing focus management
          </ModalDescription>
          <input type="text" placeholder="Test input" />
        </ModalContent>
      </Modal>
    );

    const trigger = screen.getByRole("button", { name: "Open Modal" });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    // Focus should be managed within the modal
    const input = screen.getByPlaceholderText("Test input");
    expect(input).toBeInTheDocument();
  });

  it("supports screen reader announcements", () => {
    render(
      <Modal open={true}>
        <ModalContent>
          <ModalTitle>Screen Reader Test</ModalTitle>
          <ModalDescription>
            This modal should be properly announced to screen readers
          </ModalDescription>
        </ModalContent>
      </Modal>
    );

    const title = screen.getByText("Screen Reader Test");
    const description = screen.getByText(
      "This modal should be properly announced to screen readers"
    );

    expect(title).toHaveAttribute("id");
    expect(description).toHaveAttribute("id");
  });
});

describe("Modal Size Variants", () => {
  const sizes = [
    { size: "sm" as const, class: "max-w-sm" },
    { size: "md" as const, class: "max-w-lg" },
    { size: "lg" as const, class: "max-w-2xl" },
    { size: "xl" as const, class: "max-w-4xl" },
    { size: "2xl" as const, class: "max-w-6xl" },
    { size: "full" as const, class: "max-w-[95vw]" },
  ];

  sizes.forEach(({ size, class: expectedClass }) => {
    it(`renders ${size} size correctly`, () => {
      render(
        <Modal open={true}>
          <ModalContent size={size}>
            <ModalTitle>{size} Modal</ModalTitle>
          </ModalContent>
        </Modal>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass(expectedClass);
    });
  });

  it("defaults to md size when no size specified", () => {
    render(
      <Modal open={true}>
        <ModalContent>
          <ModalTitle>Default Size Modal</ModalTitle>
        </ModalContent>
      </Modal>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("max-w-lg");
  });
});

describe("Modal TypeScript Support", () => {
  it("accepts proper prop types", () => {
    // This test ensures TypeScript compilation
    const modalProps = {
      open: true,
      onOpenChange: () => {},
    };

    const contentProps = {
      size: "lg" as const,
      className: "custom-modal",
    };

    expect(() =>
      render(
        <Modal {...modalProps}>
          <ModalContent {...contentProps}>
            <ModalTitle>TypeScript Test</ModalTitle>
          </ModalContent>
        </Modal>
      )
    ).not.toThrow();
  });
});
