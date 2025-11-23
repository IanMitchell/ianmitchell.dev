import Page from "@/components/Page";
import { Metadata } from "next";
import { cacheLife } from "next/cache";

export const metadata: Metadata = {
	title: "Bookmarks",
	description: "lol",
};

export default async function BookmarksPage() {
	"use cache";
	cacheLife("max");

	return <Page title="Bookmarks">todo</Page>;
}
