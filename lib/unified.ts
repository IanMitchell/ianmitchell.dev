import prismaLanguage from "@/lib/languages/prisma.json";
import { transformerNotationDiff } from "@shikijs/transformers";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import "server-only";
import { bundledLanguages, createHighlighter } from "shiki";
import { unified } from "unified";
import { VFile } from "vfile";

const highlighterOptions: Options = {
	// @ts-expect-error ???
	createHighlighter: (options) =>
		createHighlighter({
			...options,
			langs: [...Object.keys(bundledLanguages), prismaLanguage],
		}),
	theme: "github-light",
	transformers: [transformerNotationDiff({ matchAlgorithm: "v3" })],
};

export const processor = unified()
	.use(remarkParse)
	.use(remarkGfm, { singleTilde: false })
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypePrettyCode, highlighterOptions)
	.use(rehypeRaw);

export async function convert(value: string) {
	const file = new VFile();
	file.value = value;

	const mdastTree = processor.parse(file);
	return processor.run(mdastTree, file);
}
