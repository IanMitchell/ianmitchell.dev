/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./page/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./content/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				dark: "oklch(26% 0.04 277 / <alpha-value>)",
				light: "oklch(98% 0.01 269 / <alpha-value>)",
				highlight:
					"oklch(66.59% 0.3018840772950374 4.255646284110876 / <alpha-value>)",
				link: "oklch(54% 0.25 260 / <alpha-value>)",
			},
			fontFamily: {
				mono: ["var(--font-ibm)"],
				display: ["var(--font-dm-serif)"],
			},
			textUnderlineOffset: {
				3: "3px",
			},
		},
	},
};
