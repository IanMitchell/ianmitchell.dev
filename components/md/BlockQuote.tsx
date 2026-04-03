import type { ComponentProps } from "react";

export function BlockQuote(props: ComponentProps<"blockquote">) {
	return <blockquote {...props} className="mb-4 ml-[2ch] border-l-2 border-black pl-4" />;
}
