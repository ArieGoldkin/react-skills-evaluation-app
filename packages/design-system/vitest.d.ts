/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

declare module "vitest" {
  export const vi: (typeof import("vitest/globals"))["vi"];
}

export {};
