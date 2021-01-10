import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import AppearanceScreen from "./Appearance";
import NotificationsScreen from "./Notifications";
import SwipeOptionsScreen from "./SwipeOptions";
import { SettingsRoutes } from "./routes";
import { Header } from "components";

const getHeader = (initialRoute: string): StackNavigationOptions => ({
   header: (props) => <Header initialRoute={initialRoute} {...props} />
})

const Stack = createStackNavigator();

const SettingsNavigator: React.FC = () => (
   <Stack.Navigator initialRouteName={SettingsRoutes.Default} screenOptions={getHeader(SettingsRoutes.Default)}>
      <Stack.Screen name={SettingsRoutes.Default} component={DefaultScreen} />
      <Stack.Screen name={SettingsRoutes.Appearance} component={AppearanceScreen} />
      <Stack.Screen name={SettingsRoutes.Notifications} component={NotificationsScreen} />
      <Stack.Screen name={SettingsRoutes.SwipeOptions} component={SwipeOptionsScreen} />
   </Stack.Navigator>
)

export default SettingsNavigator;