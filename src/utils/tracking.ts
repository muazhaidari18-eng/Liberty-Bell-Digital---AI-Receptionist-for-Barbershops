import { LeadFormData, CTALocation } from '../types';

/**
 * ============================================================================
 * LIBERTY BELL DIGITAL - TRACKING & CONVERSION SYSTEM
 * ============================================================================
 * Placeholders for Meta Pixel (Facebook Ads), Google Analytics 4,
 * Google Tag Manager (GTM), and GoHighLevel CRM Webhooks.
 */

// Safe helper to extract URL parameters (UTMs, Facebook Click ID)
export const getUrlTrackingParams = () => {
  if (typeof window === 'undefined') {
    return {
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmContent: '',
      utmTerm: '',
      fbclid: '',
      adCampaign: '',
      adSet: '',
      adCreative: '',
      landingPageUrl: '',
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || 'direct',
    utmMedium: params.get('utm_medium') || 'none',
    utmCampaign: params.get('utm_campaign') || 'meta_barber_ai_receptionist',
    utmContent: params.get('utm_content') || 'ad_v1',
    utmTerm: params.get('utm_term') || '',
    fbclid: params.get('fbclid') || '',
    adCampaign: params.get('ad_campaign') || params.get('utm_campaign') || 'Barber_AI_Campaign_2026',
    adSet: params.get('ad_set') || 'Barber_Shop_Owners_US',
    adCreative: params.get('ad_creative') || 'MidHaircut_LostCall_Video',
    landingPageUrl: window.location.href,
  };
};

/**
 * Trigger tracking events across all marketing pixels
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  const timestamp = new Date().toISOString();
  console.log(`📊 [Tracking Event]: ${eventName}`, { timestamp, ...params });

  // 1. META / FACEBOOK PIXEL
  /*
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, params);
  }
  */

  // 2. GOOGLE ANALYTICS 4 (GA4)
  /*
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
  */

  // 3. GOOGLE TAG MANAGER (GTM dataLayer)
  /*
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...params,
      timestamp,
    });
  }
  */
};

/**
 * Track specific CTA Button Clicks with location identification
 */
export const trackCTAClick = (location: CTALocation, buttonText: string) => {
  trackEvent('CTA_Click', {
    cta_location: location,
    cta_text: buttonText,
    landing_page_industry: 'barber',
  });
};

/**
 * Sync Lead to GoHighLevel CRM or backend webhook
 */
export const syncLeadToGoHighLevel = async (leadData: LeadFormData): Promise<{ success: boolean; leadId?: string }> => {
  console.log('🚀 [GoHighLevel CRM Lead Sync Object]:', JSON.stringify(leadData, null, 2));

  // PLACEHOLDER: Drop in your GoHighLevel Webhook or API Endpoint URL here:
  // const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/...';
  /*
  try {
    const response = await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error syncing lead to GoHighLevel:', error);
  }
  */

  return {
    success: true,
    leadId: `lead_ghl_${Date.now()}`,
  };
};
