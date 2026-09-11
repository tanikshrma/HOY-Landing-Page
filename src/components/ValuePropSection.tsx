import React, { useRef, useState, useEffect, useCallback } from 'react';
import { UserCheck, Ruler, Shirt, ShoppingBag, Globe, Compass, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const ValuePropSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Only run auto-sliding when section is actually on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Pause auto-sliding for a few seconds on user manual interaction
  const triggerUserPause = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4000);
  }, []);

  // Update active indicator dot on manual scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardWidth = clientWidth * 0.78;
      const index = Math.round(scrollLeft / (cardWidth + 16));
      const boundedIndex = Math.min(Math.max(index, 0), cards.length - 1);
      setActiveIndex(boundedIndex);
    }
  };

  // Scroll container ONLY horizontally - NEVER triggers window or page scroll
  const scrollToCard = useCallback((index: number) => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[index] as HTMLElement;
      if (card) {
        const targetLeft = card.offsetLeft - scrollRef.current.offsetLeft - 16;
        scrollRef.current.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
        setActiveIndex(index);
      }
    }
  }, []);

  const handleNext = () => {
    triggerUserPause();
    const next = (activeIndex + 1) % cards.length;
    scrollToCard(next);
  };

  const handlePrev = () => {
    triggerUserPause();
    const prev = (activeIndex - 1 + cards.length) % cards.length;
    scrollToCard(prev);
  };

  // Auto-slide effect on mobile/tablet viewports ONLY when section is visible
  useEffect(() => {
    if (isPaused || !isVisible) return;

    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        if (scrollWidth > clientWidth) {
          const nextIndex = (activeIndex + 1) % cards.length;
          scrollToCard(nextIndex);
        }
      }
    }, 3200);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused, isVisible, cards.length, scrollToCard]);

  // Clean up pause timer on unmount
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} id="why-hoy" className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#1A1A1A]/10 scroll-mt-20 sm:scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 lg:mb-14 gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
              <Compass className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
              <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#1A1A1A]/70">
                WHY HOY
              </span>
            </div>
            <h2 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#1A1A1A] uppercase leading-tight">
              MORE THAN OUTFIT IDEAS.
            </h2>
            <p className="mt-3 sm:mt-3.5 font-montserrat font-semibold text-sm sm:text-base text-[#1A1A1A] max-w-2xl leading-snug">
              You already have clothes. The hard part is knowing what to wear.
            </p>
            <p className="mt-2 sm:mt-2.5 font-montserrat text-xs sm:text-sm text-[#1A1A1A]/75 max-w-2xl leading-relaxed font-normal">
              HOY helps you make better use of your wardrobe, discover combinations you may not have thought of and find something new only when you actually need it.
            </p>
          </div>

          {/* Mobile Manual & Auto Controls Header Cue */}
          <div className="lg:hidden flex items-center justify-between sm:justify-end gap-3 pt-2">
            <span className="font-montserrat text-[10px] font-bold tracking-[0.14em] uppercase text-[#AB8850] flex items-center gap-1 bg-[#AB8850]/10 px-3 py-1.5 rounded-full border border-[#AB8850]/20">
              AUTO & SWIPE READY
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous pillar"
                className="w-8 h-8 rounded-full border border-[#1A1A1A]/15 bg-white flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer active:scale-95 shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next pillar"
                className="w-8 h-8 rounded-full border border-[#1A1A1A]/15 bg-white flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer active:scale-95 shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. MOBILE/TABLET VIEW: Smooth Auto-Slide & Manual Horizontal Swipe */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onTouchStart={triggerUserPause}
            onMouseDown={triggerUserPause}
            className="-mx-4 px-4 sm:-mx-6 sm:px-6 flex overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth gap-4 sm:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.id}
                  className="group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl border bg-white border-[#1A1A1A]/10 hover:border-[#AB8850] hover:shadow-md flex flex-col justify-between w-[80vw] sm:w-[50vw] max-w-[300px] shrink-0 snap-center select-none"
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
                    <h3 className="font-montserrat font-bold text-sm sm:text-base tracking-tight text-[#1A1A1A] uppercase leading-snug">
                      {card.title}
                    </h3>

                    {/* Body */}
                    <p className="mt-2 sm:mt-2.5 font-montserrat text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed font-normal">
                      {card.body}
                    </p>
                  </div>

                  {/* Bottom Pill Indicator */}
                  <div className="mt-5 pt-3.5 border-t border-[#1A1A1A]/5 flex items-center justify-between">
                    <span className="font-montserrat text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 group-hover:text-[#AB8850] transition-colors font-semibold">
                      HOY PILLAR
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#1A1A1A]/20 group-hover:text-[#AB8850] transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {cards.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                onClick={() => {
                  triggerUserPause();
                  scrollToCard(idx);
                }}
                aria-label={`Go to pillar ${card.editorialNum}`}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx ? 'w-6 bg-[#AB8850]' : 'w-2 bg-[#1A1A1A]/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 2. DESKTOP VIEW: Clean 5-Card Responsive Asymmetric Grid */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-4">
          {cards.map((card, idx) => {
            const isWide = idx < 2;
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
                  isWide ? 'lg:col-span-3 bg-white' : 'lg:col-span-2 bg-white'
                } border-[#1A1A1A]/10 hover:border-[#AB8850] hover:shadow-sm flex flex-col justify-between`}
              >
                <div>
                  {/* Top Meta: Roman Numeral + Clean Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-cinzel text-xs text-[#AB8850] font-semibold tracking-widest">
                      {card.editorialNum}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A] group-hover:border-[#AB8850] group-hover:text-[#AB8850] transition-colors">
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-montserrat font-bold text-base tracking-tight text-[#1A1A1A] uppercase leading-tight">
                    {card.title}
                  </h3>

                  {/* Body */}
                  <p className="mt-2 font-montserrat text-sm text-[#1A1A1A]/70 leading-relaxed font-normal">
                    {card.body}
                  </p>
                </div>

                {/* Bottom Pill Indicator */}
                <div className="mt-5 pt-3 border-t border-[#1A1A1A]/5 flex items-center justify-between">
                  <span className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/40 group-hover:text-[#AB8850] transition-colors font-semibold">
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
