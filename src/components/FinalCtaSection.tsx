import React from 'react';
import { ArrowRight, Crown } from 'lucide-react';

interface FinalCtaSectionProps {
  onCtaClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#FFFFFF] border-b border-[#1A1A1A]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#AB8850]/30 bg-[#AB8850]/5 mb-5 sm:mb-6">
          <Crown className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
          <span className="font-montserrat font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/80">
            HOUSE OF YOU
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-montserrat font-black text-2xl sm:text-5xl lg:text-6xl tracking-tight text-[#1A1A1A] uppercase leading-[1.12] sm:leading-[1.05]">
          YOUR STYLE IS PERSONAL.<br />
          <span className="text-[#AB8850]">YOUR STYLING SHOULD BE TOO.</span>
        </h2>

        {/* Supporting copy */}
        <p className="mt-4 sm:mt-6 font-montserrat text-sm sm:text-xl text-[#1A1A1A]/75 font-normal max-w-2xl mx-auto leading-relaxed">
          Meet HOY, your personal styling platform for effortless, head-to-toe looks.
        </p>

        {/* CTA */}
        <div className="mt-8 sm:mt-10">
          <button
            id="final-cta-btn"
            onClick={onCtaClick}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-md inline-flex items-center justify-center gap-3 cursor-pointer active:scale-95"
          >
            <span>GET MY ACCESS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Small text */}
        <p className="mt-3.5 sm:mt-4 font-montserrat text-xs text-[#1A1A1A]/60 tracking-wider">
          Limited to the first 20 users each day.
        </p>

        {/* Small closing line */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#1A1A1A]/10">
          <p className="font-montserrat font-extrabold text-xs sm:text-base tracking-[0.22em] sm:tracking-[0.26em] uppercase text-[#AB8850]">
            YOUR STYLE. SORTED.
          </p>
        </div>

      </div>
    </section>
  );
};
