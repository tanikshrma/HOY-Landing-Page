import React, { useState, useEffect } from 'react';
import { HoyLogo } from './HoyLogo';

interface HeaderProps {
  onGetAccessClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onGetAccessClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why HOY', href: '#why-hoy' },
    { label: 'Your Wardrobe', href: '#your-wardrobe' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#1A1A1A]/10 py-3.5 shadow-xs'
          : 'bg-white border-b border-[#1A1A1A]/5 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: HOY logo */}
          <a
            href="#"
            className="group focus:outline-none"
            aria-label="HOY - House of You Home"
          >
            <HoyLogo showSubtitle={true} />
          </a>

          {/* Center Navigation: Desktop only */}
          <nav className="hidden md:flex items-center space-x-9">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="font-montserrat font-medium text-xs uppercase tracking-[0.18em] text-[#1A1A1A]/80 hover:text-[#AB8850] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center">
            <button
              id="header-cta-btn"
              onClick={onGetAccessClick}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#1A1A1A] bg-[#1A1A1A] hover:bg-[#AB8850] hover:border-[#AB8850] text-white font-montserrat font-bold text-[11px] sm:text-xs tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer shadow-xs active:scale-[0.98]"
            >
              GET ACCESS
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
