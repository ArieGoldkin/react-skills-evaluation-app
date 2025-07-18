import { cn } from "@/lib/utils";

describe("Utils", () => {
  describe("cn function", () => {
    it("should merge class names correctly", () => {
      const result = cn("class1", "class2");
      expect(result).toBe("class1 class2");
    });

    it("should handle conditional classes", () => {
      const result = cn("class1", false && "class2", "class3");
      expect(result).toBe("class1 class3");
    });

    it("should handle empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });

    it("should handle undefined and null values", () => {
      const result = cn("class1", undefined, null, "class2");
      expect(result).toBe("class1 class2");
    });

    it("should merge conflicting Tailwind classes correctly", () => {
      const result = cn("p-4", "p-2");
      expect(result).toBe("p-2");
    });

    it("should handle arrays and objects", () => {
      const result = cn(["class1", "class2"], { class3: true, class4: false });
      expect(result).toBe("class1 class2 class3");
    });
  });
});
