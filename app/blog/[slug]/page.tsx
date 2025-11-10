import { Markdown } from "@/components/Markdown";
import Page from "@/components/Page";
import ExternalLink from "@/components/icons/ExternalLink";
import { H1 } from "@/components/md/Heading";
import { getAllPosts, getPost } from "@/lib/blog-posts";
import { getSlug } from "@/lib/slug";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
	params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
	const { slug } = await params;
	const { frontmatter } = await getPost(slug);

	return {
		title: frontmatter.title,
		description: frontmatter.excerpt ?? "",
	};
}

export async function generateStaticParams() {
	const files = await getAllPosts();

	return files.map((file) => ({
		slug: getSlug(file),
	}));
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
	"use cache";

	const { slug } = await params;
	let post;
	try {
		post = await getPost(slug);
	} catch {
		notFound();
	}

	return (
		<Page>
			<article className="mt-8">
				{post.frontmatter.layout !== "link" ? (
					<H1 className="mb-8">{post.frontmatter.title}</H1>
				) : null}

				{post.frontmatter.layout === "link" ? (
					<header className="mb-6 text-2xl">
						<a
							href={post.frontmatter.href}
							className="text-link underline-offset-2 hover:opacity-70 decoration-2 underline"
						>
							{post.frontmatter.link}
							<ExternalLink className="inline ml-2 mb-1 size-4" />
						</a>
					</header>
				) : null}

				<Markdown>{post.content}</Markdown>
			</article>
		</Page>
	);
}
