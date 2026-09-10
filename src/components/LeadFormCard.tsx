import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, User, Phone, Mail, UserCheck, ShieldCheck } from 'lucide-react';
import { LeadFormData } from '../types';

interface LeadFormCardProps {
  id?: string;
  onSuccess?: (data: LeadFormData) => void;
  className?: string;
  isCompact?: boolean;
}

export const LeadFormCard: React.FC<LeadFormCardProps> = ({
  id = 'lead-form',
  onSuccess,
  className = '',
  isCompact = false,
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Please enter your phone number';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid mobile number';
    }

    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate rapid, smooth client-side confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess(formData);
      }
    }, 450);
  };

  return (
    <div
      id={id}
      className={`relative bg-white text-[#1A1A1A] rounded-2xl border border-[#1A1A1A]/10 shadow-[0_15px_35px_-10px_rgba(26,26,26,0.06)] p-6 sm:p-7 xl:p-8 transition-all duration-300 ${className}`}
    >
      {/* Top small label */}
      <div className="flex items-center justify-between gap-2 mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A]/5 border border-[#1A1A1A]/10">
          <ShieldCheck className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
          <span className="font-montserrat font-bold text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/80">
            EXCLUSIVE ACCESS
          </span>
        </div>
        <span className="font-montserrat text-[11px] font-semibold text-[#AB8850] tracking-[0.08em] uppercase">
          LIMITED
        </span>
      </div>

      <div className="mb-5">
        <h3 className="font-montserrat font-extrabold text-2xl tracking-tight text-[#1A1A1A] uppercase">
          MAKE IT YOURS.
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed font-normal">
          Tell us a little about yourself and get access to the HOY experience.
        </p>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-xl bg-[#1A1A1A] text-white text-center space-y-4"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-[#AB8850]/20 border border-[#AB8850] flex items-center justify-center text-[#AB8850]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-montserrat font-bold text-lg text-white">ACCESS SECURED</h4>
            <p className="font-montserrat text-xs text-white/70 mt-1">
              Welcome, {formData.fullName}. Your exclusive styling profile link is on its way to{' '}
              <span className="text-[#AB8850] font-medium">{formData.emailAddress}</span>.
            </p>
          </div>
          <div className="pt-2 border-t border-white/10">
            <span className="font-montserrat text-[11px] tracking-wider text-white/50 uppercase">
              First 20 users each day get access.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-xs font-montserrat text-[#AB8850] underline hover:text-[#AB8850]/80 transition-colors pt-1"
          >
            Submit another profile
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="flex items-center gap-1.5 font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1A1A]/80 mb-1.5"
            >
              <User className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={1.75} />
              <span>FULL NAME</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Aarav Sharma"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-montserrat text-[#1A1A1A] bg-white border ${
                errors.fullName ? 'border-[#C07A61]' : 'border-[#1A1A1A]/15'
              } hover:border-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-colors`}
            />
            {errors.fullName && (
              <p className="mt-1 text-[11px] font-montserrat text-[#C07A61]">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="flex items-center gap-1.5 font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1A1A]/80 mb-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={1.75} />
              <span>PHONE NUMBER</span>
            </label>
            <div className="relative">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData({ ...formData, phoneNumber: e.target.value });
                  if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
                }}
                className={`w-full px-4 py-3 rounded-xl text-sm font-montserrat text-[#1A1A1A] bg-white border ${
                  errors.phoneNumber ? 'border-[#C07A61]' : 'border-[#1A1A1A]/15'
                } hover:border-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-colors`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-[11px] font-montserrat text-[#C07A61]">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="emailAddress"
              className="flex items-center gap-1.5 font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1A1A]/80 mb-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={1.75} />
              <span>EMAIL ADDRESS</span>
            </label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              autoComplete="email"
              placeholder="aarav@example.com"
              value={formData.emailAddress}
              onChange={(e) => {
                setFormData({ ...formData, emailAddress: e.target.value });
                if (errors.emailAddress) setErrors({ ...errors, emailAddress: undefined });
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-montserrat text-[#1A1A1A] bg-white border ${
                errors.emailAddress ? 'border-[#C07A61]' : 'border-[#1A1A1A]/15'
              } hover:border-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-colors`}
            />
            {errors.emailAddress && (
              <p className="mt-1 text-[11px] font-montserrat text-[#C07A61]">{errors.emailAddress}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              id="lead-form-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-full bg-[#1A1A1A] text-white hover:bg-[#AB8850] active:scale-[0.99] font-montserrat font-bold text-xs tracking-[0.16em] uppercase transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-xs disabled:opacity-70"
            >
              <span>{isSubmitting ? 'PROCESSING...' : 'GET MY ACCESS'}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <p className="text-center font-montserrat text-xs text-[#AB8850] font-semibold pt-1 tracking-wide">
            First 20 users each day get access.
          </p>
        </form>
      )}
    </div>
  );
};
