import { getAllPosts, getPostFilePath } from "@/lib/blog-posts";
import { getSlug } from "@/lib/slug";
import * as matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

async function generateOGAllowlist() {
	const json: Record<string, { title: string; date: Date }> = {};
	const posts = getAllPosts();

	for (const post of posts) {
		const path = getPostFilePath(post);
		const { data: frontmatter } = matter.read(path);
		const slug = getSlug(frontmatter.title);

		json[slug] = {
			title: frontmatter.title,
			date: frontmatter.date,
		};
	}

	fs.writeFileSync(
		path.join(process.cwd(), "app/blog/[slug]/(data)/posts.json"),
		JSON.stringify(json, null, 2),
		{
			flag: "w",
			encoding: "utf-8",
		},
	);
}

generateOGAllowlist();
