import { Photo, type PhotoKey } from '../components/ui/Photo';
import { Reveal } from '../components/ui/Reveal';

const STEPS: { n: string; title: string; body: string; aside: string; image: PhotoKey; alt: string }[] = [
  {
    n: '01',
    title: 'Show us your wardrobe',
    body: 'Photograph the pieces you actually wear. Hangers, folded, on the bed — however they are.',
    aside: 'About ten minutes, once',
    image: 'step-capture',
    alt: 'Photographing a folded block-print kurta with a phone',
  },
  {
    n: '02',
    title: 'Tell us about you',
    body: 'Your size and fit, where you work, the places you actually go, and the things you would never wear.',
    aside: 'A few questions',
    image: 'step-preferences',
    alt: 'A man sitting on his bed setting up his style profile on his phone',
  },
  {
    n: '03',
    title: 'Get dressed',
    body: 'Say where you’re going. Get a complete outfit — top, bottom, shoes, layers — built from what you own.',
    aside: 'Every morning, in seconds',
    image: 'step-outfit',
    alt: 'A man leaving his flat dressed in an olive overshirt, grey tee and dark jeans',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-b border-line">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
            Three steps, then you stop thinking about it.
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-6 sm:mt-14 sm:gap-7 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 110} className="group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-2">
                <Photo
                  name={step.image}
                  alt={step.alt}
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span
                  className="absolute top-3 left-3 rounded-full bg-paper/95 px-2.5 py-1
                    font-display text-[0.6875rem] font-bold tracking-wider text-ink backdrop-blur-sm"
                >
                  {step.n}
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-70">{step.body}</p>
              <p className="mt-3 text-[0.8125rem] font-medium text-gold">{step.aside}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
