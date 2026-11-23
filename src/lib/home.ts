// JYC-CAP-01: what the homepage features.
//   lead      the newest article marked featured. If it's a draft, the newest published
//             article in the same category takes its place.
//   curated   one article per category (featured first, else the newest), so featured
//             writing covers both audiences whenever both have a published article.
import type { Article } from './articles';
import { publishedArticles, categories, featuredArticle } from './articles';

export async function homepageWriting() {
  const published = await publishedArticles();
  const lead = await featuredArticle(published);

  const curated: Article[] = [];
  for (const c of categories) {
    const inCat = published.filter((a) => a.data.category === c.name && a.id !== lead?.id);
    const pick = inCat.find((a) => a.data.featured) ?? inCat[0];
    if (pick) curated.push(pick);
  }
  return { lead, curated };
}
