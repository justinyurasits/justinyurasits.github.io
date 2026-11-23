import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite } from './harness.mjs';

let site, page;
test.before(() => { site = makeSite(); const r = site.run('check'); assert.equal(r.code, 0, r.out); page = site.read('dist/work-with-me/index.html'); });
test.after(() => site.cleanup());

const TRACKS = ['enterprise', 'construction'];
const main = () => page.match(/<main[^>]*>([\s\S]*)<\/main>/)[1];
const track = (id) => main().split(`id="${id}" aria-labelledby="${id}-title"`)[1].split('</article>')[0];
const slots = (h) => [...h.matchAll(/data-slot="([^"]+)"/g)].map((m) => m[1]).filter((s) => s !== 'resume');

test('CAP-06: one page with both tracks, each at its anchor', () => {
  for (const id of TRACKS) assert.match(main(), new RegExp(`<article class="track card card-lg card-accent" id="${id}" aria-labelledby="${id}-title" data-track="${id}"`));
  assert.match(main(), /<section id="contact"[^>]*data-contact-panel/);
});

test('CAP-06: each track opens with the problem slot and has an outcomes slot', () => {
  for (const id of TRACKS) {
    const s = slots(track(id));
    assert.equal(s[0], 'problem', id);
    assert.ok(s.indexOf('outcomes') > 0, id);
  }
});

test('CAP-06: the two tracks have the same structure', () => {
  assert.deepEqual(slots(track('enterprise')), slots(track('construction')));
});

test('CAP-06: each track ends with a next step that reaches the contact panel on the page', () => {
  for (const id of TRACKS) {
    const s = slots(track(id));
    assert.equal(s.at(-1), 'next-step', id);
    const next = track(id).split('data-slot="next-step"')[1];
    assert.match(next, /href="#contact"/, id);
  }
});

test('CAP-06: the page shows no fees, service pricing, rates or availability dates', () => {
  const text = main().replace(/<[^>]+>/g, ' ');
  assert.doesNotMatch(text, /\$|per hour|\/hr|hourly|day rate|rate[s]?\b|available (from|starting)|availability/i);
});

test('CAP-06: the enterprise track states the engagement types and "remote, based in Boston", and has a résumé slot', () => {
  const m = track('enterprise');
  for (const s of ['Contract or C2C', 'Fractional AI product leadership', 'Implementation leadership']) assert.match(m, new RegExp(s));
  assert.match(m, /Remote, based in Boston\./);
  assert.match(m, /data-slot="resume"/);
});

test('CAP-06: the two tracks have equal weight: same card, same rows, side by side at 1280px', () => {
  const cls = (id) => main().match(new RegExp(`<article class="([^"]+)" id="${id}"`))[1];
  assert.equal(cls('enterprise'), cls('construction'));
  for (const id of TRACKS) {
    const t = track(id);
    for (const h of ['What an engagement delivers', 'What working together looks like']) assert.match(t, new RegExp(h), `${id}: ${h}`);
    assert.match(t, /<a class="btn btn-primary" href="#contact"[^>]*>Start a conversation/, id);
  }
});
