import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	typescript: {
		shim: false,
	},
	buildModules: ['nuxt-windicss', '@pinia/nuxt'],
	publicRuntimeConfig: {
		DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
	},
	privateRuntimeConfig: {
		DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
	},
});
