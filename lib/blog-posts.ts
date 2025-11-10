import { Glob } from "bun";
import * as matter from "gray-matter";
import path from "node:path";
import { cache } from "react";
import {
	date,
	InferOutput,
	object,
	optional,
	safeParse,
	string,
} from "valibot";
import { getSlug } from "./slug";

const CONTENT_DIRECTORY = path.join(process.cwd(), "/content/blog");

const frontmatterSchema = object({
	title: string(),
	date: date(),
	layout: optional(string()),
	link: optional(string()),
	href: optional(string()),
	excerpt: optional(string()),
});

export type Frontmatter = InferOutput<typeof frontmatterSchema>;

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
	const source = await file.text();

	const { data, content } = matter.default(source);

	const result = safeParse(frontmatterSchema, data);

	if (!result.success) {
		throw new Error(`Frontmatter incorrect: ${JSON.stringify(result.issues)}`);
	}

	return {
		frontmatter: result.output,
		content,
	};
});
