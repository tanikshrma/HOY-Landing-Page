import React from 'react';
import { ArrowRight, ShieldCheck, Crown, Clock, Check } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface LimitedAccessSectionProps {
  onCtaClick: () => void;
}

export const LimitedAccessSection: React.FC<LimitedAccessSectionProps> = ({ onCtaClick }) => {
  // Slots: 14 allocated, 6 open for today
  const totalSlots = 20;
  const allocatedSlots = 14;

  const standards = [
    {
      num: '01',
      title: 'DEDICATED STYLIST CALIBRATION',
      desc: 'No generic robotic suggestions. Every intake dossier is hand-evaluated for personal silhouette proportions, skin undertones, and daily lifestyle.',
    },
    {
      num: '02',
      title: 'CIRCULAR WARDROBE MAPPING',
      desc: 'We start with the garments hanging in your closet today, creating fresh, high-impact looks before introducing intentional new pieces.',
    },
    {
      num: '03',
      title: 'UNRUSHED HEAD-TO-TOE COMPLETION',
      desc: 'Every approved look includes balanced footwear, outer layers, and subtle styling notes — delivered directly to your private profile.',
    },
  ];

  return (
    <section id="limited-access-section" className="py-20 lg:py-28 bg-[#141414] text-white relative overflow-hidden border-b border-[#AB8850]/20">
      {/* Subtle luxury ambient glow and architectural line pattern */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#AB8850]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#AB8850]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 sm:pb-8 mb-10 sm:mb-12 border-b border-white/10">
          <div className="inline-flex items-center gap-2.5">
            <Crown className="w-4 h-4 text-[#AB8850]" strokeWidth={1.75} />
            <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#AB8850]">
              ATELIER INTAKE PROTOCOL
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-montserrat text-white/60">
            <span className="w-2 h-2 rounded-full bg-[#AB8850] animate-pulse shrink-0" />
            <span className="tracking-wider uppercase font-medium">TODAY'S INTAKE: OPEN (6 SLOTS LEFT)</span>
          </div>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column (6 Cols): Headline, Philosophy & Live Slot Ledger */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <span className="font-cinzel text-xs text-[#AB8850] tracking-[0.3em] uppercase font-bold block mb-2.5 sm:mb-3">
                THE QUALITY MANDATE
              </span>
              
              {/* Massive Luxury Editorial Headline */}
              <h2 className="font-montserrat font-black text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.4rem] tracking-tight uppercase leading-[0.95] sm:leading-[0.92] text-white">
                20 USERS.<br />
                <span className="text-[#AB8850]">EVERY DAY.</span>
              </h2>

              <p className="mt-4 sm:mt-6 font-montserrat text-sm sm:text-base md:text-lg text-white/80 font-normal leading-relaxed">
                True personal styling cannot be mass-manufactured. We strictly cap onboarding at twenty members each day so our stylists can dedicate focused attention to your personal wardrobe, proportions, and taste.
              </p>
            </div>

            {/* 20-Slot Visual Roster Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm space-y-4 sm:space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-montserrat">
                <span className="font-bold tracking-[0.16em] uppercase text-white text-[11px] sm:text-xs">
                  DAILY ADMISSION ROSTER
                </span>
                <span className="text-[#AB8850] font-semibold tracking-wider text-[11px] sm:text-xs">
                  {allocatedSlots} / {totalSlots} CLAIMED TODAY
                </span>
              </div>

              {/* Visual 20 Slots Grid: 5 columns on mobile for spacious touch & readability, 10 on desktop */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
                {Array.from({ length: totalSlots }).map((_, idx) => {
                  const isAllocated = idx < allocatedSlots;
                  const isNextInLine = idx === allocatedSlots;

                  return (
                    <div
                      key={idx}
                      title={isAllocated ? `Slot ${idx + 1}: Reserved` : `Slot ${idx + 1}: Available`}
                      className={`h-9 sm:h-10 rounded-lg flex flex-col items-center justify-center transition-all text-[10px] sm:text-[11px] font-montserrat font-bold ${
                        isAllocated
                          ? 'bg-[#AB8850]/20 border border-[#AB8850]/40 text-[#AB8850]'
                          : isNextInLine
                          ? 'bg-white text-[#1A1A1A] border-2 border-[#AB8850] shadow-[0_0_12px_rgba(171,136,80,0.5)] animate-pulse'
                          : 'bg-white/[0.05] border border-white/10 text-white/40 hover:border-[#AB8850]/50'
                      }`}
                    >
                      {isAllocated ? (
                        <Check className="w-3 h-3 text-[#AB8850]" strokeWidth={2.5} />
                      ) : (
                        <span>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Roster Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] font-montserrat text-white/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-xs bg-[#AB8850]/30 border border-[#AB8850]/50" />
                  <span>Reserved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-xs bg-white border border-[#AB8850]" />
                  <span className="text-white font-medium">Your Slot (Next)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#AB8850]" />
                  <span>Resets at 00:00 Daily</span>
                </div>
              </div>
            </div>

            {/* Action CTA & Assurance */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <button
                id="limited-access-cta-btn"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#AB8850] text-[#1A1A1A] hover:text-white font-montserrat font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-3 shadow-lg active:scale-[0.99]"
              >
                <span>CLAIM 1 OF 6 TODAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs font-montserrat text-white/60">
                <ShieldCheck className="w-4 h-4 text-[#AB8850] shrink-0" />
                <span>Zero obligations. Complimentary private onboarding.</span>
              </div>
            </div>
          </div>

          {/* Right Column (6 Cols): Atelier Docket & Standards of Controlled Intake */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#AB8850]/30 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 sm:p-8 lg:p-9 shadow-2xl backdrop-blur-md">
              
              {/* Luxury Watermark Header */}
              <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-white/10 mb-6 sm:mb-8">
                <div>
                  <span className="font-cinzel text-[11px] sm:text-xs text-[#AB8850] tracking-[0.28em] font-semibold block">
                    HOUSE OF YOU · ATELIER CHARTER
                  </span>
                  <h3 className="font-montserrat font-bold text-base sm:text-lg text-white uppercase tracking-tight mt-1">
                    WHY WE LIMIT ACCESS TO 20
                  </h3>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#AB8850]/40 flex items-center justify-center text-[#AB8850] shrink-0">
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                </div>
              </div>

              {/* 3 Standards */}
              <div className="space-y-6 sm:space-y-7">
                {standards.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 sm:gap-5 group">
                    <span className="font-cinzel font-bold text-sm sm:text-base text-[#AB8850] tracking-wider pt-0.5 shrink-0">
                      {item.num}
                    </span>
                    <div className="space-y-1 sm:space-y-1.5">
                      <h4 className="font-montserrat font-bold text-xs sm:text-sm tracking-[0.08em] text-white uppercase group-hover:text-[#AB8850] transition-colors">
                        {item.title}
                      </h4>
                      <p className="font-montserrat text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Editorial Inset Badge */}
              <div className="mt-7 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-white/20 shrink-0">
                    <img
                      src={IMAGES.wardrobeDetail}
                      alt="Atelier fabric and tailoring detail"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-montserrat text-[10px] sm:text-[11px] font-bold tracking-wider text-white uppercase block">
                      INDIVIDUAL CRAFTSMANSHIP
                    </span>
                    <span className="font-montserrat text-[11px] sm:text-xs text-white/50">
                      Curated looks tailored to real wardrobes
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                  <span className="font-cinzel text-xs text-[#AB8850] tracking-widest font-bold block">
                    COHORT #2026
                  </span>
                  <span className="text-[10px] font-montserrat uppercase text-white/40 tracking-wider">
                    DAILY EDITION
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

