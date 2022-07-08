import { AxiosResponse } from "axios";
import { INewsImage } from "../interface/interface";
import { Request } from "../utils";

// Get Images for news
export const getNewsImages = async (
	id: string
): Promise<AxiosResponse<any>> => {
	const { data } = await Request.get(`/news/${id}/images`);
	return data;
};

// Add Image to News
export const AddNewsImage = async (
	id: string,
	image: INewsImage
): Promise<AxiosResponse<any>> => {
	const { data } = await Request.post(`/news/${id}/images`, { data: image });
	return data;
};

// Delete image from news
export const deleteNewsImg = async (
	newsId: string,
	imgId: string
): Promise<AxiosResponse<any>> => {
	const { data } = await Request.delete(`/news/${newsId}/images/:${imgId}`);
	return data;
};
