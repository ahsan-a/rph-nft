import { useQuery, sendRedirect, setCookie } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import config from '#config';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const { redirect } = useQuery(req);
	setCookie(res, 'discord_token', '', {
		path: '/',
		expires: new Date(0),
	});
	setCookie(res, 'discord_refresh_token', '', {
		path: '/',
		expires: new Date(0),
	});
	return sendRedirect(res, redirect.toString() || '/');
};
