import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Гарний Звіт — блог для ФОП',
    description: 'Зміни у законодавстві, дедлайни та ліміти для ФОП.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date - a.data.date)
      .map((p) => ({
        title: p.data.title,
        description: p.data.description,
        pubDate: p.data.date,
        link: `/blog/${p.slug}/`,
      })),
  });
}
