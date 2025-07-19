import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "node:path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async config => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": resolve(__dirname, "../src"),
        "@/components": resolve(__dirname, "../src/components"),
        "@/lib": resolve(__dirname, "../src/lib"),
        "@/types": resolve(__dirname, "../src/types"),
        "@/hooks": resolve(__dirname, "../src/hooks"),
        "@/styles": resolve(__dirname, "../src/styles"),
      };
    }

    // Configure PostCSS for Tailwind CSS
    if (!config.css) {
      config.css = {};
    }
    config.css.postcss = {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      plugins: [require("tailwindcss"), require("autoprefixer")],
    };

    return config;
  },
};

export default config;
