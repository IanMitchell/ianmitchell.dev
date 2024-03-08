import { ComponentProps } from "react";

export function OrderedList(props: ComponentProps<"ol">) {
	return <ol {...props} className="my-4 ml-12 list-decimal text-xl" />;
}

export function UnorderedList(props: ComponentProps<"ul">) {
	return <ul {...props} className="my-4 ml-12 list-disc text-xl" />;
}

export function ListItem(props: ComponentProps<"li">) {
	return <li {...props} className="my-4 leading-relaxed" />;
}
