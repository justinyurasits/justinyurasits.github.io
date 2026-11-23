import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite } from './harness.mjs';

let site, pages;
test.before(() => { site = makeSite(); const r = site.run('check'); assert.equal(r.code, 0, r.out); pages = site.html(); });
test.after(() => site.cleanup());

const PANEL = 'dist/work-with-me/index.html';
const panel = () => site.read(PANEL).split('data-contact-panel')[1].split('</section>')[0];
const pagesOnly = () => pages.filter((p) => !/http-equiv="refresh"/.test(p.body));

test('CAP-08: Work with me is in the header of every page, and the footer has a Contact group', () => {
  assert.ok(pagesOnly().length > 5);
  for (const p of pagesOnly()) {
    const header = p.body.match(/<header[^>]*>[\s\S]*?<\/header>/)?.[0] ?? '';
    const footer = p.body.match(/<footer[^>]*>[\s\S]*?<\/footer>/)?.[0] ?? '';
    assert.match(header, /<a class="btn btn-primary btn-sm header-action" href="\/work-with-me\/" data-action[^>]*>Work with me <span aria-hidden="true">→<\/span><\/a>/, p.path);
    const group = footer.split('data-footer-group="contact"')[1]?.split('</nav>')[0] ?? '';
    assert.match(group, /<h2[^>]*id="footer-contact"[^>]*>Contact<\/h2>/, p.path);
    assert.match(group, /href="mailto:justin@justinyurasits\.com"/, p.path);
    assert.match(group, /href="https:\/\/www\.linkedin\.com\/in\/justinjyurasits\/"/, p.path);
  }
});

test('CAP-08: each of the five reasons has its own email link with a prefilled subject naming it', () => {
  const h = panel();
  const expected = {
    consulting: 'Consulting', contract: 'Contract%20engagement', partnerships: 'Partnership',
    speaking: 'Speaking', education: 'Education',
  };
  for (const [id, subject] of Object.entries(expected)) {
    assert.match(h, new RegExp(`href="mailto:justin@justinyurasits\\.com\\?subject=${subject}" data-reason="${id}"`), id);
  }
  assert.equal((h.match(/data-reason=/g) ?? []).length, 5);
  assert.doesNotMatch(site.read(PANEL), /<form/);
});

test('CAP-08: the booking link opens Justin\'s booking page', () => {
  assert.match(panel(), /href="https:\/\/cal\.com\/justinyurasits" data-booking/);
});

test('CAP-08: the contact panel offers LinkedIn alongside email and booking', () => {
  const h = panel();
  assert.match(h, /href="https:\/\/www\.linkedin\.com\/in\/justinjyurasits\/" data-linkedin/);
  assert.ok(h.indexOf('data-reason=') < h.indexOf('data-linkedin') && h.indexOf('data-booking') < h.indexOf('data-linkedin'));
});

test('CAP-08: /contact/ redirects to the contact panel', () => {
  const h = site.read('dist/contact/index.html');
  assert.match(h, /http-equiv="refresh" content="0; url=\/work-with-me\/#contact"/);
  assert.match(h, /<link rel="canonical" href="https:\/\/justinyurasits\.com\/work-with-me\/">/);
  assert.doesNotMatch(site.read('dist/sitemap-0.xml'), /\/contact\//);
});
