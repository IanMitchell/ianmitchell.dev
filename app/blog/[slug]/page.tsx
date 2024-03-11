import { getAllPosts, getPost, getSlug } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import Page from "@/components/Page";
import { H1 } from "@/components/md/Heading";
import { Metadata } from "next";

export const dynamic = "force-static";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const { frontmatter } = await getPost(params.slug);

	return {
		title: frontmatter.title,
		description: frontmatter.description ?? "",
	};
}

export async function generateStaticParams() {
	const files = await getAllPosts();

	return files.map((file) => ({
		slug: getSlug(file),
	}));
}

export default async function BlogPost({
	params,
}: {
	params: { slug: string };
}) {
	const { content, frontmatter } = await getPost(params.slug);

	return (
		<Page>
			<article className="mt-8">
				<H1 className="mb-8">{frontmatter?.title ?? ""}</H1>
				<Markdown>{content}</Markdown>
			</article>
		</Page>
	);
}
