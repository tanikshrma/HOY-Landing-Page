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
      <div className="container-page py-14 sm:py-16 lg:py-20">
        {/*
          Hairline rules between the figures. Without them the four numbers
          read as scraps floating in the band rather than one set.
        */}
        <dl className="grid grid-cols-2 gap-y-10 sm:gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.unit}
              delay={i * 80}
              className={`px-0 sm:px-8 lg:px-10
                ${i % 2 === 1 ? 'border-l border-line pl-6 sm:pl-8' : ''}
                lg:border-l lg:border-line lg:pl-10
                ${i === 0 ? 'lg:border-l-0 lg:pl-0' : ''}
                ${i === 0 || i === 2 ? 'sm:pl-0' : ''}`}
            >
              <dt className="flex items-baseline gap-2">
                <span className="font-display text-[2.75rem] leading-none font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
                  {stat.figure}
                </span>
                <span className="font-display text-[0.9375rem] font-semibold text-gold">
                  {stat.unit}
                </span>
              </dt>
              <dd className="mt-3.5 max-w-[15rem] text-[0.875rem] leading-relaxed text-ink-70">
                {stat.caption}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
