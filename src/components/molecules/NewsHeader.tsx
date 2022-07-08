import { StyleSheet, View } from "react-native";
import React from "react";
import { lightColors, Text } from "@rneui/base";

const NewsHeader = () => {
	return (
		<View style={styles.header}>
			<Text h1 h1Style={{ color: lightColors.secondary }}>
				News Feed
			</Text>
		</View>
	);
};

export default NewsHeader;

const styles = StyleSheet.create({
	header: {
		padding: 20,
	},
});
