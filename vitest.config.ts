import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["packages/app", "packages/design-system"],
  },
});
