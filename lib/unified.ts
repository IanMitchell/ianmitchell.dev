import remarkGfm from "remark-gfm";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import { getHighlighter, bundledLanguages } from "shikiji";
import { transformerNotationDiff } from "shikiji-transformers";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import { unified } from "unified";
import "server-only";
import { VFile } from "vfile";

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

export async function convert(value: string) {
	const file = new VFile();
	file.value = value;

	const mdastTree = processor.parse(file);
	return processor.run(mdastTree, file);
}
