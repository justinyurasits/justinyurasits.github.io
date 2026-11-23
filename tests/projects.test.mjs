import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { makeSite, md, ARTICLE, PROJECT } from './harness.mjs';

const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
const yaml = (o) => md(o).replace(/^repository: .*$/m, `repository:\n  visibility: ${o.repository.visibility}${o.repository.url ? `\n  url: ${o.repository.url}` : ''}`);

function withSite(files, fn, { expectFail = false } = {}) {
  const site = makeSite(files);
  try {
    const r = site.run('check');
    if (expectFail) assert.notEqual(r.code, 0, r.out); else assert.equal(r.code, 0, r.out);
    fn(site, r);
  } finally { site.cleanup(); }
}

test('CAP-05: a case study shows built, led or both, what Justin did, maturity and demo', () => {
  withSite({ 'src/content/projects/p.md': yaml({ ...PROJECT, role: 'both', personallyDid: 'Designed the retrieval layer.', maturity: 'beta', demo: 'on-request' }) }, (s) => {
    for (const page of ['dist/demos/p/index.html', 'dist/demos/index.html']) {
      const h = s.read(page);
      assert.match(h, /data-role="both">Built and led\.<\/strong> Designed the retrieval layer\./, page);
      assert.match(h, /<span class="maturity badge badge-beta">Beta<\/span>/, page);
      assert.match(h, /<span class="demo">Demo on request<\/span>/, page);
    }
  });
});

test('CAP-05: a public demo and a public repository are linked', () => {
  withSite({ 'src/content/projects/p.md': yaml({ ...PROJECT, demo: 'public', demoUrl: 'https://demo.example.com/', repository: { visibility: 'public', url: 'https://github.com/justinyurasits/agents' }, architecture: undefined }) }, (s) => {
    const h = s.read('dist/demos/p/index.html');
    assert.match(h, /<a class="demo text-link" href="https:\/\/demo\.example\.com\/">Public demo<\/a>/);
    assert.match(h, /<a href="https:\/\/github\.com\/justinyurasits\/agents"[^>]*>Repository<\/a>/);
    assert.doesNotMatch(h, /Private repository/);
  });
});

test('CAP-05: a public repository or public demo without its URL fails the build', () => {
  withSite({ 'src/content/projects/p.md': yaml({ ...PROJECT, repository: { visibility: 'public' } }) }, (_, r) => {
    assert.match(r.out, /repository\.url is required when repository\.visibility is "public"/);
  }, { expectFail: true });
  withSite({ 'src/content/projects/p.md': yaml({ ...PROJECT, demo: 'public' }) }, (_, r) => {
    assert.match(r.out, /demoUrl is required when demo is "public"/);
  }, { expectFail: true });
});

test('CAP-05: a project with no public repository needs evidence, and shows no repository link', () => {
  withSite({ 'src/content/projects/p.md': yaml({ ...PROJECT, architecture: undefined }) }, (_, r) => {
    assert.match(r.out, /a project with no public repository needs evidence/);
  }, { expectFail: true });
  const files = { 'src/content/projects/p.md': yaml({ ...PROJECT, architecture: undefined }).replace('---\n\n', 'screenshots:\n  - src: ./p/screen.png\n    alt: The estimate screen\nwalkthroughUrl: https://example.com/walkthrough\n---\n\n') };
  const site = makeSite(files);
  try {
    mkdirSync(join(site.dir, 'src/content/projects/p'), { recursive: true });
    writeFileSync(join(site.dir, 'src/content/projects/p/screen.png'), PNG);
    const r = site.run('check');
    assert.equal(r.code, 0, r.out);
    const h = site.read('dist/demos/p/index.html');
    assert.match(h, /<img[^>]+alt="The estimate screen"/);
    assert.match(h, /<a href="https:\/\/example\.com\/walkthrough"[^>]*>Walkthrough<\/a>/);
    assert.doesNotMatch(h, />Repository<\/a>/);
    assert.doesNotMatch(h, /href="#"/);
  } finally { site.cleanup(); }
});

test('CAP-05: "Private repository, walkthrough on request." appears only on Justin\'s own private repositories', () => {
  withSite({
    'src/content/projects/own.md': yaml({ ...PROJECT }),
    'src/content/projects/pub.md': yaml({ ...PROJECT, repository: { visibility: 'public', url: 'https://github.com/x/y' } }),
    'src/content/projects/conf.md': yaml({ ...PROJECT, repository: { visibility: 'confidential' }, confidentialityReviewed: true }),
  }, (s) => {
    assert.match(s.read('dist/demos/own/index.html'), /<dd class="repo-label"[^>]*>Private repository, walkthrough on request\.<\/dd>/);
    assert.doesNotMatch(s.read('dist/demos/pub/index.html'), /Private repository/);
    assert.doesNotMatch(s.read('dist/demos/conf/index.html'), /Private repository/);
  });
});

test('CAP-05: confidential work needs the confidentiality review and can\'t carry a repository URL', () => {
  withSite({ 'src/content/projects/c.md': yaml({ ...PROJECT, repository: { visibility: 'confidential' } }) }, (_, r) => {
    assert.match(r.out, /confidential work needs confidentialityReviewed: true/);
  }, { expectFail: true });
  withSite({ 'src/content/projects/c.md': yaml({ ...PROJECT, repository: { visibility: 'confidential', url: 'https://github.com/client/repo' }, confidentialityReviewed: true }) }, (_, r) => {
    assert.match(r.out, /repository\.url is only for a public repository/);
  }, { expectFail: true });
});

test('CAP-05: an article that cites a project gets a link back from the case study', () => {
  withSite({
    'src/content/projects/est.md': yaml({ ...PROJECT, title: 'Estimator' }),
    'src/content/articles/a.md': md({ ...ARTICLE, title: 'Why estimates drift', relatedProjects: ['est'] }),
  }, (s) => {
    assert.match(s.read('dist/demos/est/index.html'), /<a href="\/writing\/a\/"[^>]*>Why estimates drift<\/a>/);
  });
});

test('§5: a project whose status drifts from the register fails the check', () => {
  withSite({ 'src/content/projects/dw.md': yaml({ ...PROJECT, registerKey: 'products.documentWorkbench', maturity: 'live', demo: 'public', demoUrl: 'https://example.com/' }) }, (_, r) => {
    assert.match(r.out, /Status drift.*"products\.documentWorkbench" shows live\/public, the register says beta\/on-request/);
  }, { expectFail: true });
  withSite({ 'src/content/projects/dw.md': yaml({ ...PROJECT, registerKey: 'products.documentWorkbench', maturity: 'beta', demo: 'on-request' }) }, () => {});
});

test('a draft project is not built', () => {
  withSite({ 'src/content/projects/d.md': yaml({ ...PROJECT, title: 'Secret draft', draft: true }) }, (s) => {
    assert.ok(!s.exists('dist/demos/d/index.html'));
    assert.doesNotMatch(s.read('dist/demos/index.html'), /Secret draft/);
  });
});
