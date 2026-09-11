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
import { SlotsProvider } from './context/SlotsContext';

export default function App() {
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToLeadForm = () => {
    const formElement = document.getElementById('hero-lead-form') || document.getElementById('lead-form');
    if (formElement) {
      const header = document.getElementById('main-header');
      const headerHeight = header ? header.getBoundingClientRect().height : 75;
      // Add extra breathing space (20px) below the header so the entire form is clearly visible
      const elementPosition = formElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - headerHeight - 20);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Focus the first input field without causing browser layout shift/scroll snap
      setTimeout(() => {
        const nameInput = document.getElementById('fullName') as HTMLInputElement | null;
        if (nameInput) {
          nameInput.focus({ preventScroll: true });
        }
      }, 600);
    }
  };

  const handleLeadSuccess = (data: LeadFormData) => {
    setSubmittedLead(data);
    setIsModalOpen(true);
  };

  return (
    <SlotsProvider>
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
        <Footer onCtaClick={scrollToLeadForm} />

        {/* Mobile Sticky CTA */}
        <StickyMobileCta onCtaClick={scrollToLeadForm} />

        {/* Exclusive Access Pass Confirmation Modal */}
        <AccessConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          leadData={submittedLead}
        />
      </div>
    </SlotsProvider>
  );
}
