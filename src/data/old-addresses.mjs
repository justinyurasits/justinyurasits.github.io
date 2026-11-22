// Every address on the old Construction OS site, and where it goes now: the JYC-CAP-09
// table, approved with the product spec. The redirect pages, the sitemap and the
// preserved-links check all read this one list.
//
//   to       the destination, for an address that moves (served as a redirect page)
//   kept     the address stays and serves the page itself
//   article  an old article: it goes to the migrated article once one that `replaces` this
//            address is published, and to the writing library until then
export const OLD_ADDRESSES = [
  { from: '/', kept: true },
  { from: '/services.html', to: '/work-with-me/construction/' },
  { from: '/engagements.html', to: '/work-with-me/construction/' },
  { from: '/work.html', to: '/projects/' },
  { from: '/insights.html', to: '/writing/' },
  { from: '/about.html', to: '/about/' },
  { from: '/privacy.html', kept: true },
  { from: '/terms.html', kept: true },
  { from: '/tribal-knowledge.html', article: true },
  { from: '/eighty-ninety-problem.html', article: true },
  { from: '/ai-projects-fail.html', article: true },
  { from: '/products/document-workbench.html', to: '/construction-os/#document-workbench' },
  { from: '/products/construction-intelligence.html', to: '/construction-os/#construction-intelligence' },
  { from: '/products/operations-automation.html', to: '/construction-os/#operations-automation' },
  { from: '/products/project-intelligence.html', to: '/construction-os/#project-intelligence' },
  { from: '/products/custom-solutions.html', to: '/work-with-me/construction/' },
];

export const ARTICLE_FALLBACK = '/writing/';

// Kept .html addresses served by a page file (privacy.astro builds to /privacy.html).
export const KEPT_HTML = OLD_ADDRESSES.filter((a) => a.kept && a.from.endsWith('.html')).map((a) => a.from);
