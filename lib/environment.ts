import { createEnv } from "@t3-oss/env-nextjs";
import { string } from "valibot";

export const env = createEnv({
	client: {
		// App Configuration
		NEXT_PUBLIC_ENV: string(),
		NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV ?? process.env.NODE_ENV,
		// Our first commit 😁
		NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA:
			process.env.GIT_SHA ??
			process.env.VERCEL_GIT_COMMIT_SHA ??
			process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
			"22212d4afc37ae036dbafeff5c1135bd3139008f",
	},
});
