import { processor } from "@/lib/unified";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
// @ts-expect-error: untyped
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { VFile } from "vfile";
import { BlockQuote } from "./md/BlockQuote";
import "server-only";
import { Anchor } from "./md/Anchor";
import { Emphasis } from "./md/Emphasis";
import { H1, H2, H3, H4, H5, H6 } from "./md/Heading";
import { HorizontalRule } from "./md/HorizontalRule";
import { Image } from "./md/Image";
import { ListItem, OrderedList, UnorderedList } from "./md/Lists";
import { Paragraph } from "./md/Paragraph";
import { Strong } from "./md/Strong";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHeader,
	TableRow,
} from "./md/Table";
import Preformatted from "./md/Preformatted";

interface MarkdownProps {
	className?: string;
	children: string | null | undefined;
}

export default async function Markdown({ className, children }: MarkdownProps) {
	if (children == null) {
		return;
	}

	const file = new VFile();
	file.value = children;

	const mdastTree = processor.parse(file);
	let hastTree = await processor.run(mdastTree, file);

	// Wrap in `div` if there’s a class name.
	if (className) {
		hastTree = {
			// @ts-expect-error ???
			type: "element",
			tagName: "div",
			properties: { className },
			// @ts-expect-error ???
			children: hastTree.type === "root" ? hastTree.children : [hastTree],
		};
	}

	// visit(hastTree, transform);

	return (
		<Fragment>
			{toJsxRuntime(hastTree, {
				Fragment,
				components: {
					a: Anchor,
					blockquote: BlockQuote,
					em: Emphasis,
					h1: H1,
					h2: H2,
					h3: H3,
					h4: H4,
					h5: H5,
					h6: H6,
					hr: HorizontalRule,
					img: Image,
					ol: OrderedList,
					ul: UnorderedList,
					li: ListItem,
					p: Paragraph,
					strong: Strong,
					table: Table,
					thead: TableHeader,
					tbody: TableBody,
					tr: TableRow,
					td: TableCell,
					tfoot: TableFooter,
					pre: Preformatted,
				},
				ignoreInvalidStyle: true,
				jsx,
				jsxs,
				passKeys: true,
				passNode: true,
			})}
		</Fragment>
	);
}
