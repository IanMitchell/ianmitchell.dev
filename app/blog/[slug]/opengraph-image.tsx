import { getPost } from "@/lib/blog-posts";
import { ImageResponse } from "next/og";
import { join } from "node:path";

// Image metadata
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: PageProps<"/blog/[slug]">) {
	const { slug } = await params;

	console.log("\tLoading font file");
	const fontfile = Bun.file(
		join(process.cwd(), "app/blog/[slug]/BerkeleyMono.otf"),
	);

	console.log("\tTurning into array buffer");
	const font = await fontfile.arrayBuffer();

	console.log("\tLoading post");

	// Configure data
	let post;
	try {
		post = await getPost(slug);
	} catch {
		return null;
	}

	console.log(`\tLoaded post ${post.title}`);

	const formattedDate = post.date.toLocaleString("en-US", {
		month: "long",
		year: "numeric",
		day: "numeric",
	});

	console.log(`\tFormatted date: ${formattedDate}`);

	return new ImageResponse(
		(
			<div
				tw="flex flex-col w-full h-full p-8"
				style={{
					backgroundColor: "#F3F3F2",
					fontFamily: "berkeleyMono",
				}}
			>
				{/* Logo */}
				<div tw="flex flex-row justify-between mb-8">
					<div
						tw="flex p-2 w-24 h-24 border-black"
						style={{
							borderWidth: "6px",
						}}
					>
						<div tw="h-12 w-12 flex items-center justify-center bg-black">
							<span tw="text-2xl text-white">i</span>
						</div>
					</div>

					<p tw="text-2xl mt-auto mb-0">{formattedDate}</p>
				</div>

				{/* Content */}
				<div tw="flex grow w-full mb-6">
					<div tw="p-12 w-full h-full bg-white flex flex-row items-center justify-center">
						<h1
							tw="text-6xl leading-tight uppercase"
							style={{
								textWrap: "balance",
							}}
						>
							{`${post.title} `.repeat(2)}
						</h1>
					</div>
				</div>

				{/* Footer */}
				<div tw="flex flex-row items-center justify-between">
					<div tw="flex flex-row ml-auto">
						<h2 tw="m-0 text-2xl mr-6">Ian Mitchell</h2>
						<p tw="m-0 text-2xl" style={{ color: "#777" }}>
							@IanMitchel1
						</p>
					</div>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: "berkeleyMono",
					data: font,
					style: "normal",
					weight: 400,
				},
			],
		},
	);
}
