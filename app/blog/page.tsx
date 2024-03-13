import Page from "@/components/Page";
import ExternalLink from "@/components/icons/ExternalLink";
import { Anchor } from "@/components/md/Anchor";
import { H1 } from "@/components/md/Heading";
import { getCachedPost, getCachedPostList } from "@/lib/content";
import { getSlug } from "@/lib/slug";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Blog",
	description:
		"I sometimes write blog posts. Not quite as often as I want to, but I try!",
};

export default async function BlogIndexPage() {
	const posts = await getCachedPostList();
	const years: Record<
		number,
		Array<{ date: string; title: string; post: string; external: boolean }>
	> = {};

	for (const post of posts) {
		const { frontmatter } = getCachedPost(getSlug(post));
		const year = new Date(frontmatter.date).getFullYear();

		if (!(year in years)) {
			years[year] = [];
		}

		years[year].push({
			post,
			title: frontmatter.title as string,
			date: frontmatter.date as string,
			external: frontmatter.link != null,
		});
	}

	return (
		<Page
			header={
				<header className="mt-8 mb-12 flex items-center justify-between">
					<H1 className="mt-0">Blog Posts</H1>
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
						<h2 className="mb-5">{year}</h2>
						<ul className="mb-16">
							{posts.reverse().map((post) => (
								<li
									key={post.title}
									className="my-4 flex flex-row items-center"
								>
									<Link
										href={`/blog/${getSlug(post.title)}`}
										className="border-highlight/30 border-b-2 border-solid text-highlight hover:border-highlight flex items-center gap-2"
									>
										{post.external ? <ExternalLink className="size-4" /> : null}
										{post.title}
									</Link>
									<span className="hidden text-xs opacity-80 sm:inline">
										<span className="mx-2">&bull;</span>
										{new Date(post.date).toLocaleString("en-US", {
											month: "numeric",
											day: "numeric",
											timeZone: "UTC",
										})}
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
		</Page>
	);
}
