import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite, md, ARTICLE, PROJECT } from './harness.mjs';

const BODY = 'Intro paragraph.\n\n```js\nconst x = 1;\n```\n\n![A diagram](https://example.com/d.png)';

function built(files, fn) {
  const site = makeSite(files);
  try {
    const r = site.build();
    assert.equal(r.code, 0, r.out);
    fn(site);
  } finally { site.cleanup(); }
}

test('CAP-03: the URL comes from the file name and stays the same when the article is corrected', () => {
  built({ 'src/content/articles/why-evals-matter.md': md({ ...ARTICLE, title: 'First title' }, BODY) }, (s) => {
    assert.ok(s.exists('dist/writing/why-evals-matter/index.html'));
  });
  built({ 'src/content/articles/why-evals-matter.md': md({ ...ARTICLE, title: 'Corrected title', updated: { date: '2026-11-20', substantive: true } }, BODY + '\n\nA corrected sentence.') }, (s) => {
    assert.ok(s.exists('dist/writing/why-evals-matter/index.html'));
    assert.match(s.read('dist/writing/why-evals-matter/index.html'), /Corrected title/);
  });
});

test('CAP-03: an article that cites a project links to its case study', () => {
  built({
    'src/content/projects/estimator.md': md({ ...PROJECT, title: 'Estimator' }),
    'src/content/articles/a.md': md({ ...ARTICLE, relatedProjects: ['estimator'] }, BODY),
  }, (s) => {
    assert.match(s.read('dist/writing/a/index.html'), /<a href="\/demos\/estimator\/"[^>]*>Estimator<\/a>/);
  });
});

test('CAP-03: the social preview shows the title and description', () => {
  built({ 'src/content/articles/a.md': md({ ...ARTICLE, title: 'Evals in practice', description: 'What an eval catches.' }, BODY) }, (s) => {
    const h = s.read('dist/writing/a/index.html');
    assert.match(h, /<meta property="og:title" content="Evals in practice \| Justin Yurasits"/);
    assert.match(h, /<meta property="og:description" content="What an eval catches\."/);
    assert.match(h, /<meta property="og:type" content="article"/);
  });
});

test('CAP-03: a substantive change shows "Updated <date>"; a typo fix shows nothing', () => {
  built({
    'src/content/articles/sub.md': md({ ...ARTICLE, updated: { date: '2026-11-20', substantive: true } }, BODY),
    'src/content/articles/typo.md': md({ ...ARTICLE, updated: { date: '2026-11-21', substantive: false } }, BODY),
  }, (s) => {
    assert.match(s.read('dist/writing/sub/index.html'), /Updated <time datetime="2026-11-20"[^>]*>November 20, 2026<\/time>/);
    assert.doesNotMatch(s.read('dist/writing/typo/index.html'), /Updated/);
  });
});

test('CAP-03: code is syntax-highlighted; references and related expertise are shown', () => {
  built({ 'src/content/articles/a.md': md({ ...ARTICLE, references: [{ title: 'A paper', url: 'https://example.com/p' }] }, BODY) }, (s) => {
    const h = s.read('dist/writing/a/index.html');
    assert.match(h, /class="astro-code/);
    assert.match(h, /<a href="https:\/\/example\.com\/p"[^>]*>A paper<\/a>/);
    assert.match(h, /href="\/work-with-me\/#construction"/);
  });
});

test('CAP-04: a draft article is not at its own URL', () => {
  built({ 'src/content/articles/dr.md': md({ ...ARTICLE, draft: true }, BODY) }, (s) => {
    assert.ok(!s.exists('dist/writing/dr/index.html'));
  });
});

test('CAP-03: an article with two or more sections gets a table of contents linking to each section; one with fewer doesn\'t', () => {
  built({
    'src/content/articles/long.md': md({ ...ARTICLE }, 'Intro.\n\n## First part\n\nText.[^1]\n\n## Second part\n\nText.\n\n[^1]: A note.'),
    'src/content/articles/short.md': md({ ...ARTICLE }, 'Intro.\n\n## Only part\n\nText.'),
  }, (s) => {
    const h = s.read('dist/writing/long/index.html');
    const toc = h.match(/<nav class="art-toc"[\s\S]*?<\/nav>/)?.[0] ?? '';
    const links = [...toc.matchAll(/href="#([\w-]+)"[^>]*>([^<]+)</g)].map((m) => `${m[1]}:${m[2]}`);
    assert.deepEqual(links, ['first-part:First part', 'second-part:Second part']);
    for (const id of ['first-part', 'second-part']) assert.match(h, new RegExp(`<h2 id="${id}"`));
    assert.doesNotMatch(s.read('dist/writing/short/index.html'), /class="art-toc"/);
  });
});

test('CAP-03: an article shows a deck and a byline', () => {
  built({ 'src/content/articles/a.md': md({ ...ARTICLE, description: 'The description.', deck: 'The deck.' }, BODY) }, (s) => {
    const h = s.read('dist/writing/a/index.html');
    assert.match(h, /<p class="art-deck"[^>]*>The deck\.<\/p>/);
    assert.match(h, /<span class="art-author"[^>]*>Justin Yurasits<\/span>/);
  });
});

test('CAP-03: two related articles: Justin\'s picks, otherwise the two newest in the same category; never a draft', () => {
  const ENT = 'Enterprise AI & Product Leadership';
  const files = {
    'src/content/articles/me.md': md({ ...ARTICLE, date: '2026-11-01' }, BODY),
    'src/content/articles/n1.md': md({ ...ARTICLE, date: '2026-11-20' }),
    'src/content/articles/n2.md': md({ ...ARTICLE, date: '2026-11-10' }),
    'src/content/articles/n3.md': md({ ...ARTICLE, date: '2026-10-01' }),
    'src/content/articles/dr.md': md({ ...ARTICLE, date: '2026-11-25', draft: true }),
    'src/content/articles/other.md': md({ ...ARTICLE, category: ENT, date: '2026-11-30' }),
  };
  const related = (s) => [...(s.read('dist/writing/me/index.html').split('data-section="related-articles"')[1] ?? '').matchAll(/data-article="([\w-]+)"/g)].map((m) => m[1]);
  built(files, (s) => assert.deepEqual(related(s), ['n1', 'n2']));
  built({ ...files, 'src/content/articles/me.md': md({ ...ARTICLE, date: '2026-11-01', relatedArticles: ['other', 'n3'] }, BODY) }, (s) => assert.deepEqual(related(s), ['other', 'n3']));
  // A draft pick is skipped and the newest in the category fill its place.
  built({ ...files, 'src/content/articles/me.md': md({ ...ARTICLE, date: '2026-11-01', relatedArticles: ['dr', 'n3'] }, BODY) }, (s) => assert.deepEqual(related(s), ['n3', 'n1']));
});
