import { useQuery, sendRedirect } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '~/supabase';
import { Nft, HomeNfts } from 'typings';

export default async (req: IncomingMessage, res: ServerResponse) => {
	try {
		const dbNfts = await supabase.from('nfts').select().order('created_at', { ascending: false });

		if (dbNfts.status !== 200) {
			res.writeHead(500);
			res.write({ statusText: dbNfts.statusText, error: dbNfts.error });
			return res.end();
		}

		const nfts: Nft[] = dbNfts.body;
		const returnNfts: HomeNfts = {
			orphan: nfts.filter((x) => x.owner_id === null),
			sale: nfts.filter((x) => x.owner_id && x.sale === true),
			other: nfts.filter((x) => x.owner_id && x.sale === false),
		};

		return returnNfts;
	} catch (e) {
		console.log(e);
		res.writeHead(500);
		res.write({ error: 'An unknown error occurred' });
		return res.end();
	}
};
