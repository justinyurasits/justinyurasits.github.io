// Builds a throwaway copy of the site with fixture files added, so tests can check what a
// real build does with good and bad content without touching the repository.
import { cpSync, mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync, existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const COPY = ['src', 'public', 'content', 'scripts', 'astro.config.mjs', 'package.json', 'tsconfig.json', 'checks.config.json'];

export function makeSite(files = {}, { remove = [] } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'jyc-site-'));
  for (const p of COPY) if (existsSync(join(ROOT, p))) cpSync(join(ROOT, p), join(dir, p), { recursive: true });
  symlinkSync(join(ROOT, 'node_modules'), join(dir, 'node_modules'));
  for (const r of remove) rmSync(join(dir, r), { recursive: true, force: true });
  for (const [rel, body] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, rel)), { recursive: true });
    writeFileSync(join(dir, rel), body);
  }
  return {
    dir,
    run(script, extraEnv = {}, args = []) {
      const r = spawnSync('npm', ['run', '--silent', script, ...(args.length ? ['--', ...args] : [])], {
        cwd: dir, encoding: 'utf8', env: { ...process.env, ...extraEnv, FORCE_COLOR: '0', NO_COLOR: '1' },
      });
      return { code: r.status, out: `${r.stdout}\n${r.stderr}` };
    },
    build() { return this.run('build'); },
    read(rel) { return readFileSync(join(dir, rel), 'utf8'); },
    exists(rel) { return existsSync(join(dir, rel)); },
    html() {
      const out = [];
      const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && out.push(p); } };
      walk(join(dir, 'dist'));
      return out.map((p) => ({ path: p.slice(join(dir, 'dist').length), body: readFileSync(p, 'utf8') }));
    },
    cleanup() { rmSync(dir, { recursive: true, force: true }); },
  };
}

// Front matter helper for fixtures.
export function md(fields, body = 'Body text.') {
  const yaml = Object.entries(fields)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n');
  return `---\n${yaml}\n---\n\n${body}\n`;
}

export const ARTICLE = {
  title: 'Fixture article', description: 'A fixture.', date: '2026-11-01',
  category: 'AI for Construction', tags: ['Evaluation'], draft: false,
};
export const PROJECT = {
  title: 'Fixture project', summary: 'A fixture project.', problem: 'A problem.',
  role: 'built', personallyDid: 'Wrote all of it.', maturity: 'prototype', demo: 'none',
  repository: { visibility: 'private-own' },
};
export const EXPERIENCE = { title: 'Fixture role', role: 'led', personallyDid: 'Led the team.' };
