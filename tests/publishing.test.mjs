import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { makeSite, md, ARTICLE } from './harness.mjs';

// A 1×1 PNG.
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

test('CAP-04: the routine: new-article creates one draft file; publishing it is that one file, no component changes', () => {
  const site = makeSite();
  try {
    const made = site.run('new-article', {}, ['Evals in the field', 'construction']);
    assert.equal(made.code, 0, made.out);
    assert.match(made.out, /Created src\/content\/articles\/evals-in-the-field\.md \(a draft\)/);
    assert.match(made.out, /npm run preview/);
    const file = join(site.dir, 'src/content/articles/evals-in-the-field.md');
    const tpl = readFileSync(file, 'utf8');
    assert.match(tpl, /category: "AI for Construction"/);
    assert.match(tpl, /draft: true/);

    // As a draft, it isn't built.
    let r = site.run('check');
    assert.equal(r.code, 0, r.out);
    assert.ok(!site.exists('dist/writing/evals-in-the-field/index.html'));

    // Publishing: edit that one file (text, an image beside it, draft: false), then check.
    mkdirSync(join(site.dir, 'src/content/articles/evals-in-the-field'), { recursive: true });
    writeFileSync(join(site.dir, 'src/content/articles/evals-in-the-field/diagram.png'), PNG);
    writeFileSync(file, tpl.replace('draft: true', 'draft: false').replace('Write the article here in Markdown.', 'The real text.\n\n![A diagram](./evals-in-the-field/diagram.png)'));
    r = site.run('check');
    assert.equal(r.code, 0, r.out);
    assert.match(r.out, /Ready to publish/);
    const page = site.read('dist/writing/evals-in-the-field/index.html');
    assert.match(page, /The real text\./);
    assert.match(page, /<img[^>]+diagram/);
  } finally { site.cleanup(); }
});

test('CAP-04: new-article explains itself when the title or category is missing or wrong', () => {
  const site = makeSite();
  try {
    let r = site.run('new-article', {}, ['Only a title']);
    assert.notEqual(r.code, 0);
    assert.match(r.out, /Give the article a title and a category/);
    r = site.run('new-article', {}, ['A title', 'marketing']);
    assert.notEqual(r.code, 0);
    assert.match(r.out, /"marketing" isn't a category/);
  } finally { site.cleanup(); }
});

test('CAP-04: npm run check gives a plain-language result naming the file and the problem', () => {
  const site = makeSite({ 'src/content/articles/oops.md': md({ ...ARTICLE, category: 'Marketing', description: undefined }) });
  try {
    const r = site.run('check');
    assert.notEqual(r.code, 0);
    assert.match(r.out, /✗ src\/content\/articles\/oops: category must be exactly one of: "Enterprise AI & Product Leadership", "AI for Construction"\./);
    assert.match(r.out, /✗ src\/content\/articles\/oops: description is required\./);
    assert.match(r.out, /The site will not publish until every ✗ is fixed\./);
    assert.doesNotMatch(r.out, /InvalidContentEntryDataError|at .*node_modules/);
  } finally { site.cleanup(); }
});

test('CAP-04: a correction is the same one file; the URL stays the same', () => {
  const site = makeSite({ 'src/content/articles/fix-me.md': md({ ...ARTICLE }, 'Teh text.') });
  try {
    assert.equal(site.run('check').code, 0);
    const file = join(site.dir, 'src/content/articles/fix-me.md');
    writeFileSync(file, readFileSync(file, 'utf8').replace('Teh text.', 'The text.'));
    const r = site.run('check');
    assert.equal(r.code, 0, r.out);
    assert.match(site.read('dist/writing/fix-me/index.html'), /The text\./);
    assert.doesNotMatch(site.read('dist/writing/fix-me/index.html'), /Updated/);
  } finally { site.cleanup(); }
});

import { spawn } from 'node:child_process';

test('CAP-04: npm run preview shows a draft locally', { timeout: 120000 }, async () => {
  const site = makeSite({ 'src/content/articles/wip.md': md({ ...ARTICLE, title: 'Work in progress', draft: true }) });
  const port = 4500 + Math.floor(Math.random() * 400);
  // Its own process group, so stopping it stops the Astro server npm starts, not just npm.
  const dev = spawn('npm', ['run', '--silent', 'preview', '--', '--port', String(port)], { cwd: site.dir, env: { ...process.env, FORCE_COLOR: '0' }, detached: true });
  try {
    await new Promise((ok, fail) => {
      const t = setTimeout(() => fail(new Error('dev server did not start')), 60000);
      const seen = (d) => { if (/localhost:\d+/.test(String(d))) { clearTimeout(t); ok(); } };
      dev.stdout.on('data', seen);
      dev.stderr.on('data', seen);
    });
    const res = await fetch(`http://localhost:${port}/writing/wip/`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.match(html, /Work in progress/);
    assert.match(html, /Draft/);
  } finally {
    try { process.kill(-dev.pid, 'SIGTERM'); } catch {}
    dev.stdout.destroy(); dev.stderr.destroy();
    site.cleanup();
  }
});
