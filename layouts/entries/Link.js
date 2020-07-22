import React from 'react';
import Meta from '../../components/Meta';
import ExternalLink from '../../components/icons/ExternalLink';

export default function Link({ title, date, tags, href, excerpt }) {
  return (
    <article className="entry entry-link">
      <Meta date={date} tags={tags} />
      <h4>
        <a href={href}>
          <ExternalLink className="icon-link" /> {title}
        </a>
      </h4>
      {excerpt && <p>{excerpt}</p>}
    </article>
  );
}
