import classNames from "@/lib/classnames";
import { ComponentProps } from "react";

// TODO: Drop color lightness by 10% oklch
export function Paragraph({ className, ...props }: ComponentProps<"p">) {
	return <p {...props} className={classNames("mb-5 text-xl", className)} />;
}
