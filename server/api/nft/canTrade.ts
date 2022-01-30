import { useQuery } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '~/supabase';
import { Nft } from '~/typings';
import { APIUser, RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v9';
import config from '#config';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { id, token } = useQuery(req);
	if (!id || !token) {
		res.writeHead(400);
		res.write({ error: 'An NFT ID or token was not supplied.' });
		return res.end();
	}

	try {
		const dbNft = await supabase.from('nfts').select('*').eq('id', id);

		if (dbNft.status !== 200 || !dbNft.body.length) {
			res.writeHead(500);
			res.write({ statusText: dbNft.statusText, error: dbNft.error });
			return res.end();
		}

		const nft: Nft = dbNft.body[0];

		const discordUser: APIUser = await $fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const supaUser = await supabase.from('users').select('balance').eq('id', discordUser.id);

		if (dbNft.status !== 200 || !dbNft.body.length) {
			res.writeHead(400);
			res.write({ statusText: dbNft.statusText, error: dbNft.error });
			return res.end();
		}

		if (supaUser.body[0].balance < nft.price) return false;

		const guilds: RESTGetAPICurrentUserGuildsResult = await $fetch('https://discord.com/api/users/@me/guilds', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (
			guilds.some((x) => x.id === config.RPH_ID) ||
			Object.values({ grian: '581896956998189171', sh0tx: '790199140860428328' }).includes(discordUser.id)
		)
			return { canTrade: true };
		else return { canTrade: false };
	} catch (e) {
		res.writeHead(500);
		res.write({ error: 'An unknown error occurred' });
		return res.end();
	}
};
