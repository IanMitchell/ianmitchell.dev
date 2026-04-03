import { config } from "@0x57/oxfmt-config";
import { defineConfig } from "oxfmt";

export default defineConfig({
	...config,
	sortTailwindcss: {
		stylesheet: "./app/styles.css",
	},
});
