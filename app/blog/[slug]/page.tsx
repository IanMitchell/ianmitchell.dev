import { Markdown } from "@/components/Markdown";
import Page from "@/components/Page";
import ExternalLink from "@/components/icons/ExternalLink";
import { H1 } from "@/components/md/Heading";
import { getCachedPost, getCachedPostList } from "@/lib/content";
import { getSlug } from "@/lib/slug";
import { Metadata } from "next";

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
				<H1 className="mb-8">
					{frontmatter.layout === "link" ? (
						<a
							href={frontmatter.href}
							target="_blank"
							className="text-link underline-offset-2 hover:opacity-70 decoration-2 underline flex gap-4 items-center"
						>
							{frontmatter.title}
							<ExternalLink className="size-6" />
						</a>
					) : (
						frontmatter.title ?? ""
					)}
				</H1>
				<Markdown>{content}</Markdown>
			</article>
		</Page>
	);
}
