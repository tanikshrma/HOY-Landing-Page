import React from 'react';
import { ArrowRight, Crown, UserCheck } from 'lucide-react';
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
              <h1 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-[3.2rem] xl:text-[3.8rem] tracking-tight leading-[0.96] uppercase">
                <span className="text-[#1A1A1A] block">NOTHING TO WEAR?</span>
                <span className="text-[#C07A61] block mt-1">YOU PROBABLY HAVE PLENTY.</span>
              </h1>

              {/* Supporting Headline */}
              <p className="mt-3.5 sm:mt-5 font-montserrat font-extrabold text-xs sm:text-base lg:text-lg text-[#1A1A1A] uppercase tracking-tight leading-snug">
                YOUR PERSONAL STYLIST, IN YOUR HAND.
              </p>

              {/* Body Copy */}
              <p className="mt-3 sm:mt-4 font-montserrat text-xs sm:text-sm text-[#1A1A1A]/80 leading-relaxed font-normal">
                Tell HOY what you have. Tell us where you're going. We'll help you figure out what to wear.
              </p>
              
              <p className="mt-3.5 font-montserrat font-bold text-xs sm:text-sm text-[#C07A61] uppercase tracking-wide">
                BE ONE OF OUR FIRST 20 USERS AND GET FREE ACCESS.
              </p>

              {/* Desktop Actions */}
              <div className="hidden lg:block mt-7 space-y-3">
                <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3">
                  <button
                    id="hero-primary-cta"
                    onClick={onCtaClick}
                    className="px-7 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-xs cursor-pointer active:scale-[0.99] text-center"
                  >
                    {slots.isSoldOut ? 'CHECK ACCESS FORM' : 'GET MY FREE ACCESS'}
                  </button>
                </div>

                {/* Subtle Editorial Marker */}
                <div className="pt-6 mt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs font-montserrat text-[#1A1A1A]/50">
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

                {/* Overlay 2 & 3: PERSONALISED FOR YOU + Your wardrobe + what you need */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xs text-[#1A1A1A]">
                    <div className="flex items-center justify-between text-[10px] font-montserrat font-bold tracking-[0.16em] uppercase">
                      <span className="text-[#1A1A1A]">PERSONALISED FOR YOU</span>
                      <UserCheck className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
                    </div>
                    <p className="font-montserrat text-xs text-[#1A1A1A]/80 font-medium mt-1">
                      Your wardrobe + what you need
                    </p>
                  </div>
                </div>
              </div>

              {/* Editorial Caption Underneath */}
              <p className="mt-2.5 text-center font-montserrat text-[11px] sm:text-xs text-[#1A1A1A]/60 leading-normal font-normal max-w-xs mx-auto">
                Get outfit suggestions based on what you own, what you like, where you're going and what you're dressing for.
              </p>
            </div>
          </div>

          {/* 3. RIGHT COLUMN: Refined Lead Generation Form Card */}
          <div className="order-3 md:col-span-2 lg:col-span-4 w-full max-w-lg mx-auto md:max-w-xl lg:max-w-none">
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
