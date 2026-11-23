// Product metrics in article prose (scripts/article-metrics.mjs): a sentence naming a
// register metric must give the register's figure; failure when published, warning in a draft.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { metricMismatches, figuresIn } from '../scripts/article-metrics.mjs';
import { articleSourceChecks } from '../scripts/check.mjs';

const register = {
  metrics: [
    { key: 'contractPackage', task: 'Contract package', before: 'up to 8 hrs', after: '~30 min' },
    { key: 'changeOrder', task: 'Change order package', before: '~4 hrs', after: '~1 hr', outcome: 'of PM time' },
    { key: 'preliminaryEstimating', task: 'Preliminary estimating', before: '~10 hrs', after: '~2 hrs' },
  ],
};
const figures = (text) => metricMismatches(text, register).flatMap((h) => h.figures);

test('register figures pass, however they are worded', () => {
  assert.deepEqual(figures('Contract packages went from up to 8 hours to about 30 minutes.'), []);
  assert.deepEqual(figures('A change order package took four hours of PM time; now it takes one hour.'), []);
  assert.deepEqual(figures('Preliminary estimates fell from roughly ten hours to two hours.'), []);
  assert.deepEqual(figures('Estimating dropped from 10 hours to 2.'), []);
  // "from 10 to 2 hrs" reads as a range, like "four to eight hours", so it's flagged.
  assert.deepEqual(figures('Estimating dropped from 10 to 2 hrs.'), ['10 to 2 hrs']);
});

test('figures that differ from the register are flagged', () => {
  assert.deepEqual(figures('Contract packages were reduced from four to eight hours to approximately 30 minutes.'), ['four to eight hours']);
  assert.deepEqual(figures('Preliminary estimates were reduced from half a day to approximately one hour.'), ['half a day', 'one hour']);
  assert.deepEqual(figures('Change-order turnaround was reduced from approximately 10 days to three.'), ['10 days', 'three']);
  assert.deepEqual(figures('A change order now takes 45 minutes.'), ['45 minutes']);
});

test('in a sentence naming several metrics, each figure is checked against the metric before it', () => {
  // "one hour" is the change order figure, but here it follows estimating.
  assert.deepEqual(
    figures('It cut contract packages from 8 hours to 30 minutes and estimating from 10 hours to one hour.'),
    ['one hour'],
  );
});

test('PM knowledge takes no figure: "from day one" passes, a duration does not', () => {
  assert.deepEqual(figures('A new PM can ask the system for company policy from day one.'), []);
  assert.deepEqual(figures('New project managers were productive within two weeks.'), ['two weeks']);
  assert.deepEqual(figures('A new PM may interrupt a senior employee several times a day.'), []);
});

test('sentences without a metric, and figures that are not durations, are ignored', () => {
  assert.deepEqual(figures('Your best estimator has 20 years of pricing knowledge in his head.'), []);
  assert.deepEqual(figures('The project ran 10 days late.'), []);
  assert.deepEqual(figures('Change orders on 15 jobs in 2025.'), []);
  assert.deepEqual(figuresIn('half an hour').map((f) => f.minutes), [30]);
});

test('the site check fails a published article with a wrong figure and warns for a draft', () => {
  const root = mkdtempSync(join(tmpdir(), 'jyc-metrics-'));
  try {
    const dir = join(root, 'src/content/articles');
    mkdirSync(dir, { recursive: true });
    const body = 'Change-order turnaround was reduced from approximately 10 days to three.\n';
    const fm = (draft) => `---\ntitle: "T"\ndescription: "D"\ndate: 2026-11-23\ncategory: "AI for Construction"\ndraft: ${draft}\n---\n\n`;
    writeFileSync(join(dir, 'published.md'), fm(false) + body);
    writeFileSync(join(dir, 'draft.md'), fm(true) + body);
    const { errors, warnings } = articleSourceChecks({ root, register });
    assert.equal(errors.length, 1);
    assert.match(errors[0], /published\.md: "10 days", "three" aren't register figures/);
    assert.match(errors[0], /Change order package: ~4 hrs → ~1 hr of PM time/);
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /draft\.md: .*before publishing\.$/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
