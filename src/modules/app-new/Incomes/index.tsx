import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import { IncomesRoutes } from "./routes";

const Stack = createStackNavigator();

const IncomesNavigator: React.FC = () => (
   <Stack.Navigator initialRouteName={IncomesRoutes.Default}>
      <Stack.Screen name={IncomesRoutes.Default} component={DefaultScreen} />
   </Stack.Navigator>
)

export default IncomesNavigator;