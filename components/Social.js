import React, { useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import slug from "../lib/slug";

export default function Social({
  twitterHandle = "@ianmitchel1",
  image = "/ian.jpg",
  title = "Ian Mitchell | Web Dev",
  description = "",
}) {
  const router = useRouter();

  const page = `${process.env.DOMAIN}${router.asPath}`;
  const imagePath = `${process.env.DOMAIN}${image}`;

  return (
    <Head>
      <meta name="description" content={description} />

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

export function GeneratedSocial({
  twitterHandle = "@ianmitchel1",
  title,
  date,
  tags,
  description,
}) {
  const router = useRouter();

  const page = `${process.env.DOMAIN}${router.asPath}`;
  const ogURL = encodeURIComponent(`https://ianmitchell.dev/og/${slug(title)}`);

  return (
    <Head>
      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter-card"
      />
      <meta
        name="twitter:creator"
        content={twitterHandle}
        key="twitter-handle"
      />

      {/* Open Graph */}
      <meta property="og:url" content={page} key="og-url" />
      <meta
        property="og:image"
        content={`https://ogian.vercel.app/api/screenshot?page=${ogURL}`}
        key="og-image"
      />
      <meta property="og:site_name" content="Ian Mitchell" key="og-site-name" />
      <meta property="og:title" content={title} key="og-title" />
      <meta property="og:description" content={description} key="og-desc" />
    </Head>
  );
}
