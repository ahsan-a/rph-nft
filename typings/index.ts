export interface User {
	id: string;
	username: string;
	discriminator: string;
	avatar: string;
	balance: number;
	admin?: boolean;
	hourly_claim: string;
	daily_claim: string;
	weekly_claim: string;
	nfts?: Nft[];
}

export interface Nft {
	id: number;
	created_at: string;
	owner_id?: string;
	price: number;
	name: string;
	description?: string;
	sale: boolean;
	approved: boolean;
	users?: User;
}

export interface HomeNfts {
	orphan: Nft[];
	sale: Nft[];
	other: Nft[];
	user: Nft[] | null;
}
