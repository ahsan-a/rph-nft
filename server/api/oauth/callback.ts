import { useQuery, sendRedirect, setCookie } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import config from '#config';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { code } = useQuery(req);

	if (!code) {
		return sendRedirect(res, '/');
	}

	try {
		const response: any = await $fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			body: new URLSearchParams({
				client_id: config.DISCORD_CLIENT_ID,
				client_secret: config.DISCORD_CLIENT_SECRET,
				grant_type: 'authorization_code',
				redirect_uri: 'http://localhost:3000/api/oauth/callback',
				code: code.toString(),
			}),
		});

		setCookie(res, 'discord_token', response.access_token, {
			path: '/',
			maxAge: 86400 * 6,
		});
		setCookie(res, 'discord_refresh_token', response.refresh_token, {
			path: '/',
			maxAge: 86400 * 365,
		});
	} catch (e) {
		res.writeHead(500);
		res.write({ error: 'Unknown' });
		return res.end();
	}

	return sendRedirect(res, '/');
};
