import React from 'react';
import { Ear, Wrench, Trophy, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const cards = [
    {
      icon: Ear,
      title: 'We Listen First',
      description:
        'We take the time to understand your shop’s unique schedule, service menu, team members, pricing rules, and how you prefer to communicate with your regulars.',
    },
    {
      icon: Wrench,
      title: 'We Build Around You',
      description:
        'No cookie-cutter templates or clunky robots. The AI Receptionist is trained specifically on your shop’s vocabulary, tone, policies, and existing booking software.',
    },
    {
      icon: Trophy,
      title: 'We Stay Focused On Results',
      description:
        'Our sole measure of success is clear: zero missed client calls while you cut hair, more confirmed appointments in your chairs, and less stress at the front counter.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D29A32]/15 border border-[#D29A32]/30 text-[#8D6112] text-xs font-bold uppercase tracking-wider mb-3">
            Why Liberty Bell Digital
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight font-display mb-4">
            Built For Real Barbershop Owners
          </h2>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            We don't deliver generic tech gimmicks. We build practical, dependable systems that respect your time, craft, and clients.
          </p>
        </div>

        {/* 3 Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-sm hover:border-[#D29A32]/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] border border-[#D29A32]/30 flex items-center justify-center text-[#8D6112] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-[#8D6112]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Liberty Bell Principle 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
