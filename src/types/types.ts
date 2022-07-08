import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// provides safe typings for the expected screens and it's params
export type NewsParamsList = {
	News: undefined;
	SingleNews: {
		id: string;
	};
};

export type NewsNavProps<T extends keyof NewsParamsList> = {
	navigation: NativeStackNavigationProp<NewsParamsList, T>;
	route: RouteProp<NewsParamsList, T>;
	news: any;
};

export type TabsParamsList = {
	Home: undefined;
	Form: {
		title: string;
		type: string;
		action: string;
		newsId?: string;
	};
};
