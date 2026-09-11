import React from 'react';
import { Crown, ArrowDown } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { LeadFormCard } from './LeadFormCard';
import { LeadFormData } from '../types';
import { useSlots } from '../context/SlotsContext';

interface HeroSectionProps {
  onLeadSuccess: (data: LeadFormData) => void;
  onCtaClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLeadSuccess,
  onCtaClick,
}) => {
  const { slots } = useSlots();

  return (
    <section className="relative overflow-hidden bg-white pt-4 sm:pt-8 md:-mt-20 md:pt-24 lg:-mt-24 lg:pt-28 pb-16 lg:pb-24 border-b border-[#1A1A1A]/10">
      {/* Background Image & Overlay (90% on mobile, 20% on desktop) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <picture>
          <source media="(max-width: 1023px)" srcSet={IMAGES.heroMobile} />
          <img
            src={IMAGES.heroBg}
            alt="House of You Hero Background"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </picture>
        {/* 90% white overlay on mobile, 20% on desktop */}
        <div className="absolute inset-0 bg-white/90 lg:bg-white/20" />
        {/* Light white gradient overlay from top on desktop */}
        <div className="hidden md:block absolute inset-x-0 top-0 h-48 lg:h-72 bg-gradient-to-b from-white/85 via-white/35 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* 1. LEFT COLUMN: Editorial Headline, Subtitle, Copy & Metadata - 100vh viewport fit on mobile */}
          <div className="lg:col-span-7 xl:col-span-7 min-h-[calc(100svh-5rem)] lg:min-h-0 flex flex-col justify-between py-2 sm:py-6 lg:py-0">
            {/* Top / Main Body Cluster */}
            <div className="flex flex-col justify-center my-auto lg:my-0 space-y-4 sm:space-y-5 lg:space-y-0">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 lg:mb-6">
                <Crown className="w-4 h-4 text-[#AB8850]" strokeWidth={2} />
                <span className="font-montserrat font-bold text-xs sm:text-xs tracking-[0.24em] uppercase text-[#1A1A1A]/75">
                  HOUSE OF YOU
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-montserrat font-black text-[2.1rem] xs:text-[2.4rem] sm:text-4xl md:text-5xl lg:text-[3.35rem] xl:text-[4rem] tracking-tight leading-[1.12] uppercase space-y-1.5 sm:space-y-2.5">
                <span className="text-[#1A1A1A] block">NOTHING TO WEAR?</span>
                <span className="text-[#C07A61] block">YOU PROBABLY HAVE PLENTY.</span>
              </h1>

              {/* Supporting Headline */}
              <p className="font-montserrat font-extrabold text-sm xs:text-base sm:text-base lg:text-lg text-[#1A1A1A] uppercase tracking-wide leading-snug lg:mt-5">
                YOUR PERSONAL STYLIST, IN YOUR HAND.
              </p>

              {/* Body Copy */}
              <p className="font-montserrat text-sm xs:text-[15px] sm:text-base text-[#1A1A1A]/85 leading-relaxed font-normal max-w-xl lg:mt-4">
                Tell HOY what you have. Tell us where you're going. We'll help you figure out what to wear.
              </p>
              
              {/* Free Access Callout */}
              <div className="inline-block bg-[#C07A61]/10 px-4 py-2.5 rounded-lg border border-[#C07A61]/25 max-w-fit lg:mt-5">
                <p className="font-montserrat font-bold text-xs xs:text-[13px] sm:text-xs text-[#C07A61] uppercase tracking-wide">
                  BE ONE OF OUR FIRST 20 USERS AND GET FREE ACCESS.
                </p>
              </div>

              {/* Mobile Quick Action Link */}
              <div className="lg:hidden pt-2">
                <button
                  onClick={onCtaClick}
                  className="w-full py-4 px-6 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs xs:text-sm tracking-[0.18em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>{slots.isSoldOut ? 'CHECK ACCESS FORM' : 'GET FREE ACCESS'}</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Subtle Editorial Marker */}
            <div className="pt-4 sm:pt-6 mt-2 lg:mt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs font-montserrat text-[#1A1A1A]/50 max-w-xl">
              <span className="font-cinzel text-[#AB8850] text-xs font-bold tracking-widest">EDITION 2026</span>
              <span className="tracking-wider uppercase text-[10px] text-[#1A1A1A]/60 font-medium">Curated In India</span>
            </div>
          </div>

          {/* 2. RIGHT COLUMN: Refined Lead Generation Form Card */}
          <div className="lg:col-span-5 xl:col-span-5 w-full max-w-lg mx-auto lg:max-w-none pt-4 lg:pt-0">
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
