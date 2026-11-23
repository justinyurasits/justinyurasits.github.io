import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite, md, ARTICLE } from './harness.mjs';
import { serve, launch } from './browser.mjs';

const section = (html, name) => html.split(`data-section="${name}"`)[1]?.split('</section>')[0] ?? '';

test('CAP-02: a new article appears in every listing, the feed and the sitemap, with none edited by hand', () => {
  const site = makeSite({
    'src/content/articles/older.md': md({ ...ARTICLE, title: 'Older one', date: '2026-01-01', category: 'Enterprise AI & Product Leadership', tags: ['Product Strategy'] }),
    'src/content/articles/new-one.md': md({ ...ARTICLE, title: 'New one', date: '2026-11-15', category: 'AI for Construction', tags: ['Evaluation', 'Construction OS'] }),
    'src/content/articles/hidden.md': md({ ...ARTICLE, title: 'Hidden draft', date: '2026-11-20', draft: true, tags: ['Evaluation'] }),
  });
  try {
    const r = site.build();
    assert.equal(r.code, 0, r.out);
    const lib = site.read('dist/writing/index.html');
    assert.match(section(lib, 'all'), /New one/);
    // Recent would only repeat "All writing", so it's hidden (Justin, 2026-11-23).
    assert.doesNotMatch(lib, /data-section="recent"/);
    assert.ok(section(lib, 'all').indexOf('New one') < section(lib, 'all').indexOf('Older one'), 'newest first');
    assert.match(site.read('dist/writing/category/ai-for-construction/index.html'), /New one/);
    assert.doesNotMatch(site.read('dist/writing/category/ai-for-construction/index.html'), /Older one/);
    assert.match(site.read('dist/writing/category/enterprise-ai-and-product-leadership/index.html'), /Older one/);
    assert.match(site.read('dist/writing/tags/evaluation/index.html'), /New one/);
    assert.match(site.read('dist/writing/tags/construction-os/index.html'), /New one/);
    assert.match(site.read('dist/rss.xml'), /<link>https:\/\/justinyurasits\.com\/writing\/new-one\/<\/link>/);
    assert.match(site.read('dist/sitemap-0.xml'), /https:\/\/justinyurasits\.com\/writing\/new-one\//);
    // drafts appear nowhere
    const everything = site.html().map((p) => p.body).join('\n') + site.read('dist/rss.xml') + site.read('dist/sitemap-0.xml');
    assert.doesNotMatch(everything, /Hidden draft|writing\/hidden\//);
    // and the site checks pass on the result
    const c = site.run('check');
    assert.equal(c.code, 0, c.out);
  } finally { site.cleanup(); }
});

test('CAP-02: the featured section lists featured articles only', () => {
  const site = makeSite({
    'src/content/articles/f.md': md({ ...ARTICLE, title: 'Featured one', featured: true }),
    'src/content/articles/n.md': md({ ...ARTICLE, title: 'Plain one' }),
  });
  try {
    assert.equal(site.build().code, 0);
    const f = section(site.read('dist/writing/index.html'), 'featured');
    assert.match(f, /Featured one/);
    assert.doesNotMatch(f, /Plain one/);
  } finally { site.cleanup(); }
});

test('CAP-02: a featured article set back to draft is replaced in the library by the newest published article in its category', () => {
  const CON = 'AI for Construction';
  const files = {
    'src/content/articles/star.md': md({ ...ARTICLE, title: 'The star', category: CON, date: '2026-11-10', featured: true }),
    'src/content/articles/older-con.md': md({ ...ARTICLE, title: 'Older construction', category: CON, date: '2026-10-01' }),
    'src/content/articles/newer-con.md': md({ ...ARTICLE, title: 'Newer construction', category: CON, date: '2026-11-01' }),
    'src/content/articles/ent.md': md({ ...ARTICLE, title: 'Newest enterprise', category: 'Enterprise AI & Product Leadership', date: '2026-11-15' }),
  };
  const lead = (extra = {}) => {
    const site = makeSite({ ...files, ...extra });
    try {
      assert.equal(site.build().code, 0);
      return section(site.read('dist/writing/index.html'), 'featured').match(/data-article="([\w-]+)"/)[1];
    } finally { site.cleanup(); }
  };
  assert.equal(lead(), 'star');
  assert.equal(lead({ 'src/content/articles/star.md': md({ ...ARTICLE, title: 'The star', category: CON, date: '2026-11-10', featured: true, draft: true }) }), 'newer-con');
});

test('CAP-02: no published listing shows "Draft"', () => {
  const site = makeSite({
    'src/content/articles/a.md': md({ ...ARTICLE, title: 'One', tags: ['Evaluation'] }),
    'src/content/articles/b.md': md({ ...ARTICLE, title: 'Two', draft: true }),
  });
  try {
    assert.equal(site.build().code, 0);
    for (const page of ['dist/writing/index.html', 'dist/writing/category/ai-for-construction/index.html', 'dist/writing/tags/evaluation/index.html', 'dist/writing/a/index.html', 'dist/index.html']) {
      assert.doesNotMatch(site.read(page).replace(/<script[\s\S]*?<\/script>/g, ''), />\s*Draft\s*</, page);
    }
  } finally { site.cleanup(); }
});

test('CAP-02: picking a category shows only its articles and says how many; without JavaScript every article shows', { timeout: 180000 }, async () => {
  // Only the fixture articles, so the counts don't change as real articles are published.
  const site = makeSite({
    'src/content/articles/e1.md': md({ ...ARTICLE, title: 'E1', category: 'Enterprise AI & Product Leadership', date: '2026-11-03' }),
    'src/content/articles/e2.md': md({ ...ARTICLE, title: 'E2', category: 'Enterprise AI & Product Leadership', date: '2026-11-02' }),
    'src/content/articles/c1.md': md({ ...ARTICLE, title: 'C1', category: 'AI for Construction', date: '2026-11-01' }),
  }, { remove: ['src/content/articles'] });
  let server, browser;
  try {
    assert.equal(site.build().code, 0);
    server = await serve(site);
    browser = await launch();
    const shown = async (page) => {
      const out = [];
      for (const id of ['e1', 'e2', 'c1']) if (await page.locator(`[data-section="all"] [data-article="${id}"]`).isVisible()) out.push(id);
      return out;
    };
    const page = await browser.newPage();
    await page.goto(server.url('/writing/'));
    await page.locator('[data-filter="ai-for-construction"]').click();
    assert.deepEqual(await shown(page), ['c1']);
    assert.equal(await page.locator('[data-filter-status]').textContent(), 'Showing 1 of 3');
    await page.locator('[data-filter="enterprise-ai-and-product-leadership"]').click();
    assert.deepEqual(await shown(page), ['e1', 'e2']);
    assert.equal(await page.locator('[data-filter-status]').textContent(), 'Showing 2 of 3');
    await page.close();
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const nojs = await ctx.newPage();
    await nojs.goto(server.url('/writing/'));
    assert.deepEqual(await shown(nojs), ['e1', 'e2', 'c1']);
    await ctx.close();
  } finally {
    await browser?.close();
    server?.stop();
    site.cleanup();
  }
});
