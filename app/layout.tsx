import "@/app/styles.css";
import { IBM_Plex_Mono, DM_Serif_Display } from "next/font/google";
import React, { PropsWithChildren } from "react";
import classNames from "@/lib/classnames";
import Logo from "@/components/Logo";
import { Analytics } from "@vercel/analytics/react";
import Link, { LinkProps } from "next/link";
import Twitter from "@/components/icons/Twitter";
import Discord from "@/components/icons/Discord";

const ibm = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["500", "700"],
	variable: "--font-ibm",
});

const dmSerif = DM_Serif_Display({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-dm-serif",
});

function NavLink({
	href,
	children,
}: PropsWithChildren<{ href: LinkProps["href"] }>) {
	return (
		<li>
			<Link
				href={href}
				className="text-lg hover:underline hover:underline-offset-3 hover:text-[#0064E6]"
			>
				{children}
			</Link>
		</li>
	);
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={classNames("h-full bg-light", ibm.variable, dmSerif.variable)}
		>
			<head>
				<title>Ian Mitchell</title>
			</head>
			<body className="min-h-full pb-64 site-background text-dark selection:bg-dark selection:text-light">
				<div className="mt-12 mx-auto max-w-2xl p-4">
					<header className="flex justify-between items-end mb-12">
						<a href="/">
							<Logo />
						</a>

						<nav>
							<ul className="flex gap-6">
								<NavLink href="/">Home</NavLink>
								<NavLink href="/blog">Blog</NavLink>
								<NavLink href="/bookmarks">Bookmarks</NavLink>
								<NavLink href="/uses">Uses</NavLink>
							</ul>
						</nav>
					</header>

					{children}

					<footer className="mt-16 flex justify-between items-center font-mono text-xs">
						<span className="opacity-60">
							Copyright {new Date().getFullYear()} Ian Mitchell
						</span>
						<ul className="flex gap-4">
							<li>
								<span className="font-mono text-xs opacity-60">
									ian.mitchell@hey.com
								</span>
							</li>
							<li>
								<a href="https://twitter.com/ianmitchel1">
									<Twitter className="w-4 h-4 text-[#1DA1F2] opacity-70 hover:opacity-100 transition-opacity" />
								</a>
							</li>
							<li>
								<a href="https://discord.gg/ian">
									<Discord className="w-4 h-4 text-[#5865F2] opacity-70 hover:opacity-100 transition-opacity" />
								</a>
							</li>
						</ul>
					</footer>
				</div>

				<Analytics />
			</body>
		</html>
	);
}
