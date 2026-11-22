import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite, md, EXPERIENCE } from './harness.mjs';

function withSite(files, fn, { expectFail = false } = {}) {
  const site = makeSite(files);
  try {
    const r = site.run('check');
    if (expectFail) assert.notEqual(r.code, 0, r.out); else assert.equal(r.code, 0, r.out);
    fn(site, r);
  } finally { site.cleanup(); }
}

test('CAP-07: an experience entry shows built, led or both, with one line on what Justin did', () => {
  withSite({ 'src/content/experience/e.md': md({ ...EXPERIENCE, role: 'both', personallyDid: 'Ran the product and wrote the first version.' }) }, (s) => {
    assert.match(s.read('dist/about/index.html'), /data-role="both">Built and led\.<\/strong> Ran the product and wrote the first version\./);
  });
});

test('CAP-07: an experience entry missing role or personallyDid fails the build', () => {
  for (const f of ['role', 'personallyDid']) {
    withSite({ 'src/content/experience/e.md': md({ ...EXPERIENCE, [f]: undefined }) }, (_, r) => {
      assert.match(r.out, new RegExp(`src/content/experience/e: .*${f}`));
    }, { expectFail: true });
  }
});

test('CAP-07: credentials and experience facts come from the register and are checked against it', () => {
  withSite({ 'src/content/experience/e.md': md({ ...EXPERIENCE, facts: ['about.credential', 'about.operatorScale'] }) }, (s) => {
    const h = s.read('dist/about/index.html');
    assert.match(h, /<span data-fact="about\.credential">licensed Massachusetts Construction Supervisor<\/span>/);
    assert.match(h, /<span data-fact="about\.operatorScale">/);
  });
});

test('CAP-07: an experience entry naming a fact the register doesn\'t have fails the build', () => {
  withSite({ 'src/content/experience/e.md': md({ ...EXPERIENCE, facts: ['experience.madeUpEmployer'] }) }, (_, r) => {
    assert.match(r.out, /Unknown fact "experience\.madeUpEmployer"/);
  }, { expectFail: true });
});

test('CAP-07: an experience entry with no facts fails the build', () => {
  withSite({ 'src/content/experience/e.md': md({ ...EXPERIENCE, facts: [] }) }, (_, r) => {
    assert.match(r.out, /facts is required: register keys for the employer, role and dates/);
  }, { expectFail: true });
});
