import { ComponentProps } from "react";

export function HorizontalRule(props: ComponentProps<"hr">) {
	return (
		<hr
			{...props}
			className="relative my-12 block h-px w-full overflow-visible border-0 border-t border-solid border-t-highlight p-0 after:absolute after:-top-6 after:left-2/4 after:block after:h-12 after:w-px after:rotate-45 after:bg-highlight after:shadow-[0_0_0_0.75rem] after:shadow-light after:content-['']"
		/>
	);
}
