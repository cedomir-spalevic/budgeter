import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Home";

export enum SavingsRoute {
   Home = "Home"
}

const Stack = createStackNavigator();

const SavingsNavigator: React.FC = () => (
   <Stack.Navigator initialRouteName={SavingsRoute.Home}>
      <Stack.Screen name={SavingsRoute.Home} component={HomeScreen} />
   </Stack.Navigator>
)

export default SavingsNavigator;