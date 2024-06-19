import { z } from 'astro/zod';
import { defineDb } from 'astro:db';

export type PostSearch = z.infer<typeof PostSeach>;
export const PostSeach = z.object({
  slug: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
});
export const PostSearchRows = z.object({ rows: z.array(z.any()) }).transform((v) => v.rows);
export const PostSearchMatcher = z
  .string()
  .trim()
  .min(1)
  .transform((v) => `"${v.replaceAll('"', '""')}"`);

export default defineDb({ tables: {} });
