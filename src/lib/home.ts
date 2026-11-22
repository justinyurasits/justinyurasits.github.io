// JYC-CAP-01: what the homepage features.
//   lead      the newest article marked featured. If it's a draft, the newest published
//             article in the same category takes its place.
//   curated   one article per category (featured first, else the newest), so featured
//             writing covers both audiences whenever both have a published article.
import { getCollection } from 'astro:content';
import type { Article } from './articles';
import { publishedArticles, categories } from './articles';

const newest = (xs: Article[]) => [...xs].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

export async function homepageWriting() {
  const published = await publishedArticles();
  const all = newest((await getCollection('articles')) as Article[]);
  const designated = all.find((a) => a.data.featured);
  let lead: Article | undefined;
  if (designated && published.some((p) => p.id === designated.id)) lead = designated;
  else if (designated) lead = published.find((p) => p.data.category === designated.data.category);
  lead ??= published[0];

  const curated: Article[] = [];
  for (const c of categories) {
    const inCat = published.filter((a) => a.data.category === c.name && a.id !== lead?.id);
    const pick = inCat.find((a) => a.data.featured) ?? inCat[0];
    if (pick) curated.push(pick);
  }
  return { lead, curated };
}
