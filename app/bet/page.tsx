import { Fragment, PropsWithChildren } from "react";
import { Markdown } from "@/components/Markdown";
import fs from "node:fs";
import path from "node:path";

export default function BetPage() {
	const table = fs.readFileSync(
		path.join(process.cwd(), "./app/bet/content.md"),
		"utf8",
	);

	return (
		<Fragment>
			<h1>A Dumb Sports Bet</h1>
			<p>
				<a className="italic" href="/blog/seattle-sports-teams-and-stupid-bets">
					Original Article
				</a>
			</p>
			<p>
				My friend Staffan and I have a dumb recurring yearly bet on Seattle
				sports. The bet revolves around the Seattle Mariners and Seattle
				Sounders. If the Mariners make the playoffs, I pay Staffan $2. If the
				Sounders make it to the Western Conference Finals, Staffan pays me $2.
				On paper, that sounds heavily weighted in his favor. AND YET. The
				Mariners have made the playoffs once since 2001, and the Sounders are an
				elite team.
			</p>
			<p>
				I update the running totals once a year, some time around October and
				November depending on the results.
			</p>
			<Markdown>{table}</Markdown>
			<p className="text-sm mt-2">
				😞{" "}
				<span className="italic">
					We have yet to encounter the best case scenario.
				</span>
			</p>
		</Fragment>
	);
}
