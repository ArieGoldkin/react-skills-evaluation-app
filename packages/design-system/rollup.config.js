import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "fs";
import { dirname, resolve as pathResolve } from "path";
import dts from "rollup-plugin-dts";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      alias({
        entries: [
          { find: "@", replacement: pathResolve(__dirname, "src") },
          {
            find: "@/components",
            replacement: pathResolve(__dirname, "src/components"),
          },
          { find: "@/lib", replacement: pathResolve(__dirname, "src/lib") },
          { find: "@/types", replacement: pathResolve(__dirname, "src/types") },
          { find: "@/hooks", replacement: pathResolve(__dirname, "src/hooks") },
          {
            find: "@/styles",
            replacement: pathResolve(__dirname, "src/styles"),
          },
        ],
      }),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.stories.tsx", "**/*.test.tsx"],
      }),
    ],
    external: [
      "react",
      "react-dom",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "lucide-react",
      "tailwind-merge",
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
