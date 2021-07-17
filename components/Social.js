import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Social({
  twitterHandle = "@ianmitchel1",
  image,
  title = "Ian Mitchell | Web Dev",
  description = "",
}) {
  const router = useRouter();

  const page = `${process.env.DOMAIN}${router.asPath}`;
  const imagePath = image ?? `${process.env.DOMAIN}/ian.jpg`;

  return (
    <Head>
      {/* Twitter */}
      <meta name="twitter:card" content="summary" key="twitter-card" />
      <meta
        name="twitter:creator"
        content={twitterHandle}
        key="twitter-handle"
      />

      {/* Open Graph */}
      <meta property="og:url" content={page} key="og-url" />
      <meta property="og:image" content={imagePath} key="og-image" />
      <meta property="og:site_name" content="Ian Mitchell" key="og-site-name" />
      <meta property="og:title" content={title} key="og-title" />
      <meta property="og:description" content={description} key="og-desc" />
    </Head>
  );
}
