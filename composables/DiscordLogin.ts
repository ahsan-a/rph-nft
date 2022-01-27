export const discordLogin = () => {
	if (process.client) {
		const { DISCORD_CLIENT_ID } = useRuntimeConfig();
		window.location.replace(
			`https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=localhost%3A3000&response_type=code&scope=identify%20guilds`
		);
	}
};
