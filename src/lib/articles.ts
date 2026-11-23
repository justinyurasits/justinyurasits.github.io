// Article listings, all built from published content (drafts never appear).
import { getCollection, type CollectionEntry } from 'astro:content';
import { getPublished } from './content';
import { CATEGORIES } from '../content.config';
import { slugify } from './format';

export type Article = CollectionEntry<'articles'>;

export const RECENT_COUNT = 5;

export async function publishedArticles(): Promise<Article[]> {
  return (await getPublished('articles')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const featured = (all: Article[]) => all.filter((a) => a.data.featured);
export const recent = (all: Article[]) => all.slice(0, RECENT_COUNT);
export const inCategory = (all: Article[], category: string) => all.filter((a) => a.data.category === category);
export const withTag = (all: Article[], tag: string) => all.filter((a) => a.data.tags.includes(tag));

export function allTags(all: Article[]) {
  const tags = new Map<string, string>();
  for (const a of all) for (const t of a.data.tags) tags.set(slugify(t), t);
  return [...tags.entries()].map(([slug, name]) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name));
}

export const categories = CATEGORIES.map((name) => ({ name, slug: slugify(name) }));

const newestFirst = (xs: Article[]) => [...xs].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

/**
 * The featured article that leads the writing library (JYC-CAP-02): the newest article
 * marked featured. If it's unpublished or set back to draft, the newest published article
 * in the same category takes its place; with nothing featured, the newest published.
 */
export async function featuredArticle(published: Article[]): Promise<Article | undefined> {
  const designated = newestFirst((await getCollection('articles')) as Article[]).find((a) => a.data.featured);
  if (designated && published.some((p) => p.id === designated.id)) return designated;
  if (designated) {
    const sameCategory = published.find((p) => p.data.category === designated.data.category);
    if (sameCategory) return sameCategory;
  }
  return published[0];
}

/**
 * The two related articles (JYC-CAP-03): Justin's picks, otherwise the newest published
 * in the same category. Never a draft, never the article itself.
 */
export function relatedArticles(entry: Article, published: Article[], count = 2): Article[] {
  const ok = (a: Article) => a.id !== entry.id && published.some((p) => p.id === a.id);
  const picks = entry.data.relatedArticles
    .map((r) => published.find((p) => p.id === r.id))
    .filter((a): a is Article => !!a && ok(a));
  const fill = published.filter((a) => ok(a) && a.data.category === entry.data.category && !picks.includes(a));
  return [...picks, ...fill].slice(0, count);
}
