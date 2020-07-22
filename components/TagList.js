import React, { Fragment } from 'react';
import Link from 'next/link';

export default function TagList({ tags }) {
  const [last, ...items] = tags.sort().reverse();

  return (
    <span className="tag-list">
      {items.reverse().map((tag) => (
        <Fragment key={tag}>
          <Link href={`/tags/${tag.toLowerCase()}`}>
            <a>#{tag}</a>
          </Link>
          {', '}
        </Fragment>
      ))}
      <Link href={`/tags/${last.toLowerCase()}`}>
        <a>#{last}</a>
      </Link>
    </span>
  );
}
