import { ArrowRight } from 'lucide-react';
import { Photo, type PhotoKey } from '../components/ui/Photo';
import { Reveal } from '../components/ui/Reveal';
import { track } from '../lib/analytics';

const LOOKS: { image: PhotoKey; where: string; how: string; alt: string }[] = [
  {
    image: 'look-office',
    where: 'Monday, office',
    how: 'Cream blazer, brown wide-legs, loafer mules.',
    alt: 'A cream blazer over a white tee with dark brown wide-leg trousers, cream loafer mules and a tan tote',
  },
  {
    image: 'look-weekend',
    where: 'Saturday night',
    how: 'Cropped denim, mini skirt, knee boots.',
    alt: 'A black cropped denim jacket over a white top with a black mini skirt and tall black knee boots',
  },
  {
    image: 'look-festive',
    where: 'The wedding',
    how: 'Embroidered kurta, gold sharara, dupatta.',
    alt: 'A dusty rose embroidered kurta with a gold tissue sharara and a matching organza dupatta',
  },
];

/**
 * Three occasions out of one wardrobe.
 *
 * This was "one shirt, three ways" until the client supplied reference looks
 * that share no garment — a blazer and trousers, a jacket and a mini skirt,
 * and a full sharara suit. The single-garment headline could not survive
 * that, so the claim is now about the wardrobe rather than the shirt. Keep
 * the two in step: if the photographs ever go back to sharing a piece, the
 * stronger single-garment claim can come back with them.
 */
export function Looks({ onCta }: { onCta: () => void }) {
  return (
    <section className="border-b border-line bg-paper-2/50">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">One wardrobe, three occasions</p>
          <h2 className="mt-4 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
            Monday, Saturday night, and the wedding.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-70">
            Three outfits with nothing in common except the cupboard they came out of.
            Nothing here was bought for the occasion.
          </p>
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

        <Reveal delay={160} className="mt-12 sm:mt-14">
          <figure>
            <div className="overflow-hidden rounded-2xl bg-paper">
              <Photo
                name="wardrobe-spread"
                alt="All the pieces from the three outfits laid out together on a bed"
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="aspect-4/3 w-full object-cover sm:aspect-16/9"
              />
            </div>
            <figcaption className="mt-3 text-[0.8125rem] text-ink-50">
              Every piece above, out of one cupboard.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={200} className="mt-12 flex justify-center sm:mt-14">
          <button
            type="button"
            onClick={() => {
              track('cta_click', { location: 'looks' });
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
