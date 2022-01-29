import { useQuery, sendRedirect } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '~/supabase';
import { User } from 'typings';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { token } = useQuery(req);

	if (!token) {
		res.writeHead(400);
		return sendRedirect(res, 'https://http.cat/400');
	}

	const discordUser: any = await $fetch('https://discord.com/api/users/@me', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).catch(console.log);

	if (discordUser.error) {
		res.writeHead(400);
		return sendRedirect(res, 'https://http.cat/400');
	}

	const dUser: Partial<User> = {
		id: discordUser.id,
		username: discordUser.username,
		discriminator: discordUser.discriminator,
		avatar: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp`,
	};

	const sUser = await supabase.from('users').upsert(dUser);

	if (sUser.error) {
		res.writeHead(500);
		return sendRedirect(res, 'https://http.cat/500');
	}

	return sUser.body[0] as User;
};
