import React from 'react';
import { Crown, Sparkles, ShieldCheck, RotateCcw, Award, Check } from 'lucide-react';
import { HoyLogo } from './HoyLogo';

export const BrandStatementSection: React.FC = () => {
  const tenets = [
    {
      numeral: 'I',
      label: 'TENET 01',
      title: 'PERSONALISED TO YOU.',
      subtitle: 'Individual Recognition Over Algorithmic Trends',
      description:
        'Your body, your skin undertones, and your daily life cannot be reduced to a generic template. Every look is calibrated specifically for your personal proportions and distinct aesthetic language.',
      commitment: '1:1 HUMAN STYLIST CALIBRATION',
    },
    {
      numeral: 'II',
      label: 'TENET 02',
      title: 'USEFUL WITH WHAT YOU OWN.',
      subtitle: 'Circular Integrity Over Blind Consumption',
      description:
        'True luxury begins with respect for what already hangs in your wardrobe. We breathe fresh life into your existing garments first, unlocking elevated combinations before introducing intentional new pieces.',
      commitment: 'CIRCULAR WARDROBE MAPPING',
    },
    {
      numeral: 'III',
      label: 'TENET 03',
      title: 'COMPLETE FROM HEAD TO TOE.',
      subtitle: 'Total Silhouette Cohesion',
      description:
        'No isolated shirts or disconnected trousers left to guesswork. Every approved curation is a finished ensemble — balanced from footwear and outerwear down to proportional styling details.',
      commitment: 'HEAD-TO-TOE COMPLETION',
    },
  ];

  const guarantees = [
    {
      icon: ShieldCheck,
      title: 'PROPORTION OVER TRENDS',
      desc: 'Silhouettes tailored to your genuine anatomy',
    },
    {
      icon: RotateCcw,
      title: 'CIRCULAR FIRST',
      desc: 'Maximizing the pieces already in your wardrobe',
    },
    {
      icon: Sparkles,
      title: 'INTENT OVER NOISE',
      desc: 'Zero sponsored clutter or disposable fast-fashion',
    },
  ];

  return (
    <section
      id="brand-statement-section"
      className="py-24 sm:py-28 lg:py-36 bg-[#FBF9F5] border-b border-[#1A1A1A]/10 relative overflow-hidden"
    >
      {/* Subtle luxury watermark typography in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.025]">
        <span className="font-cinzel text-[18vw] font-black tracking-widest text-[#1A1A1A] whitespace-nowrap">
          HOUSE OF YOU
        </span>
      </div>

      {/* Ambient warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#AB8850]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Luxury Plaque / Certificate Container */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-[#AB8850]/30 shadow-[0_25px_60px_-15px_rgba(26,26,26,0.07)] p-5 sm:p-10 md:p-14 lg:p-16">
          
          {/* Decorative Corner Ornaments (Brass Atelier Accents) */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-3.5 sm:w-4 h-3.5 sm:h-4 border-t-2 border-l-2 border-[#AB8850]" />
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-3.5 sm:w-4 h-3.5 sm:h-4 border-t-2 border-r-2 border-[#AB8850]" />
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-3.5 sm:w-4 h-3.5 sm:h-4 border-b-2 border-l-2 border-[#AB8850]" />
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-3.5 sm:w-4 h-3.5 sm:h-4 border-b-2 border-r-2 border-[#AB8850]" />

          {/* Plaque Header: Medal & Brand Seals */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
            
            {/* Medallion Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#AB8850]/10 border border-[#AB8850]/30 mb-4 sm:mb-6">
              <Crown className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
              <span className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-bold text-[#AB8850]">
                ATELIER CHARTER
              </span>
            </div>

            {/* Official Title */}
            <h2 className="font-cinzel font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] tracking-wider uppercase leading-tight">
              THE HOY PLEDGE
            </h2>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 my-4 sm:my-5">
              <div className="w-10 sm:w-12 h-px bg-[#AB8850]/40" />
              <div className="w-2 h-2 rotate-45 border border-[#AB8850] bg-white" />
              <div className="w-10 sm:w-12 h-px bg-[#AB8850]/40" />
            </div>

            <p className="font-montserrat text-xs sm:text-sm text-[#1A1A1A]/70 uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium">
              Three Inviolable Commitments To Every Client
            </p>
          </div>

          {/* 3 Luxury Tenet Cards */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {tenets.map((tenet, idx) => {
              const isLast = idx === tenets.length - 1;

              return (
                <div
                  key={idx}
                  className={`group relative rounded-xl sm:rounded-2xl p-5 sm:p-7 md:p-8 transition-all duration-300 ${
                    isLast
                      ? 'bg-gradient-to-r from-[#1A1A1A] to-[#242424] text-white border border-[#AB8850]/40 shadow-xl'
                      : 'bg-[#FAF9F5] border border-[#1A1A1A]/8 hover:border-[#AB8850]/40 hover:bg-white text-[#1A1A1A]'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start md:items-center">
                    
                    {/* Roman Numeral & Badge (Col 1-3) */}
                    <div className="md:col-span-3 flex flex-wrap items-center justify-between md:flex-col md:items-start md:justify-start gap-2.5 sm:gap-3">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`font-cinzel text-3xl sm:text-4xl md:text-6xl font-bold leading-none ${
                            isLast ? 'text-[#AB8850]' : 'text-[#AB8850] group-hover:scale-105 transition-transform'
                          }`}
                        >
                          {tenet.numeral}
                        </span>
                        <span
                          className={`font-montserrat text-[10px] tracking-[0.25em] uppercase font-bold ${
                            isLast ? 'text-white/60' : 'text-[#1A1A1A]/50'
                          }`}
                        >
                          {tenet.label}
                        </span>
                      </div>

                      {/* Micro Pill Tag */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-montserrat font-bold tracking-wider uppercase ${
                          isLast
                            ? 'bg-[#AB8850]/20 text-[#AB8850] border border-[#AB8850]/40'
                            : 'bg-white text-[#1A1A1A]/70 border border-[#1A1A1A]/10 group-hover:border-[#AB8850]/30'
                        }`}
                      >
                        <Check className="w-2.5 h-2.5 text-[#AB8850]" strokeWidth={2.5} />
                        <span className="whitespace-nowrap">{tenet.commitment}</span>
                      </span>
                    </div>

                    {/* Headline & Description (Col 4-12) */}
                    <div className="md:col-span-9 space-y-2">
                      <div className="space-y-0.5 sm:space-y-1">
                        <h3
                          className={`font-montserrat font-black text-lg sm:text-2xl lg:text-3xl tracking-tight uppercase leading-tight ${
                            isLast ? 'text-white' : 'text-[#1A1A1A]'
                          }`}
                        >
                          {tenet.title}
                        </h3>
                        <p
                          className={`font-cinzel text-xs sm:text-sm italic tracking-wider block ${
                            isLast ? 'text-[#AB8850]' : 'text-[#AB8850]'
                          }`}
                        >
                          — {tenet.subtitle}
                        </p>
                      </div>

                      <p
                        className={`font-montserrat text-xs sm:text-sm leading-relaxed font-normal ${
                          isLast ? 'text-white/80' : 'text-[#1A1A1A]/75'
                        }`}
                      >
                        {tenet.description}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Atelier Seal & Sign-off Dossier */}
          <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-[#1A1A1A]/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 mb-8 sm:mb-10">
              {guarantees.map((g, i) => {
                const IconComponent = g.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-[#FAF9F5] border border-[#1A1A1A]/5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-[#AB8850]/30 flex items-center justify-center text-[#AB8850] shrink-0 shadow-xs">
                      <IconComponent className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-bold text-xs tracking-wider uppercase text-[#1A1A1A]">
                        {g.title}
                      </h4>
                      <p className="font-montserrat text-[11px] sm:text-xs text-[#1A1A1A]/60 leading-normal mt-0.5">
                        {g.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Atelier Stamp */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-6 border-t border-dashed border-[#1A1A1A]/10 text-left">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#AB8850]/40 bg-[#FAF9F5] flex items-center justify-center p-2 shrink-0">
                  <HoyLogo className="h-5 sm:h-6 w-auto" variant="dark" />
                </div>
                <div>
                  <span className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#1A1A1A] uppercase block">
                    HOUSE OF YOU ATELIER
                  </span>
                  <span className="font-montserrat text-[10px] text-[#1A1A1A]/50 tracking-wider uppercase block">
                    MUMBAI · NEW DELHI · CURATED IN INDIA
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] border border-[#AB8850]/30 shrink-0">
                <Award className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
                <span className="font-cinzel text-[10px] tracking-[0.2em] font-semibold text-[#1A1A1A] uppercase">
                  MMXXVI · COHORT ASSURANCE
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

