import { useEffect, useState } from 'react';
import { useAvailability } from '../lib/useAvailability';

function countdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/**
 * The daily capacity indicator.
 *
 * Every number here comes from the server's real count. Nothing is faked or
 * animated downward — a scarcity claim that turns out to be theatre is worse
 * than no scarcity claim at all, and this one happens to be true.
 */
export function SlotMeter() {
  const { availability, loading, offline } = useAvailability();
  const { capacity, remaining, soldOut, resetsInMs } = availability;

  // Tick the reset countdown locally rather than re-polling for it.
  const [resetIn, setResetIn] = useState(resetsInMs);
  useEffect(() => setResetIn(resetsInMs), [resetsInMs]);
  useEffect(() => {
    const id = window.setInterval(() => setResetIn((v) => Math.max(0, v - 60_000)), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Don't render a number we haven't confirmed — a flash of "20 left" that
  // corrects to "3 left" reads as fabricated.
  if (loading || offline) {
    return (
      <div className="-mx-6 -mt-6 mb-6 rounded-t-2xl border-b border-line bg-white px-5 py-4 sm:-mx-7 sm:-mt-7 sm:mb-7 sm:px-7 lg:-mx-8 lg:-mt-8 lg:mb-8 lg:px-8" aria-hidden="true">
        <div className="flex items-center justify-between gap-4">
          <span className="h-4 w-36 animate-pulse rounded bg-line" />
          <span className="h-4 w-24 animate-pulse rounded bg-line" />
        </div>
        <span className="mt-3 block h-1.5 w-full animate-pulse rounded-full bg-paper-2" />
      </div>
    );
  }

  const pct = capacity > 0 ? Math.round((remaining / capacity) * 100) : 0;
  const low = !soldOut && remaining <= 5;

  return (
    <div className="-mx-6 -mt-6 mb-6 rounded-t-2xl border-b border-line bg-white px-5 py-4 sm:-mx-7 sm:-mt-7 sm:mb-7 sm:px-7 lg:-mx-8 lg:-mt-8 lg:mb-8 lg:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p
          className="text-[0.8125rem] font-semibold text-ink"
          // Announce changes politely so a screen-reader user hears the count drop.
          aria-live="polite"
        >
          <span className={low ? 'text-clay' : undefined}>
            {remaining} of {capacity} spots left today
          </span>
        </p>
        <p className="text-[0.75rem] text-ink-50">Resets in {countdown(resetIn)}</p>
      </div>

      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-paper-2"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={capacity}
        aria-valuenow={remaining}
        aria-label={`${remaining} of ${capacity} daily spots left`}
      >
        <div
          className={`h-full rounded-full bg-ink-30 transition-[width] duration-700 ease-out ${low ? 'bg-clay' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
