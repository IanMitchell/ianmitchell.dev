import classNames from "@/lib/classnames";
import type { ComponentProps } from "react";

export function Anchor({ className, ...props }: ComponentProps<"a">) {
	return (
		<a
			className={classNames(
				"text-brand-blue underline underline-offset-2 hover:text-brand",
				className,
			)}
			{...props}
		/>
	);
}
