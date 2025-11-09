import { Markdown } from "@/components/Markdown";
import Page from "@/components/Page";
import ExternalLink from "@/components/icons/ExternalLink";
import { H1 } from "@/components/md/Heading";
import { getCachedPost, getCachedPostList } from "@/lib/content";
import { getSlug } from "@/lib/slug";
import { Metadata } from "next";

export async function generateMetadata({
	params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
	const { slug } = await params;
	const { frontmatter } = getCachedPost(slug);

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

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
	const { slug } = await params;
	const { content, frontmatter } = getCachedPost(slug);

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
