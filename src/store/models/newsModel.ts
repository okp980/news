import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { INews, IServerNews } from "../../interface/interface";
import {
	createNews,
	deleteNews,
	getAllNews,
	getSingleNews,
	updateNews,
} from "../../services/news";

// type for news state
type NewsType = {
	news: IServerNews[];
	singleNews: IServerNews | null;
};

export const news = createModel<RootModel>()({
	state: {
		news: [],
		singleNews: null,
	} as NewsType,
	reducers: {
		load: (state, payload: IServerNews[]) => {
			return { ...state, news: payload };
		},
		loadSingleNews: (state, payload: IServerNews) => {
			return { ...state, singleNews: payload };
		},
		addSingleNews: (state, payload: IServerNews) => {
			return {
				...state,
				news: [...state.news, payload],
			};
		},
		editNews: (state, payload: IServerNews) => {
			const filteredNews = state.news.filter((nw) => nw.id !== payload.id);
			return {
				...state,
				news: [...filteredNews, payload],
			};
		},
		removeNews: (state, payload: IServerNews) => {
			const filteredNews = state.news.filter((nw) => nw.id !== payload.id);
			return {
				...state,
				news: [...filteredNews],
			};
		},
	},
	effects: (dispatch) => ({
		async loadAsync(payload: string, rootState) {
			const data = await getAllNews(payload);
			// @ts-ignore
			dispatch.news.load(data);
		},
		async loadSingleNewsAsync(payload: string, rootState) {
			const data = await getSingleNews(payload);
			// @ts-ignore
			dispatch.news.loadSingleNews(data);
		},
		async addSingleNewsAsync(payload: INews, rootState) {
			const data = await createNews(payload);
			// @ts-ignore
			dispatch.news.addSingleNews(data);
		},
		async editNewsAsync(payload: { id: string; news: INews }, rootState) {
			const data = await updateNews(payload.id, payload.news);
			// @ts-ignore
			dispatch.news.editNews(data);
		},
		async removeNewsAsync(payload: { id: string; news: INews }, rootState) {
			const data = await deleteNews(payload.id, payload.news);
			// @ts-ignore
			dispatch.news.removeNews(data);
		},
	}),
});
