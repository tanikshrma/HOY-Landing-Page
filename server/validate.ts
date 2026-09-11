/**
 * Validation shared in spirit with src/lib/validate.ts. The client copy exists
 * for instant feedback; this one is the authority — never trust the browser.
 */

export interface Parsed {
  fullName: string;
  phone: string;
  email: string;
}

export type ValidationError = { field: keyof Parsed | 'form'; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Indian mobile numbers are 10 digits starting 6-9. We also accept +91 and 0
 * prefixes.
 *
 * The prefix is stripped by length, not by pattern: 9111122222 is itself a
 * valid 10-digit number beginning "91", so stripping "91" whenever it appears
 * would reject a real subscriber.
 */
export function normalisePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');

  if (digits.length === 13 && digits.startsWith('091')) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);

  if (!/^[6-9]\d{9}$/.test(digits)) return null;
  return `+91${digits}`;
}

export function parseLead(body: unknown): { data: Parsed } | { errors: ValidationError[] } {
  const errors: ValidationError[] = [];
  const b = (body ?? {}) as Record<string, unknown>;

  const rawName = typeof b.fullName === 'string' ? b.fullName.trim().replace(/\s+/g, ' ') : '';
  const rawPhone = typeof b.phone === 'string' ? b.phone.trim() : '';
  const rawEmail = typeof b.email === 'string' ? b.email.trim().toLowerCase() : '';

  if (rawName.length < 2) {
    errors.push({ field: 'fullName', message: 'Please enter your name.' });
  } else if (rawName.length > 60) {
    errors.push({ field: 'fullName', message: 'That name is too long.' });
  } else if (!/[\p{L}]/u.test(rawName)) {
    errors.push({ field: 'fullName', message: 'Please enter your name.' });
  }

  const phone = normalisePhone(rawPhone);
  if (!phone) {
    errors.push({ field: 'phone', message: 'Enter a 10-digit Indian mobile number.' });
  }

  if (!EMAIL.test(rawEmail) || rawEmail.length > 120) {
    errors.push({ field: 'email', message: 'Enter a valid email address.' });
  }

  if (errors.length) return { errors };
  return { data: { fullName: rawName, phone: phone!, email: rawEmail } };
}

/** Only these keys get persisted from the query string — no open-ended dumping. */
const TRACKED = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
] as const;

export function pickSource(input: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!input || typeof input !== 'object') return out;
  for (const key of TRACKED) {
    const v = (input as Record<string, unknown>)[key];
    if (typeof v === 'string' && v) out[key] = v.slice(0, 200);
  }
  return out;
}
