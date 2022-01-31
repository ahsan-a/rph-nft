import { User } from 'typings';
import { APIUser } from 'discord-api-types/v9';

export const discordLogin = () => {
	const { DISCORD_CLIENT_ID } = useRuntimeConfig();
	if (process.client) {
		window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Foauth%2Fcallback&response_type=code&scope=identify%20guilds`;
	}
};

export const getUser = async (): Promise<User | null> => {
	const token = useCookie('discord_token');
	if (!token.value) return null;
	return (await $fetch('/api/user/getUser', { method: 'POST', params: { token: token.value } })) as User;
};

export const discordLogout = async () => {
	await $fetch('/api/oauth/logout', { method: 'POST', params: { redirect: window.location.href } });
	window.location.reload();
};
