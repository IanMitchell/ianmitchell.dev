import Page from "@/components/Page";
import { HorizontalRule } from "@/components/md/HorizontalRule";
import { Paragraph } from "@/components/md/Paragraph";
import Link from "next/link";

export default function OtherPage() {
	return (
		<Page title="Odds and Ends">
			<Paragraph>
				I'm a web enthusiast currently working as a Senior Software Engineer at
				Vanta, where I work on the Self-Serve team.
			</Paragraph>
			<HorizontalRule />
			<Paragraph>
				<Link href="/bet">/bet</Link>
			</Paragraph>
			<Paragraph>
				An up-to-date table of my{" "}
				<Link href="/blog/seattle-sports-teams-and-stupid-bets">
					bet with Staffan
				</Link>
			</Paragraph>
		</Page>
	);
}
