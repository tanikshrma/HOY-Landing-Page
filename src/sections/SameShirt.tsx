import { ArrowRight } from 'lucide-react';
import { Photo, type PhotoKey } from '../components/ui/Photo';
import { Reveal } from '../components/ui/Reveal';
import { track } from '../lib/analytics';

const LOOKS: { image: PhotoKey; where: string; how: string; alt: string }[] = [
  {
    image: 'look-office',
    where: 'Monday, office',
    how: 'Tucked into wide-leg trousers, tan loafers.',
    alt: 'The striped shirt tucked into charcoal wide-leg trousers with tan loafers',
  },
  {
    image: 'look-weekend',
    where: 'Saturday, out',
    how: 'Open over a tank, sleeves rolled, jeans.',
    alt: 'The same striped shirt worn open over a white tank top with straight-leg jeans',
  },
  {
    image: 'look-festive',
    where: 'Wedding, evening',
    how: 'Tucked into a sharara, dupatta over one shoulder.',
    alt: 'The same striped shirt tucked into a teal silk sharara with a gold dupatta and juttis',
  },
];

/**
 * One garment, three occasions — the same shirt, the same person, shot against
 * the same wall. This is the clearest single proof of what the service does,
 * so it gets full-height photography and almost no prose.
 */
export function SameShirt({ onCta }: { onCta: () => void }) {
  return (
    <section className="border-b border-line bg-paper-2/50">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">One shirt, three places</p>
          <h2 className="mt-4 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
            This is the same shirt in all three photographs.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-70">
            Not three shirts that look alike. One shirt you already own, put to work three
            different ways.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10 sm:mt-12">
          <figure>
            <div className="overflow-hidden rounded-2xl bg-paper">
              <Photo
                name="rewear"
                alt="The striped shirt laid out with three sets of trousers, shoes and layers it works with"
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="aspect-4/3 w-full object-cover sm:aspect-16/9"
              />
            </div>
            <figcaption className="mt-3 text-[0.8125rem] text-ink-50">
              The shirt, and the three sets of things it goes with.
            </figcaption>
          </figure>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-3 sm:gap-7 lg:gap-8">
          {LOOKS.map((look, i) => (
            <Reveal as="li" key={look.image} delay={i * 110} className="group">
              <div className="overflow-hidden rounded-2xl bg-paper">
                <Photo
                  name={look.image}
                  alt={look.alt}
                  sizes="(min-width: 640px) 31vw, 100vw"
                  position="object-top"
                  className="aspect-[3/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-sm font-bold text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{look.where}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-70">{look.how}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200} className="mt-14 flex justify-center sm:mt-16">
          <button
            type="button"
            onClick={() => {
              track('cta_click', { location: 'same-shirt' });
              onCta();
            }}
            className="group inline-flex items-center gap-2 rounded-full border border-ink px-7 py-3.5
              font-display text-[0.9375rem] font-semibold text-ink transition-colors
              hover:border-gold-dark hover:bg-gold-dark hover:text-paper"
          >
            See what yours can do
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
