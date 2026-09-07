import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://garnyizvit.com.ua',
  integrations: [sitemap()],
  trailingSlash: 'always',
});
