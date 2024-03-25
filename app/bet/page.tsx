import { Fragment } from "react";
import { Markdown } from "@/components/Markdown";
import fs from "node:fs";
import path from "node:path";
import { Metadata } from "next";
import { H1 } from "@/components/md/Heading";
import { Paragraph } from "@/components/md/Paragraph";
import { Anchor } from "@/components/md/Anchor";
import { Emphasis } from "@/components/md/Emphasis";

export const metadata: Metadata = {
	title: "Ian Mitchell | Bet",
	description:
		"I made a dumb sports bet with my friend Staffan, and track the yearly result.",
};

export default function BetPage() {
	const table = fs.readFileSync(
		path.join(process.cwd(), "./app/bet/content.md"),
		"utf8",
	);

	return (
		<Fragment>
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
				<Anchor href="/blog/seattle-sports-teams-and-stupid-bets">
					Original Article
				</Anchor>
			</Paragraph>
		</Fragment>
	);
}
