import { Markdown } from "@/components/Markdown";
import { Anchor } from "@/components/md/Anchor";
import { Emphasis } from "@/components/md/Emphasis";
import { H1 } from "@/components/md/Heading";
import { Paragraph } from "@/components/md/Paragraph";
import Paper from "@/components/Paper";
import { Metadata } from "next";
import { cacheLife } from "next/cache";
import path from "node:path";

export const metadata: Metadata = {
	title: "Ian Mitchell | Bet",
	description:
		"I made a dumb sports bet with my friend Staffan, and track the yearly result.",
};

export default async function BetPage() {
	"use cache";
	cacheLife("max");

	const file = Bun.file(path.join(process.cwd(), "app/bet/content.md"));
	const table = await file.text();

	return (
		<Paper>
			<H1>A Dumb Sports Bet</H1>

			<Paragraph>
				My friend Staffan and I have a dumb recurring yearly bet on Seattle
				sports. The bet revolves around the Seattle Mariners and Seattle
				Sounders. If the Mariners make the playoffs, I pay Staffan $2. If the
				Sounders make it to the Western Conference Finals, Staffan pays me $2.
				On paper, that sounds heavily weighted in his favor. AND YET. The
				Mariners have made the playoffs once since 2001, and the Sounders are an
				elite team.
			</Paragraph>

			<Paragraph>
				I update the running totals once a year, some time around October and
				November depending on the results.
			</Paragraph>

			<Markdown>{table}</Markdown>

			<Paragraph className="text-sm mt-2">
				😞{" "}
				<Emphasis>We have yet to encounter the best case scenario. </Emphasis>
			</Paragraph>

			<Paragraph className="text-sm">
				<Anchor href="/blog/seattle-sports-teams-and-stupid-bets">
					Original Article
				</Anchor>
			</Paragraph>
		</Paper>
	);
}
