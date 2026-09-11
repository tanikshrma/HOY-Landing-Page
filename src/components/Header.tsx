import { useEffect, useState } from 'react';
import { Wordmark } from './ui/Wordmark';
import { track } from '../lib/analytics';

const NAV = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'What you get', href: '#what-you-get' },
  { label: 'Questions', href: '#faq' },
];

export function Header({ onCta }: { onCta: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <a href="#top" aria-label="HOY — House of You, back to top" className="shrink-0">
          <Wordmark size="h-9 sm:h-10" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-70 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => {
            track('cta_click', { location: 'header' });
            onCta();
          }}
          className="shrink-0 rounded-full bg-ink px-4 py-2.5 font-display text-[0.8125rem] font-semibold
            text-paper transition-colors hover:bg-gold-dark sm:px-5"
        >
          Get free access
        </button>
      </div>
    </header>
  );
}
