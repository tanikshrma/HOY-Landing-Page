import { CalendarDays, Footprints, MessageCircle, Shirt, Sparkle, Wallet } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Photo } from '../components/ui/Photo';

const ITEMS = [
  {
    icon: Shirt,
    title: 'Complete outfits, not single items',
    body: 'Top, bottom, footwear and layering together — so there is nothing left to work out.',
  },
  {
    icon: Sparkle,
    title: 'Your own clothes first',
    body: 'Every look starts from what is already hanging in your wardrobe.',
  },
  {
    icon: CalendarDays,
    title: 'Built for the actual occasion',
    body: 'A sangeet, a client meeting, Diwali at home and Sunday brunch are not the same brief.',
  },
  {
    icon: Footprints,
    title: 'Fit and proportion that suit you',
    body: 'Recommendations account for your body, not a generic size chart.',
  },
  {
    icon: Wallet,
    title: 'Shopping only when there is a real gap',
    body: 'If a piece would genuinely unlock ten outfits, you will hear about it. Otherwise, silence.',
  },
  {
    icon: MessageCircle,
    title: 'Answers on WhatsApp',
    body: 'Stuck in a trial room? Send a photo and ask before you pay for it.',
  },
];

export function WhatYouGet() {
  return (
    <section id="what-you-get" className="scroll-mt-20 border-b border-line bg-ink text-paper">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-paper/45">What free access includes</p>
              <h2 className="mt-3 text-[1.75rem] leading-tight font-semibold text-paper sm:text-4xl">
                Everything below. No card, no trial that quietly starts charging.
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-paper/65">
                We are building HOY with a small group of people and we would rather have
                twenty users we actually talk to than two thousand we never hear from.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-8 hidden lg:block">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                <Photo
                  name="wardrobe-detail"
                  alt="A close view of a full wardrobe rail of kurtas, shirts and dupattas"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="size-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7 lg:content-start">
            {ITEMS.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 70}>
                <item.icon className="size-5 text-gold" strokeWidth={1.75} />
                <h3 className="mt-3.5 font-display text-base font-semibold text-paper">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-paper/60">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
