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
    <section className="relative overflow-hidden bg-white pt-2 sm:pt-6 md:-mt-20 md:pt-24 lg:-mt-24 lg:pt-28 pb-12 lg:pb-24 border-b border-[#1A1A1A]/10">
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
          <div className="lg:col-span-7 xl:col-span-7 h-[calc(100svh-4.5rem)] max-h-[calc(100dvh-4.5rem)] lg:h-auto lg:max-h-none lg:min-h-0 flex flex-col justify-between pt-1 pb-2 sm:py-4 lg:py-0">
            {/* Top / Main Body Cluster */}
            <div className="flex flex-col justify-center my-auto lg:my-0 space-y-2 xs:space-y-3 sm:space-y-4 lg:space-y-0">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 lg:mb-5">
                <Crown className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
                <span className="font-montserrat font-bold text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#1A1A1A]/75">
                  HOUSE OF YOU
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-montserrat font-black text-[1.75rem] xs:text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.35rem] xl:text-[4rem] tracking-tight leading-[1.12] uppercase space-y-1 sm:space-y-2">
                <span className="text-[#1A1A1A] block">NOTHING TO WEAR?</span>
                <span className="text-[#C07A61] block">YOU PROBABLY HAVE PLENTY.</span>
              </h1>

              {/* Supporting Headline */}
              <p className="font-montserrat font-extrabold text-xs xs:text-sm sm:text-base lg:text-lg text-[#1A1A1A] uppercase tracking-wide leading-snug lg:mt-5 pt-0.5">
                YOUR PERSONAL STYLIST, IN YOUR HAND.
              </p>

              {/* Body Copy */}
              <p className="font-montserrat text-xs xs:text-sm sm:text-base text-[#1A1A1A]/85 leading-relaxed font-normal max-w-xl lg:mt-3.5">
                Tell HOY what you have. Tell us where you're going. We'll help you figure out what to wear.
              </p>
              
              {/* Free Access Callout without background */}
              <div className="pt-0.5 lg:mt-4">
                <p className="font-montserrat font-bold text-xs xs:text-[13px] sm:text-xs text-[#C07A61] uppercase tracking-wide leading-snug">
                  BE ONE OF OUR FIRST 20 USERS AND GET FREE ACCESS.
                </p>
              </div>

              {/* Mobile Quick Action Link */}
              <div className="lg:hidden pt-1.5">
                <button
                  onClick={onCtaClick}
                  className="w-full py-3 px-6 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs xs:text-sm tracking-[0.18em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>{slots.isSoldOut ? 'CHECK ACCESS FORM' : 'GET FREE ACCESS'}</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Subtle Editorial Marker - guaranteed visible in 100vh on initial mobile view */}
            <div className="pt-2.5 pb-1 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs font-montserrat text-[#1A1A1A]/60 max-w-xl shrink-0">
              <span className="font-cinzel text-[#AB8850] text-xs font-bold tracking-widest">EDITION 2026</span>
              <span className="tracking-wider uppercase text-[10px] sm:text-xs text-[#1A1A1A]/70 font-semibold">Curated In India</span>
            </div>
          </div>

          {/* 2. RIGHT COLUMN: Refined Lead Generation Form Card */}
          <div className="lg:col-span-5 xl:col-span-5 w-full max-w-lg mx-auto lg:max-w-none pt-8 sm:pt-10 lg:pt-0">
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
