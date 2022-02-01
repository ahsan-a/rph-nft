import { useQuery } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '~/supabase';
import { Nft } from 'typings';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { id } = useQuery(req);
	if (!id) {
		res.writeHead(400);
		res.write({ error: 'An NFT ID was not supplied.' });
		return res.end();
	}
	try {
		const dbNft = await supabase.from('nfts').select('*, users(*)').eq('id', id);

		if (dbNft.status !== 200 || !dbNft.body.length) {
			res.writeHead(500);
			res.write({ statusText: dbNft.statusText, error: dbNft.error });
			return res.end();
		}

		return dbNft.body[0] as Nft;
	} catch (e) {
		res.writeHead(500);
		res.write({ error: 'An unknown error occurred' });
		return res.end();
	}
};
