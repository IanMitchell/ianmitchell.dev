import { Suspense, type ComponentProps, type PropsWithChildren } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { cacheLife } from "next/cache";
import localFont from "next/font/local";
import Link from "next/link";
import Discord from "@/components/icons/Discord";
import GitHub from "@/components/icons/GitHub";
import Logo from "@/components/Logo";
import { Anchor } from "@/components/md/Anchor";
import classNames from "@/lib/classnames";
import { env } from "@/lib/environment";
import "@/app/styles.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://ianmitchell.dev"),
	title: {
		template: "Ian Mitchell | %s",
		default: "Ian Mitchell",
	},
	description: "My corner of the internet.",
};

const berkeleyMono = localFont({
	src: [
		{
			path: "./BerkeleyMonoVariable.woff2",
		},
	],
	variable: "--font-berkeley",
});

function NavLink({ href, children }: PropsWithChildren<ComponentProps<typeof Link>>) {
	return (
		<li>
			<Link href={href} className="hover:text-brand-blue hover:underline hover:underline-offset-3">
				{children}
			</Link>
		</li>
	);
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
	"use cache";
	cacheLife("max");

	return (
		<html
			lang="en"
			className={classNames(
				"h-full bg-[#F3F3F2] dark:bg-dark-theme-secondary leading-[1.4] text-dark dark:text-dark-theme-white selection:bg-dark-theme-primary dark:selection:bg-white selection:text-white dark:selection:text-black",
				berkeleyMono.className,
				berkeleyMono.variable,
			)}
		>
			<head>
				<title>Ian Mitchell</title>
			</head>
			<body className="min-h-full pb-8">
				<div className="wrapper-3xl mt-12 gap-x-4 p-4">
					<header className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
						<a href="/">
							<Logo />
						</a>

						<nav>
							<ul className="flex gap-6">
								<NavLink href="/">Home</NavLink>
								<NavLink href="/blog">Blog</NavLink>
								{/*<NavLink href="/bookmarks">Bookmarks</NavLink>
								<NavLink href="/uses">Uses</NavLink>*/}
							</ul>
						</nav>
					</header>

					<main>
						<Suspense>{children}</Suspense>
					</main>

					<footer className="mt-8 flex flex-col items-baseline justify-between gap-4 font-mono text-xs sm:flex-row">
						<div className="text-gray-400">
							<p>Hello from Seattle ☕</p>
							<p className="select-all before:content-['v.']">
								{env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA.substring(0, 7)}
							</p>
						</div>
						<ul className="flex gap-4">
							<li>
								<span className="font-mono text-xs">
									<Anchor href="mailto:ian.mitchell@hey.com">ian.mitchell@hey.com</Anchor>
								</span>
							</li>
							{/*<li>
								<a
									href="https://twitter.com/ianmitchel1"
									aria-label="My Twitter profile"
								>
									<Twitter className="w-4 h-4 text-[#1DA1F2] opacity-70 hover:opacity-100 transition-opacity" />
								</a>
							</li>*/}
							<li>
								<a href="https://discord.gg/ian" aria-label="My Discord server">
									<Discord className="h-4 w-4 text-black hover:text-[#5865F2] dark:text-white" />
								</a>
							</li>
							<li>
								<a href="https://github.com/ianmitchell" aria-label="My GitHub profile">
									<GitHub className="h-4 w-4 text-black opacity-70 transition-opacity hover:text-[#333] hover:opacity-100 dark:text-white dark:hover:text-[#ccc]" />
								</a>
							</li>
						</ul>
					</footer>
				</div>

				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
