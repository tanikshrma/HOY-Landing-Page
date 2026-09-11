import { Check } from 'lucide-react';
import { Photo } from '../components/ui/Photo';
import { LeadForm } from '../components/LeadForm';

const ASSURANCES = ['Completely free', 'No card needed', 'Set up on WhatsApp'];

interface HeroProps {
  onSuccess: (name: string, slot?: number) => void;
}

/**
 * Copy and form sit together on clean paper; the photograph gets the full
 * width of a band directly beneath them.
 *
 * An earlier pass put the photo in a right-hand panel behind the form card.
 * At 1440px the card covered the middle of that panel and left two useless
 * slivers of image — and it made a 150KB photograph the LCP element. This way
 * the LCP is text, the form is unobstructed, and the photograph is actually
 * big enough to do its job.
 */
export function Hero({ onSuccess }: HeroProps) {
  return (
    <section id="top" className="border-b border-line">
      <div className="container-page">
        <div className="grid items-start gap-y-9 py-10 sm:py-14 lg:grid-cols-12 lg:gap-x-14 lg:py-20">
          {/* Copy */}
          <div className="lg:col-span-6 lg:pt-6">
            <p className="eyebrow">House of You · Personal styling, India</p>

            <h1 className="mt-4 text-[2.05rem] leading-[1.06] font-semibold sm:text-[2.9rem] lg:text-[3.4rem] xl:text-[3.75rem]">
              You don’t need more clothes.
              <span className="mt-1 block text-clay">You need to know what to wear.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-70 sm:text-lg">
              We go through your wardrobe, take your measurements, and turn what you already
              own into outfits that actually fit you — for work, a wedding, or an ordinary
              Tuesday.
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
              {ASSURANCES.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-ink-70">
                  <Check className="size-4 shrink-0 text-gold" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 lg:col-start-8">
            <LeadForm id="lead-form" onSuccess={onSuccess} variant="hero" />
          </div>
        </div>
      </div>

      {/* Full-bleed photograph. Two crops rather than one squeezed both ways. */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/8]">
        <div className="hidden size-full lg:block">
          <Photo
            name="hero-desktop"
            alt="A woman at home holding up two shirts in front of her open wardrobe, deciding what to wear"
            sizes="100vw"
            priority
            position="object-[center_38%]"
            className="size-full object-cover"
          />
        </div>
        <div className="size-full lg:hidden">
          <Photo
            name="hero-mobile"
            alt="A woman at home holding up two shirts in front of her open wardrobe, deciding what to wear"
            sizes="100vw"
            priority
            position="object-[58%_22%]"
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
