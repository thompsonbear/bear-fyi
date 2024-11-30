export type Categories = string;

export type Post = {
	title: string;
	slug: string;
	description: string;
	categories: Categories[];
	visible: boolean;
	published: string;
	updated?: string;
};

export type Link = {
	text: string;
	href: string;
	icon?: string;
	new_tab?: boolean;
};

export type Point = {
	x: number;
	y: number;
	z?: number;
};
