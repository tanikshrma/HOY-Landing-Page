import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSlots } from '../context/SlotsContext';

interface StickyMobileCtaProps {
  onCtaClick: () => void;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({ onCtaClick }) => {
  const { slots } = useSlots();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Only show after the "YOUR LOOK, IN THREE STEPS." (#how-it-works) section starts on mobile
      const howItWorksSection = document.getElementById('how-it-works');
      if (howItWorksSection) {
        const rect = howItWorksSection.getBoundingClientRect();
        // Trigger when the section starts entering the mobile viewport
        setIsVisible(rect.top <= window.innerHeight - 80);
      } else {
        // Fallback if element not found yet
        setIsVisible(window.scrollY > 600);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    // Check initial state in case page was reloaded when already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      id="sticky-mobile-cta"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#1A1A1A]/12 px-4 py-2.5 shadow-[0_-10px_25px_rgba(0,0,0,0.08)] transition-all duration-300 transform ease-in-out ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isVisible}
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        <div className="flex flex-col justify-center min-w-0 pr-1">
          <span className="font-montserrat font-black text-[11px] sm:text-xs tracking-tight uppercase text-[#1A1A1A] truncate">
            YOUR STYLE. SORTED.
          </span>
          <span className="font-montserrat font-bold text-[9px] sm:text-[10px] tracking-[0.1em] uppercase text-[#AB8850] truncate">
            {slots.isSoldOut ? 'ALL 20 PASSES CLAIMED' : 'FIRST 20 USERS GET FREE ACCESS'}
          </span>
        </div>

        <button
          id="sticky-mobile-cta-btn"
          onClick={onCtaClick}
          tabIndex={isVisible ? 0 : -1}
          className="px-4 sm:px-5 py-2.5 rounded-full bg-[#1A1A1A] active:bg-[#AB8850] text-white font-montserrat font-bold text-xs tracking-[0.14em] uppercase transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
        >
          <span>{slots.isSoldOut ? 'VIEW FORM' : 'GET ACCESS'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

