// Contact details (JYC-CAP-08): email, a booking link, and LinkedIn as a supplement. No
// form and no backend.
export const EMAIL = 'justin@justinyurasits.com';
export const BOOKING_URL = 'https://cal.com/justinyurasits';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/justinjyurasits/';
// The résumé (JYC-CAP-06, M2.4), linked from the enterprise track. Replace the file in
// public/ to update it; the address stays the same.
export const RESUME_URL = '/justin-yurasits-resume.pdf';

// One email link per reason, each with a prefilled subject naming it, so inquiries arrive
// already sorted.
export const REASONS = [
  { id: 'consulting', label: 'Consulting', subject: 'Consulting' },
  { id: 'contract', label: 'Contract engagements', subject: 'Contract engagement' },
  { id: 'partnerships', label: 'Partnerships', subject: 'Partnership' },
  { id: 'speaking', label: 'Speaking', subject: 'Speaking' },
  { id: 'education', label: 'Education', subject: 'Education' },
] as const;

export type ReasonId = (typeof REASONS)[number]['id'];

export const mailto = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
export const reasonLink = (id: ReasonId) => mailto(REASONS.find((r) => r.id === id)!.subject);
