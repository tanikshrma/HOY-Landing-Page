import React from 'react';
import { ArrowRight, Crown, Users, UserCheck } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { LeadFormCard } from './LeadFormCard';
import { LeadFormData } from '../types';

interface HeroSectionProps {
  onLeadSuccess: (data: LeadFormData) => void;
  onCtaClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLeadSuccess,
  onCtaClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-white pt-6 sm:pt-10 lg:pt-12 pb-16 lg:pb-24 border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-7 xl:gap-9 items-start">
          
          {/* 1. LEFT COLUMN: Editorial Headline, Subtitle, Copy & Desktop Actions */}
          <div className="order-1 md:col-span-1 lg:col-span-4 flex flex-col justify-between pt-1">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 lg:mb-6">
                <Crown className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
                <span className="font-montserrat font-bold text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#1A1A1A]/70">
                  HOUSE OF YOU
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-montserrat font-black text-3xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] tracking-tight leading-[0.95] sm:leading-[0.93] uppercase">
                <span className="text-[#1A1A1A] block">YOUR STYLE.</span>
                <span className="text-[#AB8850] block mt-1">SORTED.</span>
              </h1>

              {/* Supporting Headline */}
              <p className="mt-3.5 sm:mt-5 font-montserrat font-extrabold text-sm sm:text-lg lg:text-xl text-[#1A1A1A] uppercase tracking-tight leading-snug">
                PERSONAL STYLING, MADE PERSONAL.
              </p>

              {/* Body Copy */}
              <p className="mt-3 sm:mt-4 font-montserrat text-xs sm:text-sm md:text-base text-[#1A1A1A]/75 leading-relaxed font-normal">
                Your body. Your wardrobe. Your occasion. Your style. HOY brings it together into effortless, head-to-toe looks made for you.
              </p>

              {/* Desktop Actions (Rendered inside Left Column for desktop) */}
              <div className="hidden lg:block mt-8 space-y-3.5">
                <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3">
                  <button
                    id="hero-primary-cta"
                    onClick={onCtaClick}
                    className="px-7 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-xs cursor-pointer active:scale-[0.99] text-center"
                  >
                    GET MY ACCESS
                  </button>

                  <div className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#AB8850]/10 border border-[#AB8850]/35 text-[#1A1A1A]">
                    <Users className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
                    <span className="font-montserrat font-bold text-[10px] tracking-[0.14em] uppercase text-[#1A1A1A] whitespace-nowrap">
                      FIRST 20 USERS EACH DAY
                    </span>
                  </div>
                </div>

                <p className="font-montserrat text-xs text-[#1A1A1A]/50 tracking-wide font-medium pl-1">
                  Limited daily access.
                </p>

                {/* Subtle Editorial Marker */}
                <div className="pt-8 mt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs font-montserrat text-[#1A1A1A]/50">
                  <span className="font-cinzel text-[#AB8850] text-xs font-bold tracking-widest">EDITION 2026</span>
                  <span className="tracking-wider uppercase text-[10px] text-[#1A1A1A]/60 font-medium">Curated In India</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. CENTER COLUMN: Dominant Fashion Visual with Minimal Informational Overlays */}
          <div className="order-2 md:col-span-1 lg:col-span-4">
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden bg-[#1A1A1A] aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.25] xl:aspect-[3/4.3] border border-[#1A1A1A]/10 shadow-[0_20px_45px_-12px_rgba(26,26,26,0.12)]">
                <img
                  src={IMAGES.heroEditorial}
                  alt="Personal styling editorial for House of You"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient vignette for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/65 via-transparent to-[#1A1A1A]/15 pointer-events-none" />

                {/* Overlay 1: HEAD-TO-TOE LOOK */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1A1A1A] font-montserrat font-bold text-[10px] tracking-[0.18em] uppercase border border-white/60 shadow-xs">
                    HEAD-TO-TOE LOOK
                  </span>
                </div>

                {/* Overlay 2 & 3: PERSONALIZED FOR YOU + YOUR WARDROBE + NEW DISCOVERY */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xs text-[#1A1A1A]">
                    <div className="flex items-center justify-between text-[10px] font-montserrat font-bold tracking-[0.16em] uppercase">
                      <span className="text-[#1A1A1A]">PERSONALIZED FOR YOU</span>
                      <UserCheck className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
                    </div>
                    <p className="font-montserrat text-xs text-[#1A1A1A]/80 font-medium mt-1">
                      Your wardrobe + new discovery
                    </p>
                  </div>
                </div>
              </div>

              {/* Editorial Caption Underneath */}
              <p className="mt-2.5 text-center font-montserrat text-[11px] sm:text-xs text-[#1A1A1A]/60 leading-normal font-normal">
                Personalised curation built around your real wardrobe context.
              </p>
            </div>
          </div>

          {/* 3. MOBILE & TABLET ATELIER INTAKE BANNER */}
          <div className="order-3 md:col-span-2 lg:hidden w-full max-w-lg mx-auto">
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#AB8850]/10 border border-[#AB8850]/30 text-[#1A1A1A]">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#AB8850] shrink-0" strokeWidth={2} />
                <span className="font-montserrat font-bold text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#1A1A1A]">
                  FIRST 20 USERS EACH DAY
                </span>
              </div>
              <span className="font-cinzel text-[10px] text-[#AB8850] font-bold tracking-wider uppercase">
                6 SLOTS LEFT
              </span>
            </div>
          </div>

          {/* 4. RIGHT COLUMN: Refined Lead Generation Form Card */}
          <div className="order-4 md:col-span-2 lg:col-span-4 w-full max-w-lg mx-auto md:max-w-xl lg:max-w-none">
            <LeadFormCard
              id="hero-lead-form"
              onSuccess={onLeadSuccess}
              className="w-full"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
