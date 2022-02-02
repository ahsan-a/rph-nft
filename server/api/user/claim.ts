import { useCookie, useQuery } from 'h3';
import { IncomingMessage, ServerResponse } from 'http';
import { supabase } from '~/supabase';
import { User } from 'typings';
import { APIUser } from 'discord-api-types/v9';

export default async (req: IncomingMessage, res: ServerResponse) => {
	try {
		const token = useCookie(req, 'discord_token');
		if (!token) throw new Error('No token');

		const { claimType } = useQuery(req);
		if (!claimType) throw new Error('No claim type');

		const discordUser: APIUser = await $fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const supaUser = await supabase.from('users').select('*').eq('id', discordUser.id);
		if (supaUser.status !== 200 || !supaUser.body[0]) throw new Error('User not found');

		const user: User = supaUser.body[0];

		const now = new Date();
		let claimDate: Date;

		let wait: number;
		let increase: number;
		switch (Number(claimType)) {
			case 1:
				claimDate = new Date(user.hourly_claim);
				wait = 1000 * 60 * 60;
				increase = 10;
				break;
			case 2:
				claimDate = new Date(user.daily_claim);
				wait = 1000 * 60 * 60 * 24;
				increase = 25;
				break;
			case 3:
				claimDate = new Date(user.weekly_claim);
				wait = 1000 * 60 * 60 * 24 * 7;
				increase = 200;
				break;
			default:
				throw new Error('Invalid claim type');
		}
		const difference = now.getTime() - claimDate.getTime();
		if (difference < wait) {
			return { success: false, wait: Math.ceil((wait - difference) / 1000) };
		} else {
			const claims = ['', 'hourly', 'daily', 'weekly'];

			const response: { [key: string]: any } = { balance: user.balance + increase };
			response[`${claims[Number(claimType)]}_claim`] = now.toISOString();

			const update = await supabase.from('users').update(response).eq('id', user.id);
			if (update.status !== 200) throw new Error('Failed to update claim date');
			return { success: true };
		}
	} catch {
		res.writeHead(500);
		res.end();
	}
};
