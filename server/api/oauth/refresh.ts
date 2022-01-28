import { useQuery, setCookie } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import config from '#config';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { token: token } = useQuery(req);

	if (!token) {
		return { error: 'Token not supplied' };
	}
	const response: any = await $fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		body: new URLSearchParams({
			client_id: config.DISCORD_CLIENT_ID,
			client_secret: config.DISCORD_CLIENT_SECRET,
			grant_type: 'refresh_token',
			refresh_token: token.toString().trim(),
		}),
	});

	console.log('refresh:', response);

	if (!response.error) {
		console.log('no error');

		setCookie(res, 'discord_token', response.access_token, {
			path: '/',
			maxAge: 86400 * 6,
		});
		setCookie(res, 'discord_refresh_token', response.refresh_token, {
			path: '/',
			maxAge: 86400 * 365,
		});
	} else {
		setCookie(res, 'discord_token', '', {
			path: '/',
			expires: new Date(0),
		});
		setCookie(res, 'discord_refresh_token', '', {
			path: '/',
			expires: new Date(0),
		});
	}
	return response;
};
