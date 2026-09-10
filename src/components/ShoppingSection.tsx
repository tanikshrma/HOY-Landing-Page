import React from 'react';
import { ArrowRight, Check, ShoppingBag, Shirt } from 'lucide-react';

interface ShoppingSectionProps {
  onCtaClick: () => void;
}

export const ShoppingSection: React.FC<ShoppingSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-4">
              <ShoppingBag className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
              <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#1A1A1A]/70">
                DISCOVERY WITH INTENT
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-montserrat font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#1A1A1A] uppercase leading-[1.12] sm:leading-[1.08]">
              WHEN SOMETHING NEW MAKES SENSE, YOU'LL KNOW.
            </h2>

            {/* Copy */}
            <p className="mt-4 sm:mt-6 font-montserrat text-sm sm:text-lg text-[#1A1A1A]/80 leading-relaxed font-normal">
              HOY keeps new-product discovery separate from your wardrobe, so recommendations feel intentional, not overwhelming.
            </p>

            {/* Key Differentiator Bullets */}
            <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#AB8850]/15 flex items-center justify-center text-[#AB8850] shrink-0 mt-0.5 sm:mt-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="font-montserrat text-xs sm:text-sm text-[#1A1A1A]/80 font-medium">
                  Only proposed when it unlocks multiple new looks with your closet
                </span>
              </div>
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#AB8850]/15 flex items-center justify-center text-[#AB8850] shrink-0 mt-0.5 sm:mt-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="font-montserrat text-xs sm:text-sm text-[#1A1A1A]/80 font-medium">
                  Vetted for fit consistency, fabric durability, and ethical Indian craft
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 sm:mt-8">
              <button
                id="shopping-cta-btn"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer shadow-sm active:scale-95"
              >
                <span>DISCOVER YOUR STYLE</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Editorial Comparison Card */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="p-5 sm:p-8 lg:p-10 rounded-2xl bg-white border border-[#1A1A1A]/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3.5 sm:pb-4 mb-4 sm:mb-6">
                <div>
                  <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-[#AB8850] font-bold">
                    CURATION PRINCIPLE
                  </span>
                  <h4 className="font-montserrat font-bold text-base sm:text-lg text-[#1A1A1A] mt-0.5">
                    Separated Intelligence
                  </h4>
                </div>
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#1A1A1A]/5 text-[#1A1A1A] font-montserrat text-[11px] sm:text-xs font-semibold">
                  Zero Spam
                </span>
              </div>

              {/* Side-by-side or stacked distinction */}
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#1A1A1A]/15">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-montserrat text-[11px] sm:text-xs font-bold uppercase text-[#1A1A1A] flex items-center gap-1.5 truncate">
                      <Shirt className="w-3.5 h-3.5 text-[#AB8850] shrink-0" strokeWidth={1.75} /> 1. Your Existing Sanctuary
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-montserrat text-[#AB8850] font-semibold shrink-0">
                      WARDROBE CORE
                    </span>
                  </div>
                  <p className="font-montserrat text-xs text-[#1A1A1A]/70 leading-relaxed">
                    Digitalised pieces you already love. Styled into unlimited combinations without spending a rupee.
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#1A1A1A] text-white border border-[#1A1A1A]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-montserrat text-[11px] sm:text-xs font-bold uppercase text-white flex items-center gap-1.5 truncate">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#AB8850] shrink-0" strokeWidth={1.75} /> 2. Surgical Discovery
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-montserrat text-[#AB8850] font-semibold shrink-0">
                      INTENTIONAL GAP-FILLING
                    </span>
                  </div>
                  <p className="font-montserrat text-xs text-white/70 leading-relaxed">
                    A single structured terracotta chore coat that unlocks 8 new outfits across your existing trousers and tees.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
