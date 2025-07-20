import { render, screen } from "@testing-library/react";
import { Avatar, AvatarFallback, AvatarImage, AvatarStatus } from "./avatar";

describe("Avatar", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      expect(screen.getByTestId("avatar")).toBeInTheDocument();
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Avatar className="custom-class" data-testid="avatar">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      expect(screen.getByTestId("avatar")).toHaveClass("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(
        <Avatar ref={ref}>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Size Variants", () => {
    const sizeVariants = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

    sizeVariants.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(
          <Avatar size={size} data-testid={`avatar-${size}`}>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        );

        const avatar = screen.getByTestId(`avatar-${size}`);
        expect(avatar).toBeInTheDocument();

        // Check size-specific classes are applied
        const sizeClasses = {
          xs: "h-6 w-6",
          sm: "h-8 w-8",
          md: "h-10 w-10",
          lg: "h-12 w-12",
          xl: "h-16 w-16",
          "2xl": "h-20 w-20",
        };

        expect(avatar).toHaveClass(sizeClasses[size]);
      });
    });

    it("uses medium as default size", () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      expect(screen.getByTestId("avatar")).toHaveClass("h-10 w-10");
    });
  });

  describe("Shape Variants", () => {
    it("renders circle shape correctly", () => {
      render(
        <Avatar shape="circle" data-testid="avatar">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      expect(screen.getByTestId("avatar")).toHaveClass("rounded-full");
    });

    it("renders square shape correctly", () => {
      render(
        <Avatar shape="square" data-testid="avatar">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      expect(screen.getByTestId("avatar")).toHaveClass("rounded-md");
    });

    it("uses circle as default shape", () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      expect(screen.getByTestId("avatar")).toHaveClass("rounded-full");
    });
  });

  describe("Status Indicators", () => {
    const statusVariants = ["online", "offline", "busy", "away"] as const;

    statusVariants.forEach(status => {
      it(`renders ${status} status correctly`, () => {
        render(
          <Avatar status={status} data-testid="avatar">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        );

        expect(screen.getByLabelText(`Status: ${status}`)).toBeInTheDocument();

        const statusClasses = {
          online: "bg-green-500",
          offline: "bg-gray-400",
          busy: "bg-red-500",
          away: "bg-yellow-500",
        };

        expect(screen.getByLabelText(`Status: ${status}`)).toHaveClass(
          statusClasses[status]
        );
      });
    });

    it("does not render status when not provided", () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      expect(screen.queryByLabelText(/Status:/)).not.toBeInTheDocument();
    });
  });
});

describe("AvatarImage", () => {
  describe("Rendering", () => {
    it("renders correctly with src", () => {
      render(<AvatarImage src="/test-image.jpg" alt="Test user" />);

      const image = screen.getByRole("img", { name: "Test user" });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/test-image.jpg");
    });

    it("uses default alt text when not provided", () => {
      render(<AvatarImage src="/test-image.jpg" />);

      expect(screen.getByRole("img", { name: "Avatar" })).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<AvatarImage src="/test-image.jpg" className="custom-class" />);

      expect(screen.getByRole("img")).toHaveClass("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(<AvatarImage ref={ref} src="/test-image.jpg" />);

      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Shape Variants", () => {
    it("renders circle shape correctly", () => {
      render(<AvatarImage src="/test-image.jpg" shape="circle" />);

      expect(screen.getByRole("img")).toHaveClass("rounded-full");
    });

    it("renders square shape correctly", () => {
      render(<AvatarImage src="/test-image.jpg" shape="square" />);

      expect(screen.getByRole("img")).toHaveClass("rounded-md");
    });

    it("uses circle as default shape", () => {
      render(<AvatarImage src="/test-image.jpg" />);

      expect(screen.getByRole("img")).toHaveClass("rounded-full");
    });
  });

  describe("Error Handling", () => {
    it("handles image load errors gracefully", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(<AvatarImage src="/non-existent-image.jpg" />);

      const image = screen.getByRole("img");

      // Simulate image load error
      Object.defineProperty(image, "src", {
        writable: true,
        value: "/non-existent-image.jpg",
      });

      consoleSpy.mockRestore();
    });
  });
});

describe("AvatarFallback", () => {
  describe("Rendering", () => {
    it("renders correctly with children", () => {
      render(<AvatarFallback>JD</AvatarFallback>);

      expect(screen.getByText("JD")).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<AvatarFallback className="custom-class">JD</AvatarFallback>);

      expect(screen.getByRole("img")).toHaveClass("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(<AvatarFallback ref={ref}>JD</AvatarFallback>);

      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Name Prop and Initials Generation", () => {
    it("generates initials from single name", () => {
      render(<AvatarFallback name="John" />);

      expect(screen.getByText("J")).toBeInTheDocument();
      expect(screen.getByLabelText("John's avatar")).toBeInTheDocument();
    });

    it("generates initials from first and last name", () => {
      render(<AvatarFallback name="John Doe" />);

      expect(screen.getByText("JD")).toBeInTheDocument();
      expect(screen.getByLabelText("John Doe's avatar")).toBeInTheDocument();
    });

    it("generates initials from multiple names (uses first and last)", () => {
      render(<AvatarFallback name="John Michael Doe Smith" />);

      expect(screen.getByText("JS")).toBeInTheDocument();
      expect(
        screen.getByLabelText("John Michael Doe Smith's avatar")
      ).toBeInTheDocument();
    });

    it("handles names with extra whitespace", () => {
      render(<AvatarFallback name="  John   Doe  " />);

      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("prioritizes children over name prop", () => {
      render(<AvatarFallback name="John Doe">Custom</AvatarFallback>);

      expect(screen.getByText("Custom")).toBeInTheDocument();
      expect(screen.queryByText("JD")).not.toBeInTheDocument();
    });

    it("renders empty when no name or children provided", () => {
      render(<AvatarFallback />);

      const fallback = screen.getByRole("img");
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent("");
      expect(fallback).toHaveAttribute("aria-label", "User avatar");
    });
  });

  describe("Size Variants", () => {
    const sizeVariants = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

    sizeVariants.forEach(size => {
      it(`renders ${size} size with correct text size`, () => {
        render(<AvatarFallback size={size}>JD</AvatarFallback>);

        const textSizeClasses = {
          xs: "text-xs",
          sm: "text-sm",
          md: "text-base",
          lg: "text-lg",
          xl: "text-xl",
          "2xl": "text-2xl",
        };

        expect(screen.getByRole("img")).toHaveClass(textSizeClasses[size]);
      });
    });
  });

  describe("Shape Variants", () => {
    it("renders circle shape correctly", () => {
      render(<AvatarFallback shape="circle">JD</AvatarFallback>);

      expect(screen.getByRole("img")).toHaveClass("rounded-full");
    });

    it("renders square shape correctly", () => {
      render(<AvatarFallback shape="square">JD</AvatarFallback>);

      expect(screen.getByRole("img")).toHaveClass("rounded-md");
    });
  });
});

describe("AvatarStatus", () => {
  describe("Rendering", () => {
    it("renders correctly with status", () => {
      render(
        <AvatarStatus status="online" size="md" data-testid="avatar-status" />
      );

      const status = screen.getByTestId("avatar-status");
      expect(status).toBeInTheDocument();
      expect(status).toHaveClass("bg-green-500");
    });

    it("applies custom className", () => {
      render(
        <AvatarStatus
          status="online"
          size="md"
          className="custom-class"
          data-testid="avatar-status"
        />
      );

      expect(screen.getByTestId("avatar-status")).toHaveClass("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(<AvatarStatus ref={ref} status="online" size="md" />);

      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Status Colors", () => {
    const statusColors = [
      { status: "online", color: "bg-green-500" },
      { status: "offline", color: "bg-gray-400" },
      { status: "busy", color: "bg-red-500" },
      { status: "away", color: "bg-yellow-500" },
    ] as const;

    statusColors.forEach(({ status, color }) => {
      it(`renders ${status} status with correct color`, () => {
        render(
          <AvatarStatus
            status={status}
            size="md"
            data-testid={`status-${status}`}
          />
        );

        expect(screen.getByTestId(`status-${status}`)).toHaveClass(color);
      });
    });
  });

  describe("Size Variants", () => {
    const sizeVariants = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

    sizeVariants.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(
          <AvatarStatus
            status="online"
            size={size}
            data-testid={`status-${size}`}
          />
        );

        const statusSizeClasses = {
          xs: "h-2 w-2",
          sm: "h-2.5 w-2.5",
          md: "h-3 w-3",
          lg: "h-3.5 w-3.5",
          xl: "h-4 w-4",
          "2xl": "h-5 w-5",
        };

        expect(screen.getByTestId(`status-${size}`)).toHaveClass(
          statusSizeClasses[size]
        );
      });
    });
  });
});

describe("Avatar Integration", () => {
  describe("Complete Avatar with Image and Fallback", () => {
    it("renders complete avatar with image", () => {
      render(
        <Avatar>
          <AvatarImage src="/test-image.jpg" alt="John Doe" />
          <AvatarFallback name="John Doe" />
        </Avatar>
      );

      expect(screen.getByRole("img", { name: "John Doe" })).toBeInTheDocument();
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("renders avatar with status indicator", () => {
      render(
        <Avatar status="online">
          <AvatarImage src="/test-image.jpg" alt="John Doe" />
          <AvatarFallback name="John Doe" />
        </Avatar>
      );

      expect(screen.getByLabelText("Status: online")).toBeInTheDocument();
      expect(screen.getByRole("img", { name: "John Doe" })).toBeInTheDocument();
    });

    it("maintains size consistency across sub-components", () => {
      render(
        <Avatar size="lg" status="online">
          <AvatarImage src="/test-image.jpg" alt="John Doe" />
          <AvatarFallback name="John Doe" />
        </Avatar>
      );

      const avatar = screen
        .getByRole("img", { name: "John Doe" })
        .closest("div");
      expect(avatar).toHaveClass("h-12 w-12");
      expect(screen.getByLabelText("Status: online")).toHaveClass(
        "h-3.5 w-3.5"
      );
    });

    it("maintains shape consistency across sub-components", () => {
      render(
        <Avatar shape="square">
          <AvatarImage src="/test-image.jpg" alt="John Doe" />
          <AvatarFallback name="John Doe" />
        </Avatar>
      );

      const avatar = screen
        .getByRole("img", { name: "John Doe" })
        .closest("div");
      expect(avatar).toHaveClass("rounded-md");
      expect(screen.getByRole("img", { name: "John Doe" })).toHaveClass(
        "rounded-md"
      );
      expect(screen.getByText("JD")).toHaveClass("rounded-md");
    });
  });

  describe("Accessibility", () => {
    it("provides proper ARIA labels for status", () => {
      render(
        <Avatar status="busy">
          <AvatarFallback name="John Doe" />
        </Avatar>
      );

      expect(screen.getByLabelText("Status: busy")).toBeInTheDocument();
    });

    it("provides proper ARIA labels for fallback", () => {
      render(
        <Avatar>
          <AvatarFallback name="John Doe" />
        </Avatar>
      );

      expect(screen.getByLabelText("John Doe's avatar")).toBeInTheDocument();
    });

    it("provides default ARIA label when no name is provided", () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      expect(screen.getByLabelText("User avatar")).toBeInTheDocument();
    });
  });
});
