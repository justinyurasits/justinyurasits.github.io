import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite, md, ARTICLE, PROJECT, EXPERIENCE } from './harness.mjs';

function buildWith(files) {
  const site = makeSite(files);
  try { return site.build(); } finally { site.cleanup(); }
}

const listing = `---
import { getPublished } from '../lib/content';
const items = [...await getPublished('articles'), ...await getPublished('projects')];
---
<ul>{items.map((e) => <li>{e.data.title}</li>)}</ul>
`;

test('a valid article, project and experience entry build', () => {
  const r = buildWith({
    'src/content/articles/ok.md': md(ARTICLE),
    'src/content/projects/ok.md': md(PROJECT),
    'src/content/experience/ok.md': md(EXPERIENCE),
  });
  assert.equal(r.code, 0, r.out);
});

test('CAP-02: an article with no primary category fails the build and names the field', () => {
  const r = buildWith({ 'src/content/articles/nocat.md': md({ ...ARTICLE, category: undefined }) });
  assert.notEqual(r.code, 0);
  assert.match(r.out, /nocat/);
  assert.match(r.out, /category must be exactly one of/);
});

test('CAP-02: an article with more than one primary category fails the build and names the field', () => {
  const r = buildWith({
    'src/content/articles/twocat.md': md({ ...ARTICLE, category: ['AI for Construction', 'Enterprise AI & Product Leadership'] }),
  });
  assert.notEqual(r.code, 0);
  assert.match(r.out, /twocat/);
  assert.match(r.out, /category must be exactly one of/);
});

for (const field of ['title', 'description', 'date', 'draft']) {
  test(`CAP-04: an article missing ${field} fails the build and names the field`, () => {
    const r = buildWith({ [`src/content/articles/no-${field}.md`]: md({ ...ARTICLE, [field]: undefined }) });
    assert.notEqual(r.code, 0);
    assert.match(r.out, new RegExp(`no-${field}`));
    assert.match(r.out, new RegExp(`${field} is required`));
  });
}

test('CAP-04: a draft article appears nowhere in a build; a published one does', () => {
  const site = makeSite({
    'src/content/articles/pub.md': md({ ...ARTICLE, title: 'Published one' }),
    'src/content/articles/dr.md': md({ ...ARTICLE, title: 'Draft one', draft: true }),
    'src/pages/fixture-list.astro': listing,
  });
  try {
    const r = site.build();
    assert.equal(r.code, 0, r.out);
    const all = site.html().map((p) => p.body).join('\n');
    assert.match(all, /Published one/);
    assert.doesNotMatch(all, /Draft one/);
  } finally { site.cleanup(); }
});

for (const field of ['role', 'personallyDid', 'maturity', 'demo', 'whatYouCanView', 'limitations']) {
  test(`CAP-05: a project missing ${field} fails the build`, () => {
    const r = buildWith({ [`src/content/projects/no-${field}.md`]: md({ ...PROJECT, [field]: undefined }) });
    assert.notEqual(r.code, 0);
    assert.match(r.out, new RegExp(`no-${field}`));
    assert.match(r.out, new RegExp(field));
  });
}

test('CAP-05: role must be built, led or both', () => {
  const r = buildWith({ 'src/content/projects/badrole.md': md({ ...PROJECT, role: 'helped' }) });
  assert.notEqual(r.code, 0);
  assert.match(r.out, /role must be exactly one of: "built", "led", "both"/);
});

for (const field of ['role', 'personallyDid']) {
  test(`CAP-07: an experience entry missing ${field} fails the build`, () => {
    const r = buildWith({ [`src/content/experience/no-${field}.md`]: md({ ...EXPERIENCE, [field]: undefined }) });
    assert.notEqual(r.code, 0);
    assert.match(r.out, new RegExp(`no-${field}`));
    assert.match(r.out, new RegExp(field));
  });
}
