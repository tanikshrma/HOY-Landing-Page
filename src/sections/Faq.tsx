import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { track } from '../lib/analytics';

/**
 * Objection handling, ordered by how often each one actually stops someone
 * from filling in the form. "Is it really free" and "what happens next" come
 * first for that reason.
 *
 * These are also emitted as FAQPage JSON-LD from index.html — keep the two in
 * sync if you edit the wording.
 */
export const FAQS = [
  {
    q: 'Is it actually free?',
    a: 'Yes. Free for the first 20 people who sign up each day, with no card and no trial that starts charging later. We are still building, and we would rather pay for feedback in access than in advertising.',
  },
  {
    q: 'What happens after I sign up?',
    a: 'You get a WhatsApp message from us within 24 hours. We walk you through photographing your wardrobe and taking your measurements, then start sending you outfits built from your own clothes. There is nothing to download or install first.',
  },
  {
    q: 'Do I have to measure myself?',
    a: 'Yes, and it is the part that makes the difference. We walk you through it on WhatsApp — height, shoulders, chest, waist and inseam, with an ordinary tape measure. It takes about ten minutes and you only do it once. Without it we would be guessing like everyone else.',
  },
  {
    q: 'Do I have to photograph my entire wardrobe?',
    a: 'No. Start with the 15 to 20 pieces you reach for most — that is enough to build real combinations from. Add more whenever you feel like it, or never.',
  },
  {
    q: 'Will you push me to buy things?',
    a: 'No. The whole point is combinations from clothes you already have. If a single piece would genuinely unlock ten more outfits we will say so and tell you why, but we are not paid by brands to place products.',
  },
  {
    q: 'Is this for men as well?',
    a: 'Yes. HOY works for men and women, and for both Indian and Western wardrobes.',
  },
  {
    q: 'What do you do with my details?',
    a: 'We use your name, number and email to reach you about your access, and nothing else. We do not sell or share them. Ask us to delete your data at any time and we will.',
  },
  {
    q: 'Why only 20 people a day?',
    a: 'Because setting up a profile properly takes real attention, and we would rather do twenty well than two hundred badly. The counter resets at midnight IST.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-b border-line">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Before you sign up</p>
            <h2 className="mt-3 text-[1.75rem] leading-tight font-semibold sm:text-4xl">
              The things people ask us.
            </h2>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="divide-y divide-line border-y border-line">
              {FAQS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-trigger-${i}`}
                        onClick={() => {
                          setOpen(isOpen ? null : i);
                          if (!isOpen) track('faq_open', { question: item.q });
                        }}
                        className="flex w-full items-start justify-between gap-5 py-5 text-left"
                      >
                        <span className="font-display text-[1.0625rem] leading-snug font-medium text-ink">
                          {item.q}
                        </span>
                        <Plus
                          className={`mt-0.5 size-5 shrink-0 text-ink-50 transition-transform duration-300 ${
                            isOpen ? 'rotate-45' : ''
                          }`}
                          strokeWidth={1.75}
                        />
                      </button>
                    </h3>

                    {/* grid-rows trick animates to auto height without measuring. */}
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl pb-5 text-[0.9375rem] leading-relaxed text-ink-70">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
