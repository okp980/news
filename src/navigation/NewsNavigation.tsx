import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, SingleNews } from "../screens";
import { NewsParamsList } from "../types/types";

// creating a news stack for navigation and passing the type to restrict
// it to specific routes and params defined in ou NewsParamsList
// name property is now type safe

const NewsStack = createNativeStackNavigator<NewsParamsList>();

const NewsStackNaviation = () => {
	return (
		<>
			<NewsStack.Navigator
				initialRouteName="News"
				screenOptions={{ headerShown: false }}
			>
				<NewsStack.Screen name="News" component={Home} />
				<NewsStack.Screen
					name="SingleNews"
					component={SingleNews}
					options={{ headerShown: true, title: "News" }}
				/>
			</NewsStack.Navigator>
		</>
	);
};

export default NewsStackNaviation;
