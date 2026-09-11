import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAvailability } from '../lib/useAvailability';
import { track } from '../lib/analytics';

/**
 * Mobile-only bar. Appears once the hero form has scrolled away and hides
 * again over the bottom form, so it never covers the thing it points at.
 */
export function StickyCta({ onCta }: { onCta: () => void }) {
  const { availability, loading, offline } = useAvailability();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('lead-form');
    const bottom = document.getElementById('lead-form-bottom');
    if (!hero) return;

    let heroGone = false;
    let bottomVisible = false;
    const sync = () => setShow(heroGone && !bottomVisible);

    const heroObserver = new IntersectionObserver(
      ([e]) => {
        heroGone = !e.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    heroObserver.observe(hero);

    let bottomObserver: IntersectionObserver | undefined;
    if (bottom) {
      bottomObserver = new IntersectionObserver(
        ([e]) => {
          bottomVisible = e.isIntersecting;
          sync();
        },
        { threshold: 0.1 },
      );
      bottomObserver.observe(bottom);
    }

    return () => {
      heroObserver.disconnect();
      bottomObserver?.disconnect();
    };
  }, []);

  const { remaining, soldOut } = availability;
  const showCount = !loading && !offline;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md
        transition-transform duration-300 ease-out lg:hidden ${
          show ? 'translate-y-0' : 'translate-y-full'
        }`}
      // Keeps the bar off the iOS home indicator.
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-semibold text-ink">
            {soldOut ? 'Today’s 20 are taken' : 'Free access for 20 people a day'}
          </p>
          {showCount && (
            <p className="truncate text-xs text-ink-50">
              {soldOut ? 'Join tomorrow’s queue' : `${remaining} spots left today`}
            </p>
          )}
        </div>

        <button
          type="button"
          tabIndex={show ? 0 : -1}
          onClick={() => {
            track('cta_click', { location: 'sticky' });
            onCta();
          }}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-5 py-3
            font-display text-sm font-semibold text-paper active:scale-[0.98]"
        >
          {soldOut ? 'Join list' : 'Claim spot'}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
