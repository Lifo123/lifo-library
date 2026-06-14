import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/**/*.test.tsx",
    "!src/**/*.stories.tsx",
  ],
  format: ["cjs", "esm"],
  dts: true,
  bundle: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
});
