import { StaticMarkdown } from "@/components/Markdown";
import type { Root } from "hast";
import { Fragment } from "react";
import "server-only";

interface EntryProps {
	title: string;
	content: string;
	tree: Root;
}

export function Entry({ title, content, tree }: EntryProps) {
	return (
		<Fragment>
			<StaticMarkdown tree={tree}>{content}</StaticMarkdown>

			<a href={`mailto:ian.mitchell@hey.com?subject=Reply%20to:%20“${title}”`}>
				Reply via e-mail
			</a>
		</Fragment>
	);
}
