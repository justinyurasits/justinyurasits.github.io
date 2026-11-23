import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite, md, ARTICLE } from './harness.mjs';
import { serve, launch, VIEWPORTS } from './browser.mjs';

const ENT = 'Enterprise AI & Product Leadership';
const CON = 'AI for Construction';
const writing = (h) => h.split('data-section="writing"')[1]?.split('</section>')[0] ?? '';
const lead = (h) => writing(h).match(/data-lead="([^"]+)"/)?.[1];
const rows = (h) => [...writing(h).matchAll(/data-article="([^"]+)"/g)].map((m) => m[1]);

function home(files) {
  const site = makeSite(files);
  try {
    const r = site.run('check');
    assert.equal(r.code, 0, r.out);
    return site.read('dist/index.html');
  } finally { site.cleanup(); }
}

test('CAP-01: the headline and the Work with me and Explore my work actions show without scrolling, at 375px and 1280px', { timeout: 180000 }, async () => {
  const site = makeSite({
    'src/content/articles/e.md': md({ ...ARTICLE, category: ENT, featured: true }),
    'src/content/articles/c.md': md({ ...ARTICLE, category: CON }),
  });
  let server, browser;
  try {
    assert.equal(site.build().code, 0);
    server = await serve(site);
    browser = await launch();
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(server.url('/'));
      for (const sel of ['#intro', '[data-action="work-with-me"]', '[data-action="explore"]']) {
        const box = await page.locator(sel).boundingBox();
        assert.ok(box, `${vp.name}: ${sel} is on the page`);
        assert.ok(box.y >= 0 && box.y + box.height <= vp.height, `${vp.name}: ${sel} ends at ${Math.round(box.y + box.height)}px, below the ${vp.height}px fold`);
      }
      await page.close();
    }
  } finally {
    await browser?.close();
    server?.stop();
    site.cleanup();
  }
});

test('CAP-01: with a published article in each category, the Writing section includes both categories', () => {
  const site = makeSite({
    'src/content/articles/e1.md': md({ ...ARTICLE, category: ENT, date: '2026-10-01', featured: true }),
    'src/content/articles/e2.md': md({ ...ARTICLE, category: ENT, date: '2026-10-05' }),
    'src/content/articles/e3.md': md({ ...ARTICLE, category: ENT, date: '2026-10-09' }),
    'src/content/articles/c1.md': md({ ...ARTICLE, category: CON, date: '2026-09-01' }),
  });
  try {
    const r = site.run('check');
    assert.equal(r.code, 0, r.out);
    const h = site.read('dist/index.html');
    const ids = rows(h);
    assert.equal(ids[0], 'e1', 'the featured article leads');
    assert.ok(ids.includes('c1'), `the construction article is shown: ${ids.join(', ')}`);
    assert.equal(ids.length, 3);
  } finally { site.cleanup(); }
});

test('CAP-01: a featured article set back to draft is replaced by the newest published article in its category', () => {
  const files = {
    'src/content/articles/star.md': md({ ...ARTICLE, title: 'The star', category: CON, date: '2026-11-10', featured: true }),
    'src/content/articles/con-new.md': md({ ...ARTICLE, category: CON, date: '2026-11-01' }),
    'src/content/articles/con-old.md': md({ ...ARTICLE, category: CON, date: '2026-06-01' }),
    'src/content/articles/ent-newest.md': md({ ...ARTICLE, category: ENT, date: '2026-11-20' }),
  };
  assert.equal(lead(home(files)), 'star');
  const after = home({ ...files, 'src/content/articles/star.md': md({ ...ARTICLE, title: 'The star', category: CON, date: '2026-11-10', featured: true, draft: true }) });
  assert.equal(lead(after), 'con-new');
  assert.doesNotMatch(after, /The star/);
});

test('CAP-01: the six sections are in order; Work with me links to both tracks; the site checks pass', () => {
  const h = home({});
  const order = ['hero', 'capabilities', 'solutions', 'demos', 'writing', 'work-with-me'].map((s) => h.indexOf(`data-section="${s}"`));
  assert.ok(order.every((i, n) => i > 0 && (n === 0 || i > order[n - 1])), order.join(','));
  assert.match(h, /AI Product Leader\. Systems Designer\. <em[^>]*>Hands-On Builder\.<\/em>/);
  const wm = h.split('data-section="work-with-me"')[1].split('</section>')[0];
  assert.match(wm, /href="\/work-with-me\/#enterprise"/);
  assert.match(wm, /href="\/work-with-me\/#construction"/);
  const footer = h.split('<footer')[1];
  assert.match(footer, /href="\/work-with-me\/#enterprise"/);
  assert.match(footer, /href="\/work-with-me\/#construction"/);
});
