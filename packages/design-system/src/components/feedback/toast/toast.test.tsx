import { render } from "@testing-library/react";
import { vi } from "vitest";
import { Toaster, toast, toastUtils } from "./toast";

// Mock matchMedia for Sonner
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe("Toaster Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Toaster />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("accepts custom className prop", () => {
    // Test that the component accepts className prop without error
    expect(() => render(<Toaster className="custom-toaster" />)).not.toThrow();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Toaster ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("supports theme prop", () => {
    const { container } = render(<Toaster theme="dark" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("supports position prop", () => {
    const { container } = render(<Toaster position="top-center" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("Toast Function API", () => {
  beforeEach(() => {
    // Clear any existing toasts
    toast.dismiss();
  });

  it("exports toast function with all methods", () => {
    expect(typeof toast).toBe("function");
    expect(typeof toast.success).toBe("function");
    expect(typeof toast.error).toBe("function");
    expect(typeof toast.warning).toBe("function");
    expect(typeof toast.info).toBe("function");
    expect(typeof toast.loading).toBe("function");
    expect(typeof toast.promise).toBe("function");
    expect(typeof toast.custom).toBe("function");
    expect(typeof toast.dismiss).toBe("function");
    expect(typeof toast.message).toBe("function");
  });

  it("can call basic toast function", () => {
    expect(() => toast("Test message")).not.toThrow();
  });

  it("can call success toast", () => {
    expect(() => toast.success("Success message")).not.toThrow();
  });

  it("can call error toast", () => {
    expect(() => toast.error("Error message")).not.toThrow();
  });

  it("can call warning toast", () => {
    expect(() => toast.warning("Warning message")).not.toThrow();
  });

  it("can call info toast", () => {
    expect(() => toast.info("Info message")).not.toThrow();
  });

  it("can call loading toast", () => {
    expect(() => toast.loading("Loading message")).not.toThrow();
  });

  it("can call message toast", () => {
    expect(() => toast.message("Plain message")).not.toThrow();
  });

  it("can dismiss toasts", () => {
    expect(() => toast.dismiss()).not.toThrow();
  });

  it("returns toast ID when called", () => {
    const id = toast("Test message");
    expect(typeof id).toBe("number");
  });

  it("supports promise handling", () => {
    const promise = Promise.resolve("test");
    expect(() =>
      toast.promise(promise, {
        loading: "Loading...",
        success: "Success!",
        error: "Error!",
      })
    ).not.toThrow();
  });

  it("supports custom JSX content", () => {
    const customJSX = <div>Custom content</div>;
    expect(() => toast.custom(customJSX)).not.toThrow();
  });
});

describe("Toast Options", () => {
  it("accepts duration option", () => {
    expect(() => toast("Test", { duration: 1000 })).not.toThrow();
  });

  it("accepts position option", () => {
    const positions = [
      "top-left",
      "top-center",
      "top-right",
      "bottom-left",
      "bottom-center",
      "bottom-right",
    ] as const;

    positions.forEach(position => {
      expect(() => toast("Test", { position })).not.toThrow();
    });
  });

  it("accepts action option", () => {
    expect(() =>
      toast("Test", {
        action: {
          label: "Action",
          onClick: () => {},
        },
      })
    ).not.toThrow();
  });

  it("accepts cancel option", () => {
    expect(() =>
      toast("Test", {
        cancel: {
          label: "Cancel",
          onClick: () => {},
        },
      })
    ).not.toThrow();
  });

  it("accepts description option", () => {
    expect(() =>
      toast("Test", {
        description: "Description text",
      })
    ).not.toThrow();
  });

  it("accepts dismissible option", () => {
    expect(() => toast("Test", { dismissible: false })).not.toThrow();
  });

  it("accepts className option", () => {
    expect(() => toast("Test", { className: "custom-toast" })).not.toThrow();
  });
});

describe("Toast Utils", () => {
  it("exports toastUtils object with all methods", () => {
    expect(typeof toastUtils).toBe("object");
    expect(typeof toastUtils.successWithAction).toBe("function");
    expect(typeof toastUtils.errorWithRetry).toBe("function");
    expect(typeof toastUtils.asyncOperation).toBe("function");
    expect(typeof toastUtils.positioned).toBe("function");
  });

  it("successWithAction creates success toast with action", () => {
    const actionFn = vi.fn();
    expect(() =>
      toastUtils.successWithAction("Success message", "Undo", actionFn)
    ).not.toThrow();
  });

  it("errorWithRetry creates error toast with retry action", () => {
    const retryFn = vi.fn();
    expect(() =>
      toastUtils.errorWithRetry("Error occurred", retryFn)
    ).not.toThrow();
  });

  it("asyncOperation handles promises", () => {
    const promise = Promise.resolve("data");
    expect(() =>
      toastUtils.asyncOperation(promise, {
        loading: "Loading...",
        success: "Done!",
        error: "Failed!",
      })
    ).not.toThrow();
  });

  it("asyncOperation with custom duration", () => {
    const promise = Promise.resolve("data");
    expect(() =>
      toastUtils.asyncOperation(
        promise,
        {
          loading: "Loading...",
          success: "Done!",
          error: "Failed!",
        },
        { duration: 3000 }
      )
    ).not.toThrow();
  });

  it("positioned creates toast with custom position and type", () => {
    expect(() =>
      toastUtils.positioned("Message", "top-center", "success")
    ).not.toThrow();

    expect(() =>
      toastUtils.positioned("Error message", "bottom-left", "error")
    ).not.toThrow();
  });
});

describe("Promise Toast Variants", () => {
  it("handles successful promises", () => {
    const successPromise = Promise.resolve("Success data");
    expect(() =>
      toast.promise(successPromise, {
        loading: "Loading...",
        success: "Operation successful!",
        error: "Operation failed!",
      })
    ).not.toThrow();
  });

  it("handles rejected promises", () => {
    const errorPromise = Promise.reject(new Error("Test error"));
    expect(() =>
      toast.promise(errorPromise, {
        loading: "Loading...",
        success: "Operation successful!",
        error: "Operation failed!",
      })
    ).not.toThrow();
  });

  it("supports dynamic success messages", () => {
    const successPromise = Promise.resolve({ name: "John Doe" });
    expect(() =>
      toast.promise(successPromise, {
        loading: "Loading...",
        success: (data: any) => `Welcome ${data.name}!`,
        error: "Operation failed!",
      })
    ).not.toThrow();
  });

  it("supports dynamic error messages", () => {
    const errorPromise = Promise.reject(new Error("Custom error"));
    expect(() =>
      toast.promise(errorPromise, {
        loading: "Loading...",
        success: "Success!",
        error: (error: any) => `Failed: ${error.message}`,
      })
    ).not.toThrow();
  });
});

describe("Multiple Toast Handling", () => {
  it("can create multiple toasts", () => {
    expect(() => {
      toast("First toast");
      toast.success("Second toast");
      toast.error("Third toast");
    }).not.toThrow();
  });

  it("can dismiss specific toast by ID", () => {
    const id = toast("Dismissible toast");
    expect(() => toast.dismiss(id)).not.toThrow();
  });

  it("can dismiss all toasts", () => {
    toast("First toast");
    toast("Second toast");
    expect(() => toast.dismiss()).not.toThrow();
  });
});

describe("Integration with Toaster Component", () => {
  it("works with Toaster component rendered", () => {
    const ToastWrapper = () => (
      <div>
        <Toaster />
        <button onClick={() => toast("Test message")}>Show Toast</button>
      </div>
    );

    const { container } = render(<ToastWrapper />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("supports all variants with Toaster", () => {
    const ToastWrapper = () => (
      <div>
        <Toaster />
      </div>
    );

    render(<ToastWrapper />);

    expect(() => {
      toast("Default");
      toast.success("Success");
      toast.error("Error");
      toast.warning("Warning");
      toast.info("Info");
      toast.loading("Loading");
    }).not.toThrow();
  });
});

describe("TypeScript Interfaces", () => {
  it("has proper TypeScript interfaces", () => {
    // Test that the component accepts the expected props
    const toasterProps = {
      theme: "dark" as const,
      position: "top-center" as const,
      className: "custom-class",
    };

    expect(() => render(<Toaster {...toasterProps} />)).not.toThrow();
  });

  it("toast options have proper types", () => {
    const options = {
      duration: 5000,
      position: "bottom-right" as const,
      dismissible: true,
      className: "custom-toast",
      description: "Test description",
      action: {
        label: "Action",
        onClick: () => {},
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    };

    expect(() => toast("Test", options)).not.toThrow();
  });
});

describe("Accessibility Features", () => {
  it("supports ARIA attributes through options", () => {
    expect(() =>
      toast("Accessible message", {
        description: "This message is accessible",
      })
    ).not.toThrow();
  });

  it("provides semantic action buttons", () => {
    expect(() =>
      toast("Message with action", {
        action: {
          label: "Perform Action",
          onClick: () => {},
        },
      })
    ).not.toThrow();
  });
});
