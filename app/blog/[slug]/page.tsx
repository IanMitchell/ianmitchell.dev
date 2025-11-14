import { Markdown } from "@/components/Markdown";
import Page from "@/components/Page";
import { getAllPosts, getPost } from "@/lib/blog-posts";
import { getSlug } from "@/lib/slug";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
	params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
	const { slug } = await params;
	const { title } = await getPost(slug);

	return { title };
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
			<article className="mt-8 p-12 bg-white">
				<Markdown>{post.content}</Markdown>
			</article>
		</Page>
	);
}
