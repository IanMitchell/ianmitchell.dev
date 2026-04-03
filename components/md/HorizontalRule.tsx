import { ComponentProps } from "react";

export function HorizontalRule(props: ComponentProps<"hr">) {
	return (
		<hr
			{...props}
			className="border-t-dark my-12 block h-px w-full border-0 border-t border-solid p-0"
		/>
	);
}
