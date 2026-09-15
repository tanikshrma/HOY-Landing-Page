import { ArrowRight } from 'lucide-react';
import { Photo } from '../components/ui/Photo';
import { Reveal } from '../components/ui/Reveal';

interface StyleShoppingProps {
  onCta: () => void;
}

export function StyleShopping({ onCta }: StyleShoppingProps) {
  return (
    <section className="border-b border-line">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="group">
            <div className="overflow-hidden rounded-2xl bg-paper-2">
              <Photo
                name="look-office"
                alt="A complete personal style look with a blazer, trousers, loafers and a tote"
                sizes="(min-width: 1024px) 48vw, 100vw"
                position="object-top"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">Style That Goes Further</p>
            <h2 className="mt-3 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
              When You Need Something New, Shop Better.
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-70">
              Sometimes the right outfit is already in your wardrobe. Sometimes it's not.
            </p>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink-70">
              HOY helps you identify what could complete your wardrobe and discover new pieces
              that fit your personal style, work with what you own and suit the occasion, with
              links to purchase them.
            </p>
            <button
              type="button"
              onClick={onCta}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-ink px-7 py-3.5
                font-display text-[0.9375rem] font-semibold text-ink transition-colors
                hover:border-gold-dark hover:bg-gold-dark hover:text-paper"
            >
              Discover Your Style
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
