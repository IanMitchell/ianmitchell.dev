/** @type {import('next').NextConfig} */
export default {
	reactStrictMode: true,
	experimental: {
		// mdxRs: true,
		typedRoutes: true,
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
				destination: "https://pokemon-cre3xe0l1-ianmitchell1.vercel.app",
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
		];
	},
};
