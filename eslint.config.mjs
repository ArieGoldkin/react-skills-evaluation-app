import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Global ignores for all packages
  {
    ignores: [
      "**/jest.setup.js",
      "**/tailwind.config.js",
      "**/postcss.config.js",
      "**/rollup.config.js",
      "**/jest.config.cjs",
      "**/dist/**",
      "**/.next/**",
      "**/out/**",
      "**/.storybook/**",
      "**/storybook-static/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/build/**",
      "packages/design-system/jest.setup.js",
      "packages/design-system/tailwind.config.js",
      "packages/design-system/postcss.config.js",
      "packages/design-system/rollup.config.js",
      "packages/design-system/jest.config.cjs",
    ],
  },

  // Base configuration for all files
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    ignores: [
      "**/jest.setup.js",
      "**/tailwind.config.js",
      "**/postcss.config.js",
      "**/rollup.config.js",
      "**/jest.config.cjs",
      "**/dist/**",
      "**/.next/**",
      "**/out/**",
      "**/.storybook/**",
      "**/storybook-static/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/build/**",
      "packages/design-system/jest.setup.js",
      "packages/design-system/tailwind.config.js",
      "packages/design-system/postcss.config.js",
      "packages/design-system/rollup.config.js",
      "packages/design-system/jest.config.cjs",
    ],
    plugins: {
      "@typescript-eslint": typescript,
      prettier: prettier,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-function": "off",
    },
  },

  // App package specific configuration (React)
  {
    files: ["packages/app/**/*.{js,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      globals: {
        // Browser globals
        console: "readonly",
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        alert: "readonly",

        // Web APIs (available in Next.js)
        fetch: "readonly",
        URLSearchParams: "readonly",
        URL: "readonly",
        Headers: "readonly",
        Request: "readonly",
        Response: "readonly",

        // Node.js globals
        process: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        NodeJS: "readonly",

        // DOM types
        HTMLButtonElement: "readonly",
        HTMLAnchorElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLTextAreaElement: "readonly",
        HTMLSelectElement: "readonly",
        HTMLFormElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLSpanElement: "readonly",
        HTMLParagraphElement: "readonly",
        HTMLHeadingElement: "readonly",
        HTMLOListElement: "readonly",
        HTMLUListElement: "readonly",
        HTMLLIElement: "readonly",
        HTMLElement: "readonly",
        Element: "readonly",
        Node: "readonly",
        Event: "readonly",
        MouseEvent: "readonly",
        KeyboardEvent: "readonly",
        FocusEvent: "readonly",
        FormEvent: "readonly",
        ChangeEvent: "readonly",
        React: "readonly",
        JSX: "readonly",
      },
    },
    rules: {
      // React specific rules
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // Using TypeScript
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Design system package specific configuration
  {
    files: ["packages/design-system/**/*.{js,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      globals: {
        // Browser globals
        console: "readonly",
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        alert: "readonly",

        // Node.js globals
        process: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        URL: "readonly",
        NodeJS: "readonly",

        // DOM types
        HTMLButtonElement: "readonly",
        HTMLAnchorElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLTextAreaElement: "readonly",
        HTMLSelectElement: "readonly",
        HTMLFormElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLSpanElement: "readonly",
        HTMLParagraphElement: "readonly",
        HTMLHeadingElement: "readonly",
        HTMLImageElement: "readonly",
        HTMLTableElement: "readonly",
        HTMLTableSectionElement: "readonly",
        HTMLTableRowElement: "readonly",
        HTMLTableCellElement: "readonly",
        HTMLTableCaptionElement: "readonly",
        HTMLOListElement: "readonly",
        HTMLUListElement: "readonly",
        HTMLLIElement: "readonly",
        HTMLElement: "readonly",
        Element: "readonly",
        Node: "readonly",
        Event: "readonly",
        MouseEvent: "readonly",
        KeyboardEvent: "readonly",
        FocusEvent: "readonly",
        FormEvent: "readonly",
        ChangeEvent: "readonly",
        React: "readonly",
        JSX: "readonly",
        fetch: "readonly",
        global: "readonly",
        URLSearchParams: "readonly",
      },
    },
    rules: {
      // Design system specific rules can be added here
    },
  },

  // Test files configuration (Jest globals)
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        // Jest globals
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
        vitest: "readonly",
      },
    },
    rules: {
      // Relaxed rules for test files
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "max-lines": "off",
      "max-lines-per-function": "off",
      "no-constant-binary-expression": "off",
    },
  },
];
