import { getAllPosts, getPost } from "@/lib/blog-posts";
import { getSlug } from "@/lib/slug";
import { convert } from "@/lib/unified";
import { Feed } from "feed";
import { Entry } from "./Entry";

async function getRSS() {
	"use cache";

	const { renderToStaticMarkup } = await import("react-dom/server");

	const posts = await getAllPosts();

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
		const { title, date, content } = await getPost(slug);

		if (lastUpdated == null || lastUpdated < date) {
			lastUpdated = date;
		}

		const tree = await convert(content);

		feed.addItem({
			title,
			date,
			// image: post.image,
			id: `https://ianmitchell.dev/blog/${slug}`,
			link: `https://ianmitchell.dev/blog/${slug}`,
			content: renderToStaticMarkup(
				<Entry title={title} content={content} tree={tree} />,
			),
		});
	}

	feed.options.updated = lastUpdated;

	return feed.rss2();
}

export async function GET() {
	const rss = await getRSS();

	return new Response(rss, {
		headers: {
			"Content-Type": "application/atom+xml",
		},
	});
}
