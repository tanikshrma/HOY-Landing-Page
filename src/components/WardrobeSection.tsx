import React from 'react';
import { IMAGES } from '../assets/images';
import { ArrowRight, Shuffle, RotateCcw } from 'lucide-react';

interface WardrobeSectionProps {
  onCtaClick: () => void;
}

export const WardrobeSection: React.FC<WardrobeSectionProps> = ({ onCtaClick }) => {
  return (
    <section id="your-wardrobe" className="py-16 sm:py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Representation of Wardrobe Versatility */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#1A1A1A]/10 shadow-lg bg-[#1A1A1A] aspect-4/3 sm:aspect-16/10">
              <img
                src={IMAGES.wardrobeDetail}
                alt="Curated wardrobe fabrics and textured layers"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Pill Annotation */}
              <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 p-3 sm:p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#AB8850]/15 flex items-center justify-center text-[#AB8850] shrink-0">
                      <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-montserrat font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#1A1A1A] truncate">
                        Rewear Intelligence
                      </p>
                      <p className="font-montserrat text-[10px] sm:text-[11px] text-[#1A1A1A]/70 truncate">
                        1 White Linen Shirt &bull; 6 Curated Outfits
                      </p>
                    </div>
                  </div>
                  <span className="font-montserrat text-[9px] sm:text-[10px] uppercase font-bold text-[#AB8850] tracking-widest px-2 sm:px-2.5 py-1 rounded-full bg-[#AB8850]/10 border border-[#AB8850]/30 shrink-0">
                    ZERO WASTE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-4">
              <RotateCcw className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
              <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#1A1A1A]/70">
                CIRCULAR & INTENTIONAL
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-montserrat font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#1A1A1A] uppercase leading-[1.12] sm:leading-[1.08]">
              START WITH WHAT YOU ALREADY OWN.
            </h2>

            {/* Copy */}
            <p className="mt-4 sm:mt-6 font-montserrat font-medium text-base sm:text-xl text-[#AB8850] leading-snug">
              Your wardrobe doesn't need more clothes. It needs more possibilities.
            </p>

            {/* Supporting Text */}
            <p className="mt-3 sm:mt-4 font-montserrat text-xs sm:text-base text-[#1A1A1A]/70 leading-relaxed font-normal">
              HOY helps you mix, match and rewear what you already have, then surfaces new pieces when they actually add value.
            </p>

            {/* CTA */}
            <div className="mt-6 sm:mt-8">
              <button
                id="wardrobe-cta-btn"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer shadow-sm active:scale-95"
              >
                <span>EXPLORE YOUR STYLE</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
