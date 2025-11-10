import Page from "@/components/Page";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "My Tools",
	description: "lol",
};

export default async function ToolsPage() {
	"use cache";

	return <Page title="My Tools">todo</Page>;
}
