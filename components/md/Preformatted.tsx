import classNames from "@/lib/classnames";
import { ComponentProps } from "react";

export default function Preformatted({
	className,
	...props
}: ComponentProps<"pre">) {
	return (
		<pre
			{...props}
			className={classNames("mb-4 overflow-scroll p-4 rounded-lg", className)}
		/>
	);
}
