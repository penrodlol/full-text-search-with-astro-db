import { z } from 'astro/zod';
import { defineDb } from 'astro:db';

export type PostSearchTable = z.infer<typeof PostSearchTableSchema>;
export type PostSearchQuery = z.infer<typeof PostSeachQuerySchema>;
export const PostSearchTableSchema = z.object({ slug: z.string(), title: z.string(), content: z.string() });
export const PostSeachQuerySchema = z.object({ rows: z.array(PostSearchTableSchema) }).transform((v) => v.rows);

export default defineDb({ tables: {} });
