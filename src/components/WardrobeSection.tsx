import React from 'react';
import { IMAGES } from '../assets/images';
import { ArrowRight, Shirt, RotateCcw } from 'lucide-react';

interface WardrobeSectionProps {
  onCtaClick: () => void;
}

export const WardrobeSection: React.FC<WardrobeSectionProps> = ({ onCtaClick }) => {
  return (
    <section id="your-wardrobe" className="py-16 sm:py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#1A1A1A]/10 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Representation of Wardrobe Versatility */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#1A1A1A]/10 shadow-md bg-[#1A1A1A] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3.2]">
              <img
                src={IMAGES.wardrobeDetail}
                alt="Personal wardrobe styling and sustainable rewear possibilities"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/75 via-transparent to-transparent pointer-events-none" />

              {/* Floating Pill Annotation */}
              <div className="absolute bottom-3.5 sm:bottom-5 left-3.5 sm:left-5 right-3.5 sm:right-5 p-3.5 sm:p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#AB8850]/15 flex items-center justify-center text-[#AB8850] shrink-0">
                      <Shirt className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#1A1A1A] truncate">
                        Rewear Intelligence
                      </p>
                      <p className="font-montserrat text-[11px] text-[#1A1A1A]/70 truncate">
                        1 Key Piece &bull; Multiple Curated Outfits
                      </p>
                    </div>
                  </div>
                  <span className="font-montserrat text-[9px] sm:text-[10px] uppercase font-bold text-[#AB8850] tracking-widest px-3 py-1 rounded-full bg-[#AB8850]/10 border border-[#AB8850]/30 shrink-0">
                    ZERO WASTE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-3">
              <RotateCcw className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
              <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#1A1A1A]/70">
                MORE WAYS TO WEAR
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#1A1A1A] uppercase leading-tight">
              ONE PIECE. MORE POSSIBILITIES.
            </h2>

            {/* Sub-headline with highlight */}
            <p className="mt-3 sm:mt-4 font-montserrat font-extrabold text-base sm:text-lg text-[#C07A61] leading-snug uppercase">
              START WITH WHAT YOU ALREADY OWN.
            </p>

            {/* Supporting Text */}
            <div className="mt-3.5 sm:mt-4 space-y-3 max-w-xl">
              <p className="font-montserrat font-medium text-xs sm:text-sm text-[#1A1A1A]">
                That shirt you've worn a hundred times? It might have more looks in it.
              </p>

              <p className="font-montserrat text-xs sm:text-sm text-[#1A1A1A]/75 leading-relaxed font-normal">
                HOY helps you discover new ways to mix, match and rewear the clothes already sitting in your wardrobe.
              </p>
            </div>

            {/* Single CTA */}
            <div className="mt-7 sm:mt-8">
              <button
                id="wardrobe-cta-btn"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-8 py-4 sm:py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer shadow-xs active:scale-98"
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
