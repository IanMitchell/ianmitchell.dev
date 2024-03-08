import { PropsWithChildren } from "react";

export function BlockQuote({ children, ...props }: PropsWithChildren) {
	return (
		<blockquote className="border-l-4 pl-4 border-link mb-4">
			{children}
		</blockquote>
	);
}
