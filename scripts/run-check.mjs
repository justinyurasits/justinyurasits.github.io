// npm run check: build the site, then run the site checks, reporting every problem in
// plain language. Nothing publishes unless this passes.
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const build = spawnSync('npx', ['astro', 'build'], { cwd: ROOT, encoding: 'utf8', env: { ...process.env, FORCE_COLOR: '0' } });

if (build.status !== 0) {
  const out = `${build.stdout}\n${build.stderr}`;
  const problems = [];
  // Content that doesn't match its schema: one line per field.
  for (const m of out.matchAll(/(\w+) → (\S+) data does not match collection schema\.\n((?:\s{2,}\S.*\n)+)/g)) {
    const [, collection, id, fields] = m;
    for (const line of fields.split('\n').map((l) => l.trim()).filter((l) => l && !/^Error reference|^https?:|^\//.test(l))) {
      const field = line.split(':')[0];
      const msg = line.slice(field.length + 1).trim();
      problems.push(`src/content/${collection}/${id}: ${msg || `${field} is invalid`}.`);
    }
  }
  const reg = out.match(/The facts register doesn't match its schema:\n((?:\s+content\/facts\.json.*\n?)+)/);
  if (reg) problems.push(...reg[1].trim().split('\n').map((l) => l.trim() + '.'));
  // Any other build error: Astro's one-line message, e.g. "[ImageNotFound] Could not find…".
  if (!problems.length) {
    for (const m of out.matchAll(/^\[(?!WARN|ERROR|build|content|types|vite|glob-loader)[A-Za-z]+\] (.+)$/gm)) problems.push(m[1]);
  }
  if (problems.length) {
    for (const p of problems) console.log(`✗ ${p}`);
  } else {
    console.log(out.trim());
    console.log('\n✗ The site didn\'t build. The error above names the file.');
  }
  console.log('\nThe site will not publish until every ✗ is fixed.');
  process.exit(1);
}

const check = spawnSync('node', ['scripts/check.mjs'], { cwd: ROOT, stdio: 'inherit' });
process.exit(check.status ?? 1);
