// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://convert-hub.net',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
      proxy: {
        '/api/health': { target: 'http://localhost:8080', changeOrigin: true, rewrite: () => '/health' },
        '/api/convert': { target: 'http://localhost:8080', changeOrigin: true, rewrite: () => '/convert' },
      },
    },
  },
});