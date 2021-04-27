import React, { Fragment } from 'react';
import ExternalLink from '../../components/icons/ExternalLink';

export default function Blog({ children, href, link }) {
  return (
    <Fragment>
      <a href={href} className="post-link">
        <ExternalLink className="icon-link" /> {link}
      </a>

      <article className="content-body">{children}</article>
    </Fragment>
  );
}
