import { StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import { Button, Text } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { lightColors } from "@rneui/themed";
import { FONTS } from "../../globalStyles/globalStyles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const Paginate = ({
	currentPage,
	handlePage,
}: {
	currentPage: number;
	handlePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const loadingState = useSelector(
		(state: RootState) => state.loading.effects.news.loadAsync.loading
	);

	// function to paginate to next
	// only go to next page if the current page is less than 8
	const handleNext = () => {
		if (currentPage === 8) {
			return;
		}
		handlePage(currentPage + 1);
	};

	// function to paginate to previous
	// only go to previous page if the current page is more than 1
	const handlePrev = () => {
		if (currentPage === 1) {
			return;
		}
		handlePage(currentPage - 1);
	};

	return (
		<View style={styles.container}>
			<Button
				title="Previous page 1"
				type="outline"
				buttonStyle={{ width: 100 }}
				onPress={handlePrev}
				disabled={loadingState}
			>
				{currentPage !== 1 && (
					<Ionicons
						name="chevron-back-outline"
						size={24}
						color={lightColors.primary}
					/>
				)}
				<Text>{currentPage === 1 ? "Start" : `Prev ${currentPage - 1}`}</Text>
			</Button>
			{/* @ts-ignore */}
			<Text style={{ ...FONTS.small }}>Page: {currentPage} </Text>
			<Button
				title="Previous page 1"
				type="outline"
				buttonStyle={{ width: 100 }}
				onPress={handleNext}
				disabled={loadingState}
			>
				<Text>{currentPage === 8 ? "End" : `Next ${currentPage + 1}`}</Text>
				{currentPage !== 8 && (
					<Ionicons
						name="chevron-forward-outline"
						size={24}
						color={lightColors.primary}
					/>
				)}
			</Button>
		</View>
	);
};

export default Paginate;

const styles = StyleSheet.create({
	container: {
		height: 80,
		alignItems: "center",
		justifyContent: "space-around",
		flexDirection: "row",
	},
});
