import { Models } from "@rematch/core";
import { comments } from "./commentsModel";
import { images } from "./imagesModel";
import { news } from "./newsModel";

// model interface
export interface RootModel extends Models<RootModel> {
	news: typeof news;
	images: typeof images;
	comments: typeof comments;
}

export const models: RootModel = {
	news,
	images,
	comments,
};
