import Page from "@/components/Page";
import { Anchor } from "@/components/md/Anchor";
import { H1 } from "@/components/md/Heading";
import { getAllPosts, getPost } from "@/lib/blog-posts";
import { getSlug } from "@/lib/slug";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
	description:
		"I sometimes write blog posts. Not quite as often as I want to, but I try!",
};

export default async function BlogIndexPage() {
	"use cache";

	const posts = await getAllPosts();
	const years: Record<
		number,
		Array<{ date: Date; title: string; post: string }>
	> = {};

	for (const post of posts) {
		const { title, date } = await getPost(getSlug(post));
		const year = date.getFullYear();

		if (!(year in years)) {
			years[year] = [];
		}

		years[year].push({
			post,
			title,
			date,
		});
	}

	return (
		<Page
			header={
				<header className="my-8 flex items-center justify-between">
					<H1 className="mt-0 w-fit">Blog Posts</H1>
					<Anchor href="/feed" className="text-sm">
						RSS Feed
					</Anchor>
				</header>
			}
		>
			{Object.entries(years)
				.reverse()
				.map(([year, posts]) => (
					<div className="mt-4" key={year}>
						<h2 className="mb-4">{year}</h2>
						<ul className="mb-12 flex flex-col gap-2">
							{posts
								.sort((a, b) => b.date.getTime() - a.date.getTime())
								.map((post) => (
									<li
										key={post.title}
										className="gap-4 flex flex-row items-center -ml-13"
									>
										<span className="hidden opacity-80 sm:inline">
											{new Date(post.date).toLocaleString("en-US", {
												month: "2-digit",
												day: "2-digit",
												timeZone: "UTC",
											})}
										</span>

										<Anchor href={`/blog/${getSlug(post.title)}`}>
											{post.title}
										</Anchor>
									</li>
								))}
						</ul>
					</div>
				))}
		</Page>
	);
}
