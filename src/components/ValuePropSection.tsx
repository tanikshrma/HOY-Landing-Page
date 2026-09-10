import React from 'react';
import { UserRound, Ruler, Shirt, ShoppingBag, MessageSquare, Compass, ArrowUpRight } from 'lucide-react';

export const ValuePropSection: React.FC = () => {
  const cards = [
    {
      id: '01',
      title: 'EFFORTLESS CURATION',
      body: 'Complete, tailored outfits ready in seconds. Less morning guesswork.',
      accent: 'mustard',
      icon: UserRound,
      editorialNum: 'I',
    },
    {
      id: '02',
      title: 'HYPER-PERSONALISED FIT',
      body: 'Styling that considers your body shape and skin tone.',
      accent: 'terracotta',
      icon: Ruler,
      editorialNum: 'II',
    },
    {
      id: '03',
      title: 'YOUR WARDROBE, BETTER',
      body: 'Mix and match what you already own. Discover more ways to wear it.',
      accent: 'black',
      icon: Shirt,
      editorialNum: 'III',
    },
    {
      id: '04',
      title: 'FRESH DISCOVERIES',
      body: 'Find new pieces only when they genuinely add something to your look.',
      accent: 'mustard',
      icon: ShoppingBag,
      editorialNum: 'IV',
    },
    {
      id: '05',
      title: 'HUMAN-CENTRIC GUIDANCE',
      body: 'Useful advice that feels closer to a stylish friend than a fashion algorithm.',
      accent: 'terracotta',
      icon: MessageSquare,
      editorialNum: 'V',
    },
  ];

  return (
    <section id="why-hoy" className="py-16 sm:py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-3">
            <Compass className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
            <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#1A1A1A]/70">
              PHILOSOPHY & PURPOSE
            </span>
          </div>
          <h2 className="font-montserrat font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight text-[#1A1A1A] uppercase">
            MORE THAN OUTFIT IDEAS.
          </h2>
          <p className="mt-3 sm:mt-4 font-montserrat text-sm sm:text-base text-[#1A1A1A]/70 max-w-xl">
            A cohesive personal styling system designed for Indian lifestyles, cultural nuances, and individual identity.
          </p>
        </div>

        {/* 5 Elegant Cards Grid: Top 2 large, bottom 3 balanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {cards.map((card, idx) => {
            const isWide = idx < 2;
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className={`group relative p-5 sm:p-8 rounded-2xl border transition-all duration-300 ${
                  isWide ? 'lg:col-span-3 bg-white' : 'lg:col-span-2 bg-white'
                } border-[#1A1A1A]/10 hover:border-[#AB8850] hover:shadow-[0_12px_30px_-10px_rgba(26,26,26,0.06)] flex flex-col justify-between`}
              >
                <div>
                  {/* Top Meta: Editorial Roman Numeral + Icon */}
                  <div className="flex items-center justify-between mb-5 sm:mb-8">
                    <span className="font-cinzel text-xs text-[#AB8850] font-semibold tracking-widest">
                      {card.editorialNum}
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A] group-hover:border-[#AB8850] group-hover:text-[#AB8850] transition-colors">
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-montserrat font-bold text-base sm:text-lg md:text-xl tracking-tight text-[#1A1A1A] uppercase leading-tight">
                    {card.title}
                  </h3>

                  {/* Body */}
                  <p className="mt-2.5 sm:mt-3 font-montserrat text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed font-normal">
                    {card.body}
                  </p>
                </div>

                {/* Bottom Pill Indicator */}
                <div className="mt-6 sm:mt-8 pt-3.5 sm:pt-4 border-t border-[#1A1A1A]/5 flex items-center justify-between">
                  <span className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 group-hover:text-[#AB8850] transition-colors font-medium">
                    HOY PILLAR
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#1A1A1A]/20 group-hover:text-[#AB8850] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
