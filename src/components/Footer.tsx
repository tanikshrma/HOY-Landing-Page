import React from 'react';
import { HoyLogo } from './HoyLogo';

export const Footer: React.FC = () => {
  const currentYear = 2026;

  return (
    <footer id="main-footer" className="bg-[#1A1A1A] text-white pt-10 sm:pt-12 pb-24 md:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 sm:pb-10 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="space-y-2.5">
            <HoyLogo variant="white" showSubtitle={false} className="h-10 sm:h-12" />
            
            <p className="font-montserrat text-[11px] text-[#AB8850] tracking-[0.2em] uppercase font-semibold">
              PERSONAL STYLING PLATFORM
            </p>

            <p className="font-montserrat text-xs text-white/60 leading-relaxed max-w-md">
              Hyper-personalised digital styling platform for Indian men and women. Head-to-toe outfit recommendations tailored to your body, wardrobe, and occasions.
            </p>
          </div>

          {/* Navigation & Links: PLATFORM ONLY */}
          <div>
            <p className="font-montserrat text-[11px] font-bold uppercase tracking-[0.2em] text-[#AB8850] mb-3">
              PLATFORM
            </p>
            <ul className="flex flex-wrap gap-5 sm:gap-7 font-montserrat text-xs text-white/70">
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
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-montserrat text-white/40">
          <p>&copy; {currentYear} HOY (House of You). All rights reserved.</p>
          <p className="tracking-widest uppercase text-[#AB8850] font-semibold text-[11px]">
            YOUR STYLE. SORTED.
          </p>
        </div>
      </div>
    </footer>
  );
};
