// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { loadRegister } from './src/lib/register.mjs';
import { KEPT_HTML } from './src/data/old-addresses.mjs';

// The build stops here, naming the field, if the facts register doesn't match its schema.
loadRegister(new URL('./content/facts.json', import.meta.url));

export default defineConfig({
  site: 'https://justinyurasits.com',
  output: 'static',
  trailingSlash: 'always',
  // folder/index.astro builds to folder/index.html as before; a page file such as
  // privacy.astro builds to privacy.html, so old .html addresses can be kept (JYC-CAP-09).
  build: { format: 'preserve' },
  // Keep the content cache with the project, not in node_modules, so the throwaway sites
  // the tests build in parallel never share one.
  cacheDir: './.astro/cache',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
      // A kept .html page (privacy.html) is listed at its real address, not as /privacy/.
      serialize: (item) => {
        const path = new URL(item.url).pathname;
        const kept = KEPT_HTML.find((h) => h.replace(/\.html$/, '/') === path);
        return kept ? { ...item, url: new URL(kept, item.url).href } : item;
      },
    }),
  ],
});
