import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeRoutes } from "./routes";
import DefaultScreen from "./Default";

const Stack = createStackNavigator();

const BudgetsNavigator: React.FC = () => (
   <Stack.Navigator initialRouteName={HomeRoutes.Default}>
      <Stack.Screen name={HomeRoutes.Default} component={DefaultScreen} />
   </Stack.Navigator>
)

export default BudgetsNavigator;