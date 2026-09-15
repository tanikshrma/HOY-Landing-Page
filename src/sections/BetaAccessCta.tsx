import { ArrowRight } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import bandRail from '../assets/img/band-rail-2200.avif';

interface BetaAccessCtaProps {
  onCta: () => void;
}

export function BetaAccessCta({ onCta }: BetaAccessCtaProps) {
  return (
    <section
      id="beta-access"
      className="relative scroll-mt-20 border-b border-line bg-ink bg-cover bg-center text-paper"
      style={{ backgroundImage: `url(${bandRail})` }}
    >
      <div className="absolute inset-0 bg-ink/85" aria-hidden="true" />
      <div className="container-page relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-paper/55 uppercase">Limited Beta</p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-4 text-[2.5rem] leading-[1.02] font-semibold sm:text-[4.25rem]">
              Be one of the first 20.
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-paper/75">
              <strong className="font-semibold text-paper">Get 14-day free beta access</strong> to
              HOY before the wider launch.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-paper/75">
              Experience your digital wardrobe, personalised styling and smarter shopping, all in
              one place.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <button
              type="button"
              onClick={onCta}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5
                font-display text-[0.9375rem] font-semibold text-ink transition-all
                hover:-translate-y-0.5 hover:bg-gold-tint hover:shadow-[0_12px_24px_-14px_rgba(250,248,245,0.55)]
                active:translate-y-0 active:scale-[0.99] sm:mt-9"
            >
              Get my free beta access
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
