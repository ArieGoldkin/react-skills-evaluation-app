import next from "eslint-config-next";
import rootConfig from "../../eslint.config.root.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...rootConfig,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    ...next,
    rules: {
      ...next.rules,
      // Next.js specific rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      "@next/next/no-unwanted-polyfillio": "error",
      "@next/next/no-page-custom-font": "warn",

      // React specific rules
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // Using TypeScript
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
