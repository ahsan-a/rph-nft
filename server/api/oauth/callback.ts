import { useQuery, sendRedirect, setCookie } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { code } = useQuery(req);

	if (!code) {
		return sendRedirect(res, '/');
	}

	const response: any = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: process.env.DISCORD_CLIENT_ID,
			client_secret: process.env.DISCORD_CLIENT_SECRET,
			grant_type: 'authorization_code',
			redirect_uri: 'http://localhost:3000/api/oauth/callback',
			code: code.toString(),
		}).toString(),
	}).then((x) => x.json());
	console.log(response);

	if (!response.error) {
		setCookie(res, 'discord_token', response.access_token, {
			path: '/',
			maxAge: 86400,
		});
		setCookie(res, 'discord_refresh_token', response.refresh_token, {
			path: '/',
			maxAge: 86400 * 365,
		});
	}

	return sendRedirect(res, '/');
};
