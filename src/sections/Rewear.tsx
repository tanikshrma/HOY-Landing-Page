import { ArrowRight } from 'lucide-react';
import { Photo } from '../components/ui/Photo';
import { Reveal } from '../components/ui/Reveal';
import { track } from '../lib/analytics';

export function Rewear({ onCta }: { onCta: () => void }) {
  return (
    <section className="border-b border-line">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl bg-paper-2">
              <Photo
                name="rewear"
                alt="One striped shirt laid out with three different sets of trousers, shoes and layers it works with"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="order-1 lg:order-2">
            <p className="eyebrow">One piece, more ways</p>
            <h2 className="mt-3 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
              That shirt you’ve worn a hundred times has more in it.
            </h2>
            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-ink-70">
              Most wardrobes are underused rather than incomplete. The same striped shirt is
              an office shirt with trousers, a weekend shirt over a tee, and something else
              again under a Nehru vest.
            </p>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-ink-50">
              HOY finds those combinations for you, so the things you already paid for
              finally earn their place.
            </p>

            <button
              type="button"
              onClick={() => {
                track('cta_click', { location: 'rewear' });
                onCta();
              }}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.5
                font-display text-[0.9375rem] font-semibold text-ink transition-colors
                hover:border-gold-dark hover:bg-gold-dark hover:text-paper"
            >
              Claim my free spot
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
