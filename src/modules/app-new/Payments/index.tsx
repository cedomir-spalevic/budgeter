import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import { PaymentsRoutes } from "./routes";

const Stack = createStackNavigator();

const PaymentsNavigator: React.FC = () => (
   <Stack.Navigator initialRouteName={PaymentsRoutes.Default}>
      <Stack.Screen name={PaymentsRoutes.Default} component={DefaultScreen} />
   </Stack.Navigator>
)

export default PaymentsNavigator;