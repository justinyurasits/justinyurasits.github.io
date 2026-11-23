import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { runChecks } from '../scripts/check.mjs';
import { loadRegister } from '../src/lib/register.mjs';

const register = loadRegister();

function page({ title = 'T', description = 'D', canonical = 'https://justinyurasits.com/x/', type = 'website', body = '' } = {}) {
  return `<!doctype html><html><head><title>${title}</title><meta name="description" content="${description}">
<link rel="canonical" href="${canonical}"><meta property="og:type" content="${type}">
<meta property="og:title" content="${title}"><meta property="og:description" content="${description}"></head>
<body>${body}</body></html>`;
}

// A fixture dist/: { '/x/': html }, with every page in the sitemap unless told otherwise.
function check(pages, { sitemap = Object.keys(pages), rss = null, config = {}, reg = register } = {}) {
  const dist = mkdtempSync(join(tmpdir(), 'jyc-dist-'));
  try {
    for (const [url, html] of Object.entries(pages)) {
      const f = join(dist, url.endsWith('/') ? `${url}index.html` : url);
      mkdirSync(dirname(f), { recursive: true });
      writeFileSync(f, html);
    }
    writeFileSync(join(dist, 'sitemap-0.xml'), `<urlset>${sitemap.map((u) => `<url><loc>https://justinyurasits.com${u}</loc></url>`).join('')}</urlset>`);
    if (rss) writeFileSync(join(dist, 'rss.xml'), rss);
    return runChecks({ dist, register: reg, config, oldAddresses: [] });
  } finally { rmSync(dist, { recursive: true, force: true }); }
}

test('a clean page passes', () => {
  const r = check({ '/x/': page({ body: '<p>Hello</p>' }) });
  assert.deepEqual(r.errors, []);
});

test('facts register: a rendered fact that drifts fails, naming the page and the register value', () => {
  const r = check({ '/x/': page({ body: '<span data-fact="library.documentTypes">120</span>' }) });
  assert.equal(r.errors.length, 1);
  assert.match(r.errors[0], /Fact drift on \/x\/.*library\.documentTypes.*shows "120".*says "110"/);
  assert.deepEqual(check({ '/x/': page({ body: '<span data-fact="library.documentTypes">110</span>' }) }).errors, []);
});

test('facts register: a status that drifts fails', () => {
  const r = check({ '/x/': page({ body: '<span data-status="workflows.siteSafety" data-maturity="beta" data-demo="none">Beta</span>' }) });
  assert.match(r.errors.join('\n'), /Status drift.*workflows\.siteSafety.*beta\/none.*live\/public/);
});

test('facts register: a measured figure that isn\'t a register value fails on a non-article page', () => {
  const r = check({ '/x/': page({ body: '<p>From ~12 hrs to ~2 hrs.</p>' }) });
  assert.equal(r.errors.length, 1);
  assert.match(r.errors[0], /Figure "~12 hrs" on \/x\//);
});

test('facts register: figures inside an article are not checked against the register', () => {
  const art = page({ type: 'article', body: '<p>Industry surveys put it at ~12 hrs.</p>' });
  const r = check({ '/writing/a/': art }, { rss: '<rss><item><link>https://justinyurasits.com/writing/a/</link></item></rss>' });
  assert.deepEqual(r.errors, []);
});

test('facts register: a banned string fails', () => {
  const r = check({ '/x/': page({ body: '<p>Our AI-powered tool</p>' }) });
  assert.match(r.errors.join('\n'), /Banned string "AI-powered" on \/x\//);
});

test('facts register: a scoped ban applies only on its pages (Wellen and Beacon Hill on Construction OS)', () => {
  const body = '<p>Built at Beacon Hill Interiors while at Wellen Construction.</p>';
  const r = check({
    '/about/': page({ canonical: 'https://justinyurasits.com/about/', body }),
    '/solutions/construction-os/': page({ canonical: 'https://justinyurasits.com/solutions/construction-os/', body }),
    '/demos/x/': page({ canonical: 'https://justinyurasits.com/demos/x/', body: `<article data-scope="construction-os">${body}</article>` }),
    '/demos/y/': page({ canonical: 'https://justinyurasits.com/demos/y/', body }),
  });
  const bans = r.errors.filter((e) => /^Banned string/.test(e));
  assert.equal(bans.length, 4, bans.join('\n'));
  for (const e of bans) assert.match(e, /on \/(solutions\/construction-os|demos\/x)\/.*\(banned on the Construction OS page and case studies\)/);
});

test('facts register: "4–8 hrs" and "10 days → 3 days" are banned site-wide', () => {
  const r = check({ '/x/': page({ body: '<p>From 4–8 hrs. Once 10 days → 3 days.</p>' }) });
  assert.match(r.errors.join('\n'), /Banned string "4–8 hrs"/);
  assert.match(r.errors.join('\n'), /Banned string "10 days → 3 days"/);
});

test('no fees: a register fee value on any page fails, whatever the dash', () => {
  for (const shown of ['$4,000–6,000', '$4,000-6,000', 'From $2,000']) {
    const r = check({ '/x/': page({ body: `<p>${shown}</p>` }) });
    assert.match(r.errors.join('\n'), /^Fee /m, shown);
  }
});

test('no fees: other monetary figures are allowed', () => {
  const r = check({ '/x/': page({ body: '<p>A $2.4M renovation.</p>' }) });
  assert.deepEqual(r.errors, []);
});

test('basis: every metric in the register has one (#13); a missing basis is a warning by default and an error when configured', () => {
  assert.equal(check({ '/x/': page() }).warnings.filter((w) => /has no basis/.test(w)).length, 0);
  const reg = { ...register, metrics: register.metrics.map((m, i) => (i === 0 ? { ...m, basis: undefined } : m)) };
  const warn = check({ '/x/': page() }, { reg });
  assert.equal(warn.errors.length, 0);
  assert.equal(warn.warnings.filter((w) => /has no basis/.test(w)).length, 1);
  const err = check({ '/x/': page() }, { reg, config: { missingBasis: 'error' } });
  assert.ok(err.errors.some((e) => /has no basis/.test(e)));
});

test('the first-person rule is gone', () => {
  const r = check({ '/x/': page({ body: '<p>I built this, and my team shipped it with me.</p>' }) });
  assert.deepEqual(r.errors, []);
});

test('links: href="#", a missing page and a missing anchor each fail', () => {
  const r = check({
    '/x/': page({ body: '<a href="#">a</a><a href="/nope/">b</a><a href="/y/#here">c</a><a href="/y/#there">d</a>' }),
    '/y/': page({ body: '<h2 id="here">Here</h2>' }),
  });
  const all = r.errors.join('\n');
  assert.match(all, /Dead link href="#" on \/x\//);
  assert.match(all, /Broken link "\/nope\/" on \/x\//);
  assert.match(all, /Broken anchor "\/y\/#there"/);
  assert.doesNotMatch(all, /#here/);
});

test('discoverable: missing metadata, a page not in the sitemap, and an article not in the feed each fail', () => {
  const bare = '<!doctype html><html><head></head><body></body></html>';
  const r = check({
    '/a/': bare,
    '/b/': page(),
    '/writing/c/': page({ type: 'article' }),
  }, { sitemap: ['/a/', '/writing/c/'], rss: '<rss></rss>' });
  const all = r.errors.join('\n');
  assert.match(all, /\/a\/ .*is missing a <title>, a meta description, a canonical link, og:title, og:description/);
  assert.match(all, /\/b\/ .*isn't in the sitemap/);
  assert.match(all, /Article \/writing\/c\/ .*isn't in the RSS feed/);
});

test('every failure names the file and says what to change', () => {
  const r = check({ '/x/': page({ body: '<p>AI-powered</p>' }) });
  assert.match(r.errors[0], /\(.*x[\/\\]index\.html\)\. .+/);
});
