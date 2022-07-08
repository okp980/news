import { AxiosResponse } from "axios";
import { IComments } from "../interface/interface";
import { Request } from "../utils";

// Get comments on a news
export const getComments = async (id: string): Promise<AxiosResponse<any>> => {
	const { data } = await Request.get(`/news/${id}/comments`);
	return data;
};

// Add Comment to news
export const addComment = async (
	id: string,
	comment: IComments
): Promise<AxiosResponse<any>> => {
	const { data } = await Request.post(`/news/${id}/comments`, {
		data: comment,
	});
	return data;
};

// Edit comment on a news
export const updateComment = async (
	newsId: string,
	commentId: string,
	comment: IComments
): Promise<AxiosResponse<any>> => {
	const { data } = await Request.put(`/news/${newsId}/comments/${commentId}`, {
		data: comment,
	});
	return data;
};

// Delete comment on news item
export const deleteComment = async (
	newsId: string,
	commentId: string
): Promise<AxiosResponse<any>> => {
	const { data } = await Request.delete(
		`/news/:${newsId}/comments/${commentId}`
	);
	return data;
};
