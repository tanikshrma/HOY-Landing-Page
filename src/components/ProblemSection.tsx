import React from 'react';
import { Eye } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem-section" className="py-16 sm:py-20 lg:py-28 bg-white border-b border-[#1A1A1A]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Section Marker */}
        <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
          <Eye className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
          <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#1A1A1A]/70">
            THE REALITY OF MODERN DRESSING
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-montserrat font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight text-[#1A1A1A] leading-[1.15] sm:leading-[1.1] uppercase max-w-4xl mx-auto">
          GETTING DRESSED SHOULDN'T TAKE THIS MUCH THINKING.
        </h2>

        {/* Copy */}
        <p className="mt-5 sm:mt-8 font-montserrat text-[15px] sm:text-base md:text-lg text-[#1A1A1A]/80 leading-relaxed max-w-2xl mx-auto font-normal">
          Your wardrobe already has more possibilities than you realise. The hard part is knowing what works for you, what works together, and what actually fits the moment.
        </p>

        {/* Key Brand Philosophy Hook */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#1A1A1A]/10 max-w-xl mx-auto">
          <p className="font-montserrat font-semibold text-[15px] sm:text-base md:text-lg text-[#AB8850] leading-snug">
            HOY brings your personal context into styling, so the outfit starts with you, not a catalogue.
          </p>
        </div>
      </div>
    </section>
  );
};
