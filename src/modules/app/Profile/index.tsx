import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Home";
import { defaultScreenOptions } from "modules";

export enum ProfileRoute {
   Home = "Your Profile"
}

const Stack = createStackNavigator();

const ProfileNavigator: React.FC = () => (
   <Stack.Navigator initialRouteName={ProfileRoute.Home} screenOptions={defaultScreenOptions}>
      <Stack.Screen name={ProfileRoute.Home} component={HomeScreen} />
   </Stack.Navigator>
)

export default ProfileNavigator;