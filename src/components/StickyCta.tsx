import React, { useState, useEffect } from 'react';
import { PhoneCall, Calendar, ArrowRight } from 'lucide-react';
import { trackCTAClick } from '../utils/tracking';

interface StickyCtaProps {
  onOpenBooking: (source?: string) => void;
}

export const StickyCta: React.FC<StickyCtaProps> = ({ onOpenBooking }) => {
  const [showDesktopSticky, setShowDesktopSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show desktop sticky bar after user scrolls down 450px
      if (window.scrollY > 450) {
        setShowDesktopSticky(true);
      } else {
        setShowDesktopSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStickyClick = () => {
    trackCTAClick('StickyBar', 'Book My Free Strategy Call');
    onOpenBooking('StickyBar');
  };

  return (
    <>
      {/* 1. MOBILE PERSISTENT BOTTOM BAR (Visible only on < md screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-stone-200/90 px-4 py-3 shadow-lg">
        <button
          id="mobile-sticky-cta"
          onClick={handleStickyClick}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#C89028] hover:bg-[#B8801E] text-stone-950 font-bold text-sm tracking-tight shadow-md active:scale-[0.98] cursor-pointer min-h-[48px]"
        >
          <Calendar className="w-4 h-4 text-stone-900" />
          <span>Book My Free Strategy Call</span>
        </button>
      </div>

      {/* 2. DESKTOP SUBTLE STICKY BAR (Visible on >= md screens after scrolling past hero) */}
      <div 
        className={`hidden md:block fixed top-0 left-0 right-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/90 shadow-sm transition-all duration-300 transform ${
          showDesktopSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C89028] animate-pulse" />
            <span className="text-xs font-bold text-stone-800 tracking-tight font-display">
              Liberty Bell Digital • AI Receptionist for Barbershops
            </span>
            <span className="text-xs text-stone-500 hidden lg:inline">
              | Never miss a booking while you cut hair
            </span>
          </div>

          <button
            id="desktop-sticky-cta"
            onClick={handleStickyClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C89028] hover:bg-[#B8801E] text-stone-950 font-bold text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Book My Free Strategy Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
