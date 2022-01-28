export default defineNuxtRouteMiddleware(async (to, from) => {
	if (!process.client) return;
	const token = useCookie('discord_token');
	const refresh = useCookie('discord_refresh_token');

	if (token.value) return;
	if (!refresh.value) return;

	const test = await $fetch(`/api/oauth/refresh`, {
		params: { token: refresh.value },
	});

	return window.location.reload();
});
