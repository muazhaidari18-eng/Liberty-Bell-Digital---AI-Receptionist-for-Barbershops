import React from 'react';
import { trackCTAClick } from '../utils/tracking';

interface FooterProps {
  onOpenBooking: (source?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-stone-200/90 py-10 text-stone-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-200/70">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-[#D29A32]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.69 2 6 4.69 6 8v3.5L4.29 13.21c-.48.48-.79 1.13-.79 1.79 0 1.38 1.12 2.5 2.5 2.5h12c1.38 0 2.5-1.12 2.5-2.5 0-.66-.31-1.31-.79-1.79L18 11.5V8c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4v4h-8V8c0-2.21 1.79-4 4-4zm-2 15.5c0 .83.67 1.5 1.5 1.5h1c.83 0 1.5-.67 1.5-1.5H10z"/>
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-stone-900 text-sm tracking-tight font-display">
                LIBERTY BELL DIGITAL
              </span>
              <span className="text-[11px] text-stone-500 block">
                AI Receptionist & Local Growth Systems for Barbershops
              </span>
            </div>
          </div>

          {/* Direct CTA link */}
          <div>
            <button
              onClick={() => {
                trackCTAClick('Nav', 'Book My Free Strategy Call');
                onOpenBooking('Footer');
              }}
              className="text-[#8D6112] hover:text-[#B8801E] font-bold text-xs underline decoration-[#C89028] decoration-2 underline-offset-4 cursor-pointer"
            >
              Book My Free Strategy Call →
            </button>
          </div>

        </div>

        {/* Legal & Meta attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Liberty Bell Digital. All rights reserved. Built for barbershops, salons & grooming studios.
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-stone-800 transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-800 transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-stone-800 transition-colors">Contact</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
