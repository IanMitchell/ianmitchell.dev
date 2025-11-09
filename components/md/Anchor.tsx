import classNames from "@/lib/classnames";
import { ComponentProps } from "react";

export function Anchor({ className, ...props }: ComponentProps<"a">) {
	return (
		<a
			{...props}
			className={classNames(
				"text-link underline-offset-2 hover:opacity-70 decoration-2 underline",
				className,
			)}
		/>
	);
}
