import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, User, Phone, Mail, ShieldCheck, AlertCircle, Lock } from 'lucide-react';
import { LeadFormData } from '../types';
import { useSlots } from '../context/SlotsContext';

interface LeadFormCardProps {
  id?: string;
  onSuccess?: (data: LeadFormData) => void;
  className?: string;
  isCompact?: boolean;
}

// Production-ready field validation helpers
export const validateFullName = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Please enter your full name';
  }
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters long';
  }
  if (trimmed.length > 50) {
    return 'Name cannot exceed 50 characters';
  }
  const nameRegex = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s.'-]+$/;
  if (!nameRegex.test(trimmed)) {
    return 'Please enter a valid name using letters only';
  }
  return null;
};

export const validatePhoneNumber = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Please enter your phone number';
  }
  const cleanPhone = trimmed.replace(/[\s\-\(\)\.]/g, '');
  if (!/^\+?[0-9]{10,15}$/.test(cleanPhone)) {
    return 'Please enter a valid 10 to 15 digit mobile number';
  }

  const digitsOnly = cleanPhone.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return 'Phone number must have at least 10 digits';
  }
  if (digitsOnly.length > 15) {
    return 'Phone number cannot exceed 15 digits';
  }

  if (/^(\d)\1+$/.test(digitsOnly)) {
    return 'Please enter a valid active phone number';
  }

  return null;
};

export const validateEmailAddress = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Please enter your email address';
  }
  if (trimmed.length > 100) {
    return 'Email address cannot exceed 100 characters';
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address (e.g. name@example.com)';
  }
  const parts = trimmed.split('@');
  if (parts.length !== 2 || !parts[1].includes('.')) {
    return 'Please enter a complete email domain (e.g. .com, .in)';
  }
  const tld = parts[1].split('.').pop();
  if (!tld || tld.length < 2) {
    return 'Please enter a valid domain extension';
  }
  return null;
};

export const LeadFormCard: React.FC<LeadFormCardProps> = ({
  id = 'lead-form',
  onSuccess,
  className = '',
}) => {
  const { slots, createBooking } = useSlots();

  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LeadFormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Validate single field helper
  const validateField = (name: keyof LeadFormData, value: string): string | null => {
    switch (name) {
      case 'fullName':
        return validateFullName(value);
      case 'phoneNumber':
        return validatePhoneNumber(value);
      case 'emailAddress':
        return validateEmailAddress(value);
      default:
        return null;
    }
  };

  // Validate all fields
  const validateAll = (): boolean => {
    const nameError = validateFullName(formData.fullName);
    const phoneError = validatePhoneNumber(formData.phoneNumber);
    const emailError = validateEmailAddress(formData.emailAddress);

    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};
    if (nameError) newErrors.fullName = nameError;
    if (phoneError) newErrors.phoneNumber = phoneError;
    if (emailError) newErrors.emailAddress = emailError;

    setErrors(newErrors);
    setTouched({
      fullName: true,
      phoneNumber: true,
      emailAddress: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setServerError(null);

    if (errors[field] || touched[field]) {
      const fieldError = validateField(field, value);
      setErrors((prev) => {
        if (!fieldError) {
          const updated = { ...prev };
          delete updated[field];
          return updated;
        }
        return { ...prev, [field]: fieldError };
      });
    }
  };

  const handleBlur = (field: keyof LeadFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldError = validateField(field, formData[field]);
    setErrors((prev) => {
      if (!fieldError) {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      }
      return { ...prev, [field]: fieldError };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (slots.isSoldOut) {
      setServerError('Daily capacity of 20 slots is fully booked for today. Sold out!');
      return;
    }
    
    const isValid = validateAll();
    if (!isValid) {
      const firstErrorKey = validateFullName(formData.fullName)
        ? 'fullName'
        : validatePhoneNumber(formData.phoneNumber)
        ? 'phoneNumber'
        : 'emailAddress';
      const inputEl = document.getElementById(firstErrorKey);
      if (inputEl) {
        inputEl.focus({ preventScroll: true });
      }
      return;
    }

    setIsSubmitting(true);

    const sanitizedData: LeadFormData = {
      fullName: formData.fullName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      emailAddress: formData.emailAddress.trim().toLowerCase(),
    };

    try {
      await createBooking(sanitizedData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess(sanitizedData);
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setServerError(err.message || 'An error occurred while securing access. Please try again.');
    }
  };

  return (
    <div
      id={id}
      className={`relative bg-white text-[#1A1A1A] rounded-2xl border border-[#1A1A1A]/10 shadow-[0_15px_35px_-10px_rgba(26,26,26,0.06)] p-6 sm:p-7 xl:p-8 scroll-mt-24 sm:scroll-mt-28 transition-all duration-300 ${className}`}
    >
      {/* Top small label */}
      <div className="flex items-center justify-between gap-2 mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A]/5 border border-[#1A1A1A]/10">
          <ShieldCheck className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={2} />
          <span className="font-montserrat font-bold text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/80">
            EXCLUSIVE ACCESS
          </span>
        </div>
        <span className="font-montserrat text-[11px] font-bold tracking-[0.08em] uppercase px-2.5 py-0.5 rounded-full bg-[#AB8850]/15 text-[#AB8850] border border-[#AB8850]/30">
          LIMITED
        </span>
      </div>

      <div className="mb-5">
        <h3 className="font-montserrat font-extrabold text-2xl tracking-tight text-[#1A1A1A] uppercase">
          MAKE IT YOURS.
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed font-normal">
          Tell us a little about yourself, upload your wardrobe and get started with the HOY experience.
        </p>
      </div>

      {serverError && (
        <div className="mb-4 p-3 rounded-xl bg-[#C07A61]/10 border border-[#C07A61]/30 flex items-start gap-2 text-xs font-montserrat text-[#C07A61]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

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
              Welcome, {formData.fullName.trim()}. Your exclusive styling profile link is on its way to{' '}
              <span className="text-[#AB8850] font-medium">{formData.emailAddress.trim().toLowerCase()}</span>.
            </p>
          </div>
          <div className="pt-2 border-t border-white/10">
            <span className="font-montserrat text-[11px] tracking-wider text-white/50 uppercase">
              {slots.remainingSlots > 0 ? `${slots.remainingSlots} slots remaining today.` : 'Sold out for today.'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ fullName: '', phoneNumber: '', emailAddress: '' });
              setErrors({});
              setTouched({});
            }}
            className="text-xs font-montserrat text-[#AB8850] underline hover:text-[#AB8850]/80 transition-colors pt-1 cursor-pointer"
          >
            Submit another profile
          </button>
        </motion.div>
      ) : slots.isSoldOut ? (
        <div className="p-6 rounded-xl bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 text-center space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#C07A61]/10 border border-[#C07A61]/30 flex items-center justify-center text-[#C07A61]">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="font-montserrat font-bold text-base text-[#1A1A1A] uppercase">
            SOLD OUT FOR TODAY
          </h4>
          <p className="font-montserrat text-xs text-[#1A1A1A]/70 leading-relaxed max-w-xs mx-auto">
            All 20 daily access passes have been claimed for today. Capacity resets at midnight.
          </p>
          <div className="pt-2">
            <button
              disabled
              className="w-full py-3.5 px-6 rounded-full bg-[#1A1A1A]/30 text-white font-montserrat font-bold text-xs tracking-[0.16em] uppercase cursor-not-allowed"
            >
              CAPACITY REACHED
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Full Name */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="fullName"
                className="flex items-center gap-1.5 font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1A1A]/80"
              >
                <User className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={1.75} />
                <span>FULL NAME</span>
                <span className="text-[#C07A61] font-bold">*</span>
              </label>
              <span className="text-[10px] font-montserrat text-[#1A1A1A]/40 uppercase tracking-wider">
                Required
              </span>
            </div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              placeholder="e.g. Aarav Sharma"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              className={`w-full px-4 py-3 rounded-xl text-sm font-montserrat text-[#1A1A1A] bg-white border ${
                errors.fullName
                  ? 'border-[#C07A61] bg-[#C07A61]/5 focus:border-[#C07A61] focus:ring-1 focus:ring-[#C07A61]'
                  : 'border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]'
              } transition-colors outline-hidden`}
            />
            {errors.fullName && (
              <p
                id="fullName-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1 text-[11px] font-montserrat font-medium text-[#C07A61]"
              >
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="phoneNumber"
                className="flex items-center gap-1.5 font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1A1A]/80"
              >
                <Phone className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={1.75} />
                <span>PHONE NUMBER</span>
                <span className="text-[#C07A61] font-bold">*</span>
              </label>
              <span className="text-[10px] font-montserrat text-[#1A1A1A]/40 uppercase tracking-wider">
                Required
              </span>
            </div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              required
              aria-required="true"
              aria-invalid={!!errors.phoneNumber}
              aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
              placeholder="+91 98765 43210"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              onBlur={() => handleBlur('phoneNumber')}
              className={`w-full px-4 py-3 rounded-xl text-sm font-montserrat text-[#1A1A1A] bg-white border ${
                errors.phoneNumber
                  ? 'border-[#C07A61] bg-[#C07A61]/5 focus:border-[#C07A61] focus:ring-1 focus:ring-[#C07A61]'
                  : 'border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]'
              } transition-colors outline-hidden`}
            />
            {errors.phoneNumber && (
              <p
                id="phoneNumber-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1 text-[11px] font-montserrat font-medium text-[#C07A61]"
              >
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.phoneNumber}</span>
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="emailAddress"
                className="flex items-center gap-1.5 font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1A1A]/80"
              >
                <Mail className="w-3.5 h-3.5 text-[#AB8850]" strokeWidth={1.75} />
                <span>EMAIL ADDRESS</span>
                <span className="text-[#C07A61] font-bold">*</span>
              </label>
              <span className="text-[10px] font-montserrat text-[#1A1A1A]/40 uppercase tracking-wider">
                Required
              </span>
            </div>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={!!errors.emailAddress}
              aria-describedby={errors.emailAddress ? 'emailAddress-error' : undefined}
              placeholder="e.g. aarav@example.com"
              value={formData.emailAddress}
              onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              onBlur={() => handleBlur('emailAddress')}
              className={`w-full px-4 py-3 rounded-xl text-sm font-montserrat text-[#1A1A1A] bg-white border ${
                errors.emailAddress
                  ? 'border-[#C07A61] bg-[#C07A61]/5 focus:border-[#C07A61] focus:ring-1 focus:ring-[#C07A61]'
                  : 'border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]'
              } transition-colors outline-hidden`}
            />
            {errors.emailAddress && (
              <p
                id="emailAddress-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1 text-[11px] font-montserrat font-medium text-[#C07A61]"
              >
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.emailAddress}</span>
              </p>
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

          <p className="text-center font-montserrat text-xs text-[#1A1A1A]/70 font-medium pt-1 tracking-wide">
            Join HOY and start styling from your own wardrobe.
          </p>
        </form>
      )}
    </div>
  );
};
