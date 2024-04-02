---
title: "Rendering Nested MDX Content with Next.js"
date: 2024-04-02
---

_If you just want the code, scroll to the bottom!_

As part of my work on 0x57 I recently had to create a documentation section in our Next.js application. MDX has become a staple format for documentation, with good reason. Making it work with Next.js in the way I wanted out of the box was a little bit tricky though, and I thought I’d share my solution so others can use it if they wanted to.

My goal was to create a documentation directory that allowed me to arbitrarily name and nest files. I wanted to be able to write documentation that might be structured like this:

```
- documentation/
	- accounts/
		- creating.mdx
		- sessions.mdx
	- credentials/
		- creating.mdx
	- guides/
		- framworks/
			- nextjs.mdx
		- languages/
			- javascript.mdx
	- getting-started.mdx
	- installation.mdx
```

Next.js has native support for MDX, but it’s fairly limited. You either need to name each file `page.mdx`, or you need to import the content in a `page.js` React component. This makes reusing templates difficult, and results in a lot of boilerplate code to benefit from metadata like frontmatter. To get around this limitation and support arbitrary filenames, I had to combine a few different pieces.

- I needed to load MDX “remotely”. Even though the MDX files are all in the same codebase and file system, since they exist outside the Next.js router the MDX is considered remote content.
- Next.js had to dynamically match the documentation routes to the filenames.
- I wanted to statically render the content.

### Building the Page

First, we need to setup the Next.js page. It will need to match a set of routes we will know at build time, and it needs to be static. This can be achieved by creating a [dynamic Next.js page with a catch-all segment](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments). Combined with setting the [route segment config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic) and using the [`generateStaticParams` function](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#generatestaticparams) Next.js will statically build out the pages we want!

First, let’s create a the Next.js page by making a `/documentation/[...slug]/page.tsx` file. This will match any routes under `/documentation` - they could be nested, so we’ll need to accept an array of strings as the parameter type.

```tsx title="/app/documentation/[...slug]/page.tsx"
interface Params {
	params: {
		slug: string[];
	};
}

export default async function DocumentationPage({ params }: Params) {
	return <h1>Documentation Pages</h1>;
}
```

We will know all the files and slugs we want to match ahead of time, and we can instruct Next.js to statically compile these pages by setting the [route segment config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic) (we’ll also tell Next.js to use the node runtime since we’ll be accessing the filesystem). We will then use the [`generateStaticParams` function](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#generatestaticparams) to generate the list of all matched paths.

```tsx title="/app/documentation/[...slug]/page.tsx"
export const runtime = "nodejs";
export const dynamic = "force-static";

export function generateStaticParams() {
	return [{ slug: "" }];
}

export default async function DocumentationPage({ params }: Params) {
	// ...
}
```

To generate the list of slugs to match against, we should recursively traverse the target directory and match all MDX files.

```tsx title="/app/documentation/[...slug]/page.tsx"
import fs from "node:fs";
import path from "node:path";

// Change this to point to where your docs are located
const CONTENT_DIRECTORY = "/app/documentation/content";

export function generateStaticParams() {
	const targets = fs.readdirSync(path.join(process.cwd(), CONTENT_DIRECTORY), {
		// Read nested directories and files
		recursive: true,
	});

	const files = [];

	for (const target of targets) {
		// Skip directories
		if (
			fs
				.lstatSync(
					path.join(process.cwd(), CONTENT_DIRECTORY, target.toString()),
				)
				.isDirectory()
		) {
			continue;
		}

		// Add files as valid paths
		files.push(target);
	}

	// Return the list of files we want to match with, removing the `.mdx` suffix and breaking them up by directory.
	return files.map((file) => ({
		slug: file.toString().replace(".mdx", "").split("/"),
	}));
}
```

The final step is to load the MDX content and transform it. The easiest way to do this is by using the `next-mdx-remote` package.

```tsx title="/app/documentation/[...slug]/page.tsx"
import { useMDXComponents } from "@/mdx-components";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs";
import path from "node:path";
import { Fragment } from "react";

export default async function DocumentationContentPage({ params }: Params) {
	// Find the target MDX file
	const source = fs.readFileSync(
		path.join(process.cwd(), CONTENT_DIRECTORY, params.slug.join("/")) + ".mdx",
		"utf8",
	);

	// Use the Next.js component mappings
	const components = useMDXComponents();

	const { content, frontmatter } = await compileMDX({
		source,
		options: { parseFrontmatter: true },
		components,
	});

	return (
		<Fragment>
			<pre>{JSON.stringify(frontmatter, null, 2)}</pre>
			{content}
		</Fragment>
	);
}
```

With that, we should be finished! We have a single Next.js page that will dynamically handle all our MDX documentation files, which can live anywhere in our codebase.

![File Structure](/images/posts/nextjs-mdx-filestructure.png)

### The Complete Code

```tsx title="/app/documentation/[...slug]/page.tsx"
import { useMDXComponents } from "@/mdx-components";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "node:fs";
import path from "node:path";
import { Fragment } from "react";

export const runtime = "nodejs";
export const dynamic = "force-static";

const CONTENT_DIRECTORY = "/app/documentation/content";

export function generateStaticParams() {
	const targets = fs.readdirSync(path.join(process.cwd(), CONTENT_DIRECTORY), {
		recursive: true,
	});

	const files = [];

	for (const target of targets) {
		if (
			fs
				.lstatSync(
					path.join(process.cwd(), CONTENT_DIRECTORY, target.toString()),
				)
				.isDirectory()
		) {
			continue;
		}

		files.push(target);
	}

	return files.map((file) => ({
		slug: file.toString().replace(".mdx", "").split("/"),
	}));
}

interface Params {
	params: {
		slug: string[];
	};
}

export default async function DocumentationContentPage({ params }: Params) {
	const source = fs.readFileSync(
		path.join(process.cwd(), CONTENT_DIRECTORY, params.slug.join("/")) + ".mdx",
		"utf8",
	);

	const components = useMDXComponents();

	const { content, frontmatter } = await compileMDX({
		source,
		options: { parseFrontmatter: true },
		components,
	});

	return (
		<Fragment>
			<pre>{JSON.stringify(frontmatter, null, 2)}</pre>
			{content}
		</Fragment>
	);
}
```
