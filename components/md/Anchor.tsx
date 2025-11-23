import classNames from "@/lib/classnames";
import type { ComponentProps } from "react";

export function Anchor({ className, ...props }: ComponentProps<"a">) {
	return (
		<a
			className={classNames(
				"text-theme-blue underline underline-offset-2 hover:text-theme-orange",
				className,
			)}
			{...props}
		/>
	);
}
