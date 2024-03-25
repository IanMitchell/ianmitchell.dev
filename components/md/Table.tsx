import { ComponentProps } from "react";

export function Table(props: ComponentProps<"table">) {
	return <table {...props} className="min-w-full divide-y divide-gray-300" />;
}

export function TableHeader(props: ComponentProps<"thead">) {
	return <thead {...props} />;
}

export function TableBody(props: ComponentProps<"tbody">) {
	return <tbody {...props} className="divide-y divide-gray-200" />;
}

export function TableRow(props: ComponentProps<"tr">) {
	return <tr {...props} />;
}

export function TableCell(props: ComponentProps<"td">) {
	return (
		<td
			{...props}
			className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
		/>
	);
}

export function TableFooter(props: ComponentProps<"tfoot">) {
	return <tfoot {...props} className="divide-y divide-gray-200" />;
}
