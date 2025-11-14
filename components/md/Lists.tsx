import type { ComponentProps } from "react";

export function OrderedList(props: ComponentProps<"ol">) {
	return (
		<ol
			{...props}
			className="my-4 ml-18 flex list-[decimal-leading-zero] flex-col"
		/>
	);
}

export function UnorderedList(props: ComponentProps<"ul">) {
	return <ul {...props} className="list-['*'] my-4 ml-[3ch] flex flex-col" />;
}

export function ListItem(props: ComponentProps<"li">) {
	return <li {...props} className="pl-[2ch]" />;
}
