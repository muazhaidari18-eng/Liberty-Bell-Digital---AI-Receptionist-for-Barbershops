import React from 'react';
import { PhoneIncoming, CalendarCheck, HelpCircle, UserPlus, RefreshCw, MessageSquareText, Check } from 'lucide-react';
import { trackCTAClick } from '../utils/tracking';

interface SolutionSectionProps {
  onOpenBooking: (source?: string) => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenBooking }) => {
  const handleSolutionCta = () => {
    trackCTAClick('AIReceptionist', 'Book My Free Strategy Call');
    onOpenBooking('AIReceptionist');
  };

  const benefits = [
    {
      icon: PhoneIncoming,
      title: 'Answers Incoming Calls',
      description: 'Picks up on the first ring, 24/7/365. No busy signals, no voicemail black holes, and no interrupted fades.',
    },
    {
      icon: CalendarCheck,
      title: 'Books Appointments',
      description: 'Checks your real-time chair openings and books appointments directly into your current scheduling calendar.',
    },
    {
      icon: HelpCircle,
      title: 'Handles Common Questions',
      description: 'Answers pricing, haircut types, beard trim options, parking directions, and shop policies accurately.',
    },
    {
      icon: UserPlus,
      title: 'Captures New Clients',
      description: 'Collects names, verified phone numbers, and service preferences from every first-time caller for your records.',
    },
    {
      icon: RefreshCw,
      title: 'Helps With Rescheduling',
      description: 'Allows clients to adjust times, switch barbers, or reschedule appointments without phone tag.',
    },
    {
      icon: MessageSquareText,
      title: 'Follows Up',
      description: 'Sends instant SMS confirmation texts, calendar invites, and automated follow-ups for missed call inquiries.',
    },
  ];

  return (
    <section id="solution" className="py-14 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D29A32]/15 border border-[#D29A32]/30 text-[#8D6112] text-xs font-bold uppercase tracking-wider mb-3">
            The Liberty Bell Solution
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight font-display mb-4">
            Meet Your New Front Desk.
          </h2>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
            An intelligent AI phone receptionist trained specifically on your barbershop's services, team members, pricing, and booking calendar.
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:border-[#D29A32]/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#FAF6EE] border border-[#D29A32]/30 flex items-center justify-center text-[#8D6112] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2 flex items-center gap-2">
                    <span>{benefit.title}</span>
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2 text-xs font-medium text-[#8D6112]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Configured for your shop</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="bg-stone-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              Ready to free up your hands while keeping chairs booked?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              We'll review your current call flow and show you how it works with your schedule.
            </p>
          </div>
          <button
            onClick={handleSolutionCta}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#C89028] hover:bg-[#B8801E] text-stone-950 font-bold text-sm tracking-tight transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap min-h-[46px]"
          >
            Book My Free Strategy Call
          </button>
        </div>

      </div>
    </section>
  );
};
