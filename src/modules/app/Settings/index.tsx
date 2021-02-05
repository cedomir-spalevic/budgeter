import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import AppearanceScreen from "./Appearance";
import NotificationsScreen from "./Notifications";
import SwipeOptionsScreen from "./SwipeOptions";
import { SettingsRoutes } from "./routes";
import { Header } from "components";

const screenOptions: StackNavigationOptions = {
   header: (props) => <Header {...props} />
}

const Stack = createStackNavigator();

const SettingsNavigator: React.FC = () => (
   <Stack.Navigator initialRouteName={SettingsRoutes.Default} screenOptions={screenOptions}>
      <Stack.Screen name={SettingsRoutes.Default} component={DefaultScreen} />
      <Stack.Screen name={SettingsRoutes.Appearance} component={AppearanceScreen} />
      <Stack.Screen name={SettingsRoutes.Notifications} component={NotificationsScreen} />
      <Stack.Screen name={SettingsRoutes.SwipeOptions} component={SwipeOptionsScreen} />
   </Stack.Navigator>
)

export default SettingsNavigator;