import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { brandChecks } from '../scripts/brand-check.mjs';
import { makeSite, md, PROJECT } from './harness.mjs';
import { serve, launch } from './browser.mjs';

const TOKENS = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const TYPE = readFileSync(new URL('../src/styles/type.css', import.meta.url), 'utf8');
const OK_CSS = ':focus-visible { outline: 2px solid var(--accent); }\n@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }';
const OK_PAGE = '<html><body><a class="skip-link" href="#main">Skip</a><main id="main"></main></body></html>';

// A fixture project root: { 'src/styles/x.css': '…', 'dist/index.html': '…' }.
function check(files, config = {}) {
  const root = mkdtempSync(join(tmpdir(), 'jyc-brand-'));
  try {
    const all = { 'src/styles/tokens.css': TOKENS, 'src/styles/type.css': TYPE, 'dist/_astro/a.css': OK_CSS, 'dist/index.html': OK_PAGE, ...files };
    for (const [p, c] of Object.entries(all)) {
      if (c === null) continue;
      mkdirSync(dirname(join(root, p)), { recursive: true });
      writeFileSync(join(root, p), c);
    }
    return brandChecks({ root, config });
  } finally { rmSync(root, { recursive: true, force: true }); }
}

test('BRAND-004: the site\'s own tokens, type and pages pass', () => {
  assert.deepEqual(check({}).errors, []);
});

test('BRAND-004: a hex, rgb() or hsl() color outside the tokens file fails, naming the file and line', () => {
  const r = check({ 'src/styles/x.css': '.a { color: var(--ink); }\n.b { color: #fff; }\n.c { background: rgba(0, 0, 0, .1); }' });
  assert.equal(r.errors.length, 2);
  assert.match(r.errors[0], /Color "#fff" in src\/styles\/x\.css:2\. Colors come only from src\/styles\/tokens\.css/);
  const astro = check({ 'src/components/X.astro': '---\n---\n<p>hi</p>\n<style>\n.a { color: hsl(0 0% 0%); }\n</style>' });
  assert.match(astro.errors[0], /in src\/components\/X\.astro:5/);
});

test('BRAND-004: a type size that isn\'t a type token fails', () => {
  const r = check({ 'src/styles/x.css': '.a { font-size: 13px; }\n.b { font-size: var(--fs-label); }\n.c { font: 700 1rem Inter; }' });
  assert.equal(r.errors.length, 2);
  assert.match(r.errors[0], /Type size "13px" in src\/styles\/x\.css:1/);
  assert.match(r.errors[1], /font shorthand/);
});

test('BRAND-004: tokens without a recorded commit, or a pair below AA, fail', () => {
  assert.match(check({ 'src/styles/tokens.css': TOKENS.replace(/at commit [0-9a-f]{40}/, 'at commit ?') }).errors.join('\n'), /doesn't record the brand-system commit/);
  const r = check({ 'src/styles/tokens.css': TOKENS.replace('--muted:         #5B6875', '--muted:         #8A96A3') });
  assert.ok(r.errors.some((e) => /Contrast --muted \(#8A96A3\) on --bg \(#F8F5F0\) is \d\.\d\d:1, below WCAG AA/.test(e)), r.errors.join('\n'));
});

test('BRAND-004: an inline style, a font CDN, or a page with no skip link fails', () => {
  assert.match(check({ 'dist/x.html': OK_PAGE.replace('<main', '<main style="color:red"') }).errors.join('\n'), /Inline style on dist\/x\.html/);
  assert.match(check({ 'dist/x.html': OK_PAGE.replace('<body>', '<head><link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet"></head><body>') }).errors.join('\n'), /loads fonts from a CDN/);
  assert.match(check({ 'dist/_astro/b.css': '@font-face { font-family: X; src: url(https://example.com/x.woff2); }' }).errors.join('\n'), /@font-face loads from another site/);
  assert.match(check({ 'dist/x.html': '<html><body><main id="main"></main></body></html>' }).errors.join('\n'), /dist\/x\.html has no skip link/);
});

test('BRAND-004: no focus outline, or transitions left on under reduced motion, fails', () => {
  assert.match(check({ 'dist/_astro/a.css': '@media (prefers-reduced-motion: reduce) { * { transition: none; } }' }).errors.join('\n'), /No :focus-visible outline/);
  assert.match(check({ 'dist/_astro/a.css': ':focus-visible { outline: 2px solid red; }' }).errors.join('\n'), /prefers-reduced-motion/);
});

test('BRAND-004: placeholder media is a warning until the config makes it an error', () => {
  const files = { 'dist/x.html': OK_PAGE.replace('</main>', '<div data-placeholder-media></div></main>') };
  const w = check(files);
  assert.deepEqual(w.errors, []);
  assert.match(w.warnings[0], /Placeholder media on 1 page\(s\): dist\/x\.html/);
  assert.match(check(files, { placeholderMedia: 'error' }).errors[0], /Placeholder media/);
});

test('BRAND-004: maturity is a badge with the §3 mapping, and demo availability is text', () => {
  const site = makeSite({
    'src/content/projects/a.md': md({ ...PROJECT, title: 'A', maturity: 'prototype', demo: 'none' }),
    'src/content/projects/b.md': md({ ...PROJECT, title: 'B', maturity: 'experiment', demo: 'on-request' }),
  });
  try {
    const r = site.run('check');
    assert.equal(r.code, 0, r.out);
    const h = site.read('dist/demos/index.html');
    assert.match(h, /<span class="maturity badge badge-prototype">Prototype<\/span>\s*<span class="demo">No demo<\/span>/);
    assert.match(h, /<span class="maturity badge badge-muted">Experiment<\/span>\s*<span class="demo">Demo on request<\/span>/);
    const c = site.read('dist/solutions/construction-os/index.html');
    assert.match(c, /badge badge-live">Live/);
    assert.match(c, /badge badge-beta">Beta/);
    assert.match(c, /badge badge-muted">In development/);
    assert.doesNotMatch(c, /class="[^"]*badge[^"]*">[^<]*demo/i, 'no demo badge');
  } finally { site.cleanup(); }
});

test('BRAND-004: no page scrolls sideways at 1280, 1024, 768 or 375px; the menu works with and without the script', { timeout: 300000 }, async () => {
  const site = makeSite({ 'src/content/projects/p.md': md({ ...PROJECT, title: 'A project with a long title that has to wrap on a phone' }) });
  let server, browser;
  try {
    assert.equal(site.build().code, 0);
    const pages = site.html().filter((p) => !/http-equiv="refresh"/.test(p.body)).map((p) => p.path);
    assert.ok(pages.length > 10);
    server = await serve(site);
    browser = await launch();
    for (const width of [1280, 1024, 768, 375]) {
      const page = await browser.newPage({ viewport: { width, height: 800 } });
      for (const p of pages) {
        await page.goto(server.url(p));
        const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        assert.equal(over, 0, `${p} at ${width}px scrolls sideways by ${over}px`);
      }
      await page.close();
    }

    // With the script, at 375px: the links collapse into the menu button, which opens and closes.
    const phone = await browser.newPage({ viewport: { width: 375, height: 667 } });
    await phone.goto(server.url('/about/'));
    const btn = phone.locator('[data-menu-button]');
    assert.ok(await btn.isVisible());
    assert.ok(!(await phone.locator('.site-nav a[href="/demos/"]').isVisible()));
    await btn.click();
    assert.equal(await btn.getAttribute('aria-expanded'), 'true');
    assert.ok(await phone.locator('[data-menu] a[href="/demos/"]').isVisible());
    await phone.keyboard.press('Escape');
    assert.ok(!(await phone.locator('[data-menu] a[href="/demos/"]').isVisible()));
    await phone.close();

    // Without it, every header link is visible and reachable.
    const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 667 } });
    const nojs = await ctx.newPage();
    await nojs.goto(server.url('/about/'));
    for (const href of ['/solutions/', '/demos/', '/writing/', '/training/', '/about/', '/work-with-me/']) {
      assert.ok(await nojs.locator(`header a[href="${href}"]`).first().isVisible(), `${href} without the script`);
    }
    assert.ok(!(await nojs.locator('[data-menu-button]').isVisible()));
    await ctx.close();
  } finally {
    await browser?.close();
    server?.stop();
    site.cleanup();
  }
});
