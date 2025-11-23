import { H1 } from "@/components/md/Heading";
import { Paragraph } from "@/components/md/Paragraph";
import Paper from "@/components/Paper";
import { cacheLife } from "next/cache";

export default async function IndexPage() {
	"use cache";
	cacheLife("max");

	return (
		<Paper>
			<H1 className="mb-4">Hi! My name is Ian.</H1>
			<Paragraph>
				I'm a web enthusiast currently working as a Senior Software Engineer at
				Vanta, where I work on the Self-Serve team.
			</Paragraph>
		</Paper>
	);
}
