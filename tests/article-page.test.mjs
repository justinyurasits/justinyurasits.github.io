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
    assert.match(s.read('dist/writing/a/index.html'), /<a href="\/demos\/estimator\/">Estimator<\/a>/);
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
    assert.match(s.read('dist/writing/sub/index.html'), /Updated <time datetime="2026-11-20">November 20, 2026<\/time>/);
    assert.doesNotMatch(s.read('dist/writing/typo/index.html'), /Updated/);
  });
});

test('CAP-03: code is syntax-highlighted; references and related expertise are shown', () => {
  built({ 'src/content/articles/a.md': md({ ...ARTICLE, references: [{ title: 'A paper', url: 'https://example.com/p' }] }, BODY) }, (s) => {
    const h = s.read('dist/writing/a/index.html');
    assert.match(h, /class="astro-code/);
    assert.match(h, /<a href="https:\/\/example\.com\/p">A paper<\/a>/);
    assert.match(h, /href="\/work-with-me\/#construction"/);
  });
});

test('CAP-04: a draft article is not at its own URL', () => {
  built({ 'src/content/articles/dr.md': md({ ...ARTICLE, draft: true }, BODY) }, (s) => {
    assert.ok(!s.exists('dist/writing/dr/index.html'));
  });
});
