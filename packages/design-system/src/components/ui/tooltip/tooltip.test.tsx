import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  SimpleTooltip,
} from "./tooltip";

describe("Tooltip", () => {
  describe("Basic Tooltip", () => {
    it("renders trigger element", () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText("Hover me")).toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      const trigger = screen.getByText("Hover me");

      // Tooltip should not be visible initially
      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();

      // Hover over trigger
      await user.hover(trigger);

      // Wait for tooltip to appear
      await waitFor(() => {
        const tooltipContent = screen.getAllByText("Tooltip content");
        expect(tooltipContent.length).toBeGreaterThan(0);
      });
    });

    it.skip("hides tooltip on unhover", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      const trigger = screen.getByText("Hover me");

      // Hover and wait for tooltip
      await user.hover(trigger);
      await waitFor(() => {
        const tooltipContent = screen.getAllByText("Tooltip content");
        expect(tooltipContent.length).toBeGreaterThan(0);
      });

      // Unhover
      await user.unhover(trigger);

      // Wait for tooltip to disappear
      await waitFor(() => {
        // Check that the tooltip container is no longer visible (data-state should be "closed")
        const tooltipContainer = document.querySelector(
          '[data-state="closed"]'
        );
        expect(tooltipContainer).toBeInTheDocument();
      });
    });

    it("works with asChild prop", () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>Button trigger</button>
            </TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(
        screen.getByRole("button", { name: "Button trigger" })
      ).toBeInTheDocument();
    });
  });

  describe("SimpleTooltip", () => {
    it("renders with default props", () => {
      render(
        <SimpleTooltip content="Tooltip text">
          <span>Hover me</span>
        </SimpleTooltip>
      );

      expect(screen.getByText("Hover me")).toBeInTheDocument();
    });

    it("shows tooltip content on hover", async () => {
      const user = userEvent.setup();

      render(
        <SimpleTooltip content="Tooltip text" delayDuration={0}>
          <span>Hover me</span>
        </SimpleTooltip>
      );

      const trigger = screen.getByText("Hover me");

      // Tooltip should not be visible initially
      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();

      // Hover over trigger
      await user.hover(trigger);

      // Wait for tooltip to appear
      await waitFor(() => {
        const tooltipContent = screen.getAllByText("Tooltip text");
        expect(tooltipContent.length).toBeGreaterThan(0);
      });
    });

    it("renders complex content", async () => {
      const user = userEvent.setup();

      render(
        <SimpleTooltip
          content={
            <div>
              <strong>Bold text</strong>
              <span>Regular text</span>
            </div>
          }
          delayDuration={0}
        >
          <span>Hover me</span>
        </SimpleTooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        const boldText = screen.getAllByText("Bold text");
        const regularText = screen.getAllByText("Regular text");
        expect(boldText.length).toBeGreaterThan(0);
        expect(regularText.length).toBeGreaterThan(0);
      });
    });

    it("respects side prop", async () => {
      const user = userEvent.setup();

      render(
        <SimpleTooltip content="Tooltip text" side="bottom" delayDuration={0}>
          <span>Hover me</span>
        </SimpleTooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        const tooltipTexts = screen.getAllByText("Tooltip text");
        expect(tooltipTexts.length).toBeGreaterThan(0);
        // Check for side-specific animation class on the visible tooltip
        const visibleTooltip = tooltipTexts.find(el =>
          el.parentElement?.className.includes("z-50")
        );
        expect(visibleTooltip?.parentElement).toHaveClass(
          "data-[side=bottom]:slide-in-from-top-2"
        );
      });
    });

    it("applies custom className to trigger", () => {
      render(
        <SimpleTooltip content="Tooltip text" className="custom-trigger">
          <span>Hover me</span>
        </SimpleTooltip>
      );

      const trigger = screen.getByText("Hover me").parentElement;
      expect(trigger).toHaveClass("custom-trigger");
    });

    it("applies custom contentClassName to tooltip", async () => {
      const user = userEvent.setup();

      render(
        <SimpleTooltip
          content="Tooltip text"
          contentClassName="custom-content"
          delayDuration={0}
        >
          <span>Hover me</span>
        </SimpleTooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        const tooltipTexts = screen.getAllByText("Tooltip text");
        const visibleTooltip = tooltipTexts.find(el =>
          el.parentElement?.className.includes("z-50")
        );
        expect(visibleTooltip?.parentElement).toHaveClass("custom-content");
      });
    });

    it("works with asChild prop", () => {
      render(
        <SimpleTooltip content="Tooltip text" asChild>
          <button>Button with tooltip</button>
        </SimpleTooltip>
      );

      expect(
        screen.getByRole("button", { name: "Button with tooltip" })
      ).toBeInTheDocument();
    });

    it("respects delay duration", async () => {
      const user = userEvent.setup();

      render(
        <SimpleTooltip content="Tooltip text" delayDuration={500}>
          <span>Hover me</span>
        </SimpleTooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      // Should not appear immediately
      expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();

      // Wait for delay
      await waitFor(
        () => {
          const tooltipTexts = screen.getAllByText("Tooltip text");
          expect(tooltipTexts.length).toBeGreaterThan(0);
        },
        { timeout: 1000 }
      );
    });
  });

  describe("Accessibility", () => {
    it("tooltip content is accessible to screen readers", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button aria-describedby="tooltip">Info</button>
            </TooltipTrigger>
            <TooltipContent id="tooltip">Additional information</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      await user.hover(screen.getByRole("button"));

      await waitFor(() => {
        const tooltips = screen.getAllByRole("tooltip");
        expect(tooltips.length).toBeGreaterThan(0);
        const additionalInfoElements = screen.getAllByText(
          "Additional information"
        );
        expect(additionalInfoElements.length).toBeGreaterThan(0);
      });
    });

    it("can be triggered by keyboard focus", async () => {
      const user = userEvent.setup();

      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>Focusable button</button>
            </TooltipTrigger>
            <TooltipContent>Keyboard accessible</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      // Tab to focus the button
      await user.tab();

      await waitFor(() => {
        const tooltipTexts = screen.getAllByText("Keyboard accessible");
        expect(tooltipTexts.length).toBeGreaterThan(0);
      });
    });
  });
});
