import { H1 } from "@/components/md/Heading";
import { Paragraph } from "@/components/md/Paragraph";
import Paper from "@/components/Paper";
import { Metadata } from "next";
import { cacheLife } from "next/cache";

export const metadata: Metadata = {
	title: "My Tools",
	description: "lol",
};

export default async function ToolsPage() {
	"use cache";
	cacheLife("max");

	return (
		<Paper>
			<H1>My Tools</H1>
			<Paragraph>todo</Paragraph>
		</Paper>
	);
}
