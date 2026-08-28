import React from 'react';
import { Eye, Search, Sliders, CalendarCheck, MapPin } from 'lucide-react';
import { trackCTAClick } from '../utils/tracking';

interface InPersonReviewSectionProps {
  onOpenBooking: (source?: string, isReview?: boolean) => void;
}

export const InPersonReviewSection: React.FC<InPersonReviewSectionProps> = ({ onOpenBooking }) => {
  const handleInPersonCta = () => {
    trackCTAClick('InPersonReview', 'Book My Free In-Person Business Review');
    onOpenBooking('InPersonReview', true);
  };

  const items = [
    {
      icon: Eye,
      title: 'We Learn Your Workflow',
      description:
        'We visit your shop or do a deep dive into your peak rush hours, seeing firsthand how calls come in, how walk-ins are handled, and how your barbers manage their day.',
    },
    {
      icon: Search,
      title: 'We Find The Bottlenecks',
      description:
        'We pinpoint exactly where calls are getting dropped, when phone interruptions slow down haircuts, and which times of day you are losing potential new regulars.',
    },
    {
      icon: Sliders,
      title: 'We Build Around Your Business',
      description:
        'We construct a tailored, shop-specific setup plan that connects seamlessly to your current booking software without altering how your barbers cut hair.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Background warm glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D29A32]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D29A32]/20 border border-[#D29A32]/40 text-[#D29A32] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Direct Hands-On Support
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display mb-4">
            We'll Come See How Your Shop Actually Works.
          </h2>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
            No distant tech support. We take the time to look at your actual front-counter flow and design a solution that fits your barbershop seamlessly.
          </p>
        </div>

        {/* 3 Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-stone-800/80 backdrop-blur-sm rounded-2xl p-7 border border-stone-700/80 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#D29A32]/20 border border-[#D29A32]/40 flex items-center justify-center text-[#D29A32] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-stone-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-700/60 text-xs font-medium text-stone-400">
                  Step 0{idx + 1} of Review
                </div>
              </div>
            );
          })}
        </div>

        {/* In-Person Review CTA Button */}
        <div className="text-center">
          <button
            id="inperson-review-cta-button"
            onClick={handleInPersonCta}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#C89028] hover:bg-[#B8801E] text-stone-950 font-bold text-base shadow-lg hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer min-h-[50px]"
          >
            <CalendarCheck className="w-5 h-5" />
            <span>Book My Free In-Person Business Review</span>
          </button>
          <div className="text-xs text-stone-400 mt-2.5">
            100% Free • In-Person or Zoom • Tailored specifically to your shop
          </div>
        </div>

      </div>
    </section>
  );
};
