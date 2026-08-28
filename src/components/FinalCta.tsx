import React from 'react';
import { PhoneCall, ShieldCheck, ArrowRight } from 'lucide-react';
import { trackCTAClick } from '../utils/tracking';

interface FinalCtaProps {
  onOpenBooking: (source?: string) => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenBooking }) => {
  const handleFinalCta = () => {
    trackCTAClick('FinalCTA', 'Book My Free Strategy Call');
    onOpenBooking('FinalCTA');
  };

  return (
    <section className="py-16 sm:py-24 bg-stone-100/70 border-t border-stone-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-[#D29A32]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D29A32]/15 border border-[#D29A32]/30 text-[#8D6112] text-xs font-bold uppercase tracking-wider mb-6">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Stop Missing Revenue While You Cut</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight font-display mb-4">
          Your Next Client Might Already Be Calling.
        </h2>

        {/* Copy */}
        <p className="text-lg sm:text-xl text-stone-700 font-medium mb-8 max-w-xl mx-auto">
          Let's make sure they get an answer.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <button
            id="final-cta-button"
            onClick={handleFinalCta}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl bg-[#C89028] hover:bg-[#B8801E] text-stone-950 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer min-h-[52px]"
          >
            <span>Book My Free Strategy Call</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Microtext */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-stone-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#8D6112]" />
          <span>15-minute intro • No obligation • Built custom for your shop</span>
        </div>

      </div>
    </section>
  );
};
