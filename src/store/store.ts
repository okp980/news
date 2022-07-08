import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import immerPlugin from "@rematch/immer";
import createLoadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading";
import { models, RootModel } from "./models";

type FullModel = ExtraModelsFromLoading<RootModel, { type: "full" }>;

export const store = init<RootModel, FullModel>({
	models,
	plugins: [createLoadingPlugin({ type: "full" }), immerPlugin()],
});
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;

export default store;
