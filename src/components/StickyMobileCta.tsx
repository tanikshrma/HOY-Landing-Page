import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { useSlots } from '../context/SlotsContext';

interface StickyMobileCtaProps {
  onCtaClick: () => void;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({ onCtaClick }) => {
  const { slots } = useSlots();

  return (
    <div
      id="sticky-mobile-cta"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#1A1A1A]/12 px-4 py-2.5 shadow-[0_-10px_25px_rgba(0,0,0,0.06)] transition-all"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col justify-center min-w-0">
          <div className={`flex items-center gap-1.5 ${slots.isSoldOut ? 'text-[#C07A61]' : 'text-[#AB8850]'}`}>
            <Users className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
            <span className="font-montserrat font-bold text-[10px] tracking-[0.14em] uppercase truncate">
              {slots.isSoldOut ? 'SOLD OUT TODAY' : `${slots.remainingSlots} SLOTS LEFT`}
            </span>
          </div>
          <span className="font-montserrat text-[11px] text-[#1A1A1A]/70 font-medium truncate">
            {slots.isSoldOut ? '20/20 Passes Claimed' : '20 Passes Daily Limit'}
          </span>
        </div>

        <button
          id="sticky-mobile-cta-btn"
          onClick={onCtaClick}
          className="px-5 py-2.5 rounded-full bg-[#1A1A1A] active:bg-[#AB8850] text-white font-montserrat font-bold text-xs tracking-[0.16em] uppercase transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
        >
          <span>{slots.isSoldOut ? 'VIEW FORM' : 'GET STARTED'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
