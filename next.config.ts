import type { NextConfig } from "next";

const config: NextConfig = {
	reactStrictMode: true,
	typedRoutes: true,
	cacheComponents: true,
	experimental: {
		browserDebugInfoInTerminal: true,
		clientSegmentCache: true,
		globalNotFound: true,
		turbopackFileSystemCacheForDev: true,
	},
	async redirects() {
		return [
			{
				source: "/what-i-use",
				destination: "/uses",
				permanent: true,
			},
			{
				source: "/tools",
				destination: "/uses",
				permanent: true,
			},
			{
				source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:post",
				destination: "/blog/:post",
				permanent: true,
			},
			{
				source: "/discord",
				destination: "https://discord.gg/ian",
				permanent: false,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: "/pokemon",
				destination: "https://pokemon-go-avatar.vercel.app",
			},
			{
				source: "/bhs",
				destination: "https://bhs-g15spfgi2-ianmitchell1.vercel.app",
			},
			{
				source: "/projects/bhs",
				destination: "https://bhs-g15spfgi2-ianmitchell1.vercel.app",
			},
			{
				source: "/resume",
				destination: "/",
			},
			{
				source: "/feed.xml",
				destination: "/feed",
			},
		];
	},
};

export default config;
