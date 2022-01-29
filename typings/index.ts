export interface DiscordUser {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	flags: number;
	banner: string;
	banner_color: string;
	accent_color: number;
	locale: string;
	mfa_enabled: true;
}

export interface User {
	id: string;
	username: string;
	discriminator: string;
	avatar: string;
	balance: number;
	admin?: boolean;
}

export interface Nft {
	id: number;
	created_at: string;
	owner_id?: string;
	price: number;
	name: string;
	description?: string;
	sale: boolean;
	owner?: User;
	approved: boolean;
}

export interface HomeNfts {
	orphan: Nft[];
	sale: Nft[];
	other: Nft[];
}
