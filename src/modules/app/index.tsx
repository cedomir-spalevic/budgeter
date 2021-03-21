import React from "react";
import {
   BottomTabBarOptions,
   createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "context";
import { Icon } from "components";
import HomeNavigator from "./Home";
import IncomesNavigator from "./Incomes";
import PaymentsNavigator from "./Payments";
import SettingsNavigator from "./Settings";
import AppRoutes from "./routes";
import AppLoader from "./Loader";

enum TabRoutes {
   Home = "Home",
   Incomes = "Incomes",
   Payments = "Payments",
   Settings = "Settings"
}

const Tab = createBottomTabNavigator();

const getOptions = (name: string) => ({
   tabBarIcon: ({ color = "" as string, size = 24 as number }) => (
      <Icon name={name} size={size} color={color} />
   )
});

const TabNavigator: React.FC = () => {
   const theme = useTheme();

   const tabBarOptions: BottomTabBarOptions = {
      style: {
         backgroundColor: theme.value.palette.tabBarBackground,
         borderTopColor: theme.value.palette.tabBarBackground
      },
      inactiveTintColor: theme.value.palette.systemGray,
      activeTintColor: theme.value.palette.primary,
      showLabel: false,
      keyboardHidesTabBar: true
   };
   return (
      <Tab.Navigator
         initialRouteName={TabRoutes.Home}
         tabBarOptions={tabBarOptions}
      >
         <Tab.Screen
            name={TabRoutes.Home}
            component={HomeNavigator}
            options={getOptions("home")}
         />
         <Tab.Screen
            name={TabRoutes.Payments}
            component={PaymentsNavigator}
            options={getOptions("credit-card")}
         />
         <Tab.Screen
            name={TabRoutes.Incomes}
            component={IncomesNavigator}
            options={getOptions("attach-money")}
         />
         <Tab.Screen
            name={TabRoutes.Settings}
            component={SettingsNavigator}
            options={getOptions("settings")}
         />
      </Tab.Navigator>
   );
};

const App = createStackNavigator();

const AppNavigator: React.FC = () => (
   <App.Navigator
      initialRouteName={AppRoutes.Loader}
      screenOptions={{ headerShown: false }}
   >
      <App.Screen name={AppRoutes.Loader} component={AppLoader} />
      <App.Screen name={AppRoutes.App} component={TabNavigator} />
   </App.Navigator>
);

export default AppNavigator;
