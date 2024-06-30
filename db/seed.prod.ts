import { db, sql } from 'astro:db';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';
import { readFile, readdir } from 'node:fs/promises';

export default async function () {
  // prettier-ignore
  const posts = await Promise.all(
    (await readdir('src/content/posts')).map(async (file) => {
      const post = await readFile(`src/content/posts/${file}`, 'utf-8');
      const slug = file.replace(/\.mdx$/, '');
      const title = post.match(/^title:\s*(['"])?(.*?)\1?$/m)?.[2]?.replace(/^['"]|['"]$/g, '').trim();
      const content = toString(fromMarkdown(post.replace(/---[\s\S]*?---/, '')), { includeHtml: false }).replaceAll('\n', ' ');

      return sql`(${slug}, ${title}, ${content})`;
    }),
  );

  await db.batch([
    db.run(sql`create virtual table if not exists PostSearch using fts5(slug unindexed, title unindexed, content)`),
    db.run(sql`
      with target(slug, title, content) as (values ${sql.join(posts, sql`, `)})
      update PostSearch
      set content = target.content
      from target
      where target.slug = PostSearch.slug
      and target.content != PostSearch.content;
    `),
    db.run(sql`
      with target(slug, title, content) as (values ${sql.join(posts, sql`, `)})
      insert into PostSearch (slug, content)
      select slug, title, content from target
      where not exists (select 1 from PostSearch where slug = target.slug);
    `),
  ]);
}
