import React, { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle2, Phone, Volume2, Sparkles, MessageCircle, Calendar } from 'lucide-react';
import { trackCTAClick } from '../utils/tracking';

interface DemoSectionProps {
  onOpenBooking: (source?: string) => void;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ onOpenBooking }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [step, setStep] = useState<number>(3); // 1 = customer asks, 2 = AI replies, 3 = customer confirms, 4 = booked

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="py-14 sm:py-20 bg-stone-100/60 border-y border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D29A32]/15 border border-[#D29A32]/30 text-[#8D6112] text-xs font-bold uppercase tracking-wider mb-3">
            Live Conversation Demo
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight font-display mb-3">
            How The AI Receptionist Handles A Call
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
            Natural, polite, and quick. Here is how a standard booking conversation sounds when a client calls your barbershop.
          </p>
        </div>

        {/* Demo Interface Card */}
        <div className="bg-white rounded-2xl border border-stone-300/80 shadow-lg overflow-hidden">
          
          {/* Audio Player / Call Status Bar */}
          <div className="bg-stone-900 px-5 py-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C89028] text-stone-950 flex items-center justify-center font-bold text-xs">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-100 flex items-center gap-2">
                  <span>Live Call Audio Demo</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-stone-400">
                  Liberty Bell AI Front Desk • Saturday Booking
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#D29A32]" />}
              <span>{isPlaying ? 'Pause Demo' : 'Play Demo'}</span>
            </button>
          </div>

          {/* Sound Waveform Visualization Bar */}
          <div className="bg-stone-950 px-6 py-2.5 flex items-center justify-center gap-1.5 border-b border-stone-800">
            <Volume2 className="w-3.5 h-3.5 text-[#D29A32] mr-2 shrink-0" />
            <div className="flex items-center gap-1 h-5 overflow-hidden">
              {[40, 65, 85, 30, 95, 75, 45, 100, 60, 35, 80, 50, 90, 65, 30, 75, 55, 95, 40, 70, 85, 50, 60, 40].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-[#D29A32] rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * (i % 3 + 1)) % 100)}%` : '20%',
                    opacity: isPlaying ? 0.9 : 0.3,
                  }}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-stone-400 ml-3">0:18 / 0:24</span>
          </div>

          {/* Chat Exchange Content */}
          <div className="p-6 sm:p-8 space-y-4 bg-[#FAF9F6]">
            
            {/* Step 1: Customer Question */}
            <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-30'}`}>
              <div className="flex items-start gap-3 max-w-lg">
                <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-xs font-bold shrink-0">
                  Caller
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-stone-200/90 shadow-sm text-stone-900">
                  <p className="text-sm font-medium">
                    "Do you have anything available Saturday afternoon?"
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: AI Response */}
            <div className={`transition-all duration-500 flex justify-end ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0'}`}>
              <div className="flex items-start justify-end gap-3 max-w-lg">
                <div className="bg-[#FAF4E5] p-4 rounded-2xl rounded-tr-none border border-[#D29A32]/40 shadow-sm text-stone-900 text-right">
                  <div className="text-[11px] font-bold text-[#8D6112] uppercase tracking-wider mb-1 flex items-center justify-end gap-1">
                    <Sparkles className="w-3 h-3 text-[#D29A32]" />
                    AI Receptionist
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    "Yes. I can help you with that. I currently have an opening at 3:30 PM. Would you like me to book it?"
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#C89028] text-stone-950 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  AI
                </div>
              </div>
            </div>

            {/* Step 3: Customer Confirmation */}
            <div className={`transition-all duration-500 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0'}`}>
              <div className="flex items-start gap-3 max-w-lg">
                <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-xs font-bold shrink-0">
                  Caller
                </div>
                <div className="bg-white p-3.5 px-5 rounded-2xl rounded-tl-none border border-stone-200/90 shadow-sm text-stone-900">
                  <p className="text-sm font-medium">
                    "Yes."
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4: Status Card */}
            <div className={`transition-all duration-500 pt-2 ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-90'}`}>
              <div className="bg-emerald-50 border-2 border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-950 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-emerald-950">
                      Appointment Booked — Saturday, 3:30 PM
                    </div>
                    <div className="text-xs text-emerald-800 font-medium">
                      SMS Confirmation Sent to Caller • Calendar Updated
                    </div>
                  </div>
                </div>

                <div className="shrink-0 bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-300/60">
                  Zero Barber Interruption
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
