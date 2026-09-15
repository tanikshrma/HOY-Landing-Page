import { ArrowRight } from 'lucide-react';
import { Photo } from '../components/ui/Photo';
import { Reveal } from '../components/ui/Reveal';

interface WardrobeProps {
  onCta: () => void;
}

export function Wardrobe({ onCta }: WardrobeProps) {
  return (
    <section id="digital-wardrobe" className="scroll-mt-20 border-b border-line bg-paper-2/50">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow">Your Wardrobe, Digitised</p>
            <h2 className="mt-3 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
              One Wardrobe. So Many Possibilities.
            </h2>
            <h3 className="mt-5 font-display text-xl font-semibold text-ink sm:text-2xl">
              Start With What You Own.
            </h3>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink-70">
              Your clothes shouldn't disappear into the back of your wardrobe after one good
              outfit.
            </p>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink-70">
              HOY turns your wardrobe into a digital collection you can come back to, helping you
              discover new combinations, plan looks and make better use of what you already own.
            </p>
            <button
              type="button"
              onClick={onCta}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-ink px-7 py-3.5
                font-display text-[0.9375rem] font-semibold text-ink transition-colors
                hover:border-gold-dark hover:bg-gold-dark hover:text-paper"
            >
              Explore Your Wardrobe
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2 group">
            <div className="overflow-hidden rounded-2xl bg-paper">
              <Photo
                name="wardrobe-spread"
                alt="A wardrobe collection arranged together to show different outfit combinations"
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
