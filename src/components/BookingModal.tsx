import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Phone, User, Building, Mail, Sparkles } from 'lucide-react';
import { LeadFormData } from '../types';
import { getUrlTrackingParams, trackEvent, syncLeadToGoHighLevel } from '../utils/tracking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  ctaSource?: string;
  isInPersonReview?: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  ctaSource = 'Hero',
  isInPersonReview = false,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1); // 1 = Info, 2 = Calendar, 3 = Final Confirmation
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 1: Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: 'Barbershop',
    requestedService: isInPersonReview ? 'AI Receptionist' : 'Missing Calls',
    website: '',
    notes: '',
  });

  // Step 2: Calendar state
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Generate available dates (next 7 days, excluding Sundays if desired)
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // skip Sunday (0)
      if (d.getDay() === 0) continue;
      dates.push({
        fullDate: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        monthDay: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      });
    }
    return dates;
  }, []);

  const timeSlots = [
    '9:30 AM',
    '11:00 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
    '5:30 PM',
  ];

  // Track modal open
  useEffect(() => {
    if (isOpen) {
      trackEvent('ViewContent', {
        content_name: 'Booking_Modal',
        content_category: 'Lead Generation',
        cta_source: ctaSource,
        is_in_person_review: isInPersonReview,
      });
      // Set default selected date
      if (availableDates.length > 0 && !selectedDate) {
        setSelectedDate(availableDates[0].fullDate);
      }
    } else {
      // Reset after close (with short delay)
      setTimeout(() => {
        setCurrentStep(1);
        setErrors({});
      }, 300);
    }
  }, [isOpen, ctaSource, isInPersonReview, availableDates]);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.businessType) newErrors.businessType = 'Please select a business type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setIsSubmitting(true);

    const tracking = getUrlTrackingParams();
    const leadPayload: LeadFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      businessName: formData.businessName,
      phone: formData.phone,
      email: formData.email,
      businessType: formData.businessType,
      requestedService: formData.requestedService,
      website: formData.website,
      notes: formData.notes,
      landingPageIndustry: 'barber',
      landingPageUrl: tracking.landingPageUrl,
      adCampaign: tracking.adCampaign,
      adSet: tracking.adSet,
      adCreative: tracking.adCreative,
      utmSource: tracking.utmSource,
      utmMedium: tracking.utmMedium,
      utmCampaign: tracking.utmCampaign,
      utmContent: tracking.utmContent,
      utmTerm: tracking.utmTerm,
      fbclid: tracking.fbclid,
      dateCreated: new Date().toISOString(),
      appointmentStatus: 'pending_calendar',
      ctaSource: ctaSource,
    };

    // Track standard Lead and Contact pixel events
    trackEvent('Lead', {
      value: 150.0,
      currency: 'USD',
      lead_source: 'Barber_Landing_Page',
      business_name: formData.businessName,
      business_type: formData.businessType,
      cta_source: ctaSource,
    });

    trackEvent('Contact', {
      phone: formData.phone,
      email: formData.email,
      business_type: formData.businessType,
    });

    await syncLeadToGoHighLevel(leadPayload);

    setIsSubmitting(false);
    // Proceed to Step 2: Choose a Time
    setCurrentStep(2);
  };

  const handleStep2Submit = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and time slot for your call.');
      return;
    }

    setIsSubmitting(true);

    const tracking = getUrlTrackingParams();
    const fullBookedLead: LeadFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      businessName: formData.businessName,
      phone: formData.phone,
      email: formData.email,
      businessType: formData.businessType,
      requestedService: formData.requestedService,
      website: formData.website,
      notes: formData.notes,
      landingPageIndustry: 'barber',
      landingPageUrl: tracking.landingPageUrl,
      adCampaign: tracking.adCampaign,
      adSet: tracking.adSet,
      adCreative: tracking.adCreative,
      utmSource: tracking.utmSource,
      utmMedium: tracking.utmMedium,
      utmCampaign: tracking.utmCampaign,
      utmContent: tracking.utmContent,
      utmTerm: tracking.utmTerm,
      fbclid: tracking.fbclid,
      dateCreated: new Date().toISOString(),
      appointmentStatus: isInPersonReview ? 'in_person_requested' : 'booked',
      selectedDate: selectedDate,
      selectedTime: selectedTime,
      ctaSource: ctaSource,
    };

    // Track Schedule & BookedAppointment events
    trackEvent('Schedule', {
      appointment_date: selectedDate,
      appointment_time: selectedTime,
      business_name: formData.businessName,
    });

    trackEvent('BookedAppointment', {
      appointment_date: selectedDate,
      appointment_time: selectedTime,
      is_in_person_review: isInPersonReview,
    });

    await syncLeadToGoHighLevel(fullBookedLead);

    setIsSubmitting(false);
    setCurrentStep(3); // Step 3: Success state
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-300 overflow-hidden text-stone-900 my-4">
        
        {/* Modal Header */}
        <div className="bg-white px-6 py-5 border-b border-stone-200 flex items-start justify-between">
          <div>
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8D6112] bg-[#FAF6EE] border border-[#D29A32]/30 px-2 py-0.5 rounded">
                {currentStep === 1 && 'Step 1 of 2 • Business Information'}
                {currentStep === 2 && 'Step 2 of 2 • Choose a Time'}
                {currentStep === 3 && 'Booking Confirmed'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight font-display">
              {isInPersonReview 
                ? 'Book Your Free In-Person Business Review' 
                : 'Book Your Free Strategy Call'}
            </h3>

            {currentStep === 1 && (
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                Tell us a little about your business and we'll take a look at where you may be losing calls, leads, bookings, or customers.
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 p-2 rounded-full transition-colors cursor-pointer shrink-0 ml-3"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {/* ================= STEP 1: BUSINESS INFORMATION ================= */}
          {currentStep === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.firstName ? 'border-red-500 bg-red-50/40' : 'border-stone-300 bg-white'
                    } text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D29A32]`}
                  />
                  {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vance"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.lastName ? 'border-red-500 bg-red-50/40' : 'border-stone-300 bg-white'
                    } text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D29A32]`}
                  />
                  {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Row 2: Business Name & Business Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Crown & Blade Barbershop"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.businessName ? 'border-red-500 bg-red-50/40' : 'border-stone-300 bg-white'
                    } text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D29A32]`}
                  />
                  {errors.businessName && <p className="text-red-600 text-xs mt-1">{errors.businessName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D29A32]"
                  >
                    <option value="Barbershop">Barbershop (Multi-Chair)</option>
                    <option value="Hair Salon">Hair Salon / Studio</option>
                    <option value="Grooming Studio">Grooming Studio</option>
                    <option value="Independent Stylist">Independent Stylist / Suite</option>
                    <option value="Appointment-Based Beauty">Appointment-Based Beauty</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Phone Number & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.phone ? 'border-red-500 bg-red-50/40' : 'border-stone-300 bg-white'
                    } text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D29A32]`}
                  />
                  {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="owner@yourbarbershop.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.email ? 'border-red-500 bg-red-50/40' : 'border-stone-300 bg-white'
                    } text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D29A32]`}
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Recommended Field: What would you like help with? */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  What would you like help with? <span className="text-stone-400 font-normal">(Recommended)</span>
                </label>
                <select
                  value={formData.requestedService}
                  onChange={(e) => setFormData({ ...formData, requestedService: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D29A32]"
                >
                  <option value="Missing Calls">Missing Calls (Need AI Front Desk)</option>
                  <option value="Getting More Leads">Getting More Leads</option>
                  <option value="Booking More Appointments">Booking More Appointments</option>
                  <option value="Website">Barbershop Booking Website</option>
                  <option value="Google Visibility">Google Visibility & Map Pack</option>
                  <option value="Advertising">Meta (Facebook & IG) Advertising</option>
                  <option value="Automated Follow-Up">Automated Follow-Up & SMS Reminders</option>
                  <option value="AI Receptionist">AI Receptionist Setup</option>
                  <option value="Not Sure Yet">Not Sure Yet / Full Review</option>
                </select>
              </div>

              {/* Optional Field: Website or Google Business Profile */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Website or Google Business Profile <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="https://... or shop name on Google Maps"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D29A32]"
                />
              </div>

              {/* Optional Field: Anything we should know? */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Anything we should know about your business? <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. We have 4 chairs, currently using Booksy, struggling with missed calls on Fridays and Saturdays."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D29A32]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-[#C89028] hover:bg-[#B8801E] text-stone-950 font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 min-h-[50px]"
                >
                  {isSubmitting ? (
                    <span>Processing Information...</span>
                  ) : (
                    <>
                      <span>{isInPersonReview ? 'Book My Free In-Person Business Review' : 'Book My Free Strategy Call'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Micro-trust */}
              <div className="text-center text-xs text-stone-500 pt-1">
                🔒 Your information is confidential and will never be shared.
              </div>

            </form>
          )}

          {/* ================= STEP 2: CHOOSE A TIME ================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              
              {/* Success Notification Banner for Step 1 info receipt */}
              <div className="bg-emerald-50 border border-emerald-500/30 rounded-xl p-4 text-emerald-950 text-xs sm:text-sm">
                <div className="font-bold flex items-center gap-1.5 text-emerald-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Information Received for {formData.businessName}</span>
                </div>
                <p className="text-emerald-800 text-xs">
                  Choose a time that works for you below and we'll talk through your business, what's currently happening, and where Liberty Bell may be able to help.
                </p>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#8D6112]" />
                  Select A Day
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.fullDate;
                    return (
                      <button
                        key={item.fullDate}
                        type="button"
                        onClick={() => setSelectedDate(item.fullDate)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C89028] text-stone-950 border-[#C89028] font-bold shadow-sm'
                            : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="text-xs uppercase font-medium">{item.dayName}</div>
                        <div className="text-sm font-extrabold">{item.monthDay}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#8D6112]" />
                  Select A Time Slot (EST)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {timeSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 px-3 rounded-xl border text-center text-sm font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleStep2Submit}
                  disabled={isSubmitting || !selectedTime}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#C89028] hover:bg-[#B8801E] disabled:bg-stone-300 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
                >
                  {isSubmitting ? (
                    <span>Confirming Time...</span>
                  ) : (
                    <>
                      <span>Confirm {selectedTime ? `${selectedTime} Appointment` : 'Selected Time'}</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 3: SUCCESS STATE ================= */}
          {currentStep === 3 && (
            <div className="text-center py-6 px-2 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-stone-900 tracking-tight font-display mb-2">
                  You're Booked.
                </h4>
                <p className="text-stone-700 text-sm max-w-md mx-auto leading-relaxed">
                  We'll see you then. Check your phone and email for confirmation.
                </p>
              </div>

              {/* Booked Summary Card */}
              <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm max-w-sm mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Business:</span>
                  <span className="font-bold text-stone-900">{formData.businessName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Contact:</span>
                  <span className="font-semibold text-stone-900">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Scheduled:</span>
                  <span className="font-bold text-[#8D6112]">{selectedDate} @ {selectedTime} EST</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Format:</span>
                  <span className="font-semibold text-stone-900">{isInPersonReview ? 'In-Person / On-Site Review' : 'Direct Strategy Call'}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs tracking-wide transition-all cursor-pointer"
                >
                  Close & Return To Page
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
