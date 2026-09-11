/**
 * Optional Redis-over-REST backend, for hosts with no durable filesystem.
 *
 * On Vercel (or any serverless platform) `data/leads.json` lives on an
 * ephemeral disk that is not shared between instances: leads vanish and the
 * daily counter resets at random. If Upstash Redis credentials are present we
 * use them instead; otherwise the filesystem store stays in charge.
 *
 * Vercel's Upstash integration sets KV_REST_API_URL / KV_REST_API_TOKEN.
 * A direct Upstash account sets UPSTASH_REDIS_REST_URL / _TOKEN. Both work.
 */

const URL_ =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

export const kvEnabled = Boolean(URL_ && TOKEN);

/** Runs one Redis command. Arguments are sent as a JSON array, never interpolated. */
async function command<T = unknown>(args: (string | number)[]): Promise<T> {
  const res = await fetch(URL_, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
    // Never let a hung upstream hold a request open indefinitely.
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`KV ${args[0]} failed: ${res.status} ${await res.text()}`);
  }

  const body = (await res.json()) as { result?: T; error?: string };
  if (body.error) throw new Error(`KV ${args[0]}: ${body.error}`);
  return body.result as T;
}

export const kv = {
  /** Atomic increment. Returns the value *after* incrementing. */
  incr: (key: string) => command<number>(['INCR', key]),
  decr: (key: string) => command<number>(['DECR', key]),
  get: async (key: string) => command<string | null>(['GET', key]),
  /** Appends to a list. */
  rpush: (key: string, value: string) => command<number>(['RPUSH', key, value]),
  lrange: (key: string, start: number, stop: number) =>
    command<string[]>(['LRANGE', key, start, stop]),
  /** Adds to a set; returns 1 if newly added, 0 if it was already there. */
  sadd: (key: string, member: string) => command<number>(['SADD', key, member]),
  sismember: (key: string, member: string) =>
    command<number>(['SISMEMBER', key, member]),
  /** Seconds until expiry. Daily keys are given a generous TTL, not kept forever. */
  expire: (key: string, seconds: number) =>
    command<number>(['EXPIRE', key, seconds]),
  keys: (pattern: string) => command<string[]>(['KEYS', pattern]),
};
