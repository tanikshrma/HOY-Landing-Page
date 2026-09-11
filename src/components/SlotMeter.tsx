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
  const { capacity, claimed, remaining, soldOut, resetsInMs } = availability;

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
      <div className="flex items-center gap-2.5" aria-hidden="true">
        <span className="h-1.5 w-full max-w-[8rem] animate-pulse rounded-full bg-line" />
        <span className="h-3 w-24 animate-pulse rounded bg-line" />
      </div>
    );
  }

  const pct = capacity > 0 ? Math.round((claimed / capacity) * 100) : 0;
  const low = !soldOut && remaining <= 5;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p
          className="text-[0.8125rem] font-semibold"
          // Announce changes politely so a screen-reader user hears the count drop.
          aria-live="polite"
        >
          {soldOut ? (
            <span className="text-ink-70">All 20 spots taken today</span>
          ) : (
            <span className={low ? 'text-clay' : 'text-ink'}>
              {remaining} of {capacity} spots left today
            </span>
          )}
        </p>
        <p className="text-[0.75rem] text-ink-50">Resets in {countdown(resetIn)}</p>
      </div>

      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-paper-2"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={capacity}
        aria-valuenow={claimed}
        aria-label={`${claimed} of ${capacity} daily spots claimed`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${
            soldOut ? 'bg-ink-30' : low ? 'bg-clay' : 'bg-gold'
          }`}
          style={{ width: `${Math.max(pct, claimed > 0 ? 4 : 0)}%` }}
        />
      </div>
    </div>
  );
}
