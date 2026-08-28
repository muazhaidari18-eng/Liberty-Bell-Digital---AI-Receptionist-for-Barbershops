export interface LeadFormData {
  firstName: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  businessType: string;
  requestedService: string;
  website: string;
  notes: string;
  landingPageIndustry: string;
  landingPageUrl: string;
  adCampaign: string;
  adSet: string;
  adCreative: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  fbclid: string;
  dateCreated: string;
  appointmentStatus: 'pending_calendar' | 'booked' | 'in_person_requested';
  selectedDate?: string;
  selectedTime?: string;
  ctaSource?: string;
}

export type CTALocation = 
  | 'Nav'
  | 'Hero'
  | 'MidPageProblem'
  | 'AIReceptionist'
  | 'InPersonReview'
  | 'FinalCTA'
  | 'StickyBar'
  | 'Demo';
