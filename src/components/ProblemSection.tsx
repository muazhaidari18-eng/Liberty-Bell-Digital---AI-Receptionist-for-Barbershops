import React from 'react';
import { Scissors, Clock, PhoneMissed, ArrowRight } from 'lucide-react';
import { trackCTAClick } from '../utils/tracking';

interface ProblemSectionProps {
  onOpenBooking: (source?: string) => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenBooking }) => {
  const handleProblemCta = () => {
    trackCTAClick('MidPageProblem', "Let's Fix The Missed Calls");
    onOpenBooking('MidPageProblem');
  };

  const cards = [
    {
      icon: Scissors,
      title: "You're Busy With A Client",
      description:
        "Your hands are holding clippers, shears, or a straight razor. Stopping mid-haircut breaks your flow, slows down the shop, and compromises the experience for the client in your chair.",
      highlight: "In-chair focus",
    },
    {
      icon: Clock,
      title: "Customers Want Fast Answers",
      description:
        "Callers are looking for quick confirmation on pricing, walk-in availability, today's open slots, shop hours, or location. If no one answers, they rarely leave a voicemail.",
      highlight: "Instant answers",
    },
    {
      icon: PhoneMissed,
      title: "Slow Responses Lose Opportunities",
      description:
        "When a prospective client gets voicemail or endless ringing, they don't wait. They tap the very next barbershop on Google Maps and book with someone else in under 60 seconds.",
      highlight: "Lost revenue",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-stone-100/70 border-y border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-bold uppercase tracking-wider mb-3">
            The Reality Of A Busy Shop
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight font-display mb-4">
            Every Missed Call Could Be Your Next Regular.
          </h2>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            When you're mid-fade or styling a client, the phone on the counter rings. 
            You can't stop working to pick it up — but while that phone keeps ringing, a ready-to-pay customer is already looking for the next available barber.
          </p>
        </div>

        {/* 3 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] border border-[#D29A32]/30 flex items-center justify-center text-[#8D6112] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-400">
                  <span>Point 0{idx + 1}</span>
                  <span className="text-[#8D6112] bg-[#D29A32]/10 px-2 py-0.5 rounded">
                    {card.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button under problem */}
        <div className="text-center">
          <button
            id="problem-cta-button"
            onClick={handleProblemCta}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer min-h-[48px]"
          >
            <span>Let's Fix The Missed Calls</span>
            <ArrowRight className="w-4 h-4 text-[#D29A32]" />
          </button>
        </div>

      </div>
    </section>
  );
};
