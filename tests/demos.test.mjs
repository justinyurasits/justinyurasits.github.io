// JYC-CAP-05 on the Demos & Builds page (M2.13): what a visitor can view and the
// limitations on every entry, "No demo" meaning no demo, the featured build first, and
// topic filters that leave every entry showing without JavaScript.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite, md, PROJECT } from './harness.mjs';
import { serve, launch } from './browser.mjs';

function withSite(files, fn, { expectFail = false } = {}) {
  const site = makeSite(files);
  try {
    const r = site.run('check');
    if (expectFail) assert.notEqual(r.code, 0, r.out); else assert.equal(r.code, 0, r.out);
    fn(site, r);
  } finally { site.cleanup(); }
}

const cardOf = (html, id) => html.match(new RegExp(`<article[^>]*data-project="${id}"[\\s\\S]*?</article>`))?.[0] ?? '';

test('CAP-05: every entry shows what a visitor can view and its limitations, on its card and its case study', () => {
  withSite({ 'src/content/projects/p.md': md({ ...PROJECT, whatYouCanView: 'The intake screen and a sample report.', limitations: 'Reads PDFs only.' }) }, (s) => {
    for (const page of ['dist/demos/index.html', 'dist/demos/p/index.html']) {
      const h = s.read(page);
      assert.match(h, /<dt[^>]*>What you can view<\/dt>\s*<dd[^>]*>The intake screen and a sample report\.<\/dd>/, page);
      assert.match(h, /<dt[^>]*>Limitations<\/dt>\s*<dd[^>]*>Reads PDFs only\.<\/dd>/, page);
      assert.match(h, /<dt[^>]*>Justin's role<\/dt>/, page);
    }
  });
});

test('CAP-05: an entry with demo "none" reads "No demo", and the build fails if its content mentions a demo', () => {
  withSite({ 'src/content/projects/p.md': md({ ...PROJECT, demo: 'none' }) }, (s) => {
    for (const page of ['dist/demos/index.html', 'dist/demos/p/index.html']) {
      const h = s.read(page);
      assert.match(h, /<span class="demo">No demo<\/span>/, page);
      const body = page.endsWith('/p/index.html') ? h.match(/<article class="cs"[\s\S]*?<\/article>/)[0] : cardOf(h, 'p');
      // The page's own name ("Demos & Builds") aside, the only mention is "No demo".
      const words = body.replace(/<[^>]+>/g, ' ').replace(/Demos &amp; Builds/g, '').match(/\bdemo\w*/gi);
      assert.deepEqual(words, ['demo'], `only "No demo" on ${page}`);
    }
  });
  withSite({ 'src/content/projects/p.md': md({ ...PROJECT, demo: 'none', whatYouCanView: 'A recorded demo of the intake flow.' }) }, (_, r) => {
    assert.match(r.out, /src\/content\/projects\/p: demo is "none", but whatYouCanView says "demo"/);
  }, { expectFail: true });
  withSite({ 'src/content/projects/p.md': md({ ...PROJECT, demo: 'none' }, 'Ask for a demonstration.') }, (_, r) => {
    assert.match(r.out, /demo is "none", but the body says "demonstration"/);
  }, { expectFail: true });
  // With a demo on request, the same words are fine.
  withSite({ 'src/content/projects/p.md': md({ ...PROJECT, demo: 'on-request', whatYouCanView: 'A recorded demo of the intake flow.' }) }, () => {});
});

test('M2.13: the featured build leads the page; without one, the first by order does', () => {
  withSite({
    'src/content/projects/a.md': md({ ...PROJECT, title: 'Alpha', order: 1 }),
    'src/content/projects/b.md': md({ ...PROJECT, title: 'Bravo', order: 2, featured: true }),
    'src/content/projects/c.md': md({ ...PROJECT, title: 'Charlie', order: 3 }),
  }, (s) => {
    const h = s.read('dist/demos/index.html');
    const order = [...h.matchAll(/<article[^>]*data-project="(\w+)"/g)].map((m) => m[1]);
    assert.deepEqual(order, ['b', 'a', 'c']);
    assert.match(cardOf(h, 'b'), /class="[^"]*demo-feature/);
    assert.match(cardOf(h, 'b'), /Featured build/);
    assert.match(cardOf(h, 'b'), /<h2[^>]*>Bravo<\/h2>/);
    assert.match(cardOf(h, 'a'), /<h3[^>]*>Alpha<\/h3>/);
    assert.ok(h.indexOf('data-project="b"') < h.indexOf('More builds and experiments'));
  });
  withSite({
    'src/content/projects/a.md': md({ ...PROJECT, title: 'Alpha', order: 2 }),
    'src/content/projects/c.md': md({ ...PROJECT, title: 'Charlie', order: 1 }),
  }, (s) => {
    const order = [...s.read('dist/demos/index.html').matchAll(/<article[^>]*data-project="(\w+)"/g)].map((m) => m[1]);
    assert.deepEqual(order, ['c', 'a']);
  });
});

test('CAP-05: picking a topic shows only matching entries; without JavaScript every entry shows', { timeout: 180000 }, async () => {
  const site = makeSite({
    'src/content/projects/a.md': md({ ...PROJECT, title: 'Alpha', order: 1, tags: ['Agents', 'Construction', 'Research'] }),
    'src/content/projects/b.md': md({ ...PROJECT, title: 'Bravo', order: 2, tags: ['Agents'] }),
    'src/content/projects/c.md': md({ ...PROJECT, title: 'Charlie', order: 3, tags: ['Evaluation'] }),
    'src/content/projects/d.md': md({ ...PROJECT, title: 'Delta', order: 4, tags: ['Construction'] }),
  });
  let server, browser;
  try {
    assert.equal(site.build().code, 0);
    const h = site.read('dist/demos/index.html');
    const chips = [...h.matchAll(/<button[^>]*data-filter="([\w-]+)"[^>]*>([^<]+)</g)].map((m) => `${m[1]}:${m[2]}`);
    assert.deepEqual(chips, ['all:All', 'agents:Agents', 'construction:Construction', 'evaluation:Evaluation', 'research:Research']);

    server = await serve(site);
    browser = await launch();
    const visible = async (page) => {
      const out = [];
      for (const id of ['a', 'b', 'c', 'd']) if (await page.locator(`[data-project="${id}"]`).isVisible()) out.push(id);
      return out;
    };

    const page = await browser.newPage();
    await page.goto(server.url('/demos/'));
    assert.ok(await page.locator('[data-filter-group="demos"]').isVisible());
    await page.locator('[data-filter="construction"]').click();
    assert.deepEqual(await visible(page), ['a', 'd']);
    assert.equal(await page.locator('[data-filter="construction"]').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('[data-filter-status]').textContent(), 'Showing 2 of 4');
    await page.locator('[data-filter="agents"]').click();
    assert.deepEqual(await visible(page), ['a', 'b']);
    await page.locator('[data-filter="evaluation"]').click();
    assert.deepEqual(await visible(page), ['c']);
    // Only the featured build matches: the "More builds" section hides with its cards.
    await page.locator('[data-filter="research"]').click();
    assert.deepEqual(await visible(page), ['a']);
    assert.ok(!(await page.locator('#more-title').isVisible()));
    await page.locator('[data-filter="all"]').click();
    assert.deepEqual(await visible(page), ['a', 'b', 'c', 'd']);
    await page.close();

    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const nojs = await ctx.newPage();
    await nojs.goto(server.url('/demos/'));
    assert.deepEqual(await visible(nojs), ['a', 'b', 'c', 'd']);
    assert.ok(!(await nojs.locator('[data-filter-group="demos"]').isVisible()), 'chips that do nothing stay hidden');
    await ctx.close();
  } finally {
    await browser?.close();
    server?.stop();
    site.cleanup();
  }
});
