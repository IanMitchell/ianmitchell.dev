import { ComponentProps } from "react";

export function Emphasis(props: ComponentProps<"em">) {
	return <em className="font-serif" {...props} />;
}
