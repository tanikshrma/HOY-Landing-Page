import React from 'react';
import { IMAGES } from '../assets/images';
import { BadgeCheck, Sparkles } from 'lucide-react';

export const PersonalStyleSection: React.FC = () => {
  const aesthetics = [
    { name: 'Neo-Sartorial', desc: 'Sharp tailoring paired with fluid Indian silks' },
    { name: 'Modern Heritage', desc: 'Traditional weaves integrated into relaxed daily wear' },
    { name: 'Effortless Minimal', desc: 'Monochromatic earth tones with structured silhouettes' },
    { name: 'Cultured Street', desc: 'Boxy cuts, relaxed linen trousers, and statement accessories' },
  ];

  return (
    <section className="relative bg-[#1A1A1A] text-white overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Full-width editorial background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.editorialLifestyle}
          alt="Diverse modern Indian adults expressing authentic personal style"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Editorial overlay to guarantee high-contrast legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-[#1A1A1A]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <BadgeCheck className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
            <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#AB8850]">
              AUTHENTIC IDENTITY
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-montserrat font-black text-2xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.1] sm:leading-[1.02]">
            BECAUSE YOUR STYLE SHOULD LOOK LIKE YOU.
          </h2>

          {/* Supporting text */}
          <p className="mt-4 sm:mt-6 font-montserrat text-base sm:text-xl text-white/80 font-normal leading-relaxed max-w-xl">
            Express yourself without overthinking every outfit.
          </p>

          <p className="mt-3 sm:mt-4 font-montserrat text-xs sm:text-sm text-white/60 leading-relaxed max-w-lg font-light">
            Indian style is layered, regional, and distinctly varied. HOY embraces your personal aesthetic—celebrating individuality over rigid trend cycles.
          </p>
        </div>

        {/* Diverse Indian Fashion Aesthetics Tags */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {aesthetics.map((item, idx) => (
            <div
              key={item.name}
              className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#AB8850] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-cinzel text-[11px] text-[#AB8850] tracking-widest font-semibold">
                  AESTHETIC 0{idx + 1}
                </span>
                <Sparkles className="w-3 h-3 text-[#AB8850]" strokeWidth={2} />
              </div>
              <h4 className="font-montserrat font-bold text-xs sm:text-sm tracking-wide text-white uppercase">
                {item.name}
              </h4>
              <p className="mt-1 font-montserrat text-xs text-white/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
