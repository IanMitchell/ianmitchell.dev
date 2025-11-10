import Page from "@/components/Page";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Bookmarks",
	description: "lol",
};

export default async function BookmarksPage() {
	"use cache";

	return <Page title="Bookmarks">todo</Page>;
}
