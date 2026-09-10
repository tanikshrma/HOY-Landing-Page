import React, { useState } from 'react';
import { HoyLogo } from './HoyLogo';
import { X, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  const currentYear = 2026;

  return (
    <footer id="main-footer" className="bg-[#1A1A1A] text-white pt-12 sm:pt-16 pb-28 md:pb-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 sm:pb-14 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-3 sm:space-y-4">
            <HoyLogo variant="white" showSubtitle={false} className="h-12 sm:h-16 md:h-18" />
            
            <div className="pt-1">
              <p className="font-montserrat text-[11px] sm:text-xs text-[#AB8850] tracking-[0.18em] uppercase font-semibold">
                PERSONAL STYLING PLATFORM
              </p>
            </div>

            <p className="font-montserrat text-xs text-white/60 leading-relaxed max-w-sm">
              Hyper-personalised digital personal styling platform for Gen Z and Millennial Indian adults. Outfits designed for your body, tone, occasion, and wardrobe.
            </p>
          </div>

          {/* Navigation & Links: side by side on mobile for compact elegance */}
          <div className="md:col-span-6 grid grid-cols-2 sm:flex sm:justify-end gap-8 sm:gap-16">
            <div>
              <p className="font-montserrat text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#AB8850] mb-3 sm:mb-4">
                PLATFORM
              </p>
              <ul className="space-y-2 sm:space-y-2.5 font-montserrat text-xs text-white/70">
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
                    Your Wardrobe
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-montserrat text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#AB8850] mb-3 sm:mb-4">
                LEGAL & TRUST
              </p>
              <ul className="space-y-2 sm:space-y-2.5 font-montserrat text-xs text-white/70">
                <li>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('terms')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('contact')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left text-xs font-montserrat text-white/40">
          <p>&copy; {currentYear} HOY (House of You). All rights reserved.</p>
          <p className="tracking-widest uppercase text-[#AB8850] font-semibold text-[11px]">
            YOUR STYLE. SORTED.
          </p>
        </div>
      </div>

      {/* Interactive Legal / Contact Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/85 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white text-[#1A1A1A] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#1A1A1A]/10 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#1A1A1A]/5 text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'privacy' && (
              <div className="space-y-4 font-montserrat text-xs sm:text-sm text-[#1A1A1A]/80">
                <h3 className="font-bold text-xl text-[#1A1A1A] uppercase tracking-tight">
                  Privacy Policy
                </h3>
                <p>
                  At <strong>HOY (House of You)</strong>, we respect your personal styling privacy. Any data you provide—such as sizing metrics, skin tone preferences, or wardrobe items—is encrypted and used exclusively to generate individualised outfit recommendations.
                </p>
                <p>
                  We never sell your personal metrics, contact numbers, or photos to third-party commercial advertisers or automated telemarketing networks.
                </p>
                <p className="text-[11px] text-[#1A1A1A]/60 pt-2 border-t border-[#1A1A1A]/10">
                  Last updated: 2026. For inquiries: privacy@houseofyou.in
                </p>
              </div>
            )}

            {activeModal === 'terms' && (
              <div className="space-y-4 font-montserrat text-xs sm:text-sm text-[#1A1A1A]/80">
                <h3 className="font-bold text-xl text-[#1A1A1A] uppercase tracking-tight">
                  Terms & Conditions
                </h3>
                <p>
                  Welcome to <strong>House of You</strong>. Access to our styling system is prioritized for the first 20 verified users per day to maintain intimate editorial quality and bespoke curation attention.
                </p>
                <p>
                  Styling suggestions provided through HOY are curated recommendations. Users retain complete discretion over garment purchases from verified partner stores.
                </p>
                <p className="text-[11px] text-[#1A1A1A]/60 pt-2 border-t border-[#1A1A1A]/10">
                  Applicable under Indian cyber and consumer standards.
                </p>
              </div>
            )}

            {activeModal === 'contact' && (
              <div className="space-y-4 font-montserrat text-xs sm:text-sm text-[#1A1A1A]/80">
                <h3 className="font-bold text-xl text-[#1A1A1A] uppercase tracking-tight">
                  Contact HOY
                </h3>
                <p>
                  Have styling questions or want to partner with our curatorial collective? Reach our team directly:
                </p>
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#AB8850]" />
                    <span className="font-medium text-[#1A1A1A]">concierge@houseofyou.in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#AB8850]" />
                    <span className="font-medium text-[#1A1A1A]">+91 98200 46901</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#AB8850]" />
                    <span className="text-[#1A1A1A]">Indiranagar, Bangalore &bull; Bandra West, Mumbai</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[#1A1A1A]/10 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#AB8850] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
