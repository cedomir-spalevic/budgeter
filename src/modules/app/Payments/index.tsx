import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import defaultScreenOptions from "modules/defaultScreenOptions";
import PaymentScreen from "modules/app/Shared/Payment";
import DefaultScreen from "./Default";
import PaymentsRoutes from "./routes";

const Stack = createStackNavigator();

const PaymentsNavigator: React.FC = () => (
   <Stack.Navigator
      initialRouteName={PaymentsRoutes.Default}
      screenOptions={defaultScreenOptions(false)}
   >
      <Stack.Screen name={PaymentsRoutes.Default} component={DefaultScreen} />
      <Stack.Screen name={PaymentsRoutes.Payment} component={PaymentScreen} />
   </Stack.Navigator>
);

export default PaymentsNavigator;
