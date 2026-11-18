import { getCollection } from 'astro:content';

// Separate sitemap for blog articles.
// Every post is listed with <lastmod>. Posts published within the last
// NEWS_WINDOW_DAYS (counted at build time) also get Google News markup,
// as Google News only uses articles from the last 2 days.
const NEWS_WINDOW_DAYS = 2;
const PUBLICATION_NAME = 'Гарний Звіт';
const PUBLICATION_LANG = 'uk';

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export async function GET(context) {
  const site = (context.site ? context.site.href : 'https://garnyizvit.org.ua/').replace(/\/$/, '');
  const now = Date.now();
  const windowMs = NEWS_WINDOW_DAYS * 24 * 60 * 60 * 1000;

  const posts = (await getCollection('blog')).sort((a, b) => b.data.date - a.data.date);

  const urls = posts.map((p) => {
    const loc = site + '/blog/' + p.slug + '/';
    const date = p.data.date.toISOString().slice(0, 10);
    const isFresh = now - p.data.date.getTime() <= windowMs;
    const news = isFresh
      ? '\n    <news:news>' +
        '\n      <news:publication>' +
        '<news:name>' + escapeXml(PUBLICATION_NAME) + '</news:name>' +
        '<news:language>' + PUBLICATION_LANG + '</news:language>' +
        '</news:publication>' +
        '\n      <news:publication_date>' + date + '</news:publication_date>' +
        '\n      <news:title>' + escapeXml(p.data.title) + '</news:title>' +
        '\n    </news:news>\n  '
      : '';
    return '  <url>\n    <loc>' + loc + '</loc>\n    <lastmod>' + date + '</lastmod>' + news + (isFresh ? '' : '\n  ') + '</url>';
  });

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
    '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n' +
    urls.join('\n') +
    '\n</urlset>\n';

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
