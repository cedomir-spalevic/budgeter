import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PaymentsHomeScreen from "./Home";
import PaymentScreen from "modules/app/Shared/Payment";
import { PaymentsRoute } from "./routes";
import { defaultScreenOptions } from "modules";

const Stack = createStackNavigator();

const PaymentsNavigator: React.FC = () => (
   <Stack.Navigator initialRouteName={PaymentsRoute.Home} screenOptions={defaultScreenOptions}>
      <Stack.Screen name={PaymentsRoute.Home} component={PaymentsHomeScreen} />
      <Stack.Screen name={PaymentsRoute.Payment} component={PaymentScreen} />
   </Stack.Navigator>
)

export default PaymentsNavigator;