import { useQuery, useCookie } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '~/supabase';
import { Nft, User } from '~/typings';
import config from '#config';
import { APIUser, RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v9';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { id } = useQuery(req);
	const token = useCookie(req, 'discord_token');

	if (!id || !token) {
		res.writeHead(400);
		res.write({ success: false, error: 'A discord token or id was not supplied.' });
		return res.end();
	}

	const dbNft = await supabase.from('nfts').select('*').eq('id', id);

	if (dbNft.status !== 200 || !dbNft.body.length) {
		res.writeHead(400);
		res.write({ success: false, error: 'NFT does not exist' });
		return res.end();
	}
	const nft: Nft = dbNft.body[0];
	if (!nft.sale && !nft.owner_id) {
		res.writeHead(400);
		res.write({ success: false, error: 'NFT is currently not on sale.' });
		return res.end();
	}

	let discordUser: APIUser;
	try {
		discordUser = await $fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch {
		res.writeHead(500);
		res.write({ success: false, error: 'Error fetching user' });
		return res.end();
	}

	const supaUser = await supabase.from('users').select('balance').eq('id', discordUser.id);
	if (supaUser.status !== 200 || !supaUser.body.length) {
		res.writeHead(500);
		res.write({ success: false, error: 'Error getting user' });
		return res.end();
	}

	const user: User = supaUser.body[0];

	let guilds: RESTGetAPICurrentUserGuildsResult;
	try {
		guilds = await $fetch('https://discord.com/api/users/@me/guilds', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch {
		res.writeHead(500);
		res.write({ success: false, error: 'Error fetching guilds' });
		return res.end();
	}

	if (!(guilds.some((x) => x.id === config.RPH_ID) || Object.values(config.VALID_USERS).includes(discordUser.id))) {
		res.writeHead(400);
		res.write({ success: false, error: 'User not in r/ph or an approved user (free grian)' });
		return res.end();
	}

	if (supaUser.body[0].balance < nft.price) {
		res.writeHead(400);
		res.write({ success: false, error: 'Insufficient funds' });
		return res.end();
	}

	await supabase
		.from('users')
		.update({ balance: user.balance - nft.price })
		.match({ id: discordUser.id });

	await supabase.from('nfts').update({ owner_id: discordUser.id, sale: false }).match({ id });

	return { success: true };
};
