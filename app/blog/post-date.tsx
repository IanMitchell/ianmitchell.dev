"use client";

interface PostDateProps {
	date: Date;
}

export default function PostDate({ date }: PostDateProps) {
	const locale = navigator.language ?? "en-US";
	return (
		<span
			className="hidden opacity-50 sm:inline-block lg:-ml-16"
			title={date.toLocaleDateString(locale, {
				month: "long",
				day: "numeric",
				year: "numeric",
			})}
		>
			{date.toLocaleString(locale, {
				month: "2-digit",
				day: "2-digit",
				timeZone: "UTC",
			})}
		</span>
	);
}
