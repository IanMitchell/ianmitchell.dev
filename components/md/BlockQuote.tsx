import type { ComponentProps } from "react";

export function BlockQuote(props: ComponentProps<"blockquote">) {
	return (
		<blockquote
			{...props}
			className="border-black mb-4 border-l-2 ml-[2ch] pl-4"
		/>
	);
}
