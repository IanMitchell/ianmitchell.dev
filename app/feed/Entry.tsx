import { StaticMarkdown } from "@/components/Markdown";
import { type Frontmatter } from "@/lib/blog-posts";
import { Fragment } from "react";
import type { Root } from "rehype-raw/lib";
import "server-only";

interface EntryProps {
	frontmatter: Frontmatter;
	content: string;
	tree: Root;
}

export function Entry({ content, frontmatter, tree }: EntryProps) {
	return (
		<Fragment>
			{frontmatter.layout === "link" ? (
				<p>
					<strong>Read: </strong>
					<a href={frontmatter.href}>{frontmatter.link}</a>
				</p>
			) : null}

			<StaticMarkdown tree={tree}>{content}</StaticMarkdown>

			<a
				href={`mailto:ian.mitchell@hey.com?subject=Reply%20to:%20“${frontmatter.title}”`}
			>
				Reply via e-mail
			</a>
		</Fragment>
	);
}
