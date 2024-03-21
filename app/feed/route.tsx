import { getCachedPost, getCachedPostList } from "@/lib/content";
import { Feed } from "feed";
import { Fragment } from "react";
import { StaticMarkdown } from "@/components/Markdown";
import { convert } from "@/lib/unified";
import { getSlug } from "@/lib/slug";

export async function GET() {
	const { renderToStaticMarkup } = await import("react-dom/server");

	const posts = getCachedPostList();

	const feed = new Feed({
		title: "Ian Mitchell's Blog",
		description: "My personal sliver of the web",
		id: "https://ianmitchell.dev/",
		link: "https://ianmitchell.dev",
		// image: "http://example.com/image.png",
		// favicon: "http://example.com/favicon.ico",
		copyright: `All rights reserved ${new Date().getFullYear()}, Ian Mitchell`,
		generator: "Feed for Node.js",
		// feedLinks: {
		// 	json: "https://example.com/json",
		// 	atom: "https://example.com/atom",
		// },
		author: {
			name: "Ian Mitchell",
			email: "ian.mitchell@hey.com",
			link: "https://ianmitchell.dev",
		},
	});

	let lastUpdated = undefined;

	for (const post of posts) {
		const slug = getSlug(post);
		const { frontmatter, content } = await getCachedPost(slug);
		const publishDate = new Date(frontmatter.date);

		if (lastUpdated == null || lastUpdated < publishDate) {
			lastUpdated = publishDate;
		}

		const tree = await convert(content);

		feed.addItem({
			title: frontmatter.title,
			id: `https://ianmitchell.dev/blog/${slug}`,
			link: `https://ianmitchell.dev/blog/${slug}`,
			content: renderToStaticMarkup(
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
				</Fragment>,
			),
			date: publishDate,
			// image: post.image,
		});
	}

	feed.options.updated = lastUpdated;

	const rss = feed.rss2();

	return new Response(rss, {
		headers: {
			"Content-Type": "application/atom+xml",
		},
	});
}
