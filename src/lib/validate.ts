/** Mirrors server/validate.ts. This copy exists purely for instant feedback. */

export type Field = 'fullName' | 'phone' | 'email';

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function validateFullName(value: string): string | null {
  const v = value.trim();
  if (!v) return 'Please enter your name.';
  if (v.length < 2) return 'That looks a bit short.';
  if (v.length > 60) return 'That name is too long.';
  return null;
}

/**
 * Strips a country/trunk prefix by length rather than by pattern — 9111122222
 * is a valid 10-digit number that happens to start "91", so a blind
 * `replace(/^91/)` would break it. Mirrors server/validate.ts.
 */
export function toLocalDigits(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 13 && digits.startsWith('091')) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return digits;
}

export function validatePhone(value: string): string | null {
  const v = value.trim();
  if (!v) return 'Please enter your mobile number.';
  const local = toLocalDigits(v);
  if (local.length < 10) return 'That number looks incomplete.';
  if (!/^[6-9]\d{9}$/.test(local)) return 'Enter a 10-digit Indian mobile number.';
  return null;
}

export function validateEmail(value: string): string | null {
  const v = value.trim();
  if (!v) return 'Please enter your email.';
  if (!EMAIL.test(v)) return 'That email address looks off.';
  return null;
}

export const VALIDATORS: Record<Field, (v: string) => string | null> = {
  fullName: validateFullName,
  phone: validatePhone,
  email: validateEmail,
};

/** Formats as the user types: "98765 43210". Handles a pasted +91… too. */
export function formatPhone(raw: string): string {
  const digits = toLocalDigits(raw).slice(0, 10);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
}
