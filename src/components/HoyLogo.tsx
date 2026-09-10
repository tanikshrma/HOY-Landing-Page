import React from 'react';
import hoyLogo from '../assets/images/HOY Logo.png';
import hoyLogoWhite from '../assets/images/HOY Logo White.png';

interface HoyLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'white' | 'outline';
  showSubtitle?: boolean;
}

export const HoyLogo: React.FC<HoyLogoProps> = ({
  className = '',
  variant = 'dark',
}) => {
  const isWhiteLogo = variant === 'light' || variant === 'white';
  const logoSrc = isWhiteLogo ? hoyLogoWhite : hoyLogo;
  const defaultSize = className.includes('h-') ? '' : 'h-10 sm:h-12';

  return (
    <img
      src={logoSrc}
      alt="HOY - House of You"
      className={`${defaultSize} w-auto object-contain select-none ${className}`.trim()}
      loading="eager"
      decoding="async"
    />
  );
};
