// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { loadRegister } from './src/lib/register.mjs';

// The build stops here, naming the field, if the facts register doesn't match its schema.
loadRegister(new URL('./content/facts.json', import.meta.url));

export default defineConfig({
  site: 'https://justinyurasits.com',
  output: 'static',
  trailingSlash: 'always',
  // Keep the content cache with the project, not in node_modules, so the throwaway sites
  // the tests build in parallel never share one.
  cacheDir: './.astro/cache',
  integrations: [mdx(), sitemap({ filter: (page) => !page.endsWith('/404/') })],
});
