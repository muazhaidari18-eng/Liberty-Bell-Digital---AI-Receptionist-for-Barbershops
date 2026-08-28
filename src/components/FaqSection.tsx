import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Will the AI sound robotic?',
      a: 'No. It uses natural, conversational voice technology that speaks smoothly and politely, answering questions about your shop just like an attentive front desk receptionist.',
    },
    {
      q: 'Can it book into my calendar?',
      a: 'Yes. It connects directly with leading booking platforms (such as Booksy, Squire, Vagaro, Fresha, Calendly, and Google Calendar) to check real-time openings and lock in bookings.',
    },
    {
      q: 'What happens if a customer needs a real person?',
      a: 'The AI can instantly transfer urgent calls directly to your phone or send you an immediate SMS summary with the caller’s contact info and request so you can call back when your hands are free.',
    },
    {
      q: 'Can it answer after hours?',
      a: 'Yes. It operates 24/7/365, allowing late-night, Sunday, and early-morning callers to easily book an appointment rather than dialing the next shop on Google.',
    },
    {
      q: 'Can you help with more than phone calls?',
      a: 'Yes. In addition to the AI Receptionist, we design high-converting barbershop websites, optimize your Google Maps profile, run targeted Meta ads, and automate SMS appointment reminders.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-200/80 text-stone-700 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#8D6112]" />
            Frequently Asked Questions
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight font-display mb-3">
            Got Questions? We Have Answers.
          </h2>

          <p className="text-sm sm:text-base text-stone-600">
            Quick, honest answers to the most common questions barbers ask us.
          </p>
        </div>

        {/* 5 FAQ Accordion Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-stone-900 hover:text-[#8D6112] transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#FAF6EE] text-[#8D6112]' : 'text-stone-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-stone-600 leading-relaxed border-t border-stone-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
