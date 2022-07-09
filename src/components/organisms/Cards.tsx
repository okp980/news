import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import Card from "../molecules/Card";
import { CardInterface, IServerNews } from "../../interface/interface";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigation } from "@react-navigation/native";
import { NewsNavProps, NewsParamsList } from "../../types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Cards = () => {
	const news = useSelector((state: RootState) => state.news.news);

	const navigation =
		useNavigation<
			NativeStackNavigationProp<NewsParamsList, "News", undefined>
		>();

	const renderItem = ({ item }: { item: IServerNews }) => (
		<TouchableOpacity
			onPress={() => navigation.push("SingleNews", { id: item.id })}
		>
			<Card
				navigation={navigation}
				id={item.id}
				author={item.author}
				time={item.createdAt}
				title={item.title}
				excerpt={item.body}
			/>
		</TouchableOpacity>
	);
	return (
		<View style={styles.container}>
			<FlatList
				data={news}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default Cards;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
