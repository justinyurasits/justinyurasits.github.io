import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite, md, ARTICLE } from './harness.mjs';

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
    assert.match(section(lib, 'recent'), /New one/);
    assert.ok(section(lib, 'recent').indexOf('New one') < section(lib, 'recent').indexOf('Older one'), 'newest first');
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
