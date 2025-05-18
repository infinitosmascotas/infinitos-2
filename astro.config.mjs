// @ts-check
import { defineConfig } from "astro/config";

import playformInline from "@playform/inline";
import mdx from "@astrojs/mdx";
import alpinejs from "@astrojs/alpinejs";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless"; // <-- Adapter para Vercel

// https://astro.build/config
export default defineConfig({
	site: "https://pawstronaut.netlify.app",
	base: "/",
	integrations: [
		tailwind(),
		alpinejs(),
		mdx(),
		react(),
		playformInline({
			Critters: true,
		}),
	],
	output: "server", // <-- Necesario para usar funciones server/API
	adapter: vercel({}), // <-- ✅ Solución correcta
	devToolbar: {
		enabled: false,
	},
});
