import React, { Fragment } from 'react';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { SWRConfig } from 'swr';
import Font from '../components/Font';
import MDX from '../components/MDX';
import Social from '../components/Social';
import { logMetric } from '../lib/metrics';
import '../styles/main.scss';

export function reportWebVitals(metric) {
  // Log our top five metrics
  switch (metric.name) {
    case 'FCP': // First Contentful Paint
    case 'LCP': // Largest Contentful Paint
    case 'FID': // First Input Delay
    case 'CLS': // Cumulative Layout Shift
    case 'TTFB': // Time to First Byte
      logMetric(metric);
      break;
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load('LKSXEXQK', {
      includedDomains: ['ianmitchell.dev'],
      url: 'https://macaw.ianmitchell.dev/script.js',
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);

  return (
    <Fragment>
      <Head>
        <title>Ian Mitchell</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%231e2235%22></rect><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2270%22>🤓</text></svg>"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        <link type="text/plain" rel="author" href="/humans.txt" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />

        <link
          key="webmention"
          rel="webmention"
          href="https://webmention.io/ianmitchell.dev/webmention"
        />
        <link
          key="pingback"
          rel="pingback"
          href="https://webmention.io/ianmitchell.dev/xmlrpc"
        />
      </Head>

      <Font href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" />
      <Font href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap" />
      <Font href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />

      <Social />

      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <MDX>
          <Component {...pageProps} />
        </MDX>
      </SWRConfig>
    </Fragment>
  );
}
