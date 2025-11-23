import classNames from "@/lib/classnames";
import type { ComponentProps, ReactNode } from "react";
import CodeFile from "../icons/CodeFile";

export default function FigureCaption(props: ComponentProps<"figcaption">) {
	if (!("data-rehype-pretty-code-title" in props)) {
		return <figcaption {...props} />;
	}

	const { children, className, ...rest } = props;

	let language: ReactNode = null;

	if ("data-language" in props && typeof props["data-language"] === "string") {
		language = props["data-language"];
	}

	return (
		<figcaption
			{...rest}
			className={classNames(
				"flex font-mono justify-between items-center pb-2 text-sm ml-[2ch]",
				className,
			)}
		>
			<div className="flex items-center gap-2">
				<CodeFile className="size-4" />
				{children}
			</div>
			<span>{language}</span>
		</figcaption>
	);
}
