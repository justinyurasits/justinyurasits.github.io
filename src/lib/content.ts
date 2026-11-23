// The only way pages read content. Drafts are left out of every route, listing, feed and
// sitemap in a build, and shown only in local development (JYC-CAP-04).
import { getCollection, type CollectionEntry } from 'astro:content';

type Name = 'articles' | 'projects' | 'classes';

export const showDrafts = import.meta.env.DEV;

export async function getPublished<N extends Name>(name: N): Promise<CollectionEntry<N>[]> {
  const all = (await getCollection(name)) as CollectionEntry<N>[];
  return all.filter((e) => showDrafts || !('draft' in e.data) || !(e.data as { draft?: boolean }).draft);
}
