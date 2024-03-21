import { Markdown } from "@/components/Markdown";
import Page from "@/components/Page";
import ExternalLink from "@/components/icons/ExternalLink";
import { H1 } from "@/components/md/Heading";
import { HorizontalRule } from "@/components/md/HorizontalRule";
import { getCachedPost, getCachedPostList } from "@/lib/content";
import { getSlug } from "@/lib/slug";
import { Metadata } from "next";
import { Fragment } from "react";

export const dynamic = "force-static";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const { frontmatter } = await getCachedPost(params.slug);

	return {
		title: frontmatter.title,
		description: frontmatter.excerpt ?? "",
	};
}

export async function generateStaticParams() {
	const files = getCachedPostList();

	return files.map((file) => ({
		slug: getSlug(file),
	}));
}

export default async function BlogPost({
	params,
}: {
	params: { slug: string };
}) {
	const { content, frontmatter } = await getCachedPost(params.slug);

	return (
		<Page>
			<article className="mt-8">
				{frontmatter.layout !== "link" ? (
					<H1 className="mb-8">{frontmatter.title}</H1>
				) : null}

				{frontmatter.layout === "link" ? (
					<header className="mb-6 text-2xl">
						<a
							href={frontmatter.href}
							className="text-link underline-offset-2 hover:opacity-70 decoration-2 underline"
						>
							{frontmatter.link}
							<ExternalLink className="inline ml-2 mb-1 size-4" />
						</a>
					</header>
				) : null}

				<Markdown>{content}</Markdown>
			</article>
		</Page>
	);
}
