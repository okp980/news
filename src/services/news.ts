import { AxiosResponse } from "axios";
import { INews, IServerNews } from "../interface/interface";
import { Request } from "../utils";

// Get paginated news
export const getAllNews = async (
	page: string
): Promise<AxiosResponse<any> | IServerNews[]> => {
	const { data } = await Request.get(`/news?page=${page}&limit=10`);
	return data;
};

// Get news by id
export const getSingleNews = async (
	id: string
): Promise<AxiosResponse<any | IServerNews>> => {
	const { data } = await Request.get(`/news/${id}`);
	return data;
};

// Add news item
export const createNews = async (news: INews): Promise<AxiosResponse<any>> => {
	const { data } = await Request.post(`/news`, { data: news });
	return data;
};

// Update news item
export const updateNews = async (
	id: string,
	news: INews
): Promise<AxiosResponse<any>> => {
	const { data } = await Request.put(`/news/${id}`, { data: news });
	return data;
};

// Delete news item
export const deleteNews = async (
	id: string,
	news: INews
): Promise<AxiosResponse<any>> => {
	const { data } = await Request.delete(`/news/${id}`);
	return data;
};
