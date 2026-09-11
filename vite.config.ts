import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(dirname, 'src') },
  },
  build: {
    target: 'es2020',
    // The photography is already AVIF/WebP; inlining would bloat the JS bundle.
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        // Keeps React out of the chunk that changes on every copy edit, so
        // repeat visitors keep a warm cache.
        manualChunks: { react: ['react', 'react-dom'] },
      },
    },
  },
  server: {
    // The Express app in server/ owns the port; Vite runs as middleware.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
