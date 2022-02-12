import { User } from 'typings';
import { APIUser } from 'discord-api-types/v9';
import { useMainStore } from '~~/store/main';

export const discordLogin = () => {
	const { DISCORD_CLIENT_ID, REDIRECT } = useRuntimeConfig();
	if (process.client) {
		window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT}&response_type=code&scope=identify%20guilds`;
	}
};

export const getUser = async (): Promise<User | null> => {
	const token = useCookie('discord_token');
	if (!token.value) return null;
	const store = useMainStore();
	if (store.user) return store.user;

	const user = (await $fetch('/api/user/getUser', { method: 'POST', params: { token: token.value } })) as User;
	store.user = user;
	return user;
};

export const discordLogout = async () => {
	await $fetch('/api/oauth/logout', { method: 'POST', params: { redirect: window.location.href } });
	window.location.reload();
};
