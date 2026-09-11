import { Quote } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { TESTIMONIALS } from '../content/testimonials';

/**
 * Renders nothing until src/content/testimonials.ts holds real quotes.
 *
 * An empty section is better than an invented one: fabricated reviews are a
 * misrepresentation policy violation on both Meta and Google Ads, and they are
 * the single easiest thing for a visitor to smell.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="border-b border-line bg-paper-2/50">
      <div className="container-page py-20 sm:py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">From the first users</p>
          <h2 className="mt-3 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
            What people tell us after a fortnight.
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <Reveal
              as="li"
              key={item.name + i}
              delay={i * 90}
              className="flex flex-col rounded-2xl border border-line bg-paper p-6 sm:p-7"
            >
              <Quote className="size-5 text-gold" strokeWidth={1.75} />
              <blockquote className="mt-4 grow font-display text-[1.0625rem] leading-relaxed text-ink">
                {item.quote}
              </blockquote>
              <footer className="mt-5 border-t border-line pt-4">
                <p className="text-sm font-semibold text-ink">{item.name}</p>
                <p className="mt-0.5 text-[0.8125rem] text-ink-50">{item.detail}</p>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
