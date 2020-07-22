import React, { Fragment } from 'react';
import Head from 'next/head';
import classnames from 'classnames';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';

export default function Page({ title, breadcrumb, className, children }) {
  const classes = classnames('container', 'content', className);

  return (
    <Fragment>
      <main className={classes}>
        {title && (
          <Fragment>
            <Head>
              <title>{`${title} | Ian Mitchell`}</title>
            </Head>
            <PageTitle breadcrumb={breadcrumb}>{title}</PageTitle>
          </Fragment>
        )}

        {children}
      </main>
      <Footer />
    </Fragment>
  );
}
