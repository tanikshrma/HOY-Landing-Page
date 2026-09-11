import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Ruler, Palette, Shirt, Calendar, UserRound, Layers, Check, Fingerprint } from 'lucide-react';

export const BuiltAroundYouSection: React.FC = () => {
  const tags = [
    {
      id: 'body',
      label: 'YOUR BODY',
      detail: 'Tailoring aligned with your specific proportions, shoulder structure, drape preferences, and silhouette balance.',
      metric: 'Proportion-matched fit',
      icon: Ruler,
    },
    {
      id: 'skin_tone',
      label: 'YOUR SKIN TONE',
      detail: 'Color theory fine-tuned for South Asian warm, neutral, and cool undertones—enhancing natural complexion vibrancy.',
      metric: 'Harmonious palette calibration',
      icon: Palette,
    },
    {
      id: 'wardrobe',
      label: 'YOUR WARDROBE',
      detail: 'Catalogues your cherished pieces to unlock 4x more outfits before suggesting anything newly sourced.',
      metric: 'Maximising your current closet',
      icon: Shirt,
    },
    {
      id: 'occasion',
      label: 'YOUR OCCASION',
      detail: 'Nuanced dress codes tailored for modern Indian life: festive brunches, startup pitches, gallery nights, and intimate dinners.',
      metric: 'Context-accurate styling',
      icon: Calendar,
    },
    {
      id: 'style',
      label: 'YOUR STYLE',
      detail: 'Your authentic aesthetic compass—whether relaxed sartorial, street-luxe, clean minimal, or modern heritage.',
      metric: 'Personal identity preserved',
      icon: UserRound,
    },
  ];

  const [activeTagId, setActiveTagId] = useState<string>('body');
  const activeTag = tags.find((t) => t.id === activeTagId) || tags[0];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#1A1A1A]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-3">
            <Fingerprint className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
            <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#1A1A1A]/70">
              INDIVIDUAL RECOGNITION
            </span>
          </div>
          <h2 className="font-montserrat font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight text-[#1A1A1A] uppercase leading-[1.12] sm:leading-[1.08]">
            NOT EVERYONE'S STYLE NEEDS THE SAME ANSWER.
          </h2>
          <p className="mt-3 sm:mt-4 font-montserrat text-[15px] sm:text-base md:text-lg text-[#1A1A1A]/70 font-normal">
            HOY considers the details that make your style yours.
          </p>
        </div>

        {/* Visual Mapping Diagram */}
        <div className="relative max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-[#1A1A1A]/10 p-4 sm:p-8 lg:p-12 shadow-sm">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Interactive Visual Tags */}
            <div className="lg:col-span-6 space-y-3">
              <span className="block font-montserrat text-[10px] tracking-[0.25em] text-[#AB8850] uppercase font-bold mb-2">
                SELECT A DIMENSION
              </span>
              {tags.map((tag) => {
                const isActive = tag.id === activeTagId;
                const TagIcon = tag.icon;
                return (
                  <button
                    key={tag.id}
                    onClick={() => setActiveTagId(tag.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-[#AB8850] bg-[#1A1A1A] text-white shadow-md'
                        : 'border-[#1A1A1A]/10 bg-white text-[#1A1A1A] hover:border-[#AB8850]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <TagIcon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#AB8850]' : 'text-[#1A1A1A]/40'
                        }`}
                        strokeWidth={1.75}
                      />
                      <span className="font-montserrat font-bold text-xs sm:text-sm tracking-[0.16em] uppercase">
                        {tag.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`font-montserrat text-[11px] hidden sm:inline ${
                          isActive ? 'text-[#AB8850]' : 'text-[#1A1A1A]/50'
                        }`}
                      >
                        {tag.metric}
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isActive ? 'translate-x-1 text-[#AB8850]' : 'text-[#1A1A1A]/30'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Center / Connector Line (Visual Bridge) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              {/* Convergence Node: YOUR LOOK */}
              <div className="relative p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-[#1A1A1A] text-white border border-[#AB8850]/30 shadow-xl overflow-hidden">
                {/* Accent glow corner */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#AB8850]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Pill Title badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5 sm:pb-4 mb-4 sm:mb-5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#AB8850] text-[#1A1A1A] font-montserrat font-extrabold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
                      YOUR LOOK
                    </span>
                    <span className="font-montserrat text-[10px] text-white/50 tracking-widest uppercase">
                      SYNTHESIS
                    </span>
                  </div>
                  <Layers className="w-4 h-4 text-[#AB8850]" strokeWidth={1.75} />
                </div>

                {/* Animated Tag Detail Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTag.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 sm:space-y-4"
                  >
                    <div>
                      <span className="font-cinzel text-[11px] sm:text-xs text-[#AB8850] tracking-[0.2em] uppercase block">
                        CONTEXT APPLIED: {activeTag.label}
                      </span>
                      <h4 className="font-montserrat font-bold text-lg sm:text-2xl text-white mt-1">
                        {activeTag.metric}
                      </h4>
                    </div>

                    <p className="font-montserrat text-[13.5px] xs:text-sm sm:text-sm text-white/80 leading-relaxed font-normal">
                      {activeTag.detail}
                    </p>

                    <div className="pt-3.5 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px] font-montserrat text-white/60">
                      <span>Curated by House of You</span>
                      <span className="text-[#AB8850] font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 100% Unique to you
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 text-center">
                <span className="font-montserrat text-xs text-[#1A1A1A]/50 tracking-wider">
                  5 personal signals &rarr; One coherent head-to-toe outfit
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
