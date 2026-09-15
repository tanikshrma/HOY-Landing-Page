import { useId, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, Loader2, TriangleAlert } from 'lucide-react';
import { submitLead } from '../lib/api';
import { track } from '../lib/analytics';
import { VALIDATORS, formatPhone, type Field } from '../lib/validate';
import { useAvailability } from '../lib/useAvailability';
import { SlotMeter } from './SlotMeter';

type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { fullName: '', phone: '', email: '' };

const FIELDS: { name: Field; label: string; type: string; autoComplete: string; placeholder: string; inputMode?: 'text' | 'tel' | 'email' }[] = [
  { name: 'fullName', label: 'FULL NAME', type: 'text', autoComplete: 'name', placeholder: 'Enter Your Full Name' },
  { name: 'phone', label: 'PHONE NUMBER', type: 'tel', autoComplete: 'tel-national', placeholder: 'Enter Your Number', inputMode: 'tel' },
  { name: 'email', label: 'EMAIL ADDRESS', type: 'email', autoComplete: 'email', placeholder: 'Enter Your Email', inputMode: 'email' },
];

interface LeadFormProps {
  id?: string;
  onSuccess: (name: string, slotNumber?: number) => void;
  /** 'hero' is the primary above-the-fold card; 'inline' is the repeat at the bottom. */
  variant?: 'hero' | 'inline';
}

export function LeadForm({ id = 'lead-form', onSuccess, variant = 'hero' }: LeadFormProps) {
  const uid = useId();
  const { availability, apply, loading } = useAvailability();

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const honeypot = useRef('');
  const mountedAt = useRef(Date.now());
  const startedTracked = useRef(false);
  const soldOut = availability.soldOut;

  function setField(name: Field, raw: string) {
    const value = name === 'phone' ? formatPhone(raw) : raw;
    setValues((v) => ({ ...v, [name]: value }));
    setFormError(null);

    if (!startedTracked.current) {
      startedTracked.current = true;
      track('form_start', { field: name });
    }

    // Only re-validate live once a field has been blurred, so we are not
    // shouting "invalid email" at someone who has typed two characters.
    if (touched[name]) {
      setErrors((e) => ({ ...e, [name]: VALIDATORS[name](value) ?? undefined }));
    }
  }

  function blurField(name: Field) {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: VALIDATORS[name](values[name]) ?? undefined }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitting || done || soldOut) return;

    const next: Errors = {};
    for (const { name } of FIELDS) {
      const message = VALIDATORS[name](values[name]);
      if (message) next[name] = message;
    }
    setErrors(next);
    setTouched({ fullName: true, phone: true, email: true });

    const firstBad = FIELDS.find((f) => next[f.name]);
    if (firstBad) {
      track('form_error', { field: firstBad.name });
      document.getElementById(`${uid}-${firstBad.name}`)?.focus();
      return;
    }

    setSubmitting(true);
    setFormError(null);

    const result = await submitLead({
      fullName: values.fullName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim().toLowerCase(),
      company: honeypot.current,
      elapsedMs: Date.now() - mountedAt.current,
    });

    setSubmitting(false);

    if (result.ok) {
      apply(result.availability);
      setDone(true);
      track(result.status === 'duplicate' ? 'lead_duplicate' : 'lead', {
        slot: result.slotNumber,
        variant,
      });
      onSuccess(values.fullName.trim().split(' ')[0], result.slotNumber);
      return;
    }

    if (result.kind === 'sold_out') {
      apply(result.availability);
      setFormError(result.message);
      track('sold_out_view');
      return;
    }

    if (result.kind === 'validation') {
      const mapped: Errors = {};
      for (const e of result.errors) {
        if (e.field in VALIDATORS) mapped[e.field as Field] = e.message;
      }
      setErrors(mapped);
      setFormError(result.errors.find((e) => e.field === 'form')?.message ?? null);
      track('form_error', { field: 'server' });
      return;
    }

    setFormError(result.message);
    track('form_error', { field: 'network' });
  }

  /* ---------------------------------------------------------------- */

  if (done) {
    return (
      <div
        id={id}
        className="rounded-2xl border border-gold/30 bg-gold-tint/60 p-7 text-center sm:p-9"
        role="status"
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-ink text-paper">
          <Check className="size-6" strokeWidth={2.5} />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">You're in.</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-70">
          We'll message you on WhatsApp within 24 hours to set up your profile. Nothing else
          to do right now.
        </p>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={
        variant === 'hero'
          ? 'rounded-2xl border border-line bg-white p-6 shadow-[0_24px_60px_-32px_rgba(20,17,15,0.35)] sm:p-7 lg:p-8'
          : 'rounded-2xl border border-line bg-white p-6 sm:p-8'
      }
    >
      <SlotMeter />

      <p className="eyebrow">ACCESS FORM</p>
      <h2 className="mt-3 font-display text-xl leading-snug font-semibold text-ink sm:text-2xl">
        Make it Yours.
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-ink-70">
        Be one of the first 20 users to experience <strong>14-day free beta access</strong> to HOY
        before the wider launch.
      </p>
      {/* <p className="mt-4 text-sm leading-relaxed text-ink-70">
        Tell us a little about yourself, upload your wardrobe and let HOY start styling around you.
      </p> */}

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {FIELDS.map(({ name, label, type, autoComplete, placeholder, inputMode }) => {
          const fieldId = `${uid}-${name}`;
          const error = errors[name];
          const invalid = Boolean(error);

          return (
            <div key={name}>
              <label
                htmlFor={fieldId}
                className="mb-1.5 block text-[0.8125rem] font-medium text-ink-70"
              >
                {label}
              </label>

              <div className="relative">
                <input
                  id={fieldId}
                  name={name}
                  type={type}
                  inputMode={inputMode}
                  autoComplete={autoComplete}
                  placeholder={placeholder}
                  value={values[name]}
                  onChange={(e) => setField(name, e.target.value)}
                  onBlur={() => blurField(name)}
                  aria-invalid={invalid}
                  aria-describedby={invalid ? `${fieldId}-error` : undefined}
                  disabled={submitting}
                  className={`w-full rounded-xl border bg-paper px-4 py-3 text-ink transition-colors
                    placeholder:text-ink-30 disabled:opacity-60
                    ${
                      invalid
                        ? 'border-negative bg-negative/[0.04] focus:border-negative'
                        : 'border-line focus:border-gold focus:bg-white'
                    }`}
                  style={name === 'phone' ? { paddingLeft: '3.25rem' } : undefined}
                />
                {name === 'phone' && (
                  <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm text-ink-50 select-none">
                    +91
                  </span>
                )}
              </div>

              {invalid && (
                <p
                  id={`${fieldId}-error`}
                  className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] text-negative"
                >
                  <TriangleAlert className="size-3.5 shrink-0" strokeWidth={2} />
                  {error}
                </p>
              )}
            </div>
          );
        })}

        {/* Honeypot. Hidden from people and from screen readers; bots fill it in. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${uid}-company`}>Company</label>
          <input
            id={`${uid}-company`}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            onChange={(e) => {
              honeypot.current = e.target.value;
            }}
          />
        </div>

        {formError && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-negative/25 bg-negative/[0.06] px-3.5 py-3 text-[0.8125rem] leading-relaxed text-negative"
          >
            <TriangleAlert className="mt-px size-4 shrink-0" strokeWidth={2} />
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || loading || soldOut}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-4
            font-display text-[0.9375rem] font-semibold text-paper transition-all
            hover:bg-gold-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Securing your spot…
            </>
          ) : (
            <>
              GET MY FREE BETA ACCESS
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <p className="text-center text-[0.75rem] text-ink-50">Your 14-day HOY experience starts here.</p>
      </form>
    </div>
  );
}
