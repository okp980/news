import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./src/navigation/TabNavigation";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { ThemeProvider } from "@rneui/themed";
import theme from "./src/theme/theme";

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<NavigationContainer>
					<TabNavigation />
				</NavigationContainer>
			</ThemeProvider>
		</Provider>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
