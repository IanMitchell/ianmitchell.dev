import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import sanitize from "./slug";
import * as matter from "gray-matter";

const CONTENT_DIRECTORY = "/content/blog";

export function getSlug(post: string) {
	return sanitize(post.replace(/\d{4}-\d{2}-\d{2}-/i, "").replace(".md", ""));
}

export const getAllPosts = cache(() => {
	const targets = fs.readdirSync(path.join(process.cwd(), CONTENT_DIRECTORY), {
		recursive: true,
	});

	const files = [];

	for (const target of targets) {
		if (
			fs
				.lstatSync(
					path.join(process.cwd(), CONTENT_DIRECTORY, target.toString()),
				)
				.isDirectory() ||
			!target.toString().endsWith(".md")
		) {
			continue;
		}

		files.push(target.toString());
	}

	return files;
});

export const getPost = cache(async (slug: string) => {
	const posts = getAllPosts();
	const post = posts.find((post) => getSlug(post) === slug);

	if (!post) {
		throw new Error(`Unknown Post ${slug}`);
	}

	const source = fs.readFileSync(
		path.join(process.cwd(), CONTENT_DIRECTORY, post),
		"utf8",
	);

	const { data, content } = getFrontmatter(source);

	return {
		frontmatter: data,
		content,
	};
});

export const getFileFrontmatter = cache((path: string) => {
	return matter.read(path);
});

export const getFrontmatter = cache((source: string) => {
	return matter.default(source);
});
