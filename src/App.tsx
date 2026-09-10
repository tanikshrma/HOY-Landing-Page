import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ValuePropSection } from './components/ValuePropSection';
import { BuiltAroundYouSection } from './components/BuiltAroundYouSection';
import { WardrobeSection } from './components/WardrobeSection';
import { PersonalStyleSection } from './components/PersonalStyleSection';
import { ShoppingSection } from './components/ShoppingSection';
import { LimitedAccessSection } from './components/LimitedAccessSection';
import { BrandStatementSection } from './components/BrandStatementSection';
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
        {/* Split Hero Section with Visual & Integrated Lead Form Card */}
        <HeroSection
          onLeadSuccess={handleLeadSuccess}
          onCtaClick={scrollToLeadForm}
        />

        {/* Problem Section: Getting dressed shouldn't take this much thinking */}
        <ProblemSection />

        {/* How HOY Works: 3 Large Visual Cards */}
        <HowItWorksSection />

        {/* Value Proposition: 5 Elegant Cards */}
        <ValuePropSection />

        {/* Built Around You: Interactive connection tags */}
        <BuiltAroundYouSection />

        {/* Wardrobe Section: Start with what you already own */}
        <WardrobeSection onCtaClick={scrollToLeadForm} />

        {/* Personal Style Section: Full-width editorial image */}
        <PersonalStyleSection />

        {/* Shopping Section: Discovery with intent */}
        <ShoppingSection onCtaClick={scrollToLeadForm} />

        {/* Limited Access Section: Core Black background */}
        <LimitedAccessSection onCtaClick={scrollToLeadForm} />

        {/* Brand Statement: Large typography */}
        <BrandStatementSection />

        {/* Final CTA Section */}
        <FinalCtaSection onCtaClick={scrollToLeadForm} />
      </main>

      {/* Footer */}
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
