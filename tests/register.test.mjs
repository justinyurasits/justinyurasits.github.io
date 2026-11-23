import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRegister, parseRegister, productStatus, feeValues } from '../src/lib/register.mjs';

const raw = () => JSON.parse(readFileSync(new URL('../content/facts.json', import.meta.url), 'utf8'));

test('the register matches its schema', () => { loadRegister(); });

test('metrics.json is folded in and removed', () => {
  assert.throws(() => readFileSync(new URL('../content/metrics.json', import.meta.url)));
});

const claim = (m) => `${m.before} → ${m.after}${m.outcome ? ` ${m.outcome}` : ''}`;

test('the metrics read as Justin confirmed them (#13), each with a basis', () => {
  const m = Object.fromEntries(loadRegister().metrics.map((x) => [x.key, x]));
  assert.deepEqual(Object.keys(m), ['contractPackage', 'changeOrder', 'preliminaryEstimating']);
  assert.equal(claim(m.contractPackage), 'up to 8 hrs → ~30 min to a package ready for PM review');
  assert.equal(`${m.changeOrder.task}: ${claim(m.changeOrder)}`, 'Change order package: ~4 hrs → ~1 hr of PM time');
  assert.equal(claim(m.preliminaryEstimating), '~10 hrs → ~2 hrs');
  for (const x of Object.values(m)) assert.ok(x.basis, `${x.key} has a basis`);
});

test('project manager knowledge is a Construction OS capability, not a metric', () => {
  const r = loadRegister();
  assert.ok(!r.metrics.some((x) => x.key === 'pmKnowledge'));
  assert.deepEqual(r.constructionOS.capabilities, ['A new PM can ask the system for company policy and instructions from day one.']);
});

// Spec §5 mapping table, row by row, as Justin confirmed it in Career Facts v5.8 (#28).
const MAPPING = {
  changeOrderDrafting: ['live', 'public'],
  invoiceIntake: ['live', 'on-request'], siteSafety: ['live', 'public'], fieldReports: ['beta', 'none'],
  documentWorkbench: ['beta', 'on-request'], constructionIntelligence: ['beta', 'on-request'],
  bidComparison: ['beta', 'none'], payAppPreparation: ['beta', 'none'],
  subcontractorCompliance: ['beta', 'none'], clientSelections: ['beta', 'none'],
  projectIntelligence: ['in-development', 'none'],
};

test('every product and workflow has maturity and demo matching the §5 mapping table', () => {
  const r = loadRegister();
  for (const [key, [maturity, demo]] of Object.entries(MAPPING)) {
    const e = r.workflows[key] ?? r.products[key];
    assert.ok(e, key);
    assert.deepEqual([e.maturity, e.demo], [maturity, demo], key);
  }
  // "Three live, five beta", two of them public demos: no single value; shows its workflows'.
  const oa = productStatus(r, 'operationsAutomation');
  assert.equal(oa.length, 8);
  assert.equal(oa.filter((w) => w.demo === 'public').length, 2);
  assert.equal(oa.filter((w) => w.maturity === 'live').length, 3);
  assert.equal(oa.filter((w) => w.maturity === 'beta').length, 5);
});

test('the schema defines basis on metric entries; a missing one is not a schema error', () => {
  const d = raw();
  d.metrics[0].basis = 'measured across ~20 real jobs and bids';
  assert.equal(parseRegister(d).metrics[0].basis, 'measured across ~20 real jobs and bids');
  delete d.metrics[0].basis;
  parseRegister(d);
});

test('fee values are marked not page-facing', () => {
  const r = loadRegister();
  assert.equal(r.fees.pageFacing, false);
  assert.deepEqual(feeValues(r), ['$4,000–6,000', '$12,000–15,000', 'from $2,000']);
  const d = raw(); d.fees.pageFacing = true;
  assert.throws(() => parseRegister(d), /fees\.pageFacing/);
});

test('a bad maturity value fails with the field named', () => {
  const d = raw(); d.workflows.siteSafety.maturity = 'shipping';
  assert.throws(() => parseRegister(d), /workflows\.siteSafety\.maturity: maturity must be one of/);
});

import { makeSite } from './harness.mjs';

test('the build fails, naming the field, when the register is invalid', () => {
  const d = raw(); d.products.documentWorkbench.demo = 'sometimes';
  const site = makeSite({ 'content/facts.json': JSON.stringify(d) });
  try {
    const r = site.build();
    assert.notEqual(r.code, 0);
    assert.match(r.out, /products\.documentWorkbench/);
  } finally { site.cleanup(); }
});
