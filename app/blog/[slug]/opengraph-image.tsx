import { getPost } from "@/lib/content";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

// Image metadata
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
	// Font
	const dmSerifyDisplay = fetch(
		new URL("./DMSerifDisplay-Regular.ttf", import.meta.url),
	).then((response) => response.arrayBuffer());

	const inter = fetch(new URL("./Inter-Regular.ttf", import.meta.url)).then(
		(res) => res.arrayBuffer(),
	);

	const ibm = fetch(new URL("./IBMPlexMono-Regular.ttf", import.meta.url)).then(
		(res) => res.arrayBuffer(),
	);

	const { frontmatter } = await getPost(params.slug);

	return new ImageResponse(
		(
			<div
				tw="flex flex-col w-full h-full bg-white"
				style={{
					backgroundColor: "#f6f8ff",
					color: "#1f2237",
				}}
			>
				<div
					tw="mt-8 ml-8 flex border-[3px] p-1 rounded-xl w-12 h-12"
					style={{ borderColor: "#ff3783" }}
				>
					<div
						tw="rounded-md h-6 w-6 flex items-center justify-center"
						style={{ backgroundColor: "#333333" }}
					>
						<span tw="text-xs text-white" style={{ fontFamily: "IBM" }}>
							i
						</span>
					</div>
				</div>

				<h1
					tw="ml-8 mr-8 mt-8 text-5xl"
					style={{
						color: "#ff3783",
						textWrap: "balance",
						fontFamily: "DM Serif Display",
					}}
				>
					{frontmatter.title}
				</h1>

				<div tw="flex flex-row items-center mt-auto ml-8 mb-8">
					<img
						src="https://pbs.twimg.com/profile_images/1706472056458797056/cb63cZ9Z_400x400.jpg"
						tw="rounded-full w-12 h-12 mr-4"
					/>

					<div tw="flex flex-col">
						<h2 tw="m-0" style={{ fontFamily: "Inter" }}>
							Ian Mitchell
						</h2>
						<p tw="m-0" style={{ color: "#777", fontFamily: "IBM" }}>
							@IanMitchel1
						</p>
					</div>
					<p tw="ml-auto mr-8" style={{ fontFamily: "Inter" }}>
						{frontmatter.date}
					</p>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: "Inter",
					data: await inter,
					style: "normal",
					weight: 400,
				},
				{
					name: "IBM",
					data: await ibm,
					style: "normal",
					weight: 400,
				},
				{
					name: "DM Serif Display",
					data: await dmSerifyDisplay,
					style: "normal",
					weight: 400,
				},
			],
		},
	);
}
