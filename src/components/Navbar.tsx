import React from 'react';
import { PhoneCall, Sparkles } from 'lucide-react';
import { trackCTAClick } from '../utils/tracking';

interface NavbarProps {
  onOpenBooking: (source?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const handleNavCta = () => {
    trackCTAClick('Nav', 'Book My Free Strategy Call');
    onOpenBooking('Nav');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-[#D29A32] shadow-sm border border-stone-800 transition-transform group-hover:scale-105">
            {/* Minimalist Liberty Bell Icon */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.69 2 6 4.69 6 8v3.5L4.29 13.21c-.48.48-.79 1.13-.79 1.79 0 1.38 1.12 2.5 2.5 2.5h12c1.38 0 2.5-1.12 2.5-2.5 0-.66-.31-1.31-.79-1.79L18 11.5V8c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4v4h-8V8c0-2.21 1.79-4 4-4zm-2 15.5c0 .83.67 1.5 1.5 1.5h1c.83 0 1.5-.67 1.5-1.5H10z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-stone-900 font-display flex items-center gap-1.5">
              LIBERTY BELL
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 bg-[#D29A32]/15 text-[#9E6C15] rounded tracking-wider border border-[#D29A32]/25">
                Barbershops
              </span>
            </span>
            <span className="text-[11px] font-medium tracking-widest text-stone-500 uppercase -mt-0.5">
              Digital
            </span>
          </div>
        </a>

        {/* Right side navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a 
            href="#how-it-works" 
            className="hidden md:inline-flex text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors py-2"
          >
            How It Works
          </a>

          <button
            id="nav-cta-button"
            onClick={handleNavCta}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-xl bg-[#C89028] hover:bg-[#B8801E] text-stone-950 font-semibold text-xs sm:text-sm tracking-tight shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer min-h-[42px]"
          >
            <span>Book My Free Strategy Call</span>
          </button>
        </div>

      </div>
    </header>
  );
};
