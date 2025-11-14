import { ComponentProps } from "react";

export function HorizontalRule(props: ComponentProps<"hr">) {
	return (
		<hr
			{...props}
			className="my-12 block h-px w-full border-0 border-t border-solid border-t-dark p-0"
		/>
	);
}
