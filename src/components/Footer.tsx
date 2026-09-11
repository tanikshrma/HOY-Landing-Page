import React from 'react';
import { HoyLogo } from './HoyLogo';

interface FooterProps {
  onCtaClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCtaClick }) => {
  const currentYear = 2026;

  const handleScrollToForm = () => {
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    const formElement = document.getElementById('hero-lead-form') || document.getElementById('lead-form');
    if (formElement) {
      const header = document.getElementById('main-header');
      const headerHeight = header ? header.getBoundingClientRect().height : 75;
      const elementPosition = formElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - headerHeight - 20);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer id="main-footer" className="bg-[#1A1A1A] text-white pt-10 sm:pt-12 pb-20 md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Brand & Navigation Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 sm:gap-8 pb-5 sm:pb-10 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="space-y-2.5">
            <HoyLogo variant="white" showSubtitle={false} className="h-10 sm:h-12" />
            
            <p className="font-montserrat text-[11px] text-[#AB8850] tracking-[0.2em] uppercase font-bold">
              PERSONAL STYLING PLATFORM
            </p>

            <p className="font-montserrat text-xs text-white/70 leading-relaxed max-w-md font-normal">
              Your personal stylist in your hand. Build your digital wardrobe, get personalised outfit suggestions and discover what to wear based on your style, wardrobe and occasion.
            </p>
          </div>

          {/* Navigation & Links: PLATFORM ONLY (With CTA directly under the links) */}
          <div className="flex flex-col md:items-end">
            <p className="font-montserrat text-[11px] font-bold uppercase tracking-[0.2em] text-[#AB8850] mb-3">
              PLATFORM
            </p>
            <ul className="flex flex-wrap gap-5 sm:gap-7 font-montserrat text-xs text-white/70 mb-0 sm:mb-5">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-hoy" className="hover:text-white transition-colors">
                  Why HOY
                </a>
              </li>
              <li>
                <a href="#your-wardrobe" className="hover:text-white transition-colors">
                  Wardrobe
                </a>
              </li>
            </ul>

            {/* Small CTA Badge & Button placed right under the PLATFORM links (Hidden on mobile) */}
            <div className="hidden sm:inline-flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/5 border border-white/15">
              <span className="font-montserrat font-bold text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#AB8850] whitespace-nowrap">
                FIRST 20 USERS GET FREE ACCESS
              </span>
              <button
                onClick={handleScrollToForm}
                className="px-3.5 py-1.5 rounded-full bg-[#AB8850] hover:bg-[#C07A61] text-white font-montserrat font-bold text-[10px] tracking-[0.16em] uppercase transition-colors cursor-pointer shrink-0"
              >
                GET ACCESS
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex items-center justify-start text-left text-xs font-montserrat text-white/50">
          <p>&copy; {currentYear} HOY (House of You). All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
