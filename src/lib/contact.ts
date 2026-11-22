// Contact details (JYC-CAP-08): email and a booking link. No form and no backend.
export const EMAIL = 'justin@justinyurasits.com';
export const BOOKING_URL = 'https://cal.com/justinyurasits';

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
