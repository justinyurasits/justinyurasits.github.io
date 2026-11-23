// The BRAND-004 checks (brand-system brands/personal/BRAND.md §5), run by npm run check.
// Every result says what failed, where, and what to change.
//
//   colors        hex, rgb() and hsl() colors only in src/styles/tokens.css
//   type sizes    every font-size is a type token from src/styles/type.css
//   inline styles no style="" attribute on any page
//   font CDN      no page or stylesheet loads fonts from a CDN; @font-face is self-hosted
//   contrast      the handoff's §1 pairs and the §3 badge colors pass WCAG AA (4.5:1)
//   focus         a :focus-visible outline, a skip link to #main on every page, and no
//                 transitions under prefers-reduced-motion
//   placeholders  placeholder media ([data-placeholder-media]) is a warning until M2.8
//                 makes it an error in checks.config.json
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const TOKENS = 'src/styles/tokens.css';
const TYPE = 'src/styles/type.css';

function walk(dir, keep) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out.push(...walk(p, keep));
    else if (keep(p)) out.push(p);
  }
  return out.sort();
}

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, ' ');
const lineOf = (text, index) => text.slice(0, index).split('\n').length;

// The CSS a source file carries: a whole .css file, or the <style> blocks of an .astro file.
function cssSources(root) {
  return walk(join(root, 'src'), (p) => /\.(css|astro)$/.test(p)).map((file) => {
    const raw = readFileSync(file, 'utf8');
    if (file.endsWith('.css')) return { file, rel: relative(root, file), css: raw, offset: 0 };
    const blocks = [...raw.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)];
    return blocks.map((m) => ({ file, rel: relative(root, file), css: m[1], offset: lineOf(raw, m.index) - 1 }));
  }).flat();
}

// Custom properties with a hex value, from the tokens file.
export function tokenColors(css) {
  const out = {};
  for (const m of stripComments(css).matchAll(/(--[a-z0-9-]+)\s*:\s*(#[0-9a-f]{3,8})\b/gi)) out[m[1]] = m[2];
  return out;
}

function luminance(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// Text and the surfaces it sits on: the handoff's §1 pairs, and every badge color (§3) on
// every surface a badge can sit on.
const SURFACES = ['--bg', '--surface', '--panel', '--accent-pale'];
export const CONTRAST_PAIRS = [
  ['--ink', '--bg'], ['--body', '--bg'], ['--muted', '--bg'], ['--accent', '--bg'], ['--accent', '--surface'],
  ['--on-ink', '--ink'], ['--accent-strong', '--accent-pale'], ['--on-ink', '--code-bg'],
  ['--body', '--panel'], ['--ink', '--panel'],
  ...['--status-live', '--status-proto', '--muted'].flatMap((fg) => SURFACES.map((bg) => [fg, bg])),
  ['--accent', '--accent-pale'],
];

const FONT_CDN = /fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|fonts\.bunny\.net|fonts\.cdnfonts\.com/i;

export function brandChecks({ root, dist = join(root, 'dist'), config = {} } = {}) {
  const errors = [];
  const warnings = [];

  // colors and type sizes, in the source CSS
  for (const { rel, css, offset } of cssSources(root)) {
    const clean = stripComments(css);
    if (rel !== TOKENS) {
      for (const m of clean.matchAll(/#[0-9a-f]{3,8}\b(?![-\w])|\b(?:rgba?|hsla?)\(/gi)) {
        errors.push(`Color "${m[0]}" in ${rel}:${offset + lineOf(clean, m.index)}. Colors come only from ${TOKENS}: use a token such as var(--ink).`);
      }
    }
    if (rel !== TYPE) {
      for (const m of clean.matchAll(/font-size\s*:\s*([^;}]+)/gi)) {
        const v = m[1].trim();
        if (!/^var\(--fs-[a-z0-9-]+\)$/.test(v) && v !== 'inherit') {
          errors.push(`Type size "${v}" in ${rel}:${offset + lineOf(clean, m.index)}. Sizes come only from the type tokens in ${TYPE}: use one such as var(--fs-body).`);
        }
      }
      for (const m of clean.matchAll(/(?<![-\w])font\s*:\s*([^;}]+)/gi)) {
        if (m[1].trim() !== 'inherit') errors.push(`The font shorthand in ${rel}:${offset + lineOf(clean, m.index)} sets a size outside the type tokens. Use font-size: var(--fs-…) and the font-family tokens.`);
      }
    }
  }

  // contrast, from the tokens
  const tokensFile = join(root, TOKENS);
  if (!existsSync(tokensFile)) {
    errors.push(`${TOKENS} is missing. Copy it from brand-system brands/personal/tokens.css and record the commit in its header.`);
  } else {
    const raw = readFileSync(tokensFile, 'utf8');
    if (!/at commit [0-9a-f]{40}/.test(raw)) errors.push(`${TOKENS} doesn't record the brand-system commit it came from. Add "at commit <sha>" to its header.`);
    const colors = tokenColors(raw);
    for (const [fg, bg] of CONTRAST_PAIRS) {
      if (!colors[fg] || !colors[bg]) { errors.push(`Contrast pair ${fg} on ${bg}: ${!colors[fg] ? fg : bg} isn't in ${TOKENS}.`); continue; }
      const ratio = contrast(colors[fg], colors[bg]);
      if (ratio < 4.5) errors.push(`Contrast ${fg} (${colors[fg]}) on ${bg} (${colors[bg]}) is ${ratio.toFixed(2)}:1, below WCAG AA's 4.5:1. Fix the token in brand-system first.`);
    }
  }

  // the built site
  if (!existsSync(dist)) return { errors, warnings };
  const htmlFiles = walk(dist, (p) => p.endsWith('.html'));
  const cssFiles = walk(dist, (p) => p.endsWith('.css'));
  const builtCss = cssFiles.map((f) => readFileSync(f, 'utf8')).join('\n');
  const placeholderPages = [];

  for (const f of htmlFiles) {
    const html = readFileSync(f, 'utf8');
    const where = relative(root, f);
    if (/http-equiv="refresh"/i.test(html)) continue;
    if (/<[a-z][^>]*\sstyle="/i.test(html)) errors.push(`Inline style on ${where}. Put the rule in a stylesheet with tokens; no page has a style attribute.`);
    if (FONT_CDN.test(html)) errors.push(`${where} loads fonts from a CDN. Fonts are self-hosted (src/styles/fonts.css).`);
    if (!/<a[^>]*class="skip-link"[^>]*href="#main"/.test(html) || !/\sid="main"/.test(html)) errors.push(`${where} has no skip link to #main. Every page gets one from the Base layout.`);
    if (/data-placeholder-media/.test(html)) placeholderPages.push(where);
  }
  if (FONT_CDN.test(builtCss)) errors.push('A stylesheet loads fonts from a CDN. Fonts are self-hosted (src/styles/fonts.css).');
  for (const m of builtCss.matchAll(/@font-face\s*{[^}]*}/g)) {
    if (/url\(\s*["']?https?:/i.test(m[0])) errors.push(`An @font-face loads from another site: ${m[0].slice(0, 80)}…. Self-host the font under public/fonts/.`);
  }
  if (htmlFiles.length) {
    if (!/:focus-visible\s*{[^}]*outline\s*:/.test(builtCss)) errors.push('No :focus-visible outline in the built CSS. Every focusable element needs a visible focus (handoff §4).');
    const reduced = builtCss.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{([\s\S]*?})\s*}/)?.[1] ?? '';
    if (!/transition\s*:\s*none/.test(reduced)) errors.push('Transitions aren\'t turned off under prefers-reduced-motion (handoff §3). Keep the reduced-motion block in src/styles/base.css.');
  }
  if (placeholderPages.length) {
    const msg = `Placeholder media on ${placeholderPages.length} page(s): ${placeholderPages.join(', ')}. Replace it with approved media before launch (handoff §8, M2.18).`;
    (config.placeholderMedia === 'error' ? errors : warnings).push(msg);
  }
  return { errors, warnings };
}
