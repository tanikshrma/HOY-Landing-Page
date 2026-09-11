import { useCallback, useEffect, useState } from 'react';
import { AvailabilityProvider } from './lib/useAvailability';
import { initAnalytics } from './lib/analytics';
import { Header } from './components/Header';
import { StickyCta } from './components/StickyCta';
import { SuccessModal } from './components/SuccessModal';
import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { HowItWorks } from './sections/HowItWorks';
import { WhatYouGet } from './sections/WhatYouGet';
import { Rewear } from './sections/Rewear';
import { MadeForIndia } from './sections/MadeForIndia';
import { Testimonials } from './sections/Testimonials';
import { Faq } from './sections/Faq';
import { FinalCta } from './sections/FinalCta';
import { Footer } from './sections/Footer';

export default function App() {
  const [success, setSuccess] = useState<{ name: string; slot?: number } | null>(null);

  useEffect(() => {
    // Deferred so third-party tags never compete with the hero image for
    // bandwidth during the initial paint.
    const id = window.setTimeout(initAnalytics, 1200);
    return () => window.clearTimeout(id);
  }, []);

  /** Sends the visitor to whichever form is nearer, then focuses the first field. */
  const scrollToForm = useCallback(() => {
    const hero = document.getElementById('lead-form');
    const bottom = document.getElementById('lead-form-bottom');

    // Below the hero, the bottom form is the shorter journey.
    const heroTop = hero?.getBoundingClientRect().top ?? 0;
    const target = heroTop < -200 && bottom ? bottom : (hero ?? bottom);
    if (!target) return;

    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 64;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });

    // preventScroll stops the browser fighting the smooth scroll we just started.
    window.setTimeout(
      () => target.querySelector<HTMLInputElement>('input:not([tabindex="-1"])')?.focus({ preventScroll: true }),
      reduced ? 0 : 650,
    );
  }, []);

  const handleSuccess = useCallback((name: string, slot?: number) => {
    setSuccess({ name, slot });
  }, []);

  return (
    <AvailabilityProvider>
      <a
        href="#lead-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50
          focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to the sign-up form
      </a>

      <Header onCta={scrollToForm} />

      <main>
        <Hero onSuccess={handleSuccess} />
        <Problem />
        <HowItWorks />
        <WhatYouGet />
        <Rewear onCta={scrollToForm} />
        <MadeForIndia />
        <Testimonials />
        <Faq />
        <FinalCta onSuccess={handleSuccess} />
      </main>

      <Footer />

      {/* Sits above the footer on mobile; padding compensates so nothing is covered. */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <StickyCta onCta={scrollToForm} />

      <SuccessModal
        open={success !== null}
        name={success?.name ?? ''}
        slotNumber={success?.slot}
        onClose={() => setSuccess(null)}
      />
    </AvailabilityProvider>
  );
}
