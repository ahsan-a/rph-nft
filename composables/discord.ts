import { User } from 'typings';

export const useDiscordLogin = () => {
	const { DISCORD_CLIENT_ID } = useRuntimeConfig();
	if (process.client) {
		window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Foauth%2Fcallback&response_type=code&scope=identify%20guilds`;
	}
};

export const getUser = async (): Promise<User | null> => {
	const token = useCookie('discord_token');
	if (!token.value) return null;

	const discordUser: any = await $fetch('https://discord.com/api/users/@me', {
		headers: {
			Authorization: `Bearer ${token.value}`,
		},
	}).catch(console.log);

	if (discordUser.error) return null;

	const dUser: User = await $fetch('/api/user/getUser', { method: 'POST', params: { token: token.value } });

	return dUser;
};
