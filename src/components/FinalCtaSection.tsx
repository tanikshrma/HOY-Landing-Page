import React from 'react';
import { ArrowRight, Users, Check } from 'lucide-react';
import { useSlots } from '../context/SlotsContext';

interface FinalCtaSectionProps {
  onCtaClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onCtaClick }) => {
  const { slots } = useSlots();

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#1A1A1A]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* 20 Users Eyebrow Plaque */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 sm:mb-5 ${
          slots.isSoldOut
            ? 'border-[#C07A61]/30 bg-[#C07A61]/10 text-[#C07A61]'
            : 'border-[#AB8850]/30 bg-[#AB8850]/10 text-[#1A1A1A]'
        }`}>
          <Users className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
          <span className="font-montserrat font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase">
            {slots.isSoldOut ? 'SOLD OUT FOR TODAY' : `${slots.remainingSlots} SLOTS REMAINING TODAY`}
          </span>
        </div>

        {/* Supporting limit line */}
        <p className="font-montserrat text-xs sm:text-sm text-[#1A1A1A]/65 tracking-wide mb-6">
          {slots.isSoldOut
            ? 'Capacity reached. All 20 daily passes have been claimed.'
            : `Access is limited to 20 users each day (${slots.bookedCount} passes claimed today).`}
        </p>

        {/* 3 Core Editorial Statements (The HOY Promise) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-3 px-4 sm:px-6 rounded-full bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-1.5">
            <Check className="w-3 h-3 text-[#AB8850]" strokeWidth={2.5} />
            <span className="font-montserrat font-bold text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#1A1A1A]/80 whitespace-nowrap">
              PERSONALISED TO YOU
            </span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#AB8850]" />
          <div className="flex items-center gap-1.5">
            <Check className="w-3 h-3 text-[#AB8850]" strokeWidth={2.5} />
            <span className="font-montserrat font-bold text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#1A1A1A]/80 whitespace-nowrap">
              WORKS WITH WHAT YOU OWN
            </span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#AB8850]" />
          <div className="flex items-center gap-1.5">
            <Check className="w-3 h-3 text-[#AB8850]" strokeWidth={2.5} />
            <span className="font-montserrat font-bold text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#1A1A1A]/80 whitespace-nowrap">
              COMPLETE LOOKS, NOT RANDOM PICKS
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-montserrat font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#1A1A1A] uppercase leading-tight">
          YOUR STYLE IS PERSONAL.<br />
          <span className="text-[#C07A61]">YOUR STYLING SHOULD BE TOO.</span>
        </h2>

        {/* Supporting copy & Get Started Incorporation */}
        <p className="mt-3.5 sm:mt-4 font-montserrat text-xs sm:text-base text-[#1A1A1A]/80 font-medium max-w-xl mx-auto leading-relaxed">
          Meet HOY, your personal stylist in your hand, helping you decide what to wear from the wardrobe you already have.
        </p>

        <p className="mt-2 font-montserrat text-xs text-[#1A1A1A]/60 font-normal max-w-lg mx-auto">
          Access HOY and be among the first to experience personal styling built around your own wardrobe.
        </p>

        {/* CTA Button */}
        <div className="mt-6 sm:mt-8">
          <button
            id="final-cta-btn"
            onClick={onCtaClick}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 shadow-sm inline-flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
          >
            <span>{slots.isSoldOut ? 'CHECK ACCESS FORM' : 'GET STARTED'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
