---
title: "MDX to Markdown: Syntax Highlighting"
date: 2024-03-13
---

I mentioned that there were some snags I hit last year that forced me to rethink how I approached my blog content, and finally drove me to drop MDX in favor of Markdown. One thing I wanted to talk about especially is the syntax highlighting.

My old website was still running MDX version 1, which is more relaxed than version 2 (and now 3). MDX1 allowed you to write code blocks with props, which I heavily used to decorate the code blocks with diffs, file names, and things like that.

<iframe
	width="100%"
	height="850"
	src="data:text/html;charset=utf-8,<head><base target='_blank' /></head><body><script src='https://gist.github.com/IanMitchell/3d66f5366e2765c2f59beea9732a117a.js'></script></body>"></iframe>

I keyed heavily off of the metastring props in order to customize my code snippets. [MDX2 dropped support for this style](https://mdxjs.com/migrating/v2/) due to its ambiguity, unfortunately. Many other breaking changes in MDX2, such as spacing, were easy to fix; this one turned out not to be.

This change forced me to start looking around at alternative code highlighters to Prism. This was during the time where Next.js was beginning to ship RSCs, which seemed enticing. I began looking at new solutions to try out. My requirements were:

- Allow for specifying filenames
- Language highlighting
- Works with RSC / Server Side Rendering
- Custom Language support
- Diff highlighting
- Line numbers
- (Optional) Conditional copy-button support

I tried several workarounds, and several packages; I didn’t find one that I loved until recently. With the latest updates to Shiki and the Unified systems, [rehype-pretty-code](https://rehype-pretty-code.netlify.app/) reached feature parity with what I needed.

The new style of writing code blocks _is_ a little uglier, but it is functional!

<iframe
	width="100%"
	height="800"
	src="data:text/html;charset=utf-8,<head><base target='_blank' /></head><body><script src='https://gist.github.com/IanMitchell/427f89c45019750bd5a31101d40c975c.js'></script></body>"></iframe>

Configuring the plugin is pretty straightforward, and works with MDX as well:

```js title="markdown.ts"
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import { getHighlighter, bundledLanguages } from "shikiji";
import { transformerNotationDiff } from "shikiji-transformers";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import { unified } from "unified";
import customLanguage from "@/lib/languages/prisma.json";

const highlighterOptions = {
	getHighlighter: (options) =>
		getHighlighter({
			...options,
			langs: [...Object.keys(bundledLanguages), customLanguage],
		}),
	theme: "github-light",
	transformers: [transformerNotationDiff()],
};

export const processor = unified()
	.use(remarkParse)
	.use(remarkGfm, { singleTilde: false })
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypePrettyCode, highlighterOptions)
	.use(rehypeRaw);
```

The benefits and code cleanup are huge. I'm very happy with where it ended up (and, funnily enough, this all works with MDX v3 as well!)
