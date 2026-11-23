// Demos & Builds (JYC-CAP-05): ordering, the featured build, topics, and the rule that an
// entry with no demo never says or implies one.
import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

export const byOrder = (a: Project, b: Project) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);

/** The featured build leads; without a featured entry, the first by order does. */
export function splitFeatured(projects: Project[]): { featured?: Project; rest: Project[] } {
  const sorted = [...projects].sort(byOrder);
  const featured = sorted.find((p) => p.data.featured) ?? sorted[0];
  return { featured, rest: sorted.filter((p) => p !== featured) };
}

export const topicSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Every topic in use, once, in alphabetical order. */
export function topics(projects: Project[]): { label: string; slug: string }[] {
  const seen = new Map<string, string>();
  for (const p of projects) for (const t of p.data.tags) if (!seen.has(topicSlug(t))) seen.set(topicSlug(t), t);
  return [...seen].map(([slug, label]) => ({ slug, label })).sort((a, b) => a.label.localeCompare(b.label));
}

const DEMO_WORD = /\bdemo(?:s|ed|nstrations?)?\b/i;

/**
 * For an entry with demo "none", the fields its card and case study show, and its body,
 * mustn't mention a demo: its availability already reads "No demo". Throws, failing the
 * build, with the file and the field to change.
 */
export function assertNoDemoImplied(p: Project): void {
  if (p.data.demo !== 'none') return;
  const d = p.data;
  const fields: [string, string | undefined][] = [
    ['title', d.title], ['summary', d.summary], ['problem', d.problem], ['whatYouCanView', d.whatYouCanView],
    ['limitations', d.limitations], ['architecture', d.architecture], ['tags', d.tags.join(' ')],
    ['screenshots', d.screenshots.map((s) => s.alt).join(' ')], ['the body', p.body],
  ];
  for (const [field, text] of fields) {
    const m = text?.match(DEMO_WORD);
    if (m) {
      throw new Error(
        `src/content/projects/${p.id}: demo is "none", but ${field} says "${m[0]}". ` +
        'Nothing on its card or case study may say or imply a demo exists; its availability already reads "No demo" (JYC-CAP-05).',
      );
    }
  }
}
