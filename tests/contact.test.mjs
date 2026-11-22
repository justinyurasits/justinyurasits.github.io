import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite } from './harness.mjs';

let site, pages;
test.before(() => { site = makeSite(); const r = site.run('check'); assert.equal(r.code, 0, r.out); pages = site.html(); });
test.after(() => site.cleanup());

test('CAP-08: Contact is in the header navigation and the footer of every page', () => {
  assert.ok(pages.length > 5);
  for (const p of pages.filter((p) => !/http-equiv="refresh"/.test(p.body))) {
    const header = p.body.match(/<header>[\s\S]*?<\/header>/)?.[0] ?? '';
    const footer = p.body.match(/<footer>[\s\S]*?<\/footer>/)?.[0] ?? '';
    assert.match(header, /<nav[\s\S]*href="\/contact\/"/, p.path);
    assert.match(footer, /href="\/contact\/"/, p.path);
  }
});

test('CAP-08: each of the five reasons has its own email link with a prefilled subject naming it', () => {
  const h = site.read('dist/contact/index.html');
  const expected = {
    consulting: 'Consulting', contract: 'Contract%20engagement', partnerships: 'Partnership',
    speaking: 'Speaking', education: 'Education',
  };
  for (const [id, subject] of Object.entries(expected)) {
    assert.match(h, new RegExp(`href="mailto:justin@justinyurasits\\.com\\?subject=${subject}" data-reason="${id}"`), id);
  }
  assert.equal((h.match(/data-reason=/g) ?? []).length, 5);
  assert.doesNotMatch(h, /<form/);
});

test('CAP-08: the booking link opens Justin\'s booking page', () => {
  assert.match(site.read('dist/contact/index.html'), /href="https:\/\/cal\.com\/justinyurasits" data-booking/);
});
