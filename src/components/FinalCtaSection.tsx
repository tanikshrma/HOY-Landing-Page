import React from 'react';
import { ArrowRight, KeyRound, UserCheck, Shirt, Layers } from 'lucide-react';
import { useSlots } from '../context/SlotsContext';

interface FinalCtaSectionProps {
  onCtaClick: () => void;
}

const HIGHLIGHT_PILLS = [
  {
    icon: UserCheck,
    text: 'PERSONALISED TO YOU',
  },
  {
    icon: Shirt,
    text: 'WORKS WITH WHAT YOU OWN',
  },
  {
    icon: Layers,
    text: 'COMPLETE LOOKS, NOT RANDOM PICKS',
  },
];

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onCtaClick }) => {
  const { slots } = useSlots();

  return (
    <>
      {/* 7. BETA ACCESS SECTION */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#1A1A1A]/5 border-b border-[#1A1A1A]/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1A1A1A]/10 mb-4 shadow-xs">
            <KeyRound className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
            <span className="font-montserrat font-bold text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#1A1A1A]/80">
              BETA ACCESS
            </span>
          </div>

          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#1A1A1A] uppercase leading-tight">
            BE ONE OF THE FIRST 20.
          </h2>

          <p className="mt-3.5 sm:mt-4 font-montserrat text-[13.5px] xs:text-sm sm:text-sm text-[#1A1A1A]/75 max-w-xl mx-auto leading-relaxed font-normal">
            Get free access to HOY and be among the first to experience personal styling built around your own wardrobe.
          </p>

          <div className="mt-7 sm:mt-8">
            <button
              id="beta-access-cta-btn"
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 py-4 sm:py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-xs inline-flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
            >
              <span>{slots.isSoldOut ? 'CHECK ACCESS FORM' : 'GET MY FREE ACCESS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="py-20 sm:py-24 lg:py-28 bg-[#FFFFFF] border-b border-[#1A1A1A]/10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Mobile Infinite Scroll Marquee Version */}
          <div className="md:hidden relative -mx-4 sm:-mx-6 mb-8 overflow-hidden py-2 select-none">
            {/* Left & Right gradient fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

            <div className="animate-marquee-infinite flex w-max">
              {/* Track 1 */}
              <div className="flex shrink-0 items-center gap-3 pr-3">
                {HIGHLIGHT_PILLS.map((pill, idx) => {
                  const IconComponent = pill.icon;
                  return (
                    <div
                      key={`track1-pill-${idx}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#1A1A1A]/12 shadow-[0_2px_10px_rgba(26,26,26,0.04)] shrink-0"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#AB8850]/15 flex items-center justify-center text-[#AB8850]">
                        <IconComponent className="w-3 h-3" strokeWidth={2} />
                      </div>
                      <span className="font-montserrat font-bold text-[10px] tracking-[0.14em] uppercase text-[#1A1A1A] whitespace-nowrap">
                        {pill.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Track 2 (Completes first 50% half) */}
              <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden="true">
                {HIGHLIGHT_PILLS.map((pill, idx) => {
                  const IconComponent = pill.icon;
                  return (
                    <div
                      key={`track2-pill-${idx}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#1A1A1A]/12 shadow-[0_2px_10px_rgba(26,26,26,0.04)] shrink-0"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#AB8850]/15 flex items-center justify-center text-[#AB8850]">
                        <IconComponent className="w-3 h-3" strokeWidth={2} />
                      </div>
                      <span className="font-montserrat font-bold text-[10px] tracking-[0.14em] uppercase text-[#1A1A1A] whitespace-nowrap">
                        {pill.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Track 3 (Starts second 50% half) */}
              <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden="true">
                {HIGHLIGHT_PILLS.map((pill, idx) => {
                  const IconComponent = pill.icon;
                  return (
                    <div
                      key={`track3-pill-${idx}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#1A1A1A]/12 shadow-[0_2px_10px_rgba(26,26,26,0.04)] shrink-0"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#AB8850]/15 flex items-center justify-center text-[#AB8850]">
                        <IconComponent className="w-3 h-3" strokeWidth={2} />
                      </div>
                      <span className="font-montserrat font-bold text-[10px] tracking-[0.14em] uppercase text-[#1A1A1A] whitespace-nowrap">
                        {pill.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Track 4 (Completes second 50% half for seamless loop) */}
              <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden="true">
                {HIGHLIGHT_PILLS.map((pill, idx) => {
                  const IconComponent = pill.icon;
                  return (
                    <div
                      key={`track4-pill-${idx}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#1A1A1A]/12 shadow-[0_2px_10px_rgba(26,26,26,0.04)] shrink-0"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#AB8850]/15 flex items-center justify-center text-[#AB8850]">
                        <IconComponent className="w-3 h-3" strokeWidth={2} />
                      </div>
                      <span className="font-montserrat font-bold text-[10px] tracking-[0.14em] uppercase text-[#1A1A1A] whitespace-nowrap">
                        {pill.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Static Pill Row */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-3.5 max-w-3xl mx-auto mb-10 sm:mb-12">
            {HIGHLIGHT_PILLS.map((pill, idx) => {
              const IconComponent = pill.icon;
              return (
                <div
                  key={`desktop-pill-${idx}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#1A1A1A]/12 shadow-[0_2px_10px_rgba(26,26,26,0.04)] hover:border-[#AB8850]/60 transition-all duration-300"
                >
                  <div className="w-5 h-5 rounded-full bg-[#AB8850]/15 flex items-center justify-center text-[#AB8850]">
                    <IconComponent className="w-3 h-3" strokeWidth={2} />
                  </div>
                  <span className="font-montserrat font-bold text-[11px] tracking-[0.14em] uppercase text-[#1A1A1A] whitespace-nowrap">
                    {pill.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Heading */}
          <h2 className="font-montserrat font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#1A1A1A] uppercase leading-tight">
            YOUR STYLE IS PERSONAL.<br />
            <span className="text-[#C07A61]">YOUR STYLING SHOULD BE TOO.</span>
          </h2>

          {/* Description */}
          <p className="mt-4 sm:mt-5 font-montserrat text-sm xs:text-[15px] sm:text-base text-[#1A1A1A]/80 font-medium max-w-xl mx-auto leading-relaxed">
            Meet HOY, your personal stylist in your hand, helping you decide what to wear from the wardrobe you already have.
          </p>

          {/* CTA */}
          <div className="mt-8 sm:mt-10">
            <button
              id="final-cta-btn"
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 shadow-sm inline-flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
            >
              <span>{slots.isSoldOut ? 'CHECK ACCESS FORM' : 'GET MY FREE ACCESS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};
