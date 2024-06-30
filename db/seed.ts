import { getCollection } from 'astro:content';
import { db, sql } from 'astro:db';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';

export default async function () {
  const posts = (await getCollection('posts')).map((post, index) => {
    if (index === 0) {
    }

    const content = toString(fromMarkdown(post.body), { includeHtml: false }).replaceAll('\n', ' ');
    return sql`(${post.slug}, ${post.data.title}, ${content})`;
  });

  await db.batch([
    db.run(sql`drop table if exists PostSearch`),
    db.run(sql`create virtual table PostSearch using fts5(slug unindexed, title unindexed, content)`),
    db.run(sql.join([sql`insert into PostSearch (slug, title, content) values `, sql.join(posts, sql`,`)])),
  ]);
}
