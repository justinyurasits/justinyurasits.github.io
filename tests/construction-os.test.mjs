import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite, md, PROJECT } from './harness.mjs';

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
    assert.match(section, /<a href="\/demos\/workbench\/">Case study<\/a>/);
  } finally { site.cleanup(); }
});
