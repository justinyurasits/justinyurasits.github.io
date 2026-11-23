// How maturity and demo read on a page. One place, so every page says it the same way.
export const MATURITY_LABEL: Record<string, string> = {
  live: 'Live',
  beta: 'Beta',
  prototype: 'Prototype',
  experiment: 'Experiment',
  'in-development': 'In development',
};
export const DEMO_LABEL: Record<string, string> = {
  public: 'Public demo',
  'on-request': 'Demo on request',
  none: 'No demo',
};
export const ROLE_LABEL: Record<string, string> = {
  built: 'Built',
  led: 'Led',
  both: 'Built and led',
};

// The maturity badge for each value (BRAND-004 §3).
export const MATURITY_BADGE: Record<string, string> = {
  live: 'badge-live',
  beta: 'badge-beta',
  prototype: 'badge-prototype',
  experiment: 'badge-muted',
  'in-development': 'badge-muted',
};
