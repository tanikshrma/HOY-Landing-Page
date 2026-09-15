import { ArrowRight } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { track } from '../lib/analytics';
import workImage from '../assets/img/work.avif';
import datesImage from '../assets/img/Dates.avif';
import weddingsImage from '../assets/img/Weddings.avif';
import travelImage from '../assets/img/travel.avif';
import everydayImage from '../assets/img/everyday.avif';

const LOOKS: { image: string; where: string; how: string; alt: string }[] = [
  {
    image: workImage,
    where: 'Work',
    how: 'Look put-together without overthinking your work wardrobe.',
    alt: 'A cream blazer over a white tee with dark brown wide-leg trousers, cream loafer mules and a tan tote',
  },
  {
    image: datesImage,
    where: 'Dates',
    how: 'Find a look that feels like you, without trying too hard.',
    alt: 'A black cropped denim jacket over a white top with a black mini skirt and tall black knee boots',
  },
  {
    image: weddingsImage,
    where: 'Weddings',
    how: 'Embroidered kurta, gold sharara, dupatta.',
    alt: 'A dusty rose embroidered kurta with a gold tissue sharara and a matching organza dupatta',
  },
  {
    image: travelImage,
    where: 'Travel',
    how: 'Build practical, comfortable looks around your destination, weather and plans.',
    alt: 'A practical travel outfit styled for comfort and movement',
  },
  {
    image: everydayImage,
    where: 'Everyday',
    how: 'Because even an ordinary day deserves a good outfit.',
    alt: 'An easy everyday outfit styled for a regular day',
  },
];

/**
 * Five occasions out of one wardrobe, arranged as three editorial cards above
 * two wider cards so the final two images can breathe.
 */
export function Looks({ onCta }: { onCta: () => void }) {
  return (
    <section className="border-b border-line bg-paper-2/50">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Dress for the Moment</p>
          <h2 className="mt-4 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
            What Are You Getting Dressed For?
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-70">
            Three outfits with nothing in common except the cupboard they came out of.
            Nothing here was bought for the occasion.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-12 sm:gap-7 lg:gap-8">
          {LOOKS.map((look, i) => (
            <Reveal
              as="li"
              key={look.where}
              delay={i * 110}
              className={`group ${i < 3 ? 'sm:col-span-4' : 'sm:col-span-6'}`}
            >
              <div className="overflow-hidden rounded-2xl bg-paper">
                <img
                  src={look.image}
                  alt={look.alt}
                  sizes="(min-width: 640px) 31vw, 100vw"
                  className={`${i < 3 ? 'aspect-[3/5]' : 'aspect-[4/3]'} w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
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

        <Reveal delay={160} className="mt-12 flex justify-center sm:mt-14">
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
