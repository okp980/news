import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { INewsImage, IServerImage } from "../../interface/interface";
import {
	AddNewsImage,
	deleteNewsImg,
	getNewsImages,
} from "../../services/images";

// type for image state
type ImageType = {
	images: IServerImage[];
	image: IServerImage | null;
};

export const images = createModel<RootModel>()({
	state: {
		images: [],
		image: null,
	} as ImageType,
	reducers: {
		loadImages: (state, payload: IServerImage[]) => {
			return { ...state, images: payload };
		},
		loadSingleImage: (state, payload: IServerImage) => {
			return { ...state, image: payload };
		},
		removeImage: (state, payload: IServerImage) => {
			return {
				...state,
				images: state.images.filter((image) => image.id !== payload.id),
			};
		},
	},
	effects: (dispatch) => ({
		async loadImagesAsync(payload: string, rootState) {
			const data = await getNewsImages(payload);
			// @ts-ignore
			dispatch.images.loadImages(data);
		},
		async loadSingleImageAsync(
			payload: { id: string; image: INewsImage },
			rootState
		) {
			const data = await AddNewsImage(payload.id, payload.image);
			// @ts-ignore
			dispatch.images.loadSingleImage(data);
		},
		async removeImageAsync(
			payload: { newsId: string; imgId: string },
			rootState
		) {
			const data = await deleteNewsImg(payload.newsId, payload.imgId);
			// @ts-ignore
			dispatch.images.loadSingleImage(data);
		},
	}),
});
