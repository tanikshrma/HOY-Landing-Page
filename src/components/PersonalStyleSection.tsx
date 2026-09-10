import React from 'react';
import { IMAGES } from '../assets/images';
import { BadgeCheck, ArrowRight } from 'lucide-react';

interface PersonalStyleSectionProps {
  onCtaClick: () => void;
}

export const PersonalStyleSection: React.FC<PersonalStyleSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="relative bg-[#1A1A1A] text-white overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-white/10">
      {/* Full-width editorial background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.editorialLifestyle}
          alt="Authentic personal styling for Indian men and women"
          className="w-full h-full object-cover object-center opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/85 to-[#1A1A1A]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3">
            <BadgeCheck className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
            <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#AB8850]">
              AUTHENTIC IDENTITY
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-montserrat font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white uppercase leading-[1.08]">
            BECAUSE YOUR STYLE SHOULD LOOK LIKE YOU.
          </h2>

          {/* Supporting text */}
          <p className="mt-4 sm:mt-5 font-montserrat text-sm sm:text-lg text-white/80 font-normal leading-relaxed max-w-2xl">
            HOY starts with your personal style, wardrobe and occasion, then helps you discover new pieces only when they genuinely add value.
          </p>

          {/* CTA */}
          <div className="mt-6 sm:mt-8">
            <button
              id="personal-style-cta-btn"
              onClick={onCtaClick}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#AB8850] hover:bg-[#C07A61] text-white font-montserrat font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm active:scale-98"
            >
              <span>GET MY ACCESS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
