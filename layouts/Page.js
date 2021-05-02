import React, { Fragment } from "react";
import Head from "next/head";
import classnames from "classnames";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Page({
  title,
  breadcrumb,
  className,
  content = true,
  children,
}) {
  const classes = classnames("container", className, {
    content,
  });

  return (
    <Fragment>
      <Header />
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
