import { useEffect, useRef } from 'react';
import { Check, MessageCircle, X } from 'lucide-react';

interface SuccessModalProps {
  open: boolean;
  name: string;
  slotNumber?: number;
  onClose: () => void;
}

const NEXT = [
  'We message you on WhatsApp within 24 hours.',
  'A ten-minute chat to set up your size, fit and the places you go.',
  'You start getting outfits from your own wardrobe.',
];

export function SuccessModal({ open, name, slotNumber, onClose }: SuccessModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    // Lock the page behind the dialog without the layout jumping as the
    // scrollbar disappears.
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      // Trap focus inside the dialog.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      restoreFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-paper
          p-7 sm:rounded-3xl sm:p-9"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 rounded-full p-2 text-ink-50 transition-colors hover:bg-paper-2 hover:text-ink"
        >
          <X className="size-5" strokeWidth={2} />
        </button>

        <div className="flex size-12 items-center justify-center rounded-full bg-ink text-paper">
          <Check className="size-6" strokeWidth={2.5} />
        </div>

        <h2 id="success-title" className="mt-5 font-display text-2xl font-semibold text-ink">
          You’re in{name ? `, ${name}` : ''}.
        </h2>

        {slotNumber ? (
          <p className="mt-2 text-sm text-gold-dark">
            You’re spot {slotNumber} of 20 for today.
          </p>
        ) : null}

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-70">
          Nothing to pay and nothing to download. Here’s what happens next:
        </p>

        <ol className="mt-5 space-y-3">
          {NEXT.map((step, i) => (
            <li key={step} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-70">
              <span
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full
                  bg-gold-tint font-display text-[0.6875rem] font-bold text-gold-dark"
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <p className="mt-6 flex items-start gap-2 rounded-xl bg-paper-2 px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-70">
          <MessageCircle className="mt-px size-4 shrink-0 text-gold" strokeWidth={1.75} />
          Save our number when we message, so it doesn’t land in your spam.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-ink px-6 py-3.5 font-display text-[0.9375rem]
            font-semibold text-paper transition-colors hover:bg-gold-dark"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
