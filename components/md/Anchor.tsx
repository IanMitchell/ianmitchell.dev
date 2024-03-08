import Link from "next/link";
import { ComponentProps } from "react";

export function Anchor(props: ComponentProps<"a">) {
	// if (props.href?.startsWith("/")) {
	// 	return (
	// 		<Link
	// 			{...props}
	// 			className="text-highlight hover:underline-offset-2 hover:decoration-2 hover:underline"
	// 		/>
	// 	);
	// }

	return (
		<a
			{...props}
			className="text-link underline-offset-2 hover:opacity-70 decoration-2 underline"
		/>
	);
}
