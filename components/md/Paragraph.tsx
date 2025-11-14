import classNames from "@/lib/classnames";
import type { ComponentProps } from "react";

// Drop color lightness by 10% oklch?
export function Paragraph({ className, ...props }: ComponentProps<"p">) {
	return <p {...props} className={classNames("mb-4", className)} />;
}
