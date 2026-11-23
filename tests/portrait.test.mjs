// #60 part 1: the approved headshot (restored from main's images/about-portrait.jpg) on
// Home and About, in place of the portrait placeholders, optimized and with alt text.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import { join } from 'node:path';
import { makeSite } from './harness.mjs';

let site;
test.before(() => { site = makeSite(); const r = site.build(); assert.equal(r.code, 0, r.out); });
test.after(() => site.cleanup());

const portrait = (path, wrapper) => {
  const h = site.read(path).split(`class="${wrapper}`)[1].split('</div>')[0];
  return h;
};

for (const [name, path, wrapper] of [['Home', 'dist/index.html', 'hero-portrait'], ['About', 'dist/about/index.html', 'about-portrait']]) {
  test(`#60: ${name} shows the headshot, not a placeholder, with alt "Justin Yurasits"`, () => {
    const p = portrait(path, wrapper);
    assert.doesNotMatch(p, /data-placeholder-media/);
    assert.match(p, /<picture[\s>]/);
    assert.match(p, /<img[^>]*alt="Justin Yurasits"/);
    assert.match(p, /<img[^>]*data-portrait/);
  });

  test(`#60: ${name} serves the headshot as AVIF and WebP at several widths, each smaller than the original`, () => {
    const p = portrait(path, wrapper);
    assert.match(p, /<source[^>]*type="image\/avif"/);
    assert.match(p, /<source[^>]*type="image\/webp"/);
    const avif = p.match(/<source[^>]*srcset="([^"]+)"[^>]*type="image\/avif"|<source[^>]*type="image\/avif"[^>]*srcset="([^"]+)"/);
    const files = (avif[1] ?? avif[2]).split(',').map((s) => s.trim().split(/\s+/)[0]);
    assert.ok(files.length >= 3, 'several widths');
    const original = statSync(join(site.dir, 'src/assets/images/headshot.jpg')).size;
    for (const f of files) assert.ok(statSync(join(site.dir, 'dist', f)).size < original / 5, `${f} is optimized`);
  });
}
