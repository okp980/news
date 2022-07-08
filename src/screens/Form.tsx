import {
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NewsNavProps, NewsParamsList, TabsParamsList } from "../types/types";
import { RouteProp } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Button, Card, Input } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../store/store";
import { AxiosError } from "axios";

const Form = ({
	navigation,
	route,
}: BottomTabScreenProps<TabsParamsList, "Form">) => {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch<Dispatch>();
	const commentLoading = useSelector(
		(state: RootState) => state.loading.effects.comments.addCommentAsync.loading
	);
	const errorComment = useSelector(
		(state: RootState) => state.loading.effects.comments.addCommentAsync.error
	);
	const successComment = useSelector(
		(state: RootState) => state.loading.effects.comments.addCommentAsync.success
	);
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
			alert("none");
			return;
		}
		console.log(route.params.newsId);

		try {
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
		} catch (error) {
			if (error instanceof AxiosError) {
				setError(error.message);
				console.log(error);
			}
		}
	};
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
						<Button loading={commentLoading} onPress={handleSubmit}>
							Submit
						</Button>
					</View>
				</Card>
				{errorComment && (
					<Card>
						<Text style={{ textAlign: "center", color: "red" }}>
							{error || "Server Error"}
						</Text>
					</Card>
				)}
				{successComment && (
					<Card>
						<Text style={{ textAlign: "center", color: "green" }}>
							Added Succefully
						</Text>
					</Card>
				)}
				<View style={{ marginBottom: 50 }} />
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default Form;

const styles = StyleSheet.create({});
