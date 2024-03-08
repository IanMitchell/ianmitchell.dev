---
title: "Building a Next.js Blog: Static MDX"
date: 2020-07-01
excerpt: Statically rendered MDX with Frontmatter in a `content` directory... kind of like Jekyll!
---

<blockquote>
<strong>⚠️ Out of Date</strong>

The information below will still work, but I would highly recommend checking out [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) instead. It's seen some iteration since I published this article, and I've since moved my blog over to it.

</blockquote>

I write all my content using [MDX](https://github.com/mdx-js/mdx). Getting it to work with Next.js and the [static site generation](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support) it added in v9.3 isn't as easy as Gatsby makes it, but I got most of the way there with this method.

_If you're impatient, the complete working example is at the [bottom of the page](#complete-picture)!_

## The Big Caveat

This method does not support client side hydration. In practice this means any React components you include will not run on the client side. React components can be used if they render static markup, but any interactive code will not trigger. There is a [GitHub issue discussing the problem](https://github.com/vercel/next.js/issues/14718) so hopefully this problem will get addressed.

There is also the option of using the [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) package. This supports client side hydration but involves other drawbacks as documented in the README.

## MDX

Adding MDX support to a Next.js application is easiest if we use the [official plugin](https://github.com/vercel/next.js/tree/canary/packages/next-mdx). You can install it by running:

```terminal
$ npm install @next/mdx @mdx-js/loader
```

Next you'll need to create a `next.config.js`:

```jsx
const withMDX = require("@next/mdx")();
module.exports = withMDX();
```

This lets us import MDX files as if they're JavaScript files. Now all we need to do is create a blog list from them!

Let's start with an index page. For this, we will want to load every blog post we have. Let's write a helper method that does this for us - create a `lib/posts.js` file with this function:

```jsx title="lib/posts.js"
export async function getAllPosts() {
	// Get a list of all files in the content directory
	const directory = path.join(process.cwd(), "content", "posts");
	const files = fs.readdirSync(directory);

	// Loop through all the files and import them
	const entries = await Promise.all(
		files.map((file) => import(`../content/posts/${file}`)),
	);

	const posts = entries.map((entry, index) => ({
		// Use filename as our slug
		slug: files[index].split(".")[0],
		// Use the `default` export as the post body
		MDXContent: entry.default,
	}));

	// Return all posts!
	return posts;
}
```

Now that we have an object with all the posts we can use it to create a list of titles by adding a `getStaticProps` method to our home page.

```jsx title="pages/index.js"
import Link from "next/link";
import { getAllPosts } from "../lib/posts";

export default function Home({ entries }) {
	return (
		<section className="blog">
			<h2>Recent Posts</h2>

			<ul>
				{entries.map((entry) => (
					<li key={entry}>
						<Link href="/blog/[post]" as={`/blog/${entry}`}>
							<a>{entry}</a>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}

export async function getStaticProps() {
	const posts = await getAllPosts();

	return {
		props: {
			entries: posts.map((post) => post.slug),
		},
	};
}
```

Next let's generate the post page. We need to start by giving Next.js a list of all the pages it needs to generate. Create a `pages/blog/[post].js` file and use `getAllPosts` to create the list of pages in the `getStaticPaths` method:

```jsx title="pages/blog/[post].js"
export async function getStaticPaths() {
	const posts = await getAllPosts();

	const slugs = posts.map((post) => ({
		params: { post: post.slug },
	}));

	return {
		paths: slugs,
		fallback: false,
	};
}
```

For each of those pages we'll need to load the corresponding MDX file and render it. The trick for getting MDX to be serializable is to pre-emptively render it to static markup! This makes it seriablizable for Next.js.

```jsx title="pages/blog/[post].js"
export async function getStaticProps(context) {
	const posts = await getAllPosts();
	const post = posts.find((post) => post.slug === context.params.post);

	const { MDXContent } = post;

	return {
		props: {
			content: ReactDOMServer.renderToStaticMarkup(<MDXContent />),
		},
	};
}
```

To render it we need to treat it as static HTML:

```jsx title="pages/blog/[post].js"
export default function Post({ content }) {
	return <article dangerouslySetInnerHTML={{ __html: content }} />;
}
```

All together, your file should look like this:

```jsx title="pages/blog/[post].js"
export default function Post({ content }) {
	return <article dangerouslySetInnerHTML={{ __html: content }} />;
}

export async function getStaticProps(context) {
	const posts = await getAllPosts();
	const post = posts.find((post) => post.slug === context.params.post);

	const { MDXContent } = post;

	return {
		props: {
			content: ReactDOMServer.renderToStaticMarkup(<MDXContent />),
		},
	};
}

export async function getStaticPaths() {
	const posts = await getAllPosts();

	const slugs = posts.map((post) => ({
		params: { post: post.slug },
	}));

	return {
		paths: slugs,
		fallback: false,
	};
}
```

## Using MDXProvider During Static Generation

A common pattern for using MDX with Next.js is putting an `<MDXProvider>` in your `_app.js` file. Since we're rendering the component outside the normal path, this won't work for statically rendering MDX - the solution is to add an instance of the `MDXProvider` to your tree. Extracting this into a React component helps to avoid code reuse.

For this website I created a new `MDX.js` component that defines all the custom components I want to use.

```jsx
import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import Heading from "./Heading";

export default function MDX({ children }) {
	// https://mdxjs.com/advanced/components#mdxprovider
	const [components, setComponents] = useState({
		h1: Heading,
	});

	return <MDXProvider components={components}>{children}</MDXProvider>;
}
```

Then I use this in `_app.js`:

```jsx
import MDX from "../components/MDX";

export default function MyApp({ Component, pageProps }) {
	return (
		<MDX>
			<Component {...pageProps} />
		</MDX>
	);
}
```

And also when rendering the MDXContent in `[post].js`:

```jsx
return {
	props: {
		frontmatter: getFrontmatterJSON(frontmatter),
		content: ReactDOMServer.renderToStaticMarkup(
			<MDX>
				<MDXContent />
			</MDX>,
		),
	},
};
```

## Frontmatter

I'm personally a big fan of frontmatter - it might be a holdout from my days using [Jekyll](https://jekyllrb.com/) but I find frontmatter elegant and easy to scan. If you want Frontmatter support in MDX we need to do extra work - we need to add an extraction method to the transformer. To do this, let's add several [remark](https://remark.js.org/) plugins to our `next.config.js` file.

First, install the following npm dependencies:

```terminal
$ npm install remark-frontmatter unist-util-visit unist-util-remove unist-builder yaml
```

We can use these packages to modify the remark AST and convert frontmatter to an MDX supported JavaScript export. We'll need to find the frontmatter and extract it:

```jsx
const visit = require("unist-util-visit");
const remove = require("unist-util-remove");
const yaml = require("yaml");

function extractFrontmatter() {
	return (tree, file) => {
		visit(tree, "yaml", (node) => {
			file.data.frontmatter = yaml.parse(node.value);
		});
		remove(tree, "yaml");
	};
}
```

Then we need to take the new `data.frontmatter` object that we attached to the `file` and convert it to an export.

```jsx
const builder = require("unist-builder");

function exportFrontmatter() {
	return (tree, file) => {
		const value = JSON.stringify(file.data.frontmatter, null, 2);
		const frontmatter = builder(
			"export",
			`export const frontmatter = ${value}`,
		);
		tree.children = [frontmatter, ...tree.children];
	};
}
```

Then register the custom plugins with MDX:

```jsx
const detectFrontmatter = require("remark-frontmatter");

const withMDX = require("@next/mdx")({
	options: {
		remarkPlugins: [detectFrontmatter, extractFrontmatter, exportFrontmatter],
		rehypePlugins: [],
	},
});
```

Now whenever we import the mdx file, we can import the frontmatter like we would a named export.

```jsx
const mdx = await import("../content/blog_post.mdx");

const { frontmatter, default: MDXContent } = mdx;
```

## Complete Picture

> You can find a working, up-to-date example of this code on the [GitHub Repository](https://github.com/ianmitchell/ianmitchell.dev) for this website

Add the following to `next.config.js`:

```jsx title="next.config.js"
const detectFrontmatter = require("remark-frontmatter");
const visit = require("unist-util-visit");
const remove = require("unist-util-remove");
const builder = require("unist-builder");
const yaml = require("yaml");

function extractFrontmatter() {
	return (tree, file) => {
		visit(tree, "yaml", (node) => {
			file.data.frontmatter = yaml.parse(node.value);
		});
		remove(tree, "yaml");
	};
}

function exportFrontmatter() {
	return (tree, file) => {
		const value = JSON.stringify(file.data.frontmatter, null, 2);
		const frontmatter = builder(
			"export",
			`export const frontmatter = ${value}`,
		);
		tree.children = [frontmatter, ...tree.children];
	};
}

const withMDX = require("@next/mdx")({
	options: {
		remarkPlugins: [detectFrontmatter, extractFrontmatter, exportFrontmatter],
		rehypePlugins: [],
	},
});

module.exports = withMDX({
	pageExtensions: ["js", "mdx"],
});
```

Create `lib/posts.js` with the following:

```jsx title="lib/posts.js"
export async function getAllPosts() {
	const directory = path.join(process.cwd(), "content", "posts");
	const files = fs.readdirSync(directory);

	const entries = await Promise.all(
		files.map((file) => import(`../content/posts/${file}`)),
	);

	const posts = entries.map((entry) => ({
		frontmatter: {
			...entry.frontmatter,
			slug: slug(entry.frontmatter.title),
		},
		MDXContent: entry.default,
	}));

	return posts.sort(
		(a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date),
	);
}
```

Create `pages/blog/[slug].js` with the following:

```jsx title="pages/blog/[slug].js"
import React from "react";
import ReactDOMServer from "react-dom/server";
import MDX from "../../components/MDX";
import { getAllPosts, getFrontmatterJSON } from "../../lib/posts";

export default function Post({ frontmatter, content }) {
	return <article dangerouslySetInnerHTML={{ __html: content }} />;
}

export async function getStaticProps(context) {
	const post = (await getAllPosts()).find(
		(post) => post.frontmatter.slug === context.params.post,
	);

	const { frontmatter, MDXContent } = post;

	return {
		props: {
			frontmatter: getFrontmatterJSON(frontmatter),
			content: ReactDOMServer.renderToStaticMarkup(
				<MDX>
					<MDXContent />
				</MDX>,
			),
		},
	};
}

export async function getStaticPaths() {
	const posts = await getAllPosts();

	const slugs = posts.map((post) => ({
		params: { post: post.frontmatter.slug },
	}));

	return {
		paths: slugs,
		fallback: false,
	};
}
```
