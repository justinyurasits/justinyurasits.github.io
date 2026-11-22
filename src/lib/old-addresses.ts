// Where each moving old address goes, resolving old articles to their migrated version.
import { OLD_ADDRESSES, ARTICLE_FALLBACK } from '../data/old-addresses.mjs';
import { publishedArticles } from './articles';
import { articleUrl } from './format';

export async function movingAddresses() {
  const articles = await publishedArticles();
  return OLD_ADDRESSES.filter((a) => !a.kept).map((a) => {
    if (!a.article) return { from: a.from, to: a.to! };
    const migrated = articles.find((x) => x.data.replaces.includes(a.from));
    return { from: a.from, to: migrated ? articleUrl(migrated.id) : ARTICLE_FALLBACK };
  });
}
