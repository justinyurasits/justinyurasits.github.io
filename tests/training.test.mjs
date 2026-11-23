// JYC-CAP-10: Training (M2.17, #59).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSite, md } from './harness.mjs';

const CLASS = {
  title: 'Fixture class', audience: 'Fixture audience.', level: 'Beginner', duration: '1 hour',
  format: 'Online', prerequisites: 'None.', schedule: 'Dates to be announced.',
  description: 'A fixture description.', leaveWith: ['A fixture takeaway'],
};

function built(files, fn, { expectFail = false } = {}) {
  const site = makeSite(files);
  try {
    const r = site.run('check');
    if (expectFail) assert.notEqual(r.code, 0, r.out); else assert.equal(r.code, 0, r.out);
    fn(site, r);
  } finally { site.cleanup(); }
}
const classOf = (h, id) => h.match(new RegExp(`<article[^>]*data-class="${id}"[\\s\\S]*?</article>`))?.[0] ?? '';

test('CAP-10: every class shows its audience, level, format, prerequisites, schedule, description and what a participant leaves with', () => {
  built({}, (s) => {
    const h = s.read('dist/training/index.html');
    const ids = [...h.matchAll(/data-class="([\w-]+)"/g)].map((m) => m[1]);
    assert.deepEqual(ids, ['ai-for-construction-business-owners', 'build-your-own-construction-ai-assistant']);
    for (const id of ids) {
      const c = classOf(h, id);
      for (const f of ['audience', 'format', 'prerequisites', 'schedule', 'description', 'leaveWith']) assert.match(c, new RegExp(`data-field="${f}"`), `${id} ${f}`);
      assert.match(c, /class="label-muted"[^>]*>(Beginner|Hands-on) · /, `${id} level`);
    }
    assert.match(classOf(h, 'build-your-own-construction-ai-assistant'), /It isn(?:'|&#39;)t a fully configured assistant for your own business\./);
  });
});

for (const field of ['audience', 'level', 'format', 'prerequisites', 'schedule', 'description', 'leaveWith']) {
  test(`CAP-10: a class missing ${field} fails the build, naming the field`, () => {
    built({ 'src/content/classes/x.md': md({ ...CLASS, [field]: undefined }) }, (_, r) => {
      assert.match(r.out, /classes\/x|x\.md/);
      assert.match(r.out, new RegExp(`${field} is required`));
    }, { expectFail: true });
  });
}

test('CAP-10: each class\'s email link has the subject "Education: <class title>"', () => {
  built({}, (s) => {
    const h = s.read('dist/training/index.html');
    assert.match(h, /data-interest="ai-for-construction-business-owners"|href="mailto:[^"]+\?subject=Education%3A%20AI%20for%20Construction%20Business%20Owners"/);
    assert.match(h, /href="mailto:justin@justinyurasits\.com\?subject=Education%3A%20AI%20for%20Construction%20Business%20Owners"/);
    assert.match(h, /href="mailto:justin@justinyurasits\.com\?subject=Education%3A%20Build%20Your%20Own%20Construction%20AI%20Assistant"/);
  });
});

test('CAP-10: no registration, form or payment; no tuition, fee or price', () => {
  built({}, (s) => {
    const h = s.read('dist/training/index.html');
    const main = h.split('<main')[1].split('</main>')[0];
    assert.doesNotMatch(main, /<form|<input|<select|<textarea/i);
    assert.doesNotMatch(main.replace(/<[^>]+>/g, ' '), /\$\s?\d|tuition|\bfees?\b|\/month|per month|register now|sign up/i);
  });
});

test('CAP-10: private company training links to the construction consulting track', () => {
  built({}, (s) => {
    const section = s.read('dist/training/index.html').split('data-section="private-training"')[1].split('</section>')[0];
    assert.match(section, /href="\/work-with-me\/#construction"/);
  });
});

test('CAP-10: a class for another audience is added as content, with no change to the page', () => {
  built({ 'src/content/classes/enterprise-evals.md': md({ ...CLASS, title: 'Evaluating AI for enterprise teams', audienceGroup: 'enterprise' }) }, (s) => {
    const h = s.read('dist/training/index.html');
    const ids = [...h.matchAll(/data-class="([\w-]+)"/g)].map((m) => m[1]);
    assert.equal(ids.at(-1), 'enterprise-evals', 'construction classes come first');
    assert.match(h, /subject=Education%3A%20Evaluating%20AI%20for%20enterprise%20teams/);
  });
});

test('CAP-10: planned workshops are labeled planned, with no class details', () => {
  built({}, (s) => {
    const section = s.read('dist/training/index.html').split('data-section="planned"')[1].split('</section>')[0];
    assert.equal((section.match(/>Planned</g) ?? []).length, 2);
    assert.doesNotMatch(section, /mailto:|data-class/);
  });
});
