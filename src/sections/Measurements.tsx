import { Reveal } from '../components/ui/Reveal';
import { MeasureFigure } from '../components/ui/MeasureFigure';

const NOTES = [
  {
    k: 'Shoulders',
    v: 'Decides whether a jacket or a structured shirt sits right, or pulls across your back.',
  },
  {
    k: 'Chest & waist',
    v: 'The difference between the two is what makes a shirt look tailored rather than boxy.',
  },
  {
    k: 'Height & inseam',
    v: 'Where a hem should break, and how much leg a kurta or a jacket should leave showing.',
  },
];

export function Measurements() {
  return (
    <section id="measurements" className="scroll-mt-20 border-b border-line">
      <div className="container-page py-20 sm:py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">The part everyone skips</p>
            <h2 className="mt-4 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
              Five numbers change everything.
            </h2>
            <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-ink-70">
              Most styling advice guesses at your body from a photo, or skips it entirely and
              talks about colour. We take the measurements a tailor would, once, and every
              combination after that is built against them.
            </p>

            <dl className="mt-10 space-y-6">
              {NOTES.map((note, i) => (
                <Reveal key={note.k} delay={i * 90} className="border-l-2 border-gold/40 pl-5">
                  <dt className="font-display text-base font-semibold text-ink">{note.k}</dt>
                  <dd className="mt-1 max-w-md text-[0.9375rem] leading-relaxed text-ink-70">
                    {note.v}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-6">
            <div className="rounded-3xl border border-line bg-paper p-6 sm:p-10">
              <MeasureFigure className="mx-auto w-full max-w-md" />
              <p className="mt-4 border-t border-line pt-5 text-center text-[0.8125rem] text-ink-50">
                Ten minutes with a tape measure. You only do it once.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
