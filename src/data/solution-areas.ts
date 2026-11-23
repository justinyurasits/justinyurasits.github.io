// The applied solution areas on Solutions (JYC-CAP-09). Each says what kind of work it is:
// an existing build, a consulting service or a possible custom engagement. The titles are
// provisional and the descriptions are copy, until the copy issue (#27).
export const AREA_KINDS = {
  'existing-build': 'Existing build',
  'consulting-service': 'Consulting service',
  'custom-engagement': 'Possible custom engagement',
} as const;
export type AreaKind = keyof typeof AREA_KINDS;

export interface SolutionArea {
  title: string;
  kind: AreaKind;
  description: string;
  link: { label: string; href: string };
}

export const SOLUTION_AREAS: SolutionArea[] = [
  {
    title: 'Enterprise AI Strategy',
    kind: 'consulting-service',
    description: '[COPY]',
    link: { label: 'Enterprise AI consulting', href: '/work-with-me/#enterprise' },
  },
  {
    title: 'Conversational & Agentic Systems',
    kind: 'consulting-service',
    description: '[COPY]',
    link: { label: 'Related builds in Demos', href: '/demos/' },
  },
  {
    title: 'Operational AI Workflows',
    kind: 'existing-build',
    description: '[COPY]',
    link: { label: 'Operations Automation', href: '/solutions/construction-os/#operations-automation' },
  },
];
