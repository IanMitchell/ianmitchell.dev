import { PropsWithChildren } from "react";

export default function Paper({ children }: PropsWithChildren) {
	return (
		<article className="mt-8 p-6 md:p-12 bg-white dark:bg-dark-theme-primary dark:border-white dark:border-2">
			{children}
		</article>
	);
}
