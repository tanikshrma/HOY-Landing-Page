import React, { useRef, useState } from 'react';
import { IMAGES } from '../assets/images';
import { Upload, SlidersHorizontal, Layers, Workflow, ChevronRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'UPLOAD',
      description: 'Add photos of the clothes you already own and build your digital wardrobe.',
      image: IMAGES.wardrobeRack,
      alt: 'Add photos of clothes you own for digital wardrobe styling',
      tag: 'YOUR WARDROBE',
      icon: Upload,
    },
    {
      number: '02',
      title: 'PERSONALISE',
      description: "Tell us about your style, preferences, occasion and what you're looking for.",
      image: IMAGES.wardrobeDetail,
      alt: 'Personalise style preferences, occasion and fashion recommendations',
      tag: 'YOUR STYLE',
      icon: SlidersHorizontal,
    },
    {
      number: '03',
      title: 'STYLE',
      description: 'Get complete outfit suggestions built around your wardrobe, occasion, weather and personal preferences.',
      image: IMAGES.outfitStyled,
      alt: 'Complete head-to-toe outfit suggestions generated for your wardrobe',
      tag: 'YOUR LOOK',
      icon: Layers,
    },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / (offsetWidth * 0.78));
      setActiveIndex(Math.min(Math.max(index, 0), steps.length - 1));
    }
  };

  const scrollToStep = (index: number) => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[index] as HTMLElement;
      if (card) {
        const targetLeft = card.offsetLeft - scrollRef.current.offsetLeft - 16;
        scrollRef.current.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
        setActiveIndex(index);
      }
    }
  };

  return (
    <section id="how-it-works" className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#1A1A1A]/10 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 lg:mb-14 gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-2.5">
              <Workflow className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
              <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#1A1A1A]/70">
                HOW HOY WORKS
              </span>
            </div>
            <h2 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#1A1A1A] uppercase leading-tight">
              YOUR LOOK, IN THREE STEPS.
            </h2>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-3">
            <span className="font-cinzel text-xs text-[#1A1A1A]/50 tracking-[0.25em] uppercase">
              EFFORTLESS STYLING
            </span>
            {/* Mobile Swipe Cue */}
            <span className="md:hidden font-montserrat text-[10px] font-bold tracking-[0.16em] uppercase text-[#AB8850] flex items-center gap-1">
              SWIPE <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* 3 Step Cards: Horizontal Scrolling Carousel on Mobile, 3-Col Grid on Tablet/Desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="-mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-x-visible pb-4 pt-1 snap-x snap-mandatory scroll-smooth gap-4 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.number}
                className="group flex flex-col bg-white rounded-xl sm:rounded-2xl border border-[#1A1A1A]/10 overflow-hidden transition-all duration-300 hover:border-[#AB8850]/60 hover:shadow-md w-[82vw] sm:w-[62vw] max-w-[330px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
              >
                {/* Visual Card Image */}
                <div className="relative aspect-[4/3.6] overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/75 via-[#1A1A1A]/20 to-transparent pointer-events-none" />

                  {/* Number Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs font-montserrat font-extrabold text-xs tracking-wider text-[#1A1A1A] shadow-xs">
                      {step.number}
                    </span>
                  </div>

                  {/* Tag Pill */}
                  <div className="absolute bottom-3.5 left-3.5 z-10">
                    <span className="px-3 py-1 rounded-full bg-[#1A1A1A]/85 backdrop-blur-md text-[10px] font-montserrat font-medium tracking-[0.14em] uppercase text-white/90 border border-white/20">
                      {step.tag}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between grow">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-montserrat font-extrabold text-base sm:text-lg tracking-tight text-[#1A1A1A] uppercase">
                        {step.title}
                      </h3>
                      <StepIcon className="w-4 h-4 text-[#AB8850]" strokeWidth={1.75} />
                    </div>
                    <p className="font-montserrat text-xs sm:text-sm text-[#1A1A1A]/75 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Interactive Step Dots / Pagination Controls */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          {steps.map((step, idx) => (
            <button
              key={step.number}
              type="button"
              onClick={() => scrollToStep(idx)}
              aria-label={`Go to step ${step.number}`}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === idx ? 'w-6 bg-[#AB8850]' : 'w-2 bg-[#1A1A1A]/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
