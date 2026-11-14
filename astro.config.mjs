// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// To move to a custom domain later: change `site`, add public/CNAME (see README).
export default defineConfig({
  site: 'https://rui-costa26.github.io',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      filter: (page) => /\/(en|pt)\//.test(page),
      i18n: { defaultLocale: 'en', locales: { en: 'en', pt: 'pt-PT' } },
    }),
  ],
});
