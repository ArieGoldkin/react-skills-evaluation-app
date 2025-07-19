import { fireEvent, render, screen } from "@testing-library/react";
import { GoogleLogin } from "../google-login";

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  useSession: jest.fn(() => ({
    data: null,
    status: "unauthenticated",
  })),
}));

// Import the mocked functions
import { signIn, useSession } from "next-auth/react";

describe("GoogleLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Google login button", () => {
    render(<GoogleLogin />);

    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
  });

  it("calls signIn with google provider when clicked", () => {
    render(<GoogleLogin />);

    const button = screen.getByText("Continue with Google");
    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledWith("google", {
      callbackUrl: "/dashboard",
      redirect: true,
    });
  });

  it("accepts custom callbackUrl", () => {
    render(<GoogleLogin callbackUrl="/custom-page" />);

    const button = screen.getByText("Continue with Google");
    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledWith("google", {
      callbackUrl: "/custom-page",
      redirect: true,
    });
  });

  it("shows loading state when signing in", () => {
    render(<GoogleLogin />);

    const button = screen.getByText("Continue with Google");
    fireEvent.click(button);

    // Mock the state change
    (useSession as jest.Mock).mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    render(<GoogleLogin />);
    expect(screen.getByText("Signing in...")).toBeInTheDocument();
  });

  it("doesn't render when user is authenticated", () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });

    const { container } = render(<GoogleLogin />);
    expect(container.firstChild).toBeNull();
  });
});
