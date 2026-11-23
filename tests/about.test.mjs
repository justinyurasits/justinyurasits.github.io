// JYC-CAP-07: About, from the facts register (Career Facts v5.7, #4).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { runChecks } from '../scripts/check.mjs';
import { makeSite } from './harness.mjs';

const REGISTER = JSON.parse(readFileSync(new URL('../content/facts.json', import.meta.url), 'utf8'));
const withRegister = (edit) => { const d = structuredClone(REGISTER); edit(d); return { 'content/facts.json': JSON.stringify(d, null, 2) }; };

function withSite(files, fn, { expectFail = false, script = 'check' } = {}) {
  const site = makeSite(files);
  try {
    const r = site.run(script);
    if (expectFail) assert.notEqual(r.code, 0, r.out); else assert.equal(r.code, 0, r.out);
    fn(site, r);
  } finally { site.cleanup(); }
}

test('#4: the register holds the Career Facts v5.7 entries, credentials and location', () => {
  assert.deepEqual(Object.keys(REGISTER.experience), ['citizens', 'optimizelyGenAI', 'optimizelyConnect', 'jabra', 'fidelityDigitization', 'fidelityContactCenter', 'wellen', 'beaconHill']);
  for (const [k, e] of Object.entries(REGISTER.experience)) {
    assert.ok(['built', 'led', 'both'].includes(e.role), k);
    assert.ok(e.personallyDid && e.employer && e.title && e.type && e.dates, k);
  }
  assert.deepEqual(Object.values(REGISTER.credentials), ['MBA, Babson College', 'BS Chemical Engineering, Georgia Institute of Technology', 'Massachusetts Construction Supervisor License (current)']);
  assert.equal(REGISTER.about.location, 'Remote, based in Boston');
  assert.equal(REGISTER.library.corpusDocuments, 173);
  assert.equal(REGISTER.experience.beaconHill.role, 'built');
});

test('CAP-07: every experience entry shows built, led or both, with what Justin did, and each value is checked against the register', () => {
  withSite({}, (s) => {
    const h = s.read('dist/about/index.html');
    for (const [k, e] of Object.entries(REGISTER.experience)) {
      const entry = h.match(new RegExp(`<article[^>]*data-experience="${k}"[\\s\\S]*?</article>`))?.[0] ?? '';
      assert.match(entry, new RegExp(`data-role="${e.role}"`), k);
      assert.match(entry, new RegExp(`data-fact="experience\\.${k}\\.personallyDid"`), k);
      assert.match(entry, new RegExp(`data-fact="experience\\.${k}\\.employer"`), k);
      assert.match(entry, new RegExp(`data-fact="experience\\.${k}\\.dates"`), k);
    }
    // Beacon Hill's achievements are the register's metrics.
    assert.match(h, /data-metric="changeOrder"[^>]*><span data-fact="metrics\.\d\.task"[^>]*>Change order package<\/span>: <span[^>]*>~4 hrs<\/span> → <span[^>]*>~1 hr<\/span> <span[^>]*>of PM time<\/span>/);
    for (const k of Object.keys(REGISTER.credentials)) assert.match(h, new RegExp(`data-fact="credentials\\.${k}"`));
  });
});

test('CAP-07: an experience entry missing its role or what Justin did fails the build, naming the field', () => {
  for (const f of ['role', 'personallyDid']) {
    withSite(withRegister((d) => { delete d.experience.jabra[f]; }), (_, r) => {
      assert.match(r.out, new RegExp(`content/facts\\.json → experience\\.jabra\\.${f}`));
    }, { expectFail: true, script: 'build' });
  }
});

test('CAP-07: an About value that drifts from the register fails the check', () => {
  const site = makeSite();
  try {
    assert.equal(site.build().code, 0);
    const f = join(site.dir, 'dist/about/index.html');
    writeFileSync(f, readFileSync(f, 'utf8').replace('>Apr 2020 – Feb 2022<', '>Apr 2019 – Feb 2022<'));
    const r = runChecks({ dist: join(site.dir, 'dist'), oldAddresses: [] });
    assert.match(r.errors.join('\n'), /Fact drift on \/about\/.*"experience\.jabra\.dates" shows "Apr 2019 – Feb 2022"/);
  } finally { site.cleanup(); }
});
