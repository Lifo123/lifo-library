import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://lifo123.github.io/lifo-library',
  base: '/lifo-library/',
  integrations: [react()],
  outDir: 'Build',
  build: {
    assets: 'assets',
  }
});