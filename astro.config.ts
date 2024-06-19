import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [db(), tailwind(), mdx({ shikiConfig: { theme: 'houston' } })],
});