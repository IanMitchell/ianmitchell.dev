import { ComponentProps } from "react";

// TODO: Drop color lightness by 10% oklch
export function Paragraph(props: ComponentProps<"p">) {
	return <p {...props} className="mb-5 text-xl leading-9" />;
}
