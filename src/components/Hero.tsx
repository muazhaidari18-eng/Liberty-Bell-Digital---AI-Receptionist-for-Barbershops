import React from 'react';
import { Phone, Calendar, CheckCircle2, ShieldCheck, Sparkles, UserCheck, Clock, MessageSquareQuote } from 'lucide-react';
import { trackCTAClick } from '../utils/tracking';

interface HeroProps {
  onOpenBooking: (source?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const handleHeroCta = () => {
    trackCTAClick('Hero', 'Book My Free Strategy Call');
    onOpenBooking('Hero');
  };

  return (
    <section className="relative pt-6 pb-14 sm:pt-10 sm:pb-20 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E0AD4F]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-stone-300/20 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#D29A32]/15 border border-[#D29A32]/30 mb-4 sm:mb-5">
              <span className="w-2 h-2 rounded-full bg-[#C89028] animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase text-[#8D6112]">
                AI RECEPTIONIST FOR BARBERSHOPS
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-stone-900 leading-[1.12] tracking-tight mb-4 sm:mb-6 font-display">
              You Cut Hair. <br className="hidden sm:inline" />
              <span className="text-stone-900 underline decoration-[#C89028] decoration-wavy decoration-from-font">
                We'll Help Handle
              </span> The Calls.
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl mb-6 sm:mb-8 font-normal">
              Your customers shouldn't have to wait for you to finish a haircut before they can book. 
              Liberty Bell helps barbershops answer calls, handle common questions, and book appointments automatically with an AI Receptionist built around your business.
            </p>

            {/* Primary CTA & Microtext */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-3">
              <button
                id="hero-cta-button"
                onClick={handleHeroCta}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl bg-[#C89028] hover:bg-[#B8801E] text-stone-950 font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer min-h-[50px]"
              >
                <span>Book My Free Strategy Call</span>
              </button>
            </div>

            {/* Microtext */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-500">
              <ShieldCheck className="w-4 h-4 text-[#8D6112] shrink-0" />
              <span>Free consultation • No pressure • Built around your shop.</span>
            </div>

          </div>

          {/* Right Column: Barbershop Visual with Live AI Receptionist Call Overlay */}
          <div className="lg:col-span-5 relative mt-2 sm:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Barbershop Photo Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-300/80 bg-stone-900 group">
                <img 
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80" 
                  alt="Barber cutting hair while AI handles incoming shop calls"
                  className="w-full h-80 sm:h-96 object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
                
                {/* Active in-chair badge */}
                <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-semibold text-stone-200">Chair 1 • Fade in Progress</span>
                </div>
              </div>

              {/* Incoming Call & AI Response Floating Card Overlay */}
              <div className="absolute -bottom-6 -left-2 sm:-left-6 right-2 sm:right-6 bg-white/95 backdrop-blur-lg rounded-xl p-4 sm:p-5 shadow-2xl border border-stone-200/90 text-stone-900">
                
                {/* Live Call Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                      <Phone className="w-4 h-4 animate-bounce" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        Incoming Call Answered
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                          0:24
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 font-medium">
                        Marcus V. (New Customer)
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-[#8D6112] bg-[#D29A32]/10 px-2 py-0.5 rounded border border-[#D29A32]/20">
                      AI Front Desk
                    </span>
                  </div>
                </div>

                {/* Real-time Voice / Conversation Excerpt */}
                <div className="space-y-2 text-xs">
                  <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-200/60 text-stone-700">
                    <span className="font-semibold text-stone-900">Caller: </span>
                    "Hey, can I get a skin fade with Joe this Saturday around 3:30?"
                  </div>

                  <div className="bg-[#FAF6EE] rounded-lg p-2.5 border border-[#D29A32]/30 text-stone-800 flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#C89028] text-white flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-[#8D6112]">AI Receptionist: </span>
                      "Yes! Saturday at 3:30 PM is open with Joe. I've locked that in for you."
                    </div>
                  </div>
                </div>

                {/* Booked Confirmation Footer */}
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-medium text-stone-600">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Appointment Booked (Sat 3:30 PM)
                  </span>
                  <span className="text-stone-400">SMS Sent</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
