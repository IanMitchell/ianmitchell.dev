import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            type="image/svg+xml"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%231e2235%22></rect><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2270%22>🤓</text></svg>"
          />

          <meta name="theme-color" content="#ff007e" />

          <link
            href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@400&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
            rel="stylesheet"
          />

          <link type="text/plain" rel="author" href="/humans.txt" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS"
            href="/feed.xml"
          />
          <link
            rel="alternate"
            title="Ian's Blog Feed"
            type="application/json"
            href="https://ianmitchell.dev/feed.json"
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
