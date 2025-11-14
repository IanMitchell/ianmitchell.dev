import { Glob } from "bun";
import path from "node:path";
import { cache } from "react";
import { getSlug } from "./slug";
import { convert } from "./unified";

const CONTENT_DIRECTORY = path.join(process.cwd(), "/content/blog");

export const getAllPosts = cache(async () => {
	const glob = new Glob("**/*.md");
	return Array.fromAsync(glob.scan(CONTENT_DIRECTORY));
});

export const getPost = cache(async (slug: string) => {
	const posts = await getAllPosts();
	const post = posts.find((post) => getSlug(post) === slug);

	if (!post) {
		throw new Error(`Unknown Post ${slug}`);
	}

	const file = Bun.file(path.join(CONTENT_DIRECTORY, post));
	const content = await file.text();

	const title = await getPostTitle(content);
	const date = getPostDate(post);

	return {
		title,
		date,
		content,
	};
});

export const getPostDate = cache((path: string) => {
	const result = path.match(/\d{4}-\d{2}-\d{2}/i);

	if (result != null) {
		return new Date(result[0]);
	}

	return new Date();
});

export const getPostTitle = cache(async (content: string) => {
	const hastTree = await convert(content);

	const titleNode = hastTree.children.find(
		(child) => child.type === "element" && child.tagName === "h1",
	);

	if (titleNode == null) {
		throw new Error("No title found for Markdown post");
	}

	const titleText = titleNode.children.find((child) => child.type === "text");
	return titleText.value;
});
