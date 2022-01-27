import { useQuery, sendRedirect, setCookie } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import DiscordOauth2 from 'discord-oauth2';
const oauth = new DiscordOauth2();

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { code } = useQuery(req);

	if (!code) {
		return sendRedirect(res, '/');
	}
	const response: any = await oauth.tokenRequest({
		clientId: '935270791942139904',
		clientSecret: 'SoxQmJMfV0uX30CAvtsG336mjqN8-_W1',

		code: 's5ChoOIEjBHO4ycvO1TxgRG4kFJoa9',
		scope: 'identify guilds',
		grantType: 'authorization_code',

		redirectUri: 'http://localhost:3000',
	});

	console.log(response);

	if (response.error) {
		return sendRedirect(res, '/');
	}

	setCookie(res, 'discord_token', response.access_token, { path: '/' });

	return sendRedirect(res, '/');
};
