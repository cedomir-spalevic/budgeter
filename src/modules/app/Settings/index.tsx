import React from "react";
import { createStackNavigator, StackHeaderTitleProps, StackNavigationOptions, useHeaderHeight } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import AppearanceScreen from "./Appearance";
import NotificationsScreen from "./Notifications";
import SwipeOptionsScreen from "./SwipeOptions";
import { SettingsRoutes } from "./routes";
import { NavigationHeaderProvider, useTheme } from "context";
import { Dimensions } from "react-native";

const DefaultNavigator: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
       <NavigationHeaderProvider headerHeight={headerHeight}>
          <DefaultScreen />
       </NavigationHeaderProvider>
   )
}

const AppearanceNavigator: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
       <NavigationHeaderProvider headerHeight={headerHeight}>
          <AppearanceScreen />
       </NavigationHeaderProvider>
   )
}

const NotificationsNavigator: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
       <NavigationHeaderProvider headerHeight={headerHeight}>
          <NotificationsScreen />
       </NavigationHeaderProvider>
   )
}

const SwipeOptionsNavigator: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
       <NavigationHeaderProvider headerHeight={headerHeight}>
          <SwipeOptionsScreen />
       </NavigationHeaderProvider>
   )
}

const Stack = createStackNavigator();

const SettingsNavigaor: React.FC = () => {
   const theme = useTheme();

   const options: StackNavigationOptions = {
      headerTintColor: theme.value.palette.primary,
      headerTransparent: true,
      headerTitle: (props: StackHeaderTitleProps) => null,
      headerLeftContainerStyle: { paddingLeft: Dimensions.get("screen").width * 0.1 },
      headerRightContainerStyle: { paddingRight: Dimensions.get("screen").width * 0.1 },
      headerBackTitleVisible: false
   }
   return (
      <Stack.Navigator initialRouteName={SettingsRoutes.Default} screenOptions={options}>
         <Stack.Screen name={SettingsRoutes.Default} component={DefaultNavigator} />
         <Stack.Screen name={SettingsRoutes.Appearance} component={AppearanceNavigator} />
         <Stack.Screen name={SettingsRoutes.Notifications} component={NotificationsNavigator} />
         <Stack.Screen name={SettingsRoutes.SwipeOptions} component={SwipeOptionsNavigator} />
      </Stack.Navigator>
   )
}

export default SettingsNavigaor;