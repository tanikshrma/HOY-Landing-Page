import React from 'react';
import { ArrowRight, Users, Check } from 'lucide-react';

interface FinalCtaSectionProps {
  onCtaClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#1A1A1A]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* 20 Users Eyebrow Plaque */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#AB8850]/30 bg-[#AB8850]/10 mb-4 sm:mb-5">
          <Users className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
          <span className="font-montserrat font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#1A1A1A]">
            20 USERS. EVERY DAY.
          </span>
        </div>

        {/* Supporting limit line */}
        <p className="font-montserrat text-xs sm:text-sm text-[#1A1A1A]/65 tracking-wide mb-6">
          Access is limited to the first 20 users each day.
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
              USEFUL WITH WHAT YOU OWN
            </span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#AB8850]" />
          <div className="flex items-center gap-1.5">
            <Check className="w-3 h-3 text-[#AB8850]" strokeWidth={2.5} />
            <span className="font-montserrat font-bold text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#1A1A1A]/80 whitespace-nowrap">
              COMPLETE FROM HEAD TO TOE
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-montserrat font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#1A1A1A] uppercase leading-tight">
          YOUR STYLE IS PERSONAL.<br />
          <span className="text-[#C07A61]">YOUR STYLING SHOULD BE TOO.</span>
        </h2>

        {/* Supporting copy */}
        <p className="mt-3.5 sm:mt-4 font-montserrat text-xs sm:text-base text-[#1A1A1A]/75 font-normal max-w-xl mx-auto leading-relaxed">
          Meet HOY, your personal styling platform for effortless, head-to-toe looks.
        </p>

        {/* CTA Button */}
        <div className="mt-6 sm:mt-8">
          <button
            id="final-cta-btn"
            onClick={onCtaClick}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 shadow-sm inline-flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
          >
            <span>GET MY ACCESS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Closing Signature */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-7 border-t border-[#1A1A1A]/10">
          <p className="font-montserrat font-extrabold text-xs sm:text-sm tracking-[0.24em] uppercase text-[#AB8850]">
            YOUR STYLE. SORTED.
          </p>
        </div>

      </div>
    </section>
  );
};
