import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://lifo123.github.io/lifo-library/',
  base: '/lifo-library/',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  outDir: 'Build',
  build: {
    assets: 'assets',
  },
});