import { Reveal } from '../components/ui/Reveal';

interface FinalCtaProps {
  onCta: () => void;
}

export function FinalCta({ onCta }: FinalCtaProps) {
  return (
    <section id="claim" className="scroll-mt-20 border-b border-line bg-paper-2">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-x-4 gap-y-1
              text-[0.6875rem] font-semibold tracking-[0.16em] leading-loose text-ink-50 uppercase">
              <span>Personalised to you</span>
              <span>Works with what you own</span>
              <span>Helps you shop better</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-3 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
              Your style is personal.
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <h3 className="mt-3 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
              Your styling should be too.
            </h3>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-70">
              Meet HOY, your personal stylist in your hand, helping you decide what to wear,
              discover new looks and shop for what your wardrobe actually needs.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <button
              type="button"
              onClick={onCta}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-transparent border-1 border-ink hover:border-gold-dark px-7 py-4
                font-display text-[0.9375rem] font-semibold text-ink hover:text-paper transition-all
                hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-[0_12px_24px_-14px_rgba(20,17,15,0.55)]
                active:translate-y-0 active:scale-[0.99] sm:mt-9"
            >
              Get my free beta access
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
