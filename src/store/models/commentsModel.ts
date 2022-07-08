import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { IComments, IServerNews } from "../../interface/interface";
import {
	addComment,
	deleteComment,
	getComments,
	updateComment,
} from "../../services/comments";

type CommentType = {
	comments: IServerNews[];
};

export const comments = createModel<RootModel>()({
	state: {
		comments: [],
	} as CommentType,
	reducers: {
		load: (state, payload: IServerNews[]) => {
			return { ...state, comments: payload };
		},

		addComment: (state, payload: IServerNews) => {
			return {
				...state,
				comments: [...state.comments, payload],
			};
		},
		editComment: (state, payload: IServerNews) => {
			const filteredComments = state.comments.filter(
				(comment) => comment.id !== payload.id
			);
			return {
				...state,
				comments: [...filteredComments, payload],
			};
		},
		removeComment: (state, payload: IServerNews) => {
			const filteredComments = state.comments.filter(
				(comment) => comment.id !== payload.id
			);
			return {
				...state,
				news: [...filteredComments],
			};
		},
	},
	effects: (dispatch) => ({
		async loadAsync(payload: string, rootState) {
			const data = await getComments(payload);

			// @ts-ignore
			dispatch.comments.load(data);
		},

		async addCommentAsync(
			payload: { id: string; comment: IComments },
			rootState
		) {
			const data = await addComment(payload.id, payload.comment);
			// @ts-ignore
			dispatch.comments.addComment(data);
		},
		async editCommentAsync(
			payload: { newsId: string; commentId: string; comment: IComments },
			rootState
		) {
			const data = await updateComment(
				payload.newsId,
				payload.commentId,
				payload.comment
			);
			// @ts-ignore
			dispatch.comments.editComment(data);
		},
		async removeCommentAsync(
			payload: { newsId: string; commentId: string },
			rootState
		) {
			const data = await deleteComment(payload.newsId, payload.commentId);
			// @ts-ignore
			dispatch.comments.removeComment(data);
		},
	}),
});
