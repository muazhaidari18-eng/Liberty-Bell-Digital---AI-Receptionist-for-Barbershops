/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { DemoSection } from './components/DemoSection';
import { JourneySection } from './components/JourneySection';
import { AdditionalServices } from './components/AdditionalServices';
import { TrustSection } from './components/TrustSection';
import { InPersonReviewSection } from './components/InPersonReviewSection';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { StickyCta } from './components/StickyCta';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { trackEvent } from './utils/tracking';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingCtaSource, setBookingCtaSource] = useState<string>('Hero');
  const [isInPersonReviewModal, setIsInPersonReviewModal] = useState<boolean>(false);

  // Trigger PageView tracking on initial mount
  useEffect(() => {
    trackEvent('PageView', {
      landing_page_industry: 'barber',
      page_title: 'Liberty Bell Digital | AI Receptionist for Barbershops',
      referrer: document.referrer || 'direct',
    });
  }, []);

  const handleOpenBooking = (source: string = 'Hero', isInPerson: boolean = false) => {
    setBookingCtaSource(source);
    setIsInPersonReviewModal(isInPerson);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-[#C89028]/20 selection:text-[#8D6112]">
      
      {/* 1. Minimal Nav */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Landing Flow */}
      <main className="flex-1">
        
        {/* 2. Hero */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 3. Industry-specific problem */}
        <ProblemSection onOpenBooking={handleOpenBooking} />

        {/* 4. Liberty Bell / AI Receptionist solution */}
        <SolutionSection onOpenBooking={handleOpenBooking} />

        {/* 5. AI Receptionist conversation demo */}
        <DemoSection onOpenBooking={handleOpenBooking} />

        {/* 6. Customer journey after a lead comes in */}
        <JourneySection />

        {/* 7. Relevant additional services */}
        <AdditionalServices onOpenBooking={handleOpenBooking} />

        {/* 8. Why Liberty Bell / trust section */}
        <TrustSection />

        {/* 9. In-person review section */}
        <InPersonReviewSection onOpenBooking={handleOpenBooking} />

        {/* 10. FAQ */}
        <FaqSection />

        {/* 11. Final CTA */}
        <FinalCta onOpenBooking={handleOpenBooking} />

      </main>

      {/* Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* 12. Sticky CTA (Mobile bottom persistent bar & Desktop sticky header) */}
      <StickyCta onOpenBooking={handleOpenBooking} />

      {/* 13. Booking Popup Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        ctaSource={bookingCtaSource}
        isInPersonReview={isInPersonReviewModal}
      />

    </div>
  );
}
