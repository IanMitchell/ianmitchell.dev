import { ComponentProps } from "react";

export function OrderedList(props: ComponentProps<"ol">) {
	return (
		<ol
			{...props}
			className="ml-4 sm:ml-0 my-4 list-[decimal-leading-zero] text-xl flex flex-col gap-2"
		/>
	);
}

export function UnorderedList(props: ComponentProps<"ul">) {
	return (
		<ul
			{...props}
			className="ml-4 sm:ml-0 my-4 list-disc text-xl flex flex-col gap-2"
		/>
	);
}

export function ListItem(props: ComponentProps<"li">) {
	return <li {...props} />;
}
