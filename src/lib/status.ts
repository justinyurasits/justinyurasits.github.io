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
