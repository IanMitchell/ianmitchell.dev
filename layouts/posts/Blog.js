import React from 'react';

export default function Blog({ content }) {
  return (
    <article
      className="content-body"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
