import { PropsWithChildren } from "react";
import { H1 } from "./md/Heading";

interface PageProps {
	title?: string;
	header?: React.ReactNode;
}

export default function Page({
	title,
	header,
	children,
}: PropsWithChildren<PageProps>) {
	return (
		<main>
			{title != null ? <H1 className="mb-12">{title}</H1> : null}
			{header != null ? header : null}
			{children}
		</main>
	);
}
