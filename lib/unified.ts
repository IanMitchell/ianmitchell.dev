import remarkGfm from "remark-gfm";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import { getHighlighter, bundledLanguages } from "shikiji";
import { transformerNotationDiff } from "shikiji-transformers";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import { unified } from "unified";
import { VFile } from "vfile";
import prismaLanguage from "@/lib/languages/prisma.json";
import "server-only";

const highlighterOptions: Options = {
	// @ts-expect-error ???
	getHighlighter: (options) =>
		getHighlighter({
			...options,
			// @ts-expect-error ???
			langs: [...Object.keys(bundledLanguages), prismaLanguage],
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

export async function convert(value: string) {
	const file = new VFile();
	file.value = value;

	const mdastTree = processor.parse(file);
	return processor.run(mdastTree, file);
}
