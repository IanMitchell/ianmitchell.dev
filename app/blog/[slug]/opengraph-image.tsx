import { ImageResponse } from "next/og";
import { getCachedPost } from "@/lib/content";
import data from "./(data)/posts.json";

function isValidSlug(slug: string): slug is keyof typeof data {
	return slug in data;
}

export const runtime = "edge";

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

	if (!isValidSlug(params.slug)) {
		throw new Error("Unknown Post");
	}

	const { title, date } = data[params.slug];
	const formattedDate = new Date(date).toLocaleString("en-us", {
		month: "long",
		year: "numeric",
		day: "numeric",
	});

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
					tw="mt-8 ml-8 flex p-2 rounded-3xl w-24 h-24"
					style={{
						borderColor: "#ff3783",
						borderWidth: "6px",
					}}
				>
					<div
						tw="rounded-xl h-12 w-12 flex items-center justify-center"
						style={{ backgroundColor: "#333333" }}
					>
						<span tw="text-2xl text-white" style={{ fontFamily: "IBM" }}>
							i
						</span>
					</div>
				</div>

				<h1
					tw="ml-8 mr-8 mt-4 text-7xl leading-tight"
					style={{
						color: "#ff3783",
						textWrap: "balance",
						fontFamily: "DM Serif Display",
					}}
				>
					{title}
				</h1>

				<div tw="flex flex-row items-center mt-auto ml-8">
					<img
						src="https://pbs.twimg.com/profile_images/1706472056458797056/cb63cZ9Z_400x400.jpg"
						tw="rounded-full w-20 h-20 mr-8"
					/>

					<div tw="flex flex-col">
						<h2 tw="m-0 text-3xl" style={{ fontFamily: "Inter" }}>
							Ian Mitchell
						</h2>
						<p tw="m-0 text-2xl" style={{ color: "#777", fontFamily: "IBM" }}>
							@IanMitchel1
						</p>
					</div>
					<p tw="ml-auto mr-8 text-2xl" style={{ fontFamily: "Inter" }}>
						{formattedDate}
					</p>
				</div>

				<img tw="w-full h-24" src="https://ianmitchell.dev/footer.svg" />
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
