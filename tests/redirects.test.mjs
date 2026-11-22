import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite, md, ARTICLE } from './harness.mjs';
import { serve, launch } from './browser.mjs';

// The JYC-CAP-09 table from the product spec, copied here so the data file can't drift
// from it unnoticed. null: kept at the same address.
const SPEC_TABLE = {
  '/': null,
  '/services.html': '/work-with-me/construction/',
  '/engagements.html': '/work-with-me/construction/',
  '/work.html': '/projects/',
  '/insights.html': '/writing/',
  '/about.html': '/about/',
  '/privacy.html': null,
  '/terms.html': null,
  '/tribal-knowledge.html': '/writing/',
  '/eighty-ninety-problem.html': '/writing/',
  '/ai-projects-fail.html': '/writing/',
  '/products/document-workbench.html': '/construction-os/#document-workbench',
  '/products/construction-intelligence.html': '/construction-os/#construction-intelligence',
  '/products/operations-automation.html': '/construction-os/#operations-automation',
  '/products/project-intelligence.html': '/construction-os/#project-intelligence',
  '/products/custom-solutions.html': '/work-with-me/construction/',
};
const file = (p) => (p === '/' ? 'dist/index.html' : `dist${p}`);
const refreshOf = (h) => h.match(/http-equiv="refresh" content="0; url=([^"]+)"/)?.[1];

let site;
test.before(() => { site = makeSite(); const r = site.run('check'); assert.equal(r.code, 0, r.out); });
test.after(() => site.cleanup());

test('CAP-09: the data file matches the spec table, all 16 addresses', async () => {
  const { OLD_ADDRESSES, ARTICLE_FALLBACK } = await import('../src/data/old-addresses.mjs');
  const fromData = Object.fromEntries(OLD_ADDRESSES.map((a) => [a.from, a.kept ? null : a.article ? ARTICLE_FALLBACK : a.to]));
  assert.deepEqual(fromData, SPEC_TABLE);
});

test('CAP-09: every moving address serves a redirect page (meta refresh plus canonical) to its destination', () => {
  for (const [from, to] of Object.entries(SPEC_TABLE)) {
    const h = site.read(file(from));
    if (to === null) {
      assert.equal(refreshOf(h), undefined, `${from} is kept, not redirected`);
      assert.match(h, /<header>[\s\S]*href="\/contact\/"/, `${from} is a real page`);
      continue;
    }
    assert.equal(refreshOf(h), to, from);
    assert.match(h, new RegExp(`<link rel="canonical" href="https://justinyurasits\\.com${to.split('#')[0].replace(/[/.]/g, '\\$&')}">`), from);
  }
});

test('CAP-09: privacy and terms are kept at their addresses and listed in the sitemap', () => {
  const sitemap = site.read('dist/sitemap-0.xml');
  for (const p of ['/privacy.html', '/terms.html']) assert.match(sitemap, new RegExp(`<loc>https://justinyurasits\\.com${p.replace('.', '\\.')}</loc>`));
  assert.doesNotMatch(sitemap, /\/privacy\/|\/terms\/|services\.html/);
});

test('CAP-09: in a browser, an old address lands on its destination, at its anchor', { timeout: 120000 }, async () => {
  const server = await serve(site);
  const browser = await launch();
  try {
    const page = await browser.newPage();
    for (const from of ['/products/document-workbench.html', '/services.html', '/insights.html']) {
      await page.goto(server.url(from));
      await page.waitForURL((u) => u.pathname + u.hash === SPEC_TABLE[from], { timeout: 15000 });
      assert.notEqual(await page.title(), 'Moved', from);
      const anchor = SPEC_TABLE[from].split('#')[1];
      if (anchor) assert.equal(await page.locator(`#${anchor}`).count(), 1, `${from}: #${anchor} is on the page`);
    }
  } finally { await browser.close(); server.stop(); }
});

test('CAP-09: an old article address goes to the library until the migrated article is published, then to the article', () => {
  const s = makeSite({ 'src/content/articles/what-walks-out.md': md({ ...ARTICLE, replaces: ['/tribal-knowledge.html'] }) });
  try {
    const r = s.run('check');
    assert.equal(r.code, 0, r.out);
    assert.equal(refreshOf(s.read('dist/tribal-knowledge.html')), '/writing/what-walks-out/');
    assert.equal(refreshOf(s.read('dist/ai-projects-fail.html')), '/writing/');
  } finally { s.cleanup(); }
  const d = makeSite({ 'src/content/articles/what-walks-out.md': md({ ...ARTICLE, draft: true, replaces: ['/tribal-knowledge.html'] }) });
  try {
    assert.equal(d.run('check').code, 0);
    assert.equal(refreshOf(d.read('dist/tribal-knowledge.html')), '/writing/');
  } finally { d.cleanup(); }
});

test('CAP-09: the check fails when a destination or its anchor is missing', () => {
  // Renaming a product moves its anchor; the old /products/ address then points nowhere.
  const facts = JSON.parse(site.read('content/facts.json'));
  facts.products.documentWorkbench.name = 'Doc Bench';
  const a = makeSite({ 'content/facts.json': JSON.stringify(facts) });
  try {
    const r = a.run('check');
    assert.notEqual(r.code, 0);
    assert.match(r.out, /Old address \/products\/document-workbench\.html points at \/construction-os\/#document-workbench, but \/construction-os\/ has no element with id="document-workbench"/);
  } finally { a.cleanup(); }
  // A destination that isn't built.
  const b = makeSite({}, { remove: ['src/pages/projects/index.astro'] });
  try {
    const r = b.run('check');
    assert.notEqual(r.code, 0);
    assert.match(r.out, /Old address \/work\.html redirects to \/projects\/, which isn't built/);
  } finally { b.cleanup(); }
});
