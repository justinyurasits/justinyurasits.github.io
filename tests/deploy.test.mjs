// The deploy workflow's safety properties, read from the workflow file itself.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const wf = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');

test('deploy triggers only on main (plus manual runs), never on v2', () => {
  const on = wf.split('\non:')[1].split('\npermissions:')[0];
  assert.match(on, /push:\s*\n\s*branches: \[main\]/);
  assert.doesNotMatch(on, /v2|pull_request/);
});

test('deploy is disabled until cutover sets PAGES_DEPLOY_ENABLED', () => {
  assert.match(wf, /if: vars\.PAGES_DEPLOY_ENABLED == 'true'/);
});

test('a failing build or check stops before the deploy step', () => {
  const build = wf.split('\n  build:')[1].split('\n  deploy:')[0];
  const order = ['npm run check', 'npm test', 'upload-pages-artifact'].map((s) => build.indexOf(s));
  assert.ok(order.every((i) => i > 0) && order[0] < order[1] && order[1] < order[2], 'check and test run before the artifact upload');
  assert.match(wf.split('\n  deploy:')[1], /needs: build/);
  assert.doesNotMatch(wf, /continue-on-error/);
});
