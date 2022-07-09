import {
	ActivityIndicator,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	useColorScheme,
	Dimensions,
	Platform,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NewsNavProps } from "../types/types";
import { connect, useDispatch, useSelector } from "react-redux";
import store, { Dispatch, RootState } from "../store/store";
import { Button, lightColors } from "@rneui/themed";
import { Cards, Center, NewsHeader, Paginate } from "../components";
import { Text } from "@rneui/themed";

const { height, width } = Dimensions.get("window");

const Home = ({ navigation, route }: NewsNavProps<"News">) => {
	const isDarkMode = useColorScheme() === "dark";
	const dispatch = useDispatch<Dispatch>();
	const news = useSelector((state: RootState) => state.news.news);
	const loadingState = useSelector(
		(state: RootState) => state.loading.effects.news.loadAsync.loading
	);
	const [page, setPage] = useState(1);

	useEffect(() => {
		dispatch.news.loadAsync(page.toString());
	}, [page]);
	if (loadingState) {
		return (
			<Center>
				<ActivityIndicator size="large" />
			</Center>
		);
	}
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
				<View style={{ flex: 1 }}>
					<NewsHeader />
					<Cards />
					<Paginate currentPage={page} handlePage={setPage} />
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
