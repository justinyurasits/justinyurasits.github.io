// Product metrics in article prose. Articles may talk about the products freely, but a
// sentence that names one of the register's product metrics and gives a time figure must
// use the register's figure. The site check calls this on every article file: a mismatch
// fails a published article and warns in a draft.
//
// What counts:
//   topic    a sentence naming a metric's task (TOPICS below). PM knowledge is a capability
//            in the register, not a metric, so any time figure next to it is a mismatch.
//   figure   a duration: a number (digits or words) and a unit, e.g. "8 hours",
//            "approximately 30 minutes", "half a day", "four to eight hours" (a range: write
//            "from 10 hours to 2", not "from 10 to 2 hours"). In "from 10 days
//            to three", the bare "three" takes the unit after it or before it.
//   match    the figure equals one of the metric's before/after values. Qualifiers ("about",
//            "up to", "~") don't matter; a range ("4–8 hours") never matches; days and weeks
//            never match, since the register states hours and minutes.
// A sentence naming two or more metrics checks each figure against the metric named
// closest before it ("contract packages from 8 hours to 30 minutes, estimates from 10 to 2").

// Each register metric's key, and the words that name it in prose.
export const TOPICS = {
  contractPackage: /\bcontract[- ]packages?\b/i,
  changeOrder: /\bchange[- ]orders?\b/i,
  preliminaryEstimating: /\bestimat(?:e|es|ed|ing)\b/i,
};
// The PM knowledge capability (constructionOS.capabilities): no figure is ever right.
export const PM_KNOWLEDGE = /\bnew (?:PMs?|project managers?)\b/i;

const WORDS = {
  a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, fifteen: 15, twenty: 20, thirty: 30, forty: 40, 'forty-five': 45, fifty: 50, sixty: 60, ninety: 90,
};
const NUM = `(?:\\d+(?:\\.\\d+)?|${Object.keys(WORDS).sort((a, b) => b.length - a.length).join('|')})`;
const UNIT = '(?:hours?|hrs?|minutes?|mins?|days?|weeks?)';
const num = (s) => (/^\d/.test(s) ? Number(s) : WORDS[s.toLowerCase()]);
const MINUTES = { hour: 60, hr: 60, minute: 1, min: 1 };
const unitKey = (u) => u.toLowerCase().replace(/s$/, '');

// Every duration in a sentence, in minutes (null for days, weeks and ranges, which never match).
export function figuresIn(sentence) {
  const out = [];
  const re = new RegExp(
    `\\b(half )?(${NUM})(?:\\s?(?:-|–|—|to)\\s?(${NUM}))?(?:\\s|-)?(${UNIT})?\\b`, 'gi');
  const raw = [];
  for (const m of sentence.matchAll(re)) {
    const [text, half, a, b, unit] = m;
    if (!unit && /^an?$/i.test(a)) continue; // a bare "a" is an article, not a number
    raw.push({ text: text.trim(), half: !!half, a: num(a), b: b ? num(b) : null, unit: unit ? unitKey(unit) : null, index: m.index });
  }
  // "half a day", "half an hour": the number is the article, the unit follows.
  // A bare number borrows the unit of a neighbour in "from X unit to Y" or "from X to Y unit".
  for (let i = 0; i < raw.length; i++) {
    const f = raw[i];
    if (!f.unit) {
      const between = (x, y) => sentence.slice(x.index + x.text.length, y.index);
      const prev = raw[i - 1];
      const next = raw[i + 1];
      if (prev?.unit && /^\s*to\s*$/i.test(between(prev, f))) f.unit = prev.unit;
      else if (next?.unit && /^\s*to\s*$/i.test(between(f, next)) && next.b === null) f.unit = next.unit;
    }
    if (!f.unit) continue;
    // "several times a day", "twice a week", "per hour": a frequency, not a duration.
    if (/\b(?:times|once|twice|per|each|every)\s+$/i.test(sentence.slice(0, f.index))) continue;
    let minutes = null;
    if (f.b === null && MINUTES[f.unit]) minutes = (f.half ? 0.5 : 1) * f.a * MINUTES[f.unit];
    out.push({ text: f.text, minutes, index: f.index });
  }
  return out;
}

// A register value like "up to 8 hrs", "~30 min" or "~1 hr", in minutes.
export function registerMinutes(value) {
  const m = String(value).match(/(\d+(?:\.\d+)?)\s?(hrs?|hours?|min(?:utes)?)\b/i);
  if (!m) return null;
  return Number(m[1]) * (/^h/i.test(m[2]) ? 60 : 1);
}

// Article body text split into sentences: no front matter, code, comments or link targets.
export function sentencesOf(markdown) {
  const body = markdown.replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ');
  return body.split(/\n\s*\n|\n(?=\s*(?:[-*+]|\d+\.|#{1,6}|>|\|)\s)/)
    .flatMap((block) => block.replace(/\s+/g, ' ').split(/(?<=[.!?])["'”’)]?\s+(?=[A-Z"“(])/))
    .map((s) => s.replace(/^[\s>#*+|-]+|\d+\.\s/, '').replace(/[*_`]/g, '').trim())
    .filter(Boolean);
}

// Each sentence that pairs a product metric with a figure the register doesn't give: the
// sentence, the figures, and what the register says.
export function metricMismatches(markdown, register) {
  const metrics = Object.fromEntries(register.metrics.map((m) => [m.key, m]));
  const says = (k) => k === 'pm'
    ? 'PM knowledge is a capability with no figure ("from day one")'
    : `${metrics[k].task}: ${metrics[k].before} → ${metrics[k].after}${metrics[k].outcome ? ` ${metrics[k].outcome}` : ''}`;
  const hits = [];
  for (const sentence of sentencesOf(markdown)) {
    // Where each topic is named in the sentence.
    const mentions = [
      ...Object.keys(TOPICS).filter((k) => metrics[k]).flatMap((k) =>
        [...sentence.matchAll(new RegExp(TOPICS[k].source, 'gi'))].map((m) => ({ k, index: m.index }))),
      ...[...sentence.matchAll(new RegExp(PM_KNOWLEDGE.source, 'gi'))].map((m) => ({ k: 'pm', index: m.index })),
    ].sort((a, b) => a.index - b.index);
    if (!mentions.length) continue;
    const bad = [];
    const topics = new Set();
    for (const f of figuresIn(sentence)) {
      const k = (mentions.filter((m) => m.index <= f.index).at(-1) ?? mentions[0]).k;
      const allowed = k === 'pm' ? [] : [metrics[k].before, metrics[k].after].map(registerMinutes);
      if (f.minutes !== null && allowed.includes(f.minutes)) continue;
      bad.push(f.text);
      topics.add(k);
    }
    if (bad.length) hits.push({ sentence, figures: bad, says: [...topics].map(says) });
  }
  return hits;
}
