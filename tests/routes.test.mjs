import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite } from './harness.mjs';

let site, pages;
test.before(() => { site = makeSite(); const r = site.run('check'); assert.equal(r.code, 0, r.out); pages = site.html(); });
test.after(() => site.cleanup());

const ROUTES = ['/', '/solutions/', '/solutions/construction-os/', '/demos/', '/writing/', '/training/', '/work-with-me/', '/about/'];
const REMOVED = ['/projects/', '/construction-os/', '/work-with-me/enterprise/', '/work-with-me/construction/'];
const file = (p) => `dist${p}index.html`;

test('M2.10: every route builds as a page, and the removed M1 routes are gone', () => {
  for (const r of ROUTES) {
    assert.ok(site.exists(file(r)), r);
    assert.doesNotMatch(site.read(file(r)), /http-equiv="refresh"/, r);
  }
  for (const r of REMOVED) assert.ok(!site.exists(file(r)), r);
});

test('M2.10: no page links to a removed route', () => {
  for (const p of pages) {
    for (const r of [...REMOVED, '/contact/']) assert.ok(!p.body.includes(`href="${r}`), `${p.path} links ${r}`);
  }
});

test('M2.10: the header is Solutions, Demos, Writing, Training and About, with Work with me as its action', () => {
  const header = site.read('dist/about/index.html').match(/<header>[\s\S]*?<\/header>/)[0];
  const nav = [...header.split('</nav>')[0].matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].map((m) => `${m[2]} ${m[1]}`);
  assert.deepEqual(nav, ['Solutions /solutions/', 'Demos /demos/', 'Writing /writing/', 'Training /training/', 'About /about/']);
  assert.match(header.split('</nav>')[1], /href="\/work-with-me\/" data-action/);
});

test('M2.10: the footer on every page links both consulting tracks, and Privacy and Terms in its Site group', () => {
  for (const p of pages.filter((p) => !/http-equiv="refresh"/.test(p.body))) {
    const footer = p.body.match(/<footer>[\s\S]*?<\/footer>/)?.[0] ?? '';
    const consulting = footer.split('data-footer-group="consulting"')[1]?.split('</nav>')[0] ?? '';
    assert.match(consulting, /href="\/work-with-me\/#enterprise"/, p.path);
    assert.match(consulting, /href="\/work-with-me\/#construction"/, p.path);
    const siteGroup = footer.split('data-footer-group="site"')[1]?.split('</nav>')[0] ?? '';
    for (const l of ['/privacy.html', '/terms.html', '/rss.xml', '/work-with-me/']) assert.match(siteGroup, new RegExp(`href="${l.replace('.', '\\.')}"`), `${p.path}: ${l}`);
  }
});

test('M2.10: the Construction OS flagship on Solutions links to the Construction OS page', () => {
  assert.match(site.read('dist/solutions/index.html'), /href="\/solutions\/construction-os\/"/);
});
