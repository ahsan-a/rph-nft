import { useQuery, useCookies } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '~/supabase';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const q = useQuery(req);
	console.log('called', q);

	return true;
	// const { id, token } = useQuery(req);
	// if (!id || !token) {
	// 	res.writeHead(400);
	// 	res.write({ error: 'An NFT ID or token was not supplied.' });
	// 	return res.end();
	// }

	// try {
	// 	const dbNft = await supabase.from('nfts').select('*').eq('id', id);

	// 	if (dbNft.status !== 200 || !dbNft.body.length) {
	// 		res.writeHead(500);
	// 		res.write({ statusText: dbNft.statusText, error: dbNft.error });
	// 		return res.end();
	// 	}

	// 	const nft: Nft = dbNft.body[0];

	// 	const discordUser: any = await $fetch('https://discord.com/api/users/@me', {
	// 		headers: {
	// 			Authorization: `Bearer ${token}`,
	// 		},
	// 	});

	// 	if (discordUser.error) {
	// 		res.writeHead(400);
	// 		res.write({ error: "You don't have a discord account???" });
	// 		return res.end();
	// 	}

	// 	const supaUser = await supabase.from('users').select('balance').eq('id', discordUser.id);

	// 	if (dbNft.status !== 200 || !dbNft.body.length) {
	// 		res.writeHead(400);
	// 		res.write({ statusText: dbNft.statusText, error: dbNft.error });
	// 		return res.end();
	// 	}

	// 	if (supaUser.body[0].balance < nft.price) return false;

	// 	const guilds: any = await $fetch('/users/@me/guilds', {
	// 		headers: {
	// 			Authorization: `Bearer ${token}`,
	// 		},
	// 	}).catch(console.log);

	// 	if (guilds.error) {
	// 		res.writeHead(400);
	// 		res.write({ error: "Couldn't access guilds." });
	// 		return res.end();
	// 	}

	// 	console.log(guilds);

	// 	return true;
	// } catch (e) {
	// 	res.writeHead(500);
	// 	res.write({ error: 'An unknown error occurred' });
	// 	return res.end();
	// }

	// return false;
};
