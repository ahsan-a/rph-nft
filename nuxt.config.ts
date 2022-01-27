import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	typescript: {
		shim: false,
	},
	buildModules: ['nuxt-windicss'],
	publicRuntimeConfig: {
		DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
	},
});
