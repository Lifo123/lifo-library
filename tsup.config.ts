import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    //Library
    "src/index.ts",

    //External
    "src/external/aria/index.ts",
    "src/external/aria/components/index.ts",
    "src/external/aria/utils/index.ts",

    "src/external/lucide/index.ts",
    "src/external/motion/index.ts",
    "src/external/nanoid/index.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,

  //minify: true,
  minifyIdentifiers: true,
  minifySyntax: true,
});
