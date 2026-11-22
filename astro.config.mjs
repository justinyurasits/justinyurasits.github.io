// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { loadRegister } from './src/lib/register.mjs';

// The build stops here, naming the field, if the facts register doesn't match its schema.
loadRegister(new URL('./content/facts.json', import.meta.url));

export default defineConfig({
  site: 'https://justinyurasits.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx()],
});
