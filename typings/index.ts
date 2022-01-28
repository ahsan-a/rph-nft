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
}
