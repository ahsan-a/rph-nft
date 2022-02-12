import { useQuery, useCookie } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '~/supabase';
import { User } from 'typings';
import { APIUser } from 'discord-api-types/v9';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { id } = useQuery(req);

	if (!id) {
		res.writeHead(400);
		return res.end();
	}

	const user = await supabase.from('users').select('*, nfts(*)').eq('id', id);
	if (user.status !== 200) {
		res.writeHead(400);
		return res.end();
	}

	return user.body[0];
};
