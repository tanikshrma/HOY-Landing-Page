import crypto from 'node:crypto';
import path from 'node:path';
import express, { type Request } from 'express';
import {
  ADMIN_TOKEN,
  LEAD_WEBHOOK_URL,
  MIN_FILL_SECONDS,
  PORT,
  RATE_LIMIT_PER_HOUR,
} from './config.js';
import { allLeads, availability, claim } from './store.js';
import { parseLead, pickSource } from './validate.js';

const app = express();
const isProd = process.env.NODE_ENV === 'production';

app.set('trust proxy', true);
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

/* ------------------------------------------------------------------ *
 * Rate limiting — in-memory sliding window, keyed by IP.
 * ------------------------------------------------------------------ */
const hits = new Map<string, number[]>();
const HOUR = 3_600_000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < HOUR);
  if (recent.length >= RATE_LIMIT_PER_HOUR) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// Keep the map from growing unbounded on a long-lived process.
setInterval(() => {
  const cutoff = Date.now() - HOUR;
  for (const [ip, times] of hits) {
    const kept = times.filter((t) => t > cutoff);
    if (kept.length) hits.set(ip, kept);
    else hits.delete(ip);
  }
}, HOUR).unref();

/** We store a hash, not the address — enough to spot abuse, not personal data. */
const IP_SALT = process.env.IP_SALT || crypto.randomBytes(16).toString('hex');
function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(IP_SALT + ip).digest('hex').slice(0, 16);
}

function clientIp(req: Request): string {
  return (req.ip || req.socket.remoteAddress || 'unknown').toString();
}

/* ------------------------------------------------------------------ *
 * API
 * ------------------------------------------------------------------ */

app.get('/api/availability', (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json(availability());
});

app.post('/api/leads', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  const ip = clientIp(req);

  if (rateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      message: 'Too many attempts. Please try again in a little while.',
    });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: a field hidden from humans. Anything in it is a bot. We answer
  // 200 so the bot believes it succeeded and does not retry with a new shape.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return res.json({ ok: true, status: 'created', availability: availability() });
  }

  // Timing check: the form records when it was rendered.
  const elapsed = Number(body.elapsedMs);
  if (Number.isFinite(elapsed) && elapsed < MIN_FILL_SECONDS * 1000) {
    return res.json({ ok: true, status: 'created', availability: availability() });
  }

  const parsed = parseLead(body);
  if ('errors' in parsed) {
    return res.status(422).json({ ok: false, errors: parsed.errors });
  }

  try {
    const result = await claim({
      ...parsed.data,
      source: pickSource(body.source),
      referrer: typeof body.referrer === 'string' ? body.referrer.slice(0, 300) : '',
      userAgent: (req.get('user-agent') || '').slice(0, 300),
      ipHash: hashIp(ip),
    });

    if (result.status === 'sold_out') {
      return res.status(409).json({
        ok: false,
        status: 'sold_out',
        message: "Today's 20 spots are gone. The counter resets at midnight IST.",
        availability: result.availability,
      });
    }

    if (result.status === 'created') {
      notify(result.lead).catch((err) => console.error('[webhook]', err));
    }

    return res.json({
      ok: true,
      status: result.status,
      slotNumber: result.lead.slotNumber,
      availability: result.availability,
    });
  } catch (err) {
    console.error('[leads] failed to save:', err);
    return res.status(500).json({
      ok: false,
      message: 'Something went wrong on our side. Please try again.',
    });
  }
});

/** Fire-and-forget outbound notification so a new lead reaches a human. */
async function notify(lead: {
  fullName: string;
  email: string;
  phone: string;
  slotNumber: number;
  day: string;
  source: Record<string, string | undefined>;
}) {
  if (!LEAD_WEBHOOK_URL) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    await fetch(LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        text: `New HOY lead #${lead.slotNumber} (${lead.day}) — ${lead.fullName}, ${lead.phone}, ${lead.email}`,
        lead,
      }),
    });
  } finally {
    clearTimeout(timer);
  }
}

/* ------------------------------------------------------------------ *
 * Admin CSV export. Disabled unless ADMIN_TOKEN is configured.
 *   curl -H "x-admin-token: …" https://…/api/admin/leads.csv -o leads.csv
 * ------------------------------------------------------------------ */
app.get('/api/admin/leads.csv', (req, res) => {
  if (!ADMIN_TOKEN) return res.status(404).end();
  const supplied = req.get('x-admin-token') || String(req.query.token || '');
  const a = Buffer.from(supplied);
  const b = Buffer.from(ADMIN_TOKEN);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ ok: false, message: 'Unauthorised' });
  }

  const cols = [
    'createdAt',
    'day',
    'slotNumber',
    'fullName',
    'phone',
    'email',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'referrer',
  ];
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = allLeads().map((l) =>
    cols
      .map((c) =>
        esc(c.startsWith('utm_') ? l.source?.[c] : (l as unknown as Record<string, unknown>)[c]),
      )
      .join(','),
  );

  res.type('text/csv').attachment('hoy-leads.csv').send([cols.join(','), ...rows].join('\n'));
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

/* ------------------------------------------------------------------ *
 * Static / dev server
 * ------------------------------------------------------------------ */
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
    const { createServer } = await import('vite');
    const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HOY ${isProd ? 'production' : 'dev'} server → http://localhost:${PORT}`);
  });
}

start();
