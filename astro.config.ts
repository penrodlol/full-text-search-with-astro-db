import alpine from '@astrojs/alpinejs';
import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'hybrid',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    db(),
    tailwind(),
    alpine({ entrypoint: '/alpine.config.ts' }),
    mdx({ shikiConfig: { theme: 'houston' } }),
  ],
});
