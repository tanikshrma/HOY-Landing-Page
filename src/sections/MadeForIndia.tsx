import { Photo } from '../components/ui/Photo';
import { Reveal } from '../components/ui/Reveal';

const POINTS = [
  {
    title: 'Both halves of your wardrobe',
    body: 'Kurtas and blazers hang on the same rail here. Advice written for another country only understands one of them.',
  },
  {
    title: 'Dress codes that actually exist',
    body: 'Mehendi, sangeet, reception. Office in a startup and office in a bank. Diwali at home and Diwali at someone else’s.',
  },
  {
    title: 'Weather that swings 30 degrees',
    body: 'Delhi in December and Chennai in May are not the same clothes. Layering has to know the difference.',
  },
];

export function MadeForIndia() {
  return (
    <section className="border-b border-line">
      <div className="container-page py-20 sm:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Made for India</p>
            <h2 className="mt-3 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
              Built here, for how people actually dress here.
            </h2>
            <div className="mt-8 overflow-hidden rounded-2xl bg-paper">
              <Photo
                name="occasion"
                alt="Friends at a Diwali gathering, each dressed differently in kurtas, a saree, jeans and a blazer"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <dl className="divide-y divide-line">
              {POINTS.map((point, i) => (
                <Reveal key={point.title} delay={i * 100} className="py-6 first:pt-0 last:pb-0">
                  <dt className="font-display text-lg font-semibold text-ink sm:text-xl">
                    {point.title}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-70">{point.body}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
