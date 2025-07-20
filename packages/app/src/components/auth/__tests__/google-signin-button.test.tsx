import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { GoogleSignInButton } from "../google-signin-button";

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}));

const mockSignIn = signIn as ReturnType<typeof vi.mocked<typeof signIn>>;

// Test helper to create a pending promise for sign-in
const createPendingSignInPromise = () => {
  let resolveSignIn: (value: any) => void;
  const signInPromise = new Promise<any>(resolve => {
    resolveSignIn = resolve;
  });
  return { signInPromise, resolveSignIn: resolveSignIn! };
};

describe("GoogleSignInButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders the sign-in button with correct text", () => {
      render(<GoogleSignInButton />);

      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText("Continue with Google")).toBeInTheDocument();
    });

    it("displays Google logo SVG", () => {
      render(<GoogleSignInButton />);

      const svg = screen.getByRole("button").querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<GoogleSignInButton className="custom-class" />);

      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });

  describe("Sign-in functionality", () => {
    it("calls signIn with correct parameters when clicked", async () => {
      mockSignIn.mockResolvedValue(undefined);

      render(<GoogleSignInButton />);

      fireEvent.click(screen.getByRole("button"));

      expect(mockSignIn).toHaveBeenCalledWith("google", {
        callbackUrl: "/dashboard",
        redirect: true,
      });
    });

    it("uses custom callbackUrl when provided", async () => {
      mockSignIn.mockResolvedValue(undefined);

      render(<GoogleSignInButton callbackUrl="/custom-redirect" />);

      fireEvent.click(screen.getByRole("button"));

      expect(mockSignIn).toHaveBeenCalledWith("google", {
        callbackUrl: "/custom-redirect",
        redirect: true,
      });
    });
  });

  describe("Loading state", () => {
    it("shows loading state during sign-in", async () => {
      const { signInPromise, resolveSignIn } = createPendingSignInPromise();
      mockSignIn.mockReturnValue(signInPromise);

      render(<GoogleSignInButton />);

      fireEvent.click(screen.getByRole("button"));

      // Check loading state
      await waitFor(() => {
        expect(screen.getByText("Signing in...")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeDisabled();
      });

      // Resolve the promise - but loading state should remain true since successful signIn redirects
      resolveSignIn(undefined);
      await waitFor(() => {
        // After successful sign-in, the loading state should still be active
        // because the user will be redirected and the component won't have time to clear the loading state
        expect(screen.getByText("Signing in...")).toBeInTheDocument();
      });
    });

    it("shows loading spinner during sign-in", async () => {
      const { signInPromise, resolveSignIn } = createPendingSignInPromise();
      mockSignIn.mockReturnValue(signInPromise);

      render(<GoogleSignInButton />);

      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        const spinner = screen
          .getByRole("button")
          .querySelector(".animate-spin");
        expect(spinner).toBeInTheDocument();
      });

      resolveSignIn(undefined);
    });
  });

  describe("Error handling", () => {
    it("handles sign-in errors gracefully", async () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockSignIn.mockRejectedValue(new Error("Sign-in failed"));

      render(<GoogleSignInButton />);

      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(consoleError).toHaveBeenCalledWith(
          "Sign-in error:",
          expect.any(Error)
        );
      });

      // Button should be enabled again after error
      await waitFor(() => {
        expect(screen.getByRole("button")).not.toBeDisabled();
      });

      consoleError.mockRestore();
    });
  });

  describe("Accessibility", () => {
    it("has proper aria-label", () => {
      render(<GoogleSignInButton />);

      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Sign in with Google"
      );
    });

    it("updates aria-label during loading", async () => {
      const { signInPromise, resolveSignIn } = createPendingSignInPromise();
      mockSignIn.mockReturnValue(signInPromise);

      render(<GoogleSignInButton />);

      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByRole("button")).toHaveAttribute(
          "aria-label",
          "Signing in with Google..."
        );
      });

      resolveSignIn(undefined);
    });

    it("is keyboard accessible", () => {
      render(<GoogleSignInButton />);

      const button = screen.getByRole("button");
      // Note: HTML button elements don't need explicit type="button" when not in a form
      // The button should be focusable and accessible
      button.focus();
      expect(button).toHaveFocus();
    });
  });
});
