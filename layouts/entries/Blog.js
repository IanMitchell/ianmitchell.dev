import React from 'react';
import Link from 'next/link';
import Meta from '../../components/Meta';

export default function Blog({ slug, title, date, tags, excerpt }) {
  return (
    <article className="entry">
      <Meta date={date} tags={tags} />
      <h4>
        <Link href="/blog/[post]" as={`/blog/${slug}`}>
          <a>{title}</a>
        </Link>
      </h4>
      {excerpt && <p>{excerpt}</p>}
    </article>
  );
}
