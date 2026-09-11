/**
 * Standalone entry point: one Node process serving both the API and the site.
 *
 * Used by `npm run dev` and by `npm start` on a VM or container. On Vercel the
 * static files are served by the CDN and the API runs from api/[...path].ts
 * instead, so this file is not involved there.
 */
import path from 'node:path';
import express from 'express';
import { PORT } from './config.js';
import app from './app.js';
import { backend } from './store.js';

const isProd = process.env.NODE_ENV === 'production';

async function start() {
  if (isProd) {
    const dist = path.join(process.cwd(), 'dist');
    // Hashed asset filenames are safe to cache hard; index.html must not be.
    app.use(
      express.static(dist, {
        maxAge: '1y',
        immutable: true,
        index: false,
        setHeaders(res, filePath) {
          if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
        },
      }),
    );
    app.get('*', (_req, res) => {
      res.set('Cache-Control', 'no-cache');
      res.sendFile(path.join(dist, 'index.html'));
    });
  } else {
    // Vite runs as middleware so there is no second port and no proxy.
    const { createServer } = await import('vite');
    const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `HOY ${isProd ? 'production' : 'dev'} server → http://localhost:${PORT} (store: ${backend})`,
    );
  });
}

start();
