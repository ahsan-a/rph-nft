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
	approved: boolean;
	owner?: User;
}

export interface HomeNfts {
	orphan: Nft[];
	sale: Nft[];
	other: Nft[];
}
