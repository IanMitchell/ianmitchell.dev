import { ComponentProps } from "react";

export function Image(props: ComponentProps<"img">) {
	return <img {...props} className="m-auto mb-8" />;
}
