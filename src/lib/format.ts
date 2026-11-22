// Shared formatting and URL helpers, so every page builds the same URLs.
export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const articleUrl = (id: string) => `/writing/${id}/`;
export const projectUrl = (id: string) => `/projects/${id}/`;
export const categoryUrl = (category: string) => `/writing/category/${slugify(category)}/`;
export const tagUrl = (tag: string) => `/writing/tags/${slugify(tag)}/`;

// The pathway page for each category: an article's "related expertise".
export const pathwayFor = (category: string) =>
  category === 'AI for Construction'
    ? { href: '/work-with-me/construction/', label: 'Construction AI Consulting' }
    : { href: '/work-with-me/enterprise/', label: 'Enterprise AI Consulting & Leadership' };
