import { captureAttribution } from './analytics';

export interface Availability {
  day: string;
  capacity: number;
  claimed: number;
  remaining: number;
  soldOut: boolean;
  resetsInMs: number;
}

export interface LeadInput {
  fullName: string;
  phone: string;
  email: string;
  /** Honeypot — always empty for a real person. */
  company: string;
  elapsedMs: number;
}

export type LeadResult =
  | { ok: true; status: 'created' | 'duplicate'; slotNumber?: number; availability: Availability }
  | { ok: false; kind: 'sold_out'; message: string; availability: Availability }
  | { ok: false; kind: 'validation'; errors: { field: string; message: string }[] }
  | { ok: false; kind: 'error'; message: string };

export const FALLBACK_AVAILABILITY: Availability = {
  day: '',
  capacity: 20,
  claimed: 0,
  remaining: 20,
  soldOut: false,
  resetsInMs: 0,
};

export async function fetchAvailability(signal?: AbortSignal): Promise<Availability | null> {
  try {
    const res = await fetch('/api/availability', { signal, headers: { accept: 'application/json' } });
    if (!res.ok) return null;
    const data = (await res.json()) as Availability;
    return typeof data?.remaining === 'number' ? data : null;
  } catch {
    // Offline or the API is down. The caller keeps showing the last known
    // value rather than inventing one.
    return null;
  }
}

/**
 * Submits a lead.
 *
 * Note there is deliberately no localStorage fallback here. The previous build
 * wrote to localStorage when the API was unreachable and still showed the user
 * a success screen — the lead was silently lost. A failure must surface as a
 * failure so the visitor can retry.
 */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  let res: Response;
  try {
    res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...input,
        source: captureAttribution(),
        referrer: document.referrer || '',
      }),
    });
  } catch {
    return {
      ok: false,
      kind: 'error',
      message: "We couldn't reach our server. Check your connection and try again.",
    };
  }

  let body: Record<string, unknown> = {};
  try {
    body = await res.json();
  } catch {
    /* fall through to the status-code handling below */
  }

  if (res.status === 409) {
    return {
      ok: false,
      kind: 'sold_out',
      message: (body.message as string) || "Today's spots are gone.",
      availability: (body.availability as Availability) || FALLBACK_AVAILABILITY,
    };
  }

  if (res.status === 422) {
    return {
      ok: false,
      kind: 'validation',
      errors: (body.errors as { field: string; message: string }[]) || [],
    };
  }

  if (!res.ok || !body.ok) {
    return {
      ok: false,
      kind: 'error',
      message: (body.message as string) || 'Something went wrong. Please try again.',
    };
  }

  return {
    ok: true,
    status: (body.status as 'created' | 'duplicate') ?? 'created',
    slotNumber: body.slotNumber as number | undefined,
    availability: (body.availability as Availability) || FALLBACK_AVAILABILITY,
  };
}
