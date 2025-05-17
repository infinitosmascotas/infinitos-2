// @ts-check
import { defineConfig } from "astro/config";

import playformInline from "@playform/inline";

import mdx from "@astrojs/mdx";

import alpinejs from "@astrojs/alpinejs";

import tailwind from "@astrojs/tailwind";

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: "https://pawstronaut.netlify.app",
	base: "/",
	integrations: [
		tailwind(),
		alpinejs(),
		mdx(),
		[react()],
		(await import("@playform/inline")).default({
			Critters: true,
		}),
	],
	output: "static",
	devToolbar: {
		enabled: false,
	},
	//experimental: {
	//	svg: true,//
	//}//,
});
