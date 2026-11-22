import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite } from './harness.mjs';

let site;
test.before(() => { site = makeSite(); const r = site.run('check'); assert.equal(r.code, 0, r.out); });
test.after(() => site.cleanup());

const PAGES = ['dist/work-with-me/enterprise/index.html', 'dist/work-with-me/construction/index.html'];
const main = (h) => h.match(/<main[^>]*>([\s\S]*)<\/main>/)[1];

test('CAP-06: each pathway page has a problem slot first and an outcomes slot', () => {
  for (const p of PAGES) {
    const m = main(site.read(p));
    const order = ['data-slot="problem"', 'data-slot="outcomes"', 'data-slot="next-step"'].map((s) => m.indexOf(s));
    assert.ok(order.every((i) => i > 0) && order[0] < order[1] && order[1] < order[2], p);
    assert.ok(m.indexOf('data-slot="problem"') < m.indexOf('<h2 id="outcomes"'), `${p}: the problem comes first`);
  }
});

test('CAP-06: each pathway page ends with a next step that reaches the contact options on the page', () => {
  for (const p of PAGES) {
    const m = main(site.read(p));
    const sections = m.split('<section').slice(1);
    const last = sections.at(-1);
    assert.match(last, /data-slot="next-step"/, p);
    assert.match(last, /data-contact-options/, p);
    assert.equal((last.match(/data-reason=/g) ?? []).length, 5, p);
    assert.match(last, /href="https:\/\/cal\.com\/justinyurasits"/, p);
  }
});

test('CAP-06: neither page shows fees, service pricing, rates or availability dates', () => {
  for (const p of PAGES) {
    const text = main(site.read(p)).replace(/<[^>]+>/g, ' ');
    assert.doesNotMatch(text, /\$|per hour|\/hr|hourly|day rate|rate[s]?\b|available (from|starting)|availability/i, p);
  }
});

test('CAP-06: the enterprise page states the engagement types and "remote, based in Boston", and has a résumé slot', () => {
  const m = main(site.read(PAGES[0]));
  for (const s of ['Contract or C2C', 'Fractional AI product leadership', 'Implementation leadership']) assert.match(m, new RegExp(s));
  assert.match(m, /Remote, based in Boston\./);
  assert.match(m, /data-slot="resume"/);
});
