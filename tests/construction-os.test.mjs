import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite, md, PROJECT, ARTICLE } from './harness.mjs';

const ANCHORS = ['document-workbench', 'construction-intelligence', 'operations-automation', 'project-intelligence'];

test('CAP-09: one section and anchor per product; each live product and demo is linked with its maturity and demo', () => {
  const site = makeSite();
  try {
    const r = site.run('check');
    assert.equal(r.code, 0, r.out);   // statuses match the register (the M0.6 status check)
    const h = site.read('dist/solutions/construction-os/index.html');
    for (const a of ANCHORS) {
      assert.match(h, new RegExp(`<section id="${a}"`), a);
      assert.match(h, new RegExp(`href="#${a}"`), a);
    }
    // the public demo is linked
    assert.match(h, /data-status="workflows\.changeOrderDrafting" data-maturity="live" data-demo="public"[\s\S]*?<a class="demo text-link" href="https:\/\/draftconstructionchangeorder\.com\/">Public demo<\/a>/);
    // every product and workflow shows its status from the register
    assert.equal((h.match(/data-status="/g) ?? []).length, 3 + 8);
    assert.match(h, /data-status="products\.projectIntelligence" data-maturity="in-development" data-demo="none"/);
  } finally { site.cleanup(); }
});

test('CAP-09: a product with a published case study links to it', () => {
  const site = makeSite({ 'src/content/projects/workbench.md': md({ ...PROJECT, title: 'Document Workbench', registerKey: 'products.documentWorkbench', maturity: 'beta', demo: 'on-request' }).replace(/^repository: .*$/m, 'repository:\n  visibility: private-own') });
  try {
    const r = site.run('check');
    assert.equal(r.code, 0, r.out);
    const section = site.read('dist/solutions/construction-os/index.html').split('<section id="document-workbench"')[1].split('</section>')[0];
    assert.match(section, /<a class="text-link" href="\/demos\/workbench\/"[^>]*>Case study<\/a>/);
  } finally { site.cleanup(); }
});

test('CAP-09: each solution area says whether it\'s an existing build, a consulting service or a possible custom engagement', () => {
  const site = makeSite();
  try {
    assert.equal(site.build().code, 0);
    const h = site.read('dist/solutions/index.html');
    const areas = [...h.matchAll(/<article[^>]*data-area-kind="([^"]+)"[^>]*>\s*<p[^>]*>([^<]+)<\/p>/g)];
    assert.ok(areas.length >= 3, 'the applied solution areas');
    const LABEL = { 'existing-build': 'Existing build', 'consulting-service': 'Consulting service', 'custom-engagement': 'Possible custom engagement' };
    for (const [, kind, label] of areas) assert.equal(label, LABEL[kind]);
  } finally { site.cleanup(); }
});

test('CAP-09: the Construction OS flagship links to the Construction OS page and shows no status of its own', () => {
  const site = makeSite();
  try {
    const r = site.run('check');
    assert.equal(r.code, 0, r.out);
    const flagship = site.read('dist/solutions/index.html').split('data-section="flagship"')[1].split('</section>')[0];
    assert.match(flagship, /<a class="btn btn-primary" href="\/solutions\/construction-os\/"/);
    assert.doesNotMatch(flagship, /badge|data-status/, 'no status for Construction OS itself');
    // On its own page, every status sits inside a product's section.
    const page = site.read('dist/solutions/construction-os/index.html');
    const outside = page.replace(/<section id="[a-z-]+" class="card[\s\S]*?<\/section>/g, '');
    assert.doesNotMatch(outside, /class="maturity badge|data-status=/);
  } finally { site.cleanup(); }
});

test('§5: Construction OS\'s role and what Justin did come from the register; "sole designer and builder" fails the check', () => {
  const site = makeSite();
  try {
    assert.equal(site.run('check').code, 0);
    const register = JSON.parse(site.read('content/facts.json')).constructionOS;
    assert.equal(register.role, 'built');
    assert.match(register.personallyDid, /^Conceived and architected Construction OS .*Ava Yurasits contributed to the build\.$/);
    const h = site.read('dist/solutions/construction-os/index.html');
    assert.match(h, /<strong data-role="built"[^>]*>Built\.<\/strong> <span data-fact="constructionOS\.personallyDid"[^>]*>Conceived and architected Construction OS/);
  } finally { site.cleanup(); }
  const bad = makeSite({ 'src/content/articles/x.md': md({ ...ARTICLE }, 'Justin is the sole designer and builder of Construction OS.') });
  try {
    const r = bad.run('check');
    assert.notEqual(r.code, 0);
    assert.match(r.out, /Banned string "sole designer and builder"/);
  } finally { bad.cleanup(); }
});

test('#13: the Construction OS page states each capability from the register', () => {
  const site = makeSite();
  try {
    const r = site.run('check');
    assert.equal(r.code, 0, r.out);
    assert.match(site.read('dist/solutions/construction-os/index.html'), /<li data-fact="constructionOS\.capabilities\.0"[^>]*>A new PM can ask the system for company policy and instructions from day one\.<\/li>/);
  } finally { site.cleanup(); }
});
