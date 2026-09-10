import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { LeadFormData } from '../types';
import { HoyLogo } from './HoyLogo';

interface AccessConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadData: LeadFormData | null;
}

export const AccessConfirmationModal: React.FC<AccessConfirmationModalProps> = ({
  isOpen,
  onClose,
  leadData,
}) => {
  if (!isOpen || !leadData) return null;

  const todayStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white rounded-2xl border border-[#1A1A1A]/10 shadow-2xl p-6 sm:p-9 z-10 overflow-hidden"
        >
          {/* Subtle geometric corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#AB8850]/5 rounded-bl-full pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-full text-[#1A1A1A]/50 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <HoyLogo showSubtitle={false} />
            <div className="h-4 w-px bg-[#1A1A1A]/20" />
            <span className="font-montserrat text-xs tracking-[0.2em] uppercase text-[#AB8850] font-semibold">
              EXCLUSIVE DAILY ACCESS
            </span>
          </div>

          {/* Digital Access Pass Container */}
          <div className="border border-[#1A1A1A]/15 rounded-xl p-5 sm:p-6 bg-[#1A1A1A] text-white relative overflow-hidden mb-6">
            <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
              <div>
                <p className="font-montserrat text-[10px] tracking-[0.25em] text-[#AB8850] uppercase">
                  CONFIRMED INVITATION
                </p>
                <h4 className="font-montserrat font-bold text-xl text-white mt-0.5">
                  {leadData.fullName}
                </h4>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full bg-[#AB8850]/20 border border-[#AB8850]/40 text-[#AB8850] font-montserrat text-xs font-semibold">
                  SLOT #14 / 20
                </span>
                <p className="font-montserrat text-[10px] text-white/50 mt-1">{todayStr}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-montserrat text-white/80">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Contact</span>
                <span className="font-medium text-white">{leadData.phoneNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Dispatch To</span>
                <span className="font-medium text-white truncate max-w-[200px]">
                  {leadData.emailAddress}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/50">Access Tier</span>
                <span className="text-[#AB8850] font-semibold">House of You Early Cohort</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-3 mb-6 text-sm text-[#1A1A1A]/80 font-montserrat">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#AB8850] shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                <strong className="font-semibold text-[#1A1A1A]">Your invitation is locked in.</strong>{' '}
                Because access is limited to 20 individuals daily, your spot is reserved.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <SlidersHorizontal className="w-5 h-5 text-[#AB8850] shrink-0 mt-0.5" strokeWidth={1.75} />
              <p className="text-xs leading-relaxed">
                <strong className="font-semibold text-[#1A1A1A]">What happens next:</strong> You will
                receive a private link to upload your body context, wardrobe essentials, and upcoming
                occasions.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-full bg-[#1A1A1A] hover:bg-[#AB8850] text-white font-montserrat font-bold text-xs tracking-[0.16em] uppercase transition-all duration-300"
          >
            RETURN TO HOY
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
