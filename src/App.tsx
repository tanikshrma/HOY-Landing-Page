import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ValuePropSection } from './components/ValuePropSection';
import { WardrobeSection } from './components/WardrobeSection';
import { PersonalStyleSection } from './components/PersonalStyleSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { StickyMobileCta } from './components/StickyMobileCta';
import { AccessConfirmationModal } from './components/AccessConfirmationModal';
import { LeadFormData } from './types';

export default function App() {
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToLeadForm = () => {
    const formElement = document.getElementById('lead-form') || document.getElementById('hero-lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus on the first input field
      const nameInput = document.getElementById('fullName') as HTMLInputElement | null;
      if (nameInput) {
        setTimeout(() => {
          nameInput.focus();
        }, 500);
      }
    }
  };

  const handleLeadSuccess = (data: LeadFormData) => {
    setSubmittedLead(data);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-montserrat antialiased selection:bg-[#AB8850] selection:text-white flex flex-col">
      {/* Sticky Header */}
      <Header onGetAccessClick={scrollToLeadForm} />

      {/* Main Editorial Experience */}
      <main className="grow">
        {/* 1. HERO */}
        <HeroSection
          onLeadSuccess={handleLeadSuccess}
          onCtaClick={scrollToLeadForm}
        />

        {/* 2. HOW HOY WORKS */}
        <HowItWorksSection />

        {/* 3. MORE THAN OUTFIT IDEAS */}
        <ValuePropSection />

        {/* 4. START WITH WHAT YOU ALREADY OWN */}
        <WardrobeSection onCtaClick={scrollToLeadForm} />

        {/* 5. BECAUSE YOUR STYLE SHOULD LOOK LIKE YOU */}
        <PersonalStyleSection onCtaClick={scrollToLeadForm} />

        {/* 6. 20 USERS + FINAL CTA */}
        <FinalCtaSection onCtaClick={scrollToLeadForm} />
      </main>

      {/* 7. FOOTER */}
      <Footer />

      {/* Mobile Sticky CTA */}
      <StickyMobileCta onCtaClick={scrollToLeadForm} />

      {/* Exclusive Access Pass Confirmation Modal */}
      <AccessConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leadData={submittedLead}
      />
    </div>
  );
}
