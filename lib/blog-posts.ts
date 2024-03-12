import fs from "node:fs";
import path from "node:path";
import { getSlug } from "./slug";
import * as matter from "gray-matter";

const CONTENT_DIRECTORY = "/content/blog";

export function getPostFilePath(name: string) {
	return path.join(process.cwd(), CONTENT_DIRECTORY, name);
}

export function getAllPosts() {
	const targets = fs.readdirSync(path.join(process.cwd(), CONTENT_DIRECTORY), {
		recursive: true,
	});

	const files = [];

	for (const target of targets) {
		if (
			fs.lstatSync(getPostFilePath(target.toString())).isDirectory() ||
			!target.toString().endsWith(".md")
		) {
			continue;
		}

		files.push(target.toString());
	}

	return files;
}

export function getPost(slug: string) {
	const posts = getAllPosts();
	const post = posts.find((post) => getSlug(post) === slug);

	if (!post) {
		throw new Error(`Unknown Post ${slug}`);
	}

	const source = fs.readFileSync(
		path.join(process.cwd(), CONTENT_DIRECTORY, post),
		"utf8",
	);

	const { data, content } = matter.default(source);

	return {
		frontmatter: data,
		content,
	};
}
