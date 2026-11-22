// Article listings, all built from published content (drafts never appear).
import type { CollectionEntry } from 'astro:content';
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
