import React, { Fragment } from 'react';
import Head from 'next/head';

export default function Font({ href }) {
  return (
    <Fragment>
      <Head>
        <link key={`preload-${href}`} rel="preload" as="style" href={href} />
        <link
          key={`stylesheet-${href}`}
          rel="stylesheet"
          href={href}
          media="print"
          onLoad="this.media='all'"
        />
      </Head>
      <noscript>
        <link rel="stylesheet" href={href} />
      </noscript>
    </Fragment>
  );
}
