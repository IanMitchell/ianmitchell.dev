import Page from "@/components/Page";
import { Metadata } from "next";
import { cacheLife } from "next/cache";

export const metadata: Metadata = {
	title: "My Tools",
	description: "lol",
};

export default async function ToolsPage() {
	"use cache";
	cacheLife("max");

	return <Page title="My Tools">todo</Page>;
}
