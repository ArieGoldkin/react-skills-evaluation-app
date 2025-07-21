import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../src/context/theme-context";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#f8fafc",
        },
        {
          name: "dark",
          value: "#0f172a",
        },
      ],
    },
  },
  tags: ["autodocs"],
  decorators: [
    Story =>
      React.createElement(
        ThemeProvider,
        { defaultMode: "light", children: React.createElement(
          "div",
          { style: { fontFamily: "system-ui, sans-serif" } },
          React.createElement(Story)
        ) },
      ),
  ],
};

export default preview;
