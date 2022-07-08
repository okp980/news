// @ts-nocheck
import {
	ActivityIndicator,
	FlatList,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect } from "react";
import { NewsNavProps } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../store/store";
import { Center } from "../components";
import { getSingleNews } from "../services/news";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Button, Card, lightColors } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import { FONTS } from "../globalStyles/globalStyles";
import { Card as CommentCard } from "../components";
import { IServerNews } from "../interface/interface";
// import { Image } from "@rneui/themed";

const SingleNews = ({ navigation, route }: NewsNavProps<"SingleNews">) => {
	const dispatch = useDispatch<Dispatch>();
	// get list of news from store
	const news = useSelector((state: RootState) => state.news.singleNews);

	// get list of images in a news from store
	const images = useSelector((state: RootState) => state.images.images);

	// loading state of the news
	const loadingState = useSelector(
		(state: RootState) => state.loading.models.news.loading
	);

	// loading state of the images
	const loadingImagesState = useSelector(
		(state: RootState) => state.loading.models.images.loading
	);

	// error state of the news
	const errorState = useSelector(
		(state: RootState) => state.loading.effects.news.addSingleNewsAsync.error
	);

	// error state of the images
	const errorStateImg = useSelector(
		(state: RootState) => state.loading.effects.images.loadImagesAsync.error
	);

	useEffect(() => {
		if (route.params && route.params.id) {
			const id = route.params.id;
			dispatch.news.loadSingleNewsAsync(id);
			dispatch.comments.loadAsync(id);
			dispatch.images.loadImagesAsync(id);
		}
	}, []);

	const handleRenderImg = ({ item }) => {
		return (
			<View style={{ width: 350, height: 200 }}>
				<Image
					source={{ uri: item?.image }}
					resizeMode="cover"
					style={{ flex: 1, marginVertical: 10 }}
				/>
			</View>
		);
	};
	if (loadingState || loadingImagesState) {
		return (
			<Center>
				<ActivityIndicator size="large" />
			</Center>
		);
	}

	if (errorState) {
		console.log(errorState);

		return (
			<Center>
				<Text>Error Loading Content</Text>
			</Center>
		);
	}
	return (
		<ScrollView>
			<Card>
				<Card.Title h3>{news?.title}</Card.Title>
				<Text
					style={{
						textAlign: "center",
						color: lightColors.primary,
						textTransform: "uppercase",
					}}
				>
					{news?.author}
				</Text>

				{images.length === 0 ? (
					<View style={{ height: 200, flex: 1 }}>
						<Center>
							<Text> No Image Content</Text>
						</Center>
					</View>
				) : (
					<FlatList
						data={images}
						renderItem={handleRenderImg}
						keyExtractor={(item) => item?.id.toString()}
						showsHorizontalScrollIndicator={false}
						horizontal
					/>
				)}

				{/* <View style={{ alignItems: "center", flexDirection: "row" }}>
					<AntDesign
						name="clockcircle"
						size={14}
						color="black"
						style={{ marginRight: 5 }}
					/>
					<Text style={{ textAlign: "center" }}>
						{formatDistanceToNow(new Date(news.createdAt), {
							addSuffix: false,
						})}
					</Text>
				</View> */}
				<Card.Divider style={{ marginVertical: 10 }} />

				<Text style={{ ...FONTS.medium, textAlign: "justify" }}>
					{news?.body}
				</Text>
				<Card.Divider style={{ marginVertical: 10 }} />
				<Button
					onPress={() =>
						navigation.navigate("Form", {
							type: "comment",
							action: "create",
							newsId: news?.id,
						})
					}
					buttonStyle={{ marginVertical: 30 }}
				>
					Add Comment
				</Button>
				<Card.Title>Comments</Card.Title>

				{news?.data?.map((nw: IServerNews, index: number) => (
					<Card key={index} s>
						<CommentCard
							author={nw.author}
							title={nw.title}
							time={nw.createdAt}
							id={nw.id}
							excerpt={nw.body}
						/>
					</Card>
				))}
			</Card>
		</ScrollView>
	);
};

export default SingleNews;

const styles = StyleSheet.create({});
