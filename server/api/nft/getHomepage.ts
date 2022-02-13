import { useCookie, sendRedirect } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '~/supabase';
import { Nft, HomeNfts } from 'typings';
import { APIUser } from 'discord-api-types/v9';

export default async (req: IncomingMessage, res: ServerResponse) => {
	try {
		const dbNfts = await supabase.from('nfts').select('*, users(*)').order('id', { ascending: false });

		if (dbNfts.status !== 200) {
			res.writeHead(500);
			return res.end();
		}

		const nfts: Nft[] = dbNfts.body;

		const token = useCookie(req, 'discord_token');
		let userNfts: Nft[];
		if (token) {
			const discordUser: APIUser = await $fetch('https://discord.com/api/users/@me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			userNfts = nfts.filter((x) => x.owner_id === discordUser.id);
		}

		const returnNfts: HomeNfts = {
			orphan: nfts.filter((x) => x.owner_id === null),
			sale: nfts.filter((x) => x.owner_id && x.sale === true),
			other: nfts.filter((x) => x.owner_id && x.sale === false),
			user: userNfts,
		};

		return returnNfts;
	} catch (e) {
		res.writeHead(500);
		return res.end();
	}
};
