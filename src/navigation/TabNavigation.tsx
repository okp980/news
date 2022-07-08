import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Form } from "../screens";
import { Entypo } from "@expo/vector-icons";
import { TabsParamsList } from "../types/types";
import NewsStackNaviation from "./NewsNavigation";

const TabStack = createBottomTabNavigator<TabsParamsList>();

const TabNavigation = () => {
	return (
		<>
			<TabStack.Navigator
				initialRouteName="Home"
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "Home") {
							iconName = "home";
						} else if (route.name === "Form") {
							iconName = "browser";
						}

						// @ts-ignore
						return <Entypo name={`${iconName}`} size={size} color={color} />;
					},
					tabBarActiveTintColor: "blue",
					tabBarInactiveTintColor: "gray",
					headerTitleAlign: "center",
				})}
			>
				<TabStack.Screen
					name="Home"
					component={NewsStackNaviation}
					options={{ title: "News Feed", headerShown: false }}
				/>
				<TabStack.Screen
					name="Form"
					component={Form}
					options={({ route }) => ({
						title:
							route?.params?.title === "edit" ? "Edit News" : "Create News",
					})}
				/>
			</TabStack.Navigator>
		</>
	);
};

export default TabNavigation;
