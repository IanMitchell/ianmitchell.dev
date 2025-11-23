import classNames from "@/lib/classnames";
import type { ComponentProps } from "react";

export default function Preformatted({
	className,
	...props
}: ComponentProps<"pre">) {
	return (
		<pre
			{...props}
			className={classNames(
				"mb-4 overflow-scroll ml-[2ch] py-4 font-mono",
				className,
			)}
		/>
	);
}
