import { Reveal } from '../components/ui/Reveal';

const SYMPTOMS = [
  {
    line: 'A full wardrobe, and still fifteen minutes standing in front of it.',
    note: 'The problem was never how much you own.',
  },
  {
    line: 'Something new bought for every occasion, worn exactly once.',
    note: 'Most of it would have worked with what was already there.',
  },
  {
    line: 'You know what you like. You just don’t know what goes with it.',
    note: 'Taste and confidence are different things.',
  },
];

export function Problem() {
  return (
    <section className="border-b border-line bg-paper-2/50">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <Reveal>
          <p className="eyebrow">Sound familiar?</p>
          <h2 className="mt-3 max-w-2xl text-[1.75rem] leading-tight font-semibold sm:text-4xl">
            Getting dressed takes more out of your morning than it should.
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-12 md:grid-cols-3">
          {SYMPTOMS.map((item, i) => (
            <Reveal
              key={item.line}
              as="li"
              delay={i * 90}
              className="flex flex-col gap-3 bg-paper p-6 sm:p-7"
            >
              <span className="font-display text-sm font-semibold text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-display text-lg leading-snug font-medium text-ink">{item.line}</p>
              <p className="mt-auto text-sm leading-relaxed text-ink-50">{item.note}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
