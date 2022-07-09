import { ImageSourcePropType } from "react-native";

export interface INews {
	author: string;
	title: string;
}

export interface IComments {
	newsId: string;
	name: string;
	avatar: string;
	comment: string;
}

export interface INewsImage {
	newsId: string;
	image: string;
}

export interface IServerNews {
	id: string;
	author: string;
	title: string;
	createdAt: string;
	url: ImageSourcePropType;
	body: string;
}

export interface CardInterface {
	author: string;
	title: string;
	time: string;
	id?: string;
	excerpt: string;
	navigation: any;
}

export interface IServerImage {
	id: string;
	newsId: string;
	image: string;
	createdAt: string;
}
