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
      alt: 'Curated wardrobe rack with tailored apparel',
      tag: 'YOUR FOUNDATION',
      icon: Upload,
    },
    {
      number: '02',
      title: 'PERSONALISE',
      description: "Tell us your preferences, body context and what you're dressing for.",
      image: IMAGES.wardrobeDetail,
      alt: 'Fabric swatches and textile textures in mustard and terracotta',
      tag: 'YOUR CONTEXT',
      icon: SlidersHorizontal,
    },
    {
      number: '03',
      title: 'GENERATE',
      description: 'Get complete looks curated around you.',
      image: IMAGES.outfitStyled,
      alt: 'Complete head-to-toe styled outfits',
      tag: 'YOUR LOOK',
      icon: Layers,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 lg:mb-16 gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <Workflow className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
              <span className="font-montserrat font-semibold text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#1A1A1A]/70">
                THE PROCESS
              </span>
            </div>
            <h2 className="font-montserrat font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight text-[#1A1A1A] uppercase">
              YOUR LOOK, IN THREE STEPS.
            </h2>
          </div>
          <div className="hidden md:block">
            <span className="font-cinzel text-xs text-[#1A1A1A]/50 tracking-[0.3em] uppercase">
              METHODOLOGY · SYSTEM 2.0
            </span>
          </div>
        </div>

        {/* 3 Large Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-8">
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.number}
                className="group flex flex-col bg-white rounded-2xl border border-[#1A1A1A]/10 overflow-hidden transition-all duration-300 hover:border-[#AB8850]/50 hover:shadow-[0_16px_35px_-10px_rgba(171,136,80,0.12)]"
              >
                {/* Visual Card Image */}
                <div className="relative aspect-4/5 overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent pointer-events-none" />

                  {/* Number Badge */}
                  <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 z-10">
                    <span className="inline-flex items-center justify-center px-2.5 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs font-montserrat font-extrabold text-xs tracking-wider text-[#1A1A1A] shadow-xs">
                      {step.number}
                    </span>
                  </div>

                  {/* Tag Pill */}
                  <div className="absolute bottom-3.5 sm:bottom-4 left-3.5 sm:left-4 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-[#1A1A1A]/80 backdrop-blur-md text-[10px] font-montserrat font-medium tracking-[0.16em] uppercase text-white/90 border border-white/20">
                      {step.tag}
                    </span>
                  </div>
                </div>

                {/* Card Content: Minimal & Strong */}
                <div className="p-5 sm:p-7 flex flex-col justify-between grow">
                  <div>
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <h3 className="font-montserrat font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight text-[#1A1A1A] uppercase">
                        {step.title}
                      </h3>
                      <StepIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#AB8850]" strokeWidth={1.75} />
                    </div>
                    <p className="mt-1 font-montserrat text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                    <span className="font-montserrat text-[10px] tracking-widest uppercase text-[#AB8850] font-semibold">
                      STEP {step.number}
                    </span>
                    <div className="w-8 h-0.5 bg-[#AB8850] rounded-full group-hover:w-12 transition-all duration-300" />
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
