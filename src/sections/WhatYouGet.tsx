import { CalendarDays, MessageCircle, Ruler, Shirt, Sparkle, Wallet } from 'lucide-react';
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
    title: 'Only clothes you already own',
    body: 'Every combination comes out of your own cupboard. Nothing to buy to get started.',
  },
  {
    icon: CalendarDays,
    title: 'Built for the actual occasion',
    body: 'A sangeet, a client meeting, Diwali at home and Sunday brunch are not the same brief.',
  },
  {
    icon: Ruler,
    title: 'Cut to your actual measurements',
    body: 'Your height, shoulders and build decide what gets paired with what. Not a size chart, not a guess.',
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
          {/*
            The photo takes whatever height is left once the heading is placed,
            so it ends level with the list beside it. Giving it a fixed aspect
            ratio instead left a tall empty gap next to the last two items,
            because the six items are shorter than a 3:4 crop of this column.
          */}
          <div className="lg:col-span-5 lg:flex lg:flex-col">
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

            <Reveal delay={120} className="mt-8 hidden lg:block lg:min-h-56 lg:flex-1">
              <div className="h-full overflow-hidden rounded-2xl">
                <Photo
                  name="wardrobe-detail"
                  alt="A close view of a full wardrobe rail of kurtas, shirts and dupattas"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="size-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/*
            Two columns on tablet, but a single column on desktop: six items
            stacked run to roughly the height of the portrait photo beside
            them, so neither side is left stretched against empty space. On
            desktop the icon moves out beside the text to keep the rows tight.
          */}
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:grid-cols-1 lg:gap-y-7">
            {ITEMS.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 70} className="lg:flex lg:gap-4">
                <item.icon
                  className="size-5 shrink-0 text-gold lg:mt-0.5"
                  strokeWidth={1.75}
                />
                <div className="mt-3.5 lg:mt-0">
                  <h3 className="font-display text-base font-semibold text-paper">{item.title}</h3>
                  <p className="mt-1.5 max-w-md text-[0.9375rem] leading-relaxed text-paper/60">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
