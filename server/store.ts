import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { DAILY_CAPACITY, TIMEZONE } from './config.js';

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
  source: {
    /** utm_source / utm_medium / utm_campaign / utm_content / utm_term / fbclid / gclid */
    [k: string]: string | undefined;
  };
  referrer: string;
  userAgent: string;
  ipHash: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
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

/** Today's date as YYYY-MM-DD in the configured timezone. */
export function today(): string {
  // en-CA formats as YYYY-MM-DD, which is exactly the shape we want.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

/** Milliseconds until the counter resets, for the countdown in the UI. */
export function msUntilReset(): number {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const elapsed = get('hour') * 3600 + get('minute') * 60 + get('second');
  return (86400 - elapsed) * 1000;
}

export interface Availability {
  day: string;
  capacity: number;
  claimed: number;
  remaining: number;
  soldOut: boolean;
  resetsInMs: number;
}

export function availability(): Availability {
  const day = today();
  const claimed = readSync().filter((l) => l.day === day).length;
  const remaining = Math.max(0, DAILY_CAPACITY - claimed);
  return {
    day,
    capacity: DAILY_CAPACITY,
    claimed,
    remaining,
    soldOut: remaining <= 0,
    resetsInMs: msUntilReset(),
  };
}

export type ClaimResult =
  | { status: 'created'; lead: Lead; availability: Availability }
  | { status: 'duplicate'; lead: Lead; availability: Availability }
  | { status: 'sold_out'; availability: Availability };

export interface ClaimInput {
  fullName: string;
  phone: string;
  email: string;
  source: Record<string, string | undefined>;
  referrer: string;
  userAgent: string;
  ipHash: string;
}

export function claim(input: ClaimInput): Promise<ClaimResult> {
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
      return { status: 'duplicate' as const, lead: existing, availability: availability() };
    }

    if (todays.length >= DAILY_CAPACITY) {
      return { status: 'sold_out' as const, availability: availability() };
    }

    const lead: Lead = {
      id: crypto.randomUUID(),
      fullName: input.fullName,
      phone: input.phone,
      email: input.email,
      day,
      slotNumber: todays.length + 1,
      createdAt: new Date().toISOString(),
      source: input.source,
      referrer: input.referrer,
      userAgent: input.userAgent,
      ipHash: input.ipHash,
    };

    leads.push(lead);
    await persist(leads);

    return { status: 'created' as const, lead, availability: availability() };
  });
}

export function allLeads(): Lead[] {
  return readSync();
}
