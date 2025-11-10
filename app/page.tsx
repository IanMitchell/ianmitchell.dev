import { H1 } from "@/components/md/Heading";
import { Paragraph } from "@/components/md/Paragraph";
import { Fragment } from "react";

export default async function IndexPage() {
	"use cache";

	return (
		<Fragment>
			<H1 className="mb-4">Hi! My name is Ian.</H1>
			<Paragraph>
				I'm a web enthusiast currently working as a Senior Software Engineer at
				Vanta, where I work on the Self-Serve team.
			</Paragraph>
			{/*<H2 className="mb-6">Current Projects</H2>
			 <div className="grid grid-cols-2 gap-4">
				<Panel
					title="Interaction Kit"
					href="https://github.com/ianmitchell/interaction-kit"
				>
					Interaction Kit is a framework for building HTTP Discord Bots
				</Panel>
				<Panel title="sentrydiscord.dev" href="https://sentrydiscord.dev">
					Sentry&rarr;Discord is a service that translates Sentry error alert
					webhooks into Discord embeds
				</Panel>
			</div> */}
		</Fragment>
	);
}
