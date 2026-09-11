/**
 * Vercel serverless entry.
 *
 * A catch-all so /api/leads, /api/availability and /api/health all reach the
 * same Express app. Vercel serves the built client from dist/ over its CDN, so
 * this function only ever handles /api/*.
 */
import app from '../server/app.js';

export default app;
