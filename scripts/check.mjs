// The site checks (product spec §5), run against the built site in dist/.
// Every result says what failed, where, and what to change.
//
//   facts register   claims rendered from the register match it; measured figures on
//                    non-article pages are register values; no banned strings
//   no fees          none of Justin's fee values appears on any page
//   basis            every metric has a basis (a warning or an error, per checks.config.json)
//   links            no href="#"; every internal link and its #anchor resolves
//   preserved links  every old site address reaches its destination, following redirect
//                    pages, and the anchor it points at exists there (JYC-CAP-09)
//   discoverable     every page has a title, description, canonical and social preview and
//                    is in the sitemap; every article is in the RSS feed
//   brand            the BRAND-004 checks, in scripts/brand-check.mjs
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegister, feeValues } from '../src/lib/register.mjs';
import { OLD_ADDRESSES } from '../src/data/old-addresses.mjs';
import { brandChecks } from './brand-check.mjs';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));

const dashes = (s) => s.replace(/[–—]/g, '-');
const decode = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').replace(/&rarr;/g, '→')
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

function htmlFiles(dist) {
  const out = [];
  const walk = (d) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (p.endsWith('.html')) out.push(p);
    }
  };
  walk(dist);
  return out.sort();
}

// The page's URL path, from its file in dist/.
function urlOf(dist, file) {
  const r = '/' + relative(dist, file).split('\\').join('/');
  return r.endsWith('/index.html') ? r.slice(0, -'index.html'.length) : r;
}

// Visible text plus attribute values, without comments, scripts and styles.
function textOf(html) {
  const body = html.replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const attrs = [...body.matchAll(/\s(?:content|alt|title|aria-label)="([^"]*)"/gi)].map((m) => m[1]);
  return decode(body.replace(/<[^>]+>/g, ' ') + ' ' + attrs.join(' ')).replace(/\s+/g, ' ');
}

const meta = (html, attr, name) => {
  const re = new RegExp(`<meta[^>]*${attr}="${name}"[^>]*>`, 'i');
  const tag = html.match(re)?.[0];
  return tag ? decode(tag.match(/content="([^"]*)"/i)?.[1] ?? '') : null;
};

const isRedirect = (html) => /<meta[^>]*http-equiv="refresh"/i.test(html);
const isArticle = (html) => meta(html, 'property', 'og:type') === 'article';

function resolveFact(register, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), register);
}

// Measured figures written like the register writes them: "up to 8 hrs", "~30 min", "~3 days".
const FIGURE = /(?:up to|~)\s?\d+(?:\.\d+)?\s?(?:hrs?|hours?|min(?:utes)?|days?)\b/gi;
const normFigure = (s) => s.toLowerCase().replace(/\s+/g, ' ').replace(/~ /, '~')
  .replace(/\bhours?\b/, 'hrs').replace(/\bhr\b/, 'hrs').replace(/\bminutes\b/, 'min').replace(/\bday\b/, 'days');

export function runChecks({ dist = join(ROOT, 'dist'), register = loadRegister(), config = {}, oldAddresses = OLD_ADDRESSES } = {}) {
  const errors = [];
  const warnings = [];
  const missingBasis = config.missingBasis ?? 'warn';
  const files = htmlFiles(dist);
  const pages = new Map(files.map((f) => [urlOf(dist, f), { file: f, html: readFileSync(f, 'utf8') }]));
  const where = (url) => `${url} (${relative(ROOT, pages.get(url).file)})`;

  // basis
  for (const m of register.metrics) {
    if (!m.basis) {
      const msg = `Metric "${m.task}" has no basis. Add "basis" to it in content/facts.json: how and where it was measured.`;
      (missingBasis === 'error' ? errors : warnings).push(msg);
    }
  }

  const fees = feeValues(register);
  const allowedFigures = new Set(register.metrics.flatMap((m) => [m.before, m.after]).map(normFigure));

  for (const [url, { html }] of pages) {
    const text = textOf(html);

    // banned strings
    for (const b of register.banned) {
      if (text.toLowerCase().includes(b.toLowerCase())) {
        errors.push(`Banned string "${b}" on ${where(url)}. The register bans it: remove it or rephrase.`);
      }
    }

    // no fees
    for (const fee of fees) {
      const f = dashes(fee).toLowerCase();
      if (dashes(text).toLowerCase().includes(f)) {
        errors.push(`Fee "${fee}" on ${where(url)}. Justin's fees and service pricing never appear on the site.`);
      }
    }

    // facts rendered from the register: <… data-fact="path">value</…>
    for (const m of html.matchAll(/<([a-z0-9]+)[^>]*\sdata-fact="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/gi)) {
      const [, , path, inner] = m;
      const expected = resolveFact(register, path);
      const shown = decode(inner.replace(/<[^>]+>/g, '')).trim();
      if (expected === undefined) {
        errors.push(`Unknown fact "${path}" on ${where(url)}. Use a key that exists in content/facts.json.`);
      } else if (String(expected) !== shown) {
        errors.push(`Fact drift on ${where(url)}: "${path}" shows "${shown}", the register says "${expected}". Fix the page.`);
      }
    }

    // status rendered from the register: data-status="workflows.siteSafety" data-maturity="…" data-demo="…"
    for (const m of html.matchAll(/<[a-z0-9]+[^>]*\sdata-status="([^"]+)"[^>]*>/gi)) {
      const tag = m[0];
      const entry = resolveFact(register, m[1]);
      const mat = tag.match(/data-maturity="([^"]*)"/)?.[1];
      const demo = tag.match(/data-demo="([^"]*)"/)?.[1];
      if (!entry) errors.push(`Unknown status "${m[1]}" on ${where(url)}. Use a product or workflow key from content/facts.json.`);
      else if (entry.maturity !== mat || entry.demo !== demo) {
        errors.push(`Status drift on ${where(url)}: "${m[1]}" shows ${mat}/${demo}, the register says ${entry.maturity}/${entry.demo}. Fix the page.`);
      }
    }

    // measured figures on non-article pages must be register values
    if (!isArticle(html) && !isRedirect(html)) {
      for (const fig of text.match(FIGURE) ?? []) {
        if (!allowedFigures.has(normFigure(fig))) {
          errors.push(`Figure "${fig}" on ${where(url)} isn't a register value. Claims about Justin's products come from content/facts.json; use a register value or remove it.`);
        }
      }
    }

    // links
    const body = html.replace(/<!--[\s\S]*?-->/g, '');
    for (const h of body.matchAll(/href="([^"]*)"/g)) {
      const href = decode(h[1]);
      if (href === '#') { errors.push(`Dead link href="#" on ${where(url)}. Point it somewhere or remove it.`); continue; }
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const [pathPart, anchor] = href.split('#');
      const path = pathPart.split('?')[0];
      const target = path.endsWith('/') ? join(dist, path, 'index.html') : join(dist, path);
      const targetHtml = path === '' ? html : (existsSync(target) && statSync(target).isFile() ? (pages.get(urlOf(dist, target))?.html ?? '') : null);
      if (path && !existsSync(target)) {
        errors.push(`Broken link "${href}" on ${where(url)}: nothing is built at ${path}.`);
      } else if (anchor && targetHtml !== null && !new RegExp(`\\sid="${anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(targetHtml)) {
        errors.push(`Broken anchor "${href}" on ${where(url)}: ${path || url} has no element with id="${anchor}".`);
      }
    }
  }

  // preserved links: follow each old address to its final destination
  const fileFor = (path) => join(dist, path.endsWith('/') ? `${path}index.html` : path);
  for (const { from } of oldAddresses) {
    let path = from;
    let anchor = '';
    const seen = [];
    for (let hop = 0; ; hop++) {
      const f = fileFor(path);
      if (!existsSync(f)) {
        errors.push(seen.length
          ? `Old address ${from} redirects to ${path}, which isn't built. Fix its destination in src/data/old-addresses.mjs or build the page.`
          : `Old address ${from} isn't built. Every address in the JYC-CAP-09 table must keep working: add it to src/data/old-addresses.mjs.`);
        break;
      }
      const html = readFileSync(f, 'utf8');
      const refresh = html.match(/<meta[^>]*http-equiv="refresh"[^>]*content="\d+;\s*url=([^"]+)"/i)?.[1];
      if (!refresh) {
        if (anchor && !new RegExp(`\\sid="${anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(html)) {
          errors.push(`Old address ${from} points at ${path}#${anchor}, but ${path} has no element with id="${anchor}". Fix the anchor in src/data/old-addresses.mjs or on the page.`);
        }
        break;
      }
      seen.push(path);
      if (hop >= 5) {
        errors.push(`Old address ${from} redirects more than 5 times (${seen.join(' → ')}). Point it straight at its destination.`);
        break;
      }
      [path, anchor = ''] = decode(refresh).split('#');
    }
  }

  // discoverable
  const sitemapLocs = new Set();
  for (const f of readdirSync(dist).filter((f) => /^sitemap.*\.xml$/.test(f))) {
    for (const m of readFileSync(join(dist, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapLocs.add(new URL(m[1]).pathname);
  }
  const rss = existsSync(join(dist, 'rss.xml')) ? readFileSync(join(dist, 'rss.xml'), 'utf8') : null;
  for (const [url, { html }] of pages) {
    if (isRedirect(html) || url === '/404.html') continue;
    const missing = [];
    if (!/<title>[^<]+<\/title>/i.test(html)) missing.push('a <title>');
    if (!meta(html, 'name', 'description')) missing.push('a meta description');
    if (!/<link[^>]*rel="canonical"[^>]*href="[^"]+"/i.test(html)) missing.push('a canonical link');
    if (!meta(html, 'property', 'og:title')) missing.push('og:title');
    if (!meta(html, 'property', 'og:description')) missing.push('og:description');
    if (missing.length) errors.push(`${where(url)} is missing ${missing.join(', ')}. Every page needs SEO metadata and a social preview.`);
    if (!sitemapLocs.has(url)) errors.push(`${where(url)} isn't in the sitemap. Every published page must be.`);
    if (isArticle(html) && !(rss && rss.includes(new URL(url, 'https://justinyurasits.com').href))) {
      errors.push(`Article ${where(url)} isn't in the RSS feed (dist/rss.xml). Every published article must be.`);
    }
  }

  return { errors, warnings, pages: pages.size };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const config = JSON.parse(readFileSync(join(ROOT, 'checks.config.json'), 'utf8'));
  if (!existsSync(join(ROOT, 'dist'))) {
    console.error('✗ No built site in dist/. Run npm run build first (npm run check does both).');
    process.exit(1);
  }
  const { errors, warnings, pages } = runChecks({ config });
  const brand = brandChecks({ root: ROOT, config });
  errors.push(...brand.errors);
  warnings.push(...brand.warnings);
  for (const w of warnings) console.log(`⚠ ${w}`);
  for (const e of errors) console.log(`✗ ${e}`);
  console.log(`\n${pages} pages checked: ${errors.length} problem(s), ${warnings.length} warning(s).`);
  if (errors.length) {
    console.log('The site will not publish until every ✗ is fixed.');
    process.exit(1);
  }
  console.log(warnings.length ? 'Ready to publish. Warnings don\'t block publishing yet.' : 'Ready to publish.');
}
