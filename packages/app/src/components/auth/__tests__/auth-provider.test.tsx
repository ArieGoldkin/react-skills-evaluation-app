import { render } from "@testing-library/react";
import { AuthProvider } from "../auth-provider";

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-provider">{children}</div>
  ),
}));

describe("AuthProvider", () => {
  it("renders SessionProvider with children", () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <div>Test Child</div>
      </AuthProvider>
    );

    expect(getByTestId("session-provider")).toBeInTheDocument();
    expect(getByText("Test Child")).toBeInTheDocument();
  });
});
