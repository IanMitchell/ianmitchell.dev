import { H1 } from "./md/Heading";

interface PageProps {
	title?: string;
	children: React.ReactNode;
}

export default function Page({ title, children }: PageProps) {
	return (
		<main>
			{title != null ? <H1 className="mb-12">{title}</H1> : null}
			{children}
		</main>
	);
}
