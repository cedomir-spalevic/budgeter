import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import defaultScreenOptions from "modules/defaultScreenOptions";
import DefaultScreen from "./Default";
import AppearanceScreen from "./Appearance";
import NotificationsScreen from "./Notifications";
import SwipeOptionPreferenceScreen from "./SwipeOptionPreference";
import SettingsRoutes from "./routes";
import SwipeOptionsScreen from "./SwipeOptions";

const Stack = createStackNavigator();

const SettingsNavigator: React.FC = () => (
   <Stack.Navigator
      initialRouteName={SettingsRoutes.Default}
      screenOptions={defaultScreenOptions(false)}
   >
      <Stack.Screen name={SettingsRoutes.Default} component={DefaultScreen} />
      <Stack.Screen
         name={SettingsRoutes.Appearance}
         component={AppearanceScreen}
      />
      <Stack.Screen
         name={SettingsRoutes.Notifications}
         component={NotificationsScreen}
      />
      <Stack.Screen
         name={SettingsRoutes.SwipeOptions}
         component={SwipeOptionsScreen}
      />
      <Stack.Screen
         name={SettingsRoutes.SwipeOptionPreference}
         component={SwipeOptionPreferenceScreen}
      />
   </Stack.Navigator>
);

export default SettingsNavigator;
