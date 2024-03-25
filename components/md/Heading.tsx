import classNames from "@/lib/classnames";
import { ComponentProps } from "react";

const headingClasses = "mt-8 mb-2 font-display leading-normal";

export function H1({ className, ...props }: ComponentProps<"h1">) {
	return (
		<h1
			{...props}
			className={classNames(headingClasses, "text-5xl mb-4", className)}
		/>
	);
}

export function H2({ className, ...props }: ComponentProps<"h2">) {
	return (
		<h2
			{...props}
			className={classNames(headingClasses, "text-4xl", className)}
		/>
	);
}

export function H3({ className, ...props }: ComponentProps<"h3">) {
	return (
		<h3
			{...props}
			className={classNames(headingClasses, "text-3xl", className)}
		/>
	);
}

export function H4({ className, ...props }: ComponentProps<"h4">) {
	return (
		<h4
			{...props}
			className={classNames(headingClasses, "text-2xl", className)}
		/>
	);
}

export function H5({ className, ...props }: ComponentProps<"h5">) {
	return (
		<h5
			{...props}
			className={classNames(headingClasses, "text-xl", className)}
		/>
	);
}

export function H6({ className, ...props }: ComponentProps<"h6">) {
	return (
		<h6
			{...props}
			className={classNames(headingClasses, "text-lg", className)}
		/>
	);
}
