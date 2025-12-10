import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/utils/index.ts',
    'src/Stores/index.ts',
    'src/components/Dialog/index.ts',
    'src/components/Toast/index.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,

  minify: true,
});
