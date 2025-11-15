import { convert } from "@/lib/unified";
import type { Nodes } from "hast";
import { toJsxRuntime, type Components } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import "server-only";
import { Anchor } from "./md/Anchor";
import { BlockQuote } from "./md/BlockQuote";
import { Code } from "./md/Code";
import { Emphasis } from "./md/Emphasis";
import FigureCaption from "./md/FigureCaption";
import { H1, H2, H3, H4, H5, H6 } from "./md/Heading";
import { HorizontalRule } from "./md/HorizontalRule";
import { Image } from "./md/Image";
import { ListItem, OrderedList, UnorderedList } from "./md/Lists";
import { Paragraph } from "./md/Paragraph";
import Preformatted from "./md/Preformatted";
import { Strong } from "./md/Strong";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHeader,
	TableRow,
} from "./md/Table";

interface MarkdownProps {
	className?: string;
	children: string | null | undefined;
	components?: Partial<Components>;
}

export function StaticMarkdown({
	tree,
	className,
	components,
	children,
}: MarkdownProps & { tree: Nodes }) {
	if (children == null) {
		return null;
	}

	let hastTree = tree;

	// Wrap in `div` if there’s a class name.
	if (className) {
		hastTree = {
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
					code: Code,
					...components,
				},
				ignoreInvalidStyle: true,
				jsx,
				jsxs,
				passKeys: true,
				passNode: false,
			})}
		</Fragment>
	);
}

export async function Markdown({ className, children }: MarkdownProps) {
	if (children == null) {
		return;
	}

	const hastTree = await convert(children);

	return (
		<StaticMarkdown tree={hastTree} components={{ figcaption: FigureCaption }}>
			{children}
		</StaticMarkdown>
	);
}
