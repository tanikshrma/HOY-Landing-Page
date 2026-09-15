import { Reveal } from '../components/ui/Reveal';
import { Photo } from '../components/ui/Photo';

/**
 * An earlier version of this section carried a drawn figure with the
 * measurements annotated on it. Two attempts at it — stacked capsules, then a
 * croquis outline — both landed as clipart next to a page of real
 * photography. A photograph of the actual tools plus the numbers set as a
 * list says the same thing without the cartoon.
 */
const MEASUREMENTS = [
  { n: 'I', k: 'Your Digital Wardrobe', v: 'Keep your wardrobe organised digitally and see the possibilities in what you already own.' },
   { n: 'II', k: 'Personalised to You', v: 'Recommendations shaped by your body type, skin tone, style preferences and what you actually like wearing.' },
  { n: 'III', k: 'Style for Real Life', v: 'Getting ready for work, a date, college, a wedding, a holiday or just another day? HOY helps you dress for the moment.' },
  { n: 'IV', k: 'Rewear with Purpose', v: 'Discover new combinations from pieces you already own and get more out of your wardrobe.' },
  { n: 'V', k: 'Shop Smarter', v: 'When your wardrobe needs something new, discover pieces that fit your style and work with what you already own, with purchase links to shop them.' },
];

export function Measurements() {
  return (
    <section id="why-hoy" className="scroll-mt-20 border-b border-line">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Why HOY</p>
            <h2 className="mt-3 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
              More Than Outfit Ideas.
            </h2>
            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-ink-70">
              Getting dressed isn't just about what looks good. It's about what works for you, your wardrobe and your real life.

            </p>

            <div className="mt-8 overflow-hidden rounded-2xl bg-paper-2">
              <Photo
                name="measure-form"
                alt="A tailor's dress form with a measuring tape draped over the shoulder, beside shears and a folded striped shirt"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <dl className="divide-y divide-line border-y border-line">
              {MEASUREMENTS.map((m, i) => (
                <Reveal key={m.k} delay={i * 70} className="flex gap-5 py-5">
                  <dt className="sr-only">{m.k}</dt>
                  <dd className="contents">
                    <span className="mt-1 font-display text-[0.8125rem] font-bold text-gold tabular-nums">
                      {m.n}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold text-ink">
                        {m.k}
                      </span>
                      <span className="mt-1 block max-w-md text-[0.9375rem] leading-relaxed text-ink-70">
                        {m.v}
                      </span>
                    </span>
                  </dd>
                </Reveal>
              ))}
            </dl>

            {/* <p className="mt-6 text-[0.875rem] text-ink-50">
              Ten minutes with a tape measure, walked through on WhatsApp. You only do it once.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
