import fs from 'node:fs';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { DAILY_CAPACITY, TIMEZONE } from './config.js';
import { kv, kvEnabled } from './kv.js';

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  /** YYYY-MM-DD in TIMEZONE — the day this lead consumed a slot from. */
  day: string;
  /** 1-based position within that day, so you can see who was #1 vs #20. */
  slotNumber: number;
  createdAt: string;
  source: { [k: string]: string | undefined };
  referrer: string;
  userAgent: string;
  ipHash: string;
}

export interface Availability {
  day: string;
  capacity: number;
  claimed: number;
  remaining: number;
  soldOut: boolean;
  resetsInMs: number;
}

export interface ClaimInput {
  fullName: string;
  phone: string;
  email: string;
  source: Record<string, string | undefined>;
  referrer: string;
  userAgent: string;
  ipHash: string;
}

export type ClaimResult =
  | { status: 'created'; lead: Lead; availability: Availability }
  | { status: 'duplicate'; lead: Lead | null; availability: Availability }
  | { status: 'sold_out'; availability: Availability };

/** Which backend is live. Surfaced on /api/health so a bad deploy is obvious. */
export const backend: 'redis' | 'filesystem' = kvEnabled ? 'redis' : 'filesystem';

/* ------------------------------------------------------------------ *
 * Time helpers
 * ------------------------------------------------------------------ */

/** Today's date as YYYY-MM-DD in the configured timezone (en-CA formats that way). */
export function today(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

/** Milliseconds until the counter resets, for the countdown in the UI. */
export function msUntilReset(): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const elapsed = get('hour') * 3600 + get('minute') * 60 + get('second');
  return (86400 - elapsed) * 1000;
}

function summarise(day: string, claimed: number): Availability {
  const capped = Math.min(claimed, DAILY_CAPACITY);
  return {
    day,
    capacity: DAILY_CAPACITY,
    claimed: capped,
    remaining: Math.max(0, DAILY_CAPACITY - capped),
    soldOut: capped >= DAILY_CAPACITY,
    resetsInMs: msUntilReset(),
  };
}

/* ------------------------------------------------------------------ *
 * Filesystem backend — for a VM or container with a persistent volume.
 * ------------------------------------------------------------------ */

/**
 * Where the filesystem store lives.
 *
 * Serverless roots are read-only — only the temp directory is writable — so
 * probe the working directory once and fall back rather than throwing on
 * every submission. Landing in temp means the data is ephemeral, which is
 * exactly why the Redis store above exists; the structured HOY_LEAD log line
 * in server/app.ts is the safety net until it is configured.
 */
function resolveDataDir(): string {
  if (process.env.DATA_DIR) return process.env.DATA_DIR;

  const preferred = path.join(process.cwd(), 'data');
  try {
    fs.mkdirSync(preferred, { recursive: true });
    fs.accessSync(preferred, fs.constants.W_OK);
    return preferred;
  } catch {
    const fallback = path.join(os.tmpdir(), 'hoy-data');
    fs.mkdirSync(fallback, { recursive: true });
    console.warn(
      `[store] ${preferred} is not writable; using ${fallback}. ` +
        'Data here does not survive a restart — configure Redis for durability.',
    );
    return fallback;
  }
}

const DATA_DIR = resolveDataDir();
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

/**
 * Everything that touches the file goes through this promise chain. The app is
 * a single Node process, so serialising here is enough to stop two concurrent
 * submissions from both reading "19 used" and both writing slot 20.
 */
let queue: Promise<unknown> = Promise.resolve();
function exclusive<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => {});
  return run;
}

let cache: Lead[] | null = null;

function readSync(): Lead[] {
  if (cache) return cache;
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(LEADS_FILE)) {
      cache = [];
      return cache;
    }
    const parsed = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
    cache = Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    // A corrupt file must not take the site down — quarantine it and start fresh.
    console.error('[store] leads.json unreadable, quarantining:', err);
    try {
      fs.renameSync(LEADS_FILE, `${LEADS_FILE}.corrupt-${Date.now()}`);
    } catch {
      /* best effort */
    }
    cache = [];
  }
  return cache;
}

/** Write to a sibling temp file then rename, so a crash mid-write cannot truncate the store. */
async function persist(leads: Lead[]): Promise<void> {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${LEADS_FILE}.${process.pid}.tmp`;
  await fsp.writeFile(tmp, JSON.stringify(leads, null, 2), 'utf8');
  await fsp.rename(tmp, LEADS_FILE);
  cache = leads;
}

function fsAvailability(): Availability {
  const day = today();
  return summarise(day, readSync().filter((l) => l.day === day).length);
}

function fsClaim(input: ClaimInput): Promise<ClaimResult> {
  return exclusive(async () => {
    const leads = [...readSync()];
    const day = today();
    const todays = leads.filter((l) => l.day === day);

    // Someone re-submitting the same details today already holds a spot. Give
    // them their existing one back rather than burning a second slot.
    const existing = todays.find(
      (l) => l.email === input.email || l.phone === input.phone,
    );
    if (existing) {
      return { status: 'duplicate' as const, lead: existing, availability: fsAvailability() };
    }

    if (todays.length >= DAILY_CAPACITY) {
      return { status: 'sold_out' as const, availability: fsAvailability() };
    }

    const lead = buildLead(input, day, todays.length + 1);
    leads.push(lead);
    await persist(leads);
    return { status: 'created' as const, lead, availability: fsAvailability() };
  });
}

/* ------------------------------------------------------------------ *
 * Redis backend — for serverless, where there is no shared disk.
 * ------------------------------------------------------------------ */

const DAY_TTL = 60 * 60 * 24 * 400; // keep a day's keys well past the day itself
const kCount = (d: string) => `hoy:count:${d}`;
const kLeads = (d: string) => `hoy:leads:${d}`;
const kSeen = (d: string) => `hoy:seen:${d}`;

async function kvAvailability(): Promise<Availability> {
  const day = today();
  const raw = await kv.get(kCount(day));
  return summarise(day, Number(raw ?? 0));
}

async function kvClaim(input: ClaimInput): Promise<ClaimResult> {
  const day = today();

  // Dedupe on either identifier before taking a slot.
  for (const id of [`e:${input.email}`, `p:${input.phone}`]) {
    if ((await kv.sismember(kSeen(day), id)) === 1) {
      return { status: 'duplicate', lead: null, availability: await kvAvailability() };
    }
  }

  // INCR is atomic, so two simultaneous claims get distinct numbers and only
  // one of them can be the twentieth. Overshoot is handed back with DECR.
  const slotNumber = await kv.incr(kCount(day));
  if (slotNumber === 1) await kv.expire(kCount(day), DAY_TTL);

  if (slotNumber > DAILY_CAPACITY) {
    await kv.decr(kCount(day));
    return { status: 'sold_out', availability: await kvAvailability() };
  }

  const lead = buildLead(input, day, slotNumber);
  await kv.rpush(kLeads(day), JSON.stringify(lead));
  await kv.expire(kLeads(day), DAY_TTL);
  await kv.sadd(kSeen(day), `e:${input.email}`);
  await kv.sadd(kSeen(day), `p:${input.phone}`);
  await kv.expire(kSeen(day), DAY_TTL);

  return { status: 'created', lead, availability: await kvAvailability() };
}

/* ------------------------------------------------------------------ *
 * Shared
 * ------------------------------------------------------------------ */

function buildLead(input: ClaimInput, day: string, slotNumber: number): Lead {
  return {
    id: crypto.randomUUID(),
    fullName: input.fullName,
    phone: input.phone,
    email: input.email,
    day,
    slotNumber,
    createdAt: new Date().toISOString(),
    source: input.source,
    referrer: input.referrer,
    userAgent: input.userAgent,
    ipHash: input.ipHash,
  };
}

export async function availability(): Promise<Availability> {
  if (!kvEnabled) return fsAvailability();
  try {
    return await kvAvailability();
  } catch (err) {
    // Never fail the page because the counter is unreachable — show the
    // filesystem's view rather than a broken widget.
    console.error('[store] availability via redis failed:', err);
    return fsAvailability();
  }
}

export function claim(input: ClaimInput): Promise<ClaimResult> {
  return kvEnabled ? kvClaim(input) : fsClaim(input);
}

/** Every lead, newest day last. Used by the CSV export. */
export async function allLeads(): Promise<Lead[]> {
  if (!kvEnabled) return readSync();

  const keys = await kv.keys('hoy:leads:*');
  const out: Lead[] = [];
  for (const key of keys.sort()) {
    for (const raw of await kv.lrange(key, 0, -1)) {
      try {
        out.push(typeof raw === 'string' ? JSON.parse(raw) : (raw as Lead));
      } catch {
        /* skip an unparseable row rather than failing the whole export */
      }
    }
  }
  return out;
}
