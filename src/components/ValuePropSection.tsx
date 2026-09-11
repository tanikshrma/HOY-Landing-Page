import React from 'react';
import { UserCheck, Ruler, Shirt, ShoppingBag, Globe, Compass, ArrowUpRight } from 'lucide-react';

export const ValuePropSection: React.FC = () => {
  const cards = [
    {
      id: '01',
      title: 'PERSONAL STYLING',
      body: 'Get complete outfit ideas based on you, not generic trends.',
      icon: UserCheck,
      editorialNum: 'I',
    },
    {
      id: '02',
      title: 'BUILT AROUND YOU',
      body: 'Your style, preferences, occasion and wardrobe shape every suggestion.',
      icon: Ruler,
      editorialNum: 'II',
    },
    {
      id: '03',
      title: 'YOUR WARDROBE, BETTER',
      body: 'Mix, match and rewear pieces you already own in new ways.',
      icon: Shirt,
      editorialNum: 'III',
    },
    {
      id: '04',
      title: 'SMARTER DISCOVERY',
      body: 'Find new pieces that work with what you already have.',
      icon: ShoppingBag,
      editorialNum: 'IV',
    },
    {
      id: '05',
      title: 'MADE FOR INDIA',
      body: 'Style that understands both your Western and Indian wardrobe.',
      icon: Globe,
      editorialNum: 'V',
    },
  ];

  return (
    <section id="why-hoy" className="py-12 sm:py-16 lg:py-20 bg-[#FFFFFF] border-b border-[#1A1A1A]/10 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
            <Compass className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
            <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#1A1A1A]/70">
              WHY HOY
            </span>
          </div>
          <h2 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#1A1A1A] uppercase">
            MORE THAN OUTFIT IDEAS.
          </h2>
          <p className="mt-2.5 sm:mt-3 font-montserrat font-semibold text-sm sm:text-base text-[#1A1A1A] max-w-2xl leading-snug">
            You already have clothes. The hard part is knowing what to wear.
          </p>
          <p className="mt-2 font-montserrat text-xs sm:text-sm text-[#1A1A1A]/75 max-w-2xl leading-relaxed font-normal">
            HOY helps you make better use of your wardrobe, discover combinations you may not have thought of and find something new only when you actually need it.
          </p>
        </div>

        {/* 5 Compact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {cards.map((card, idx) => {
            const isWide = idx < 2;
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className={`group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                  isWide ? 'lg:col-span-3 bg-white' : 'lg:col-span-2 bg-white'
                } border-[#1A1A1A]/10 hover:border-[#AB8850] hover:shadow-sm flex flex-col justify-between`}
              >
                <div>
                  {/* Top Meta: Roman Numeral + Clean Icon */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="font-cinzel text-xs text-[#AB8850] font-semibold tracking-widest">
                      {card.editorialNum}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A] group-hover:border-[#AB8850] group-hover:text-[#AB8850] transition-colors">
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-montserrat font-bold text-sm sm:text-base tracking-tight text-[#1A1A1A] uppercase leading-tight">
                    {card.title}
                  </h3>

                  {/* Body */}
                  <p className="mt-1.5 sm:mt-2 font-montserrat text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed font-normal">
                    {card.body}
                  </p>
                </div>

                {/* Bottom Pill Indicator */}
                <div className="mt-5 pt-3 border-t border-[#1A1A1A]/5 flex items-center justify-between">
                  <span className="font-montserrat text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 group-hover:text-[#AB8850] transition-colors font-semibold">
                    HOY PILLAR
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-[#1A1A1A]/20 group-hover:text-[#AB8850] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
