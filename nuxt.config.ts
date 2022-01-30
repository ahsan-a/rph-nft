import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	typescript: {
		shim: false,
	},
	buildModules: ['nuxt-windicss', '@pinia/nuxt', '@vueuse/nuxt'],
	publicRuntimeConfig: {
		DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
		SUPABASE_URL: process.env.SUPABASE_URL,
		RPH_ID: process.env.RPH_ID,
	},
	privateRuntimeConfig: {
		DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
		SUPABASE_KEY: process.env.SUPABASE_KEY,
	},
});
