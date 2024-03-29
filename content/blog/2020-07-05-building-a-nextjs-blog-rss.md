---
title: "Building a Next.js Blog: RSS"
date: 2020-07-05
excerpt: I love RSS, and wanted to add it to my static file-based Next.js blog. This tutorial will walk you through how to add it to yours!
---

> ℹ️ Webpack 5 Update
>
> Coming here from a failed Webpack 4 to Webpack 5 migration? If you're seeing an error about `webpack-runtime.js` make the following change:
>
> ```javascript title="next.config.js"
> entries["./scripts/generate-rss.js"] = "./scripts/generate-rss.js"; // [!code --]
> entries["scripts/generate-rss.js"] = "./scripts/generate-rss.js"; // [!code ++]
> ```

I love RSS, and I wanted to make sure I supported it with this redesign. There are two approaches to adding an RSS feed to a Next.js site - you can generate the RSS server-side and return it for each request, or add a build step that statically generates the file. I'll cover statically generating it here.

## Generating the File

Next.js doesn't currently support different response types when you statically generate files. Since RSS is XML, we won't be able to create it under the `pages/` directory - instead we'll create a file in the `public/` directory during the build step.

First, let's install the `rss` npm package to help create the RSS XML structure.

```terminal
npm install rss
```

Then let's create a new `scripts/generate-rss.js` file with the following:

```jsx title="scripts/generate-rss.js" copy
import fs from "fs";
import RSS from "rss";

const feed = new RSS({
	title: "Website Title",
	site_url: "https://mydomain.com",
	feed_url: "https://mydomain.com/feed.xml",
});

fs.writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
```

Running this script will create a new `public/feed.xml` file with some minimal information in it! Since we'll be generating this file each time we build we don't want to check it into source control. Let's go ahead and add it to our `.gitignore` file.

```yaml
# Generated Files
public/feed.xml
```

The next step is adding posts to the feed. This snippet assumes a structure similar to the one I wrote about in my [Building a Next.js Blog: Static MDX](/blog/building-a-nextjs-blog-static-mdx) post but it should be easy to tweak as long as you have the ability to get an array of all of your posts. In the function, we need to iterate over these posts and add them to the feed object.

```javascript
const posts = getPosts();
posts.forEach((post) => {
	const { title, url, date, content } = post;
	feed.item({
		title: title,
		guid: url,
		url: url,
		date: date,
		description: content,
	});
});
```

Next we'll want to hook this script up to Webpack (this lets us use ESM and import code from our Next.js codebase). To do this we need to add an entry to the `next.config.js` file. We'll only add it during the build step for performance reasons.

```javascript title="next.config.js"
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = { ...(await originalEntry()) };

        // These scripts can import components from the app and use ES modules
        entries['scripts/generate-rss.js'] = './scripts/generate-rss.js';

        return entries;
      };
    }

    return config;
  },
```

Now we can call the webpack-generated script by adding it to the `build` step in the `package.json` file:

```json
    "build": "next build && node ./.next/server/scripts/generate-rss.js",
```

Finally we need to add a `<link>` reference! I include the following in my `_app.js` file

```jsx
<Head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="RSS"
		href="/feed.xml"
	/>
</Head>
```

## Final Code

_I've included my version of `generate-rss.js` here, which compiles MDX to HTML for use with RSS. Depending on the format of your content you might need to make some revisions to it._

```yaml title=".gitignore"
# Generated Files
public/feed.xml
```

```jsx title="scripts/generate-rss.js"
import fs from "fs";
import RSS from "rss";
import ReactDOMServer from "react-dom/server";
import MDX from "../components/MDX";
import { getAllPosts } from "../lib/posts";

async function generate() {
	const feed = new RSS({
		title: "Website Title",
		site_url: "https://mydomain.com",
		feed_url: "https://mydomain.com/feed.xml",
	});

	const posts = await getAllPosts();

	posts.forEach((post) => {
		const { frontmatter, MDXContent } = post;
		feed.item({
			title: frontmatter.title,
			guid: frontmatter.slug,
			url: frontmatter.slug,
			date: frontmatter.date,
			description: ReactDOMServer.renderToStaticMarkup(
				<MDX>
					<MDXContent />
				</MDX>,
			),
		});
	});

	fs.writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
```

```jsx title="_app.js"
import React, { Fragment } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
	return (
		<Fragment>
			<Head>
				{" "}
				// [!code ++]
				<link // [!code ++]
					rel="alternate" // [!code ++]
					type="application/rss+xml" // [!code ++]
					title="RSS" // [!code ++]
					href="/feed.xml" // [!code ++]
				/>{" "}
				// [!code ++]
			</Head>{" "}
			// [!code ++]
			<Component {...pageProps} />
		</Fragment>
	);
}
```

Add the script to webpack by adding this to `next.config.js`:

```javascript title="next.config.js"
module.exports = {
	webpack: (config, { dev, isServer }) => {
		// [!code ++]
		if (!dev && isServer) {
			// [!code ++]
			const originalEntry = config.entry; // [!code ++]
			// [!code ++]
			config.entry = async () => {
				// [!code ++]
				const entries = { ...(await originalEntry()) }; // [!code ++]
				// [!code ++]
				// These scripts can import components from the app and use ES modules // [!code ++]
				entries["scripts/generate-rss.js"] = "./scripts/generate-rss.js"; // [!code ++]
				// [!code ++]
				return entries; // [!code ++]
			}; // [!code ++]
		} // [!code ++]
		// [!code ++]
		return config; // [!code ++]
	}, // [!code ++]
};
```

```json title="package.json"
    "build": "next build && node ./.next/server/scripts/generate-rss.js",
```
