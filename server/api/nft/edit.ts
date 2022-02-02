import { useQuery, useCookie, useBody } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '~/supabase';
import { Nft, User } from '~/typings';
import config from '#config';
import { APIUser, RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v9';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { id } = useQuery(req);
	const token = useCookie(req, 'discord_token');
	const { price, sale } = await useBody(req);

	if (!id || !token) {
		res.writeHead(400);
		return res.end();
	}

	if (typeof price !== 'number' || typeof sale !== 'boolean') {
		res.writeHead(400);
		return res.end();
	}

	const dbNft = await supabase.from('nfts').select('*').eq('id', id);

	if (dbNft.status !== 200 || !dbNft.body.length) {
		res.writeHead(400);
		return res.end();
	}

	const nft: Nft = dbNft.body[0];
	let discordUser: APIUser;
	try {
		discordUser = await $fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch {
		res.writeHead(500);
		return res.end();
	}

	const supaUser = await supabase.from('users').select('id').eq('id', discordUser.id);
	if (supaUser.status !== 200 || !supaUser.body.length) {
		res.writeHead(500);
		return res.end();
	}
	const user: User = supaUser.body[0];

	if (user.id !== nft.owner_id) {
		console.log(user, nft);

		res.writeHead(400);
		return res.end();
	}

	let guilds: RESTGetAPICurrentUserGuildsResult;
	try {
		guilds = await $fetch('https://discord.com/api/users/@me/guilds', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch {
		res.writeHead(500);
		return res.end();
	}

	if (!(guilds.some((x) => x.id === config.RPH_ID) || Object.values(config.VALID_USERS).includes(discordUser.id))) {
		res.writeHead(400);
		return res.end();
	}

	await supabase.from('nfts').update({ price, sale }).match({ id });

	return { success: true };
};
