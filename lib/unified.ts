import remarkGfm from "remark-gfm";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import { getHighlighter, bundledLanguages } from "shikiji";
import { transformerNotationDiff } from "shikiji-transformers";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import { unified } from "unified";
import "server-only";

const highlighterOptions: Options = {
	getHighlighter: (options) =>
		getHighlighter({
			...options,
			langs: [
				...Object.keys(bundledLanguages),
				{
					id: "prisma",
					scopeName: "source.prisma",
					path: "./lib/languages/prisma.json",
				},
			],
		}),
	theme: "github-light",
	transformers: [transformerNotationDiff()],
};

export const processor = unified()
	.use(remarkParse)
	.use(remarkGfm, { singleTilde: false })
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypePrettyCode, highlighterOptions);
