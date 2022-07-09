import {
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NewsNavProps, NewsParamsList, TabsParamsList } from "../types/types";
import { RouteProp } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Button, Card, Input } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../store/store";
import { AxiosError } from "axios";
import { Center } from "../components";

const Form = ({
	navigation,
	route,
}: BottomTabScreenProps<TabsParamsList, "Form">) => {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const dispatch = useDispatch<Dispatch>();
	const commentLoading = useSelector(
		(state: RootState) => state.loading.effects.comments.addCommentAsync.loading
	);

	const loadingStateSingleNews = useSelector(
		(state: RootState) => state.loading.effects.news.loadSingleNewsAsync.loading
	);
	const loadingStateSingleNewsSubmit = useSelector(
		(state: RootState) => state.loading.effects.news.editNewsAsync.loading
	);
	const singleNews = useSelector((state: RootState) => state.news.singleNews);
	useEffect(() => {
		const loadField = async function () {
			try {
				// @ts-ignore
				await dispatch.news.loadSingleNewsAsync(route.params.newsId);
				// @ts-ignore
				setTitle(singleNews?.title);
				// @ts-ignore
				setMessage(singleNews?.body);
			} catch (error) {
				if (error instanceof AxiosError) {
					alert(error.message);
				}
			}
		};
		if (route?.params?.type === "news" && route?.params?.action === "edit") {
			loadField();
		}
	}, [route?.params?.newsId]);

	const getTitle = () => {
		let title;
		if (route.params && route.params.type && route.params.action) {
			if (route.params.type === "comment") {
				if (route.params.action === "create") {
					title = "Add Comment";
				} else {
					title = "Edit Comment";
				}
			}
			if (route.params.type === "news") {
				if (route.params.action === "create") {
					title = "Add News";
				} else {
					title = "Edit News";
				}
			}
		}

		return title;
	};
	const handleSubmit = async () => {
		if (!title || !message) {
			alert("Please make sure no field is empty");
			return;
		}
		console.log(route.params.newsId);

		try {
			switch (route.params.type) {
				case "comment":
					if (route.params.action === "create") {
						await dispatch.comments.addCommentAsync({
							// @ts-ignore
							id: route.params.newsId,
							comment: {
								name: title,
								comment: message,
								avatar: "http://lorempixel.com/640/480/fashion",
								// @ts-ignore
								newsId: route.params.newsId,
							},
						});
						Alert.alert("Comments Successfully Added");
					} else {
					}
					break;
				case "news":
					if (route.params.action === "edit") {
						await dispatch.news.editNewsAsync({
							// @ts-ignore
							id: route.params.newsId,
							news: {
								author: title,
								title: message,
							},
						});
						Alert.alert("Updated Successfully");
						navigation.goBack();
					} else {
					}
					break;

				default:
					break;
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				alert(error.message);
				console.log(error);
			}
		}
	};

	if (loadingStateSingleNews) {
		return (
			<Center>
				<ActivityIndicator size="large" />
			</Center>
		);
	}
	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="height">
				<Card>
					<Card.Title style={{ marginVertical: 20 }} h4>
						{getTitle()}
					</Card.Title>

					<Input
						placeholder="Enter Title"
						value={title}
						onChangeText={(text) => setTitle(text)}
					/>
					<Input
						placeholder="Enter Comment"
						multiline
						value={message}
						onChangeText={(text) => setMessage(text)}
					/>

					<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
						<Button
							buttonStyle={{ marginRight: 10 }}
							onPress={() => {
								setTitle("");
								setMessage("");
								navigation.goBack();
							}}
							type="outline"
						>
							Go Back
						</Button>
						<Button
							loading={commentLoading || loadingStateSingleNewsSubmit}
							onPress={handleSubmit}
						>
							Submit
						</Button>
					</View>
				</Card>

				<View style={{ marginBottom: 50 }} />
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default Form;

const styles = StyleSheet.create({});
