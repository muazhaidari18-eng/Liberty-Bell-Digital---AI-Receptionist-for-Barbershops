import React from 'react';
import { Globe, MapPin, Target, SendHorizontal, ArrowUpRight } from 'lucide-react';
import { trackCTAClick } from '../utils/tracking';

interface AdditionalServicesProps {
  onOpenBooking: (source?: string) => void;
}

export const AdditionalServices: React.FC<AdditionalServicesProps> = ({ onOpenBooking }) => {
  const handleServiceClick = (serviceName: string) => {
    trackCTAClick('AIReceptionist', `Service: ${serviceName}`);
    onOpenBooking(`Service_${serviceName.replace(/\s+/g, '_')}`);
  };

  const services = [
    {
      icon: Globe,
      title: 'Booking Website',
      description:
        'A lightning-fast, mobile-first website designed exclusively for barbershops. Showcases your cuts, prices, team, and feeds clients directly into your booking system.',
      badge: 'High Conversion',
    },
    {
      icon: MapPin,
      title: 'Google Visibility',
      description:
        'Local SEO and Google Business Profile optimization to help your shop stand out in the Google Map Pack when local clients search "barbershop near me".',
      badge: 'Local Search',
    },
    {
      icon: Target,
      title: 'Meta Advertising',
      description:
        'Targeted Facebook and Instagram ad campaigns tailored to guys and families within 3-7 miles of your shop to keep slow chairs filled consistently.',
      badge: 'Neighborhood Reach',
    },
    {
      icon: SendHorizontal,
      title: 'Automated Follow-Up',
      description:
        'Automated SMS systems that send 3-week rebooking reminders, cut down no-shows, and automatically generate 5-star Google reviews from satisfied regulars.',
      badge: 'Client Retention',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-stone-100/70 border-y border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D29A32]/15 border border-[#D29A32]/30 text-[#8D6112] text-xs font-bold uppercase tracking-wider mb-3">
            Full Growth Stack
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight font-display mb-4">
            Additional Services Built For Barbershops
          </h2>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Beyond answering calls, Liberty Bell provides the targeted digital infrastructure that keeps your chairs booked every week.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx}
                onClick={() => handleServiceClick(service.title)}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:border-[#D29A32]/60 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] border border-[#D29A32]/30 flex items-center justify-center text-[#8D6112] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-[#8D6112] bg-[#D29A32]/10 px-2.5 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-2.5 flex items-center justify-between group-hover:text-[#8D6112] transition-colors">
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#8D6112] transition-colors" />
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 text-xs font-semibold text-stone-500 group-hover:text-stone-900 flex items-center gap-1">
                  <span>Include in your strategy call plan</span>
                  <span className="text-[#8D6112]">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
