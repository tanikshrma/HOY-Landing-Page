import { LeadForm } from '../components/LeadForm';
import { Reveal } from '../components/ui/Reveal';

interface FinalCtaProps {
  onSuccess: (name: string, slot?: number) => void;
}

export function FinalCta({ onSuccess }: FinalCtaProps) {
  return (
    <section id="claim" className="scroll-mt-20 border-b border-line">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Twenty a day</p>
            <h2 className="mt-3 text-[1.85rem] leading-tight font-semibold sm:text-[2.5rem]">
              Your wardrobe is already good enough. Let’s prove it.
            </h2>
            <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ink-70">
              Twenty people get free access each day. If today is full, leave your details
              anyway and you go to the front of tomorrow’s queue.
            </p>
            <p className="mt-6 text-sm text-ink-50">
              Takes under a minute. We follow up on WhatsApp within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <LeadForm id="lead-form-bottom" onSuccess={onSuccess} variant="inline" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
