import React from 'react';
import { IMAGES } from '../assets/images';
import { BadgeCheck, ArrowRight } from 'lucide-react';

interface PersonalStyleSectionProps {
  onCtaClick: () => void;
}

export const PersonalStyleSection: React.FC<PersonalStyleSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="relative bg-[#1A1A1A] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10">
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
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <BadgeCheck className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
            <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#AB8850]">
              INDIAN STYLE. YOUR WAY.
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-montserrat font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white uppercase leading-[1.12]">
            BECAUSE YOUR STYLE DOESN'T FIT INTO ONE CATEGORY.
          </h2>

          {/* Supporting paragraphs styled consistently */}
          <div className="mt-5 sm:mt-6 space-y-4 max-w-2xl">
            <p className="font-montserrat text-sm sm:text-base text-white/85 font-normal leading-relaxed">
              A kurta for one day. Jeans and a shirt for another. A saree, a dress, a co-ord or whatever feels right.
            </p>

            <p className="font-montserrat text-sm sm:text-base text-white/85 font-normal leading-relaxed">
              HOY brings your wardrobe and your real-life occasions together, so personal styling works for the way you actually dress.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 sm:mt-9">
            <button
              id="personal-style-cta-btn"
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 py-4 sm:py-3.5 rounded-full bg-[#AB8850] hover:bg-[#C07A61] text-white font-montserrat font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm active:scale-98"
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
