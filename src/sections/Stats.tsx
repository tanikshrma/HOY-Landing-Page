import { Reveal } from '../components/ui/Reveal';

/**
 * A short numeric band under the hero. Every figure here is something the
 * business actually controls — the daily cap, the setup time, the price —
 * rather than an invented engagement statistic.
 */
const STATS = [
  { figure: '20', unit: 'a day', caption: 'Free spots, then the counter resets at midnight.' },
  { figure: '5', unit: 'measurements', caption: 'Height, shoulders, chest, waist, inseam.' },
  { figure: '10', unit: 'minutes', caption: 'To set up. Once, not every morning.' },
  { figure: '0', unit: 'new clothes', caption: 'Every outfit comes out of your own cupboard.' },
];

export function Stats() {
  return (
    <section className="border-b border-line bg-paper-2/50">
      <div className="container-page py-12 sm:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.unit} delay={i * 80}>
              <dt className="flex items-baseline gap-1.5">
                <span className="font-display text-4xl leading-none font-semibold text-ink sm:text-5xl">
                  {stat.figure}
                </span>
                <span className="font-display text-sm font-medium text-gold sm:text-base">
                  {stat.unit}
                </span>
              </dt>
              <dd className="mt-3 max-w-[15rem] text-[0.875rem] leading-relaxed text-ink-70">
                {stat.caption}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
