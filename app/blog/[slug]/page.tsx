import { getAllPosts, getPost, getSlug } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import Page from "@/components/Page";
import { H1 } from "@/components/md/Heading";

export const dynamic = "force-static";

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
