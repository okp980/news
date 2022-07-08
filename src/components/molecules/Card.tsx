// @ts-nocheck

import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Text } from "@rneui/base";
import { CardInterface } from "../../interface/interface";
import { FONTS } from "../../globalStyles/globalStyles";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

const Card: React.FC<CardInterface> = ({
	author,
	title,
	time,
	excerpt,
	handleNavigate,
}) => {
	const navigation = useNavigation();
	const truncate = (str: string, num: number) => {
		return str.length > num ? str.substring(0, num - 1) + "..." : str;
	};
	return (
		<View style={styles.container} onPress={handleNavigate}>
			<View>
				<Text style={[FONTS.small]}>By {author}</Text>
				<Text h3>{title}</Text>
				<Text style={[FONTS.medium]}>{truncate(excerpt, 82)}</Text>
				<Text style={[FONTS.time]}>
					{formatDistanceToNow(new Date(time), { addSuffix: true })}
				</Text>
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
