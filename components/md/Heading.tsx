import classNames from "@/lib/classnames";
import type { ComponentProps } from "react";

const headingClasses = "mb-4 w-full";

export function H1({ className, ...props }: ComponentProps<"h1">) {
	return <h1 {...props} className={classNames(headingClasses, className)} />;
}

export function H2({ className, ...props }: ComponentProps<"h2">) {
	return (
		<h2
			{...props}
			className={classNames(headingClasses, "text-center uppercase", className)}
		/>
	);
}

export function H3({ className, ...props }: ComponentProps<"h3">) {
	return <h3 {...props} className={classNames(headingClasses, className)} />;
}

export function H4({ className, ...props }: ComponentProps<"h4">) {
	return <h4 {...props} className={classNames(headingClasses, className)} />;
}

export function H5({ className, ...props }: ComponentProps<"h5">) {
	return <h5 {...props} className={classNames(headingClasses, className)} />;
}

export function H6({ className, ...props }: ComponentProps<"h6">) {
	return <h6 {...props} className={classNames(headingClasses, className)} />;
}
