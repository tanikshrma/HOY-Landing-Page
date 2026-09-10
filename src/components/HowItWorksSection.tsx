import React from 'react';
import { IMAGES } from '../assets/images';
import { Upload, SlidersHorizontal, Layers, Workflow } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'UPLOAD',
      description: 'Start with your style, body and wardrobe.',
      image: IMAGES.wardrobeRack,
      alt: 'Digital wardrobe upload and personal styling foundation',
      tag: 'YOUR FOUNDATION',
      icon: Upload,
    },
    {
      number: '02',
      title: 'PERSONALISE',
      description: "Tell us your preferences, body context and what you're dressing for.",
      image: IMAGES.wardrobeDetail,
      alt: 'Personalised styling preferences with custom fabric context',
      tag: 'YOUR CONTEXT',
      icon: SlidersHorizontal,
    },
    {
      number: '03',
      title: 'GENERATE',
      description: 'Get complete looks curated around you.',
      image: IMAGES.outfitStyled,
      alt: 'Head-to-toe outfit recommendations generated for you',
      tag: 'YOUR LOOK',
      icon: Layers,
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-[#FFFFFF] border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 lg:mb-12 gap-3">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Workflow className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
              <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#1A1A1A]/70">
                HOW HOY WORKS
              </span>
            </div>
            <h2 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#1A1A1A] uppercase">
              YOUR LOOK, IN THREE STEPS.
            </h2>
          </div>
          <div className="hidden md:block">
            <span className="font-cinzel text-xs text-[#1A1A1A]/50 tracking-[0.25em] uppercase">
              EFFORTLESS STYLING
            </span>
          </div>
        </div>

        {/* 3 Streamlined Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-6">
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.number}
                className="group flex flex-col bg-white rounded-xl sm:rounded-2xl border border-[#1A1A1A]/10 overflow-hidden transition-all duration-300 hover:border-[#AB8850]/60 hover:shadow-md"
              >
                {/* Visual Card Image */}
                <div className="relative aspect-[4/3.8] overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/75 via-[#1A1A1A]/20 to-transparent pointer-events-none" />

                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs font-montserrat font-extrabold text-xs tracking-wider text-[#1A1A1A] shadow-xs">
                      {step.number}
                    </span>
                  </div>

                  {/* Tag Pill */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1A1A1A]/85 backdrop-blur-md text-[10px] font-montserrat font-medium tracking-[0.14em] uppercase text-white/90 border border-white/20">
                      {step.tag}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex flex-col justify-between grow">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
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
      </div>
    </section>
  );
};
