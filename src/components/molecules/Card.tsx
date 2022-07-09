import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, Text } from "@rneui/base";
import { CardInterface } from "../../interface/interface";
import { FONTS } from "../../globalStyles/globalStyles";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabsParamsList } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { AxiosError } from "axios";

const Card: React.FC<CardInterface> = ({
	id,
	author,
	title,
	time,
	excerpt,
	navigation,
}) => {
	const dispatch = useDispatch<Dispatch>();
	const loading = useSelector(
		(state: RootState) => state.loading.effects.news.removeNewsAsync.loading
	);
	const truncate = (str: string, num: number) => {
		return str.length > num ? str.substring(0, num - 1) + "..." : str;
	};
	const state = useNavigationState((state) => state);
	const route = state.routeNames[state.routeNames.length - 2];
	console.log("route", route);

	const handleNavigate = () => {
		navigation.navigate("Form", {
			action: "edit",
			newsId: id,
			type: route === "News" ? "news" : "comment",
			title: route === "News" ? "news" : "comment",
		});
	};

	const handleDelete = async () => {
		try {
			if (route === "News") {
				// @ts-ignore
				await dispatch.news.removeNewsAsync(id);
			}

			if (route === "SingleNews") {
				await dispatch.comments.removeCommentAsync({
					// @ts-ignore
					newsId: id,
					// @ts-ignore
					commentId: id,
				});
			}
			Alert.alert("Deleted Successfully");
		} catch (error) {
			if (error instanceof AxiosError) {
				Alert.alert(error.message);
			}
		}
	};

	return (
		<View style={styles.container}>
			<View>
				{/* @ts-ignore */}
				<Text style={[FONTS.small]}>By {author}</Text>
				<Text h3>{title}</Text>
				{/* @ts-ignore */}
				<Text style={[FONTS.medium]}>{truncate(excerpt, 82)}</Text>
				{/* @ts-ignore */}
				<Text style={[FONTS.time]}>
					{formatDistanceToNow(new Date(time), { addSuffix: true })}
				</Text>
				<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
					<Button buttonStyle={{ marginRight: 10 }} onPress={handleNavigate}>
						Edit
					</Button>
					<Button
						buttonStyle={{ backgroundColor: "red" }}
						onPress={handleDelete}
						loading={loading}
					>
						Delete
					</Button>
				</View>
			</View>
		</View>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flex: 1,
		marginHorizontal: 20,
		marginBottom: 20,
	},
});
