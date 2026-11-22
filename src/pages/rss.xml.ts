// JYC-CAP-02: the RSS feed, every published article, newest first.
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publishedArticles } from '../lib/articles';
import { articleUrl } from '../lib/format';

export async function GET(context: APIContext) {
  const articles = await publishedArticles();
  return rss({
    title: 'Justin Yurasits',
    description: 'Writing on enterprise AI, product leadership and AI for construction.',
    site: context.site!,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.date,
      link: articleUrl(a.id),
      categories: [a.data.category, ...a.data.tags],
    })),
  });
}
