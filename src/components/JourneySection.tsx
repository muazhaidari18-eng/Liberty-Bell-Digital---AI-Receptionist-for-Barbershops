import React from 'react';
import { Phone, Bot, CalendarCheck, MessageSquare, BellRing, ArrowRight } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Phone,
      title: 'Customer Calls',
      desc: 'Dialing your shop number',
    },
    {
      number: '02',
      icon: Bot,
      title: 'AI Answers',
      desc: 'Instant, polite voice response',
    },
    {
      number: '03',
      icon: CalendarCheck,
      title: 'Appointment Gets Booked',
      desc: 'Direct into your shop calendar',
    },
    {
      number: '04',
      icon: MessageSquare,
      title: 'Customer Receives Confirmation',
      desc: 'Instant text with date & barber',
    },
    {
      number: '05',
      icon: BellRing,
      title: 'Automated Reminder Sent',
      desc: 'Reduces no-shows automatically',
    },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-200/80 text-stone-700 text-xs font-bold uppercase tracking-wider mb-3">
            Seamless Workflow
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight font-display mb-3">
            Customer Journey After A Lead Comes In
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-medium italic">
            "Simple for the customer. Less interruption for your team."
          </p>
        </div>

        {/* 5-Step Horizontal Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm relative flex flex-col justify-between group hover:border-[#D29A32]/60 hover:shadow-md transition-all"
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-[#8D6112] bg-[#FAF6EE] border border-[#D29A32]/30 px-2 py-0.5 rounded-md">
                    {step.number}
                  </span>
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block text-stone-300 group-hover:text-[#D29A32] transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Icon & Details */}
                <div>
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 mb-3 group-hover:bg-[#FAF6EE] group-hover:text-[#8D6112] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <h3 className="text-sm font-bold text-stone-900 mb-1 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-stone-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
