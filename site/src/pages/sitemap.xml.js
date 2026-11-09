import { getCollection } from 'astro:content';

export async function GET(context) {
  const site = (context.site ? context.site.href : 'https://garnyizvit.org.ua/').replace(/\/$/, '');
  const pages = [
    '/',
    '/poslugy/',
    '/taryfy/',
    '/pro-mene/',
    '/blog/',
    '/kontakty/',
    '/buhgalter-dlya-kavyarni/',
    '/oferta/',
    '/pryvatnist/',
  ];
  const posts = await getCollection('blog');
  const urls = [
    ...pages.map((path) => ({ loc: site + path })),
    ...posts
      .sort((a, b) => b.data.date - a.data.date)
      .map((p) => ({
        loc: site + '/blog/' + p.slug + '/',
        lastmod: p.data.date.toISOString().slice(0, 10),
      })),
  ];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map((u) => '  <url><loc>' + u.loc + '</loc>' + (u.lastmod ? '<lastmod>' + u.lastmod + '</lastmod>' : '') + '</url>')
      .join('\n') +
    '\n</urlset>\n';
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
