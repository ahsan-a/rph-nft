export const discordLogin = () => {
	if (process.client) {
		const { DISCORD_CLIENT_ID } = useRuntimeConfig();
		window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Foauth%2Fcallback&response_type=code&scope=identify%20connections`;
	}
};
