import { useQuery, useCookie, setCookie, useCookies } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import config from '#config';

export default async (req: IncomingMessage, res: ServerResponse) => {
	const cookies = useCookies(req);
	console.log('cookies:', cookies);

	return 'test';
};
